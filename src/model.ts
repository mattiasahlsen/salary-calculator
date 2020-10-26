import * as tf from '@tensorflow/tfjs'
import { Tensor } from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis'
import { reverse } from 'lodash';

type DataPoint = { salary: number; experience: number }
type TrainingData = DataPoint[]

const BATCH_SIZE = 32
const EPOCHS = 100

const INPUT_DIM = 3
const INITIAL_INPUT_WEIGHTS = [[0.89], [1.4], [0.9]] // arrived at through trial and error
const INITIAL_INPUT_BIAS = [0.119]
const INITIAL_OUTPUT_WEIGHTS = [[0.899]]
const INITIAL_OUTPUT_BIAS = [-0.18]

function transformInputData(data: number[]): number[][] {
  return data.map(n => [
    n,
    n === 0 ? 0 : Math.pow(n, 1 / 2),
    n === 0 ? 0 : Math.pow(n, 1 / 3),
  ])
}
// needed to transform back the flattened array into arrays of INPUT_DIM values
function groupInputs(inputs: tf.TypedArray) {
  const groupedInputs = []
  for (let i = 0; i < inputs.length; i += INPUT_DIM) {
    groupedInputs.push(inputs.slice(i, i + INPUT_DIM))
  }
  return groupedInputs
}
// get the original x-value, before it was transformed
function reverseInputs(inputs: tf.TypedArray) {
  return groupInputs(inputs).map(group => group[0])
}

function createModel(inputDim: number): tf.Sequential {
  // Create a sequential model
  const model = tf.sequential(); 
  
  // Add a single input layer
  model.add(tf.layers.dense({
    inputShape: [inputDim],
    units: 1,
    useBias: true,
    weights: [tf.tensor(INITIAL_INPUT_WEIGHTS), tf.tensor(INITIAL_INPUT_BIAS)]
  }));
  
  // Add an output layer
  model.add(tf.layers.dense({
    units: 1,
    useBias: true,
    weights: [tf.tensor(INITIAL_OUTPUT_WEIGHTS), tf.tensor(INITIAL_OUTPUT_BIAS)]
  }));

  return model;
}

type RankTensor = tf.Tensor<tf.Rank>

/**
 * Convert the input data to tensors that we can use for machine 
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
function convertToTensor(inputs: number[][], inputDim: number, min?: RankTensor, max?: RankTensor) {
  // Wrapping these calculations in a tidy will dispose any 
  // intermediate tensors.
  
  return tf.tidy(() => {
    // Step 1. Shuffle the data    
    tf.util.shuffle(inputs);

    // Step 2. Convert data to Tensor
    const inputTensor = tf.tensor2d(inputs, [inputs.length, inputDim]);

    //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const tensorMax = max || inputTensor.max();
    const tensorMin = min || inputTensor.min();  

    const normalizedTensor = inputTensor.sub(tensorMin).div(tensorMax.sub(tensorMin));

    return {
      tensor: normalizedTensor,
      // Return the min/max bounds so we can use them later.
      max: tensorMax,
      min: tensorMin
    }
  });  
}

type Values = { x: number; y: number }[]
function plot(originalPoints: Values, predictedPoints: Values) {
  tfvis.render.scatterplot(
    {name: 'Lönestatistik för grupp'},
    {values: [originalPoints, predictedPoints], series: ['Verklig data', 'Vår rekommendation']}, 
    {
      xLabel: 'År av erfarenhet',
      yLabel: 'Lön',
      height: 300
    }
  )
}
async function trainModel(model: tf.Sequential, inputs: RankTensor, labels: RankTensor) {
  // Prepare the model for training.  
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse'],
  });
  
  const batchSize = BATCH_SIZE;
  const epochs = EPOCHS;
  
  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: 'Training Performance' },
      ['loss', 'mse'], 
      { height: 200, callbacks: ['onEpochEnd'] }
    )
  })
}

function predictSalaries(
  model: tf.Sequential,
  inputData: TrainingData,
  {
    inputMin,
    inputMax,
    labelMin,
    labelMax,
  }: {
    inputMin: RankTensor;
    inputMax: RankTensor;
    labelMin: RankTensor;
    labelMax: RankTensor;
  }
) {
  // We un-normalize the data by doing the inverse of the min-max scaling 
  // that we did earlier.
  const [xs, preds] = tf.tidy(() => {
    // the x-values (years of experience) we want to predict y-values (salary) for
    const yearsOfExperience: number[] = []
    for (let i = 0; i <= 25; i++) {
      yearsOfExperience.push(i)
    }

    const testData = transformInputData(yearsOfExperience)

    const xTensorData = convertToTensor(testData, INPUT_DIM, inputMin, inputMax)
    const xs = xTensorData.tensor
    const preds = model.predict(xs);      
    
    const unNormXs = xs
      .mul(inputMax.sub(inputMin))
      .add(inputMin);

    const unNormPreds = (preds as RankTensor)
      .mul(labelMax.sub(labelMin))
      .add(labelMin);

    // Return un-normalized data
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });
  
  const predictedPoints: Values = []
  reverseInputs(xs).forEach((experience: number, index: number) => {
    predictedPoints.push({ x: experience, y: preds[index] })
  })
  
  const originalPoints = inputData.map(d => ({
    x: d.experience, y: d.salary,
  }));
  
  plot(originalPoints, predictedPoints)
  return predictedPoints
}

export default async function getSalaries(data: TrainingData) {
  const model = createModel(INPUT_DIM)
  // tfvis.show.modelSummary({name: 'Model Summary'}, model);

  const inputs = transformInputData( data.map(dataPoint => dataPoint.experience) )
  const inputTensorData = convertToTensor(inputs, INPUT_DIM)
  const inputTensor = inputTensorData.tensor

  const labels = data.map(dataPoint => [dataPoint.salary])
  const labelTensorData = convertToTensor(labels, 1)
  const labelTensor = labelTensorData.tensor
      
  // Train the model  
  await trainModel(model, inputTensor, labelTensor);
  console.log('New model done');

  const salaries = predictSalaries(model, data, {
    inputMin: inputTensorData.min,
    inputMax: inputTensorData.max,
    labelMin: labelTensorData.min,
    labelMax: labelTensorData.max,
  });

  return salaries
}
