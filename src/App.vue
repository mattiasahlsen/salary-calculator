<template>
  <div class="form-container m-auto">
    <h1 class="text-5xl font-bold">Räkna ut min lön</h1>
    <p>Var så specifik som möjligt för bästa statistik</p>

    <div class="flex justify-end items-center mt-4">
      <BaseSelect
        label="Utbildning"
        :options="educationOptions"
        v-model="education"
      />
    </div>

    <div class="flex justify-end items-center mt-1">
      <BaseSelect
        label="Region"
        :options="regionOptions"
        v-model="region"
      />
    </div>

    <div class="flex justify-end items-center mt-1">
      <BaseSelect
        label="Arbetslivserfarenhet"
        :options="experienceOptions"
        v-model="experience"
      />
    </div>

    <div class="flex justify-end items-center mt-1">
      <BaseSelect
        label="I min bransch är jag duktigare än"
        :options="expertiseOptions"
        v-model="expertise"
      />
    </div>

    <p class="text-2xl mt-8">Du ska ha <span class="font-bold">{{mySalary}}kr</span> i lön</p>

    <!--<pre>{{salaryData}}</pre>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import civilingenjorData from './data/sverige/2019/civilingenjor'
import civilingenjorItData from './data/sverige/2019/civilingenjor-it'

import SalaryData, { RegionSalaryData } from './data/types'

import newModel, { loadModel } from './model'


const salaryData = {
  civing: civilingenjorData,
  civingIt: civilingenjorItData,
} as { [key: string]: SalaryData }

const experienceOptions: { name: string; value: number }[] = []
for (let i = 0; i < 25; i++) {
  experienceOptions.push({ name: i.toString(), value: i })
}
experienceOptions.push({ name: '25+', value: 25 })

interface DataPoint { salary: number; experience: number }

export default defineComponent({
  name: 'App',
  components: {
  },
  data() {
    return {
      education: 'civing',

      educationOptions: [
        { name: 'Civilingenjör', value: 'civing' },
        { name: 'Civilingingenjör data/IT', value: 'civingIt' }
      ],

      region: 'Hela Sverige' as 'Hela Sverige' | 'Stockholm',
      regionOptions: [
        { name: 'Hela Sverige', value: 'Hela Sverige' },
        { name: 'Stockholm', value: 'Stockholm' },
      ],

      experience: 0,
      experienceOptions,

      expertise: '50' as '10' | '25' | '50' | '75' | '90',
      expertiseOptions: [
        { name: '10%', value: '10', },
        { name: '25%', value: '25', },
        { name: '50%', value: '50', },
        { name: '75%', value: '75', },
        { name: '90%', value: '90', },
      ]
    }
  },
  computed: {
    salaryData(): SalaryData {
      return salaryData[this.education]
    },
    regionSalaryData(): RegionSalaryData {
      return this.salaryData[this.region]
    },
    expertiseData(): number[] {
      return this.regionSalaryData.data[this.expertise]
    },
    dataPoints(): DataPoint[] {
      const dataPoints = this.expertiseData.slice(1).map((salary: number, experience: number) => ({
        salary,
        experience: experience + 1,
      }))
      return dataPoints
    },
    mySalary(): number {
      const entrySalary: number = this.regionSalaryData.firstJob[this.expertise]

      const yearlyIncreases = this.regionSalaryData.yearlyIncrease[this.expertise]
      const yearlyIncreaseIndex = Math.floor(this.experience / 5)
      const yearlyIncrease: number = yearlyIncreases[yearlyIncreaseIndex]

      //console.log(yearlyIncrease, this.experience)
      const endingSalary = entrySalary + yearlyIncrease * this.experience
      return endingSalary
    }
  },
  watch: {
    dataPoints: {
      immediate: true,
      async handler(vals) {
        const model = await newModel(vals)
        console.log('done')
      }
    }
  },
  async mounted() {
    //const model = loadModel('model')
    //const dataPoints = this.allData()
    //const model = await newModel(dataPoints)
  },
  methods: {
    allData() {
      const flat = (arr: any[]) => arr.reduce((acc, v) => acc.concat(v), [])
      const dataSets = flat(Object.values(salaryData).map(dataByEducation => 
        Object.values(dataByEducation).map(dataByRegion => dataByRegion.data)
      ))
      return flat(dataSets.map((d: any) => flat(
        Object.values(d).map((dataPoints: any) =>
          dataPoints.map((salary: number, experience: number) => ({ salary, experience }))
        )
      )))
    },
  }
});
</script>

<style lang="scss">
.form-container {
  max-width: 30rem;
}

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text;
  margin-top: 60px;
}
</style>
