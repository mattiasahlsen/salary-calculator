const horizontalLines = `
68398	47175	52726	61135	72800	89807
66710	47350	52500	60000	71135	87600
65996	47055	52317	59525	70900	91500
63691	46200	51400	58200	68862	85000
63047	45531	51295	57700	67377	83612
62091	45872	50800	57156	67000	80417
60723	44600	49400	56000	64800	80000
60061	44739	49519	55000	65000	78312
58676	43750	48010	54084	62862	77000
58381	43000	47630	53719	62000	78500
56510	42500	46850	52500	61000	74000
55201	41610	45900	51450	60000	71500
54032	41915	45600	50500	57900	68900
52046	40380	44390	49397	56000	66353
51976	40300	44100	48920	55000	66000
49747	39000	42100	46817	53000	62000
49078	39000	42062	46400	53000	61000
47584	37800	41000	45000	50417	59500
45066	37500	40400	43500	48100	54600
45041	36480	39200	42800	47825	56000
43290	35800	38100	41273	46000	52959
41822	34800	36862	39900	44000	51990
39470	33800	35600	38000	41800	46300
37251	32800	34500	36387	39000	43000
35279	31461	32900	34400	36500	40100
33550	30417	31650	33000	34862	36500
`.split('\n').filter(l => !!l)
const verticalLines = [[], [], [], [], [], []]
horizontalLines.map(line => {
  line.split(/\s/).filter(n => !!n).forEach((n, i) => {
    verticalLines[i].push(n)
  })
})
const salaryGroups = verticalLines.map(l => l
  .reverse()
  .map((value, i, allValues) => parseInt(value) || parseInt(allValues[i - 1]))
)
// console.log(salaryGroups)
console.log('mean:', '[' + salaryGroups[0] + '],')
console.log('10:', '[' + salaryGroups[1] + '],')
console.log('25:', '[' + salaryGroups[2] + '],')
console.log('50:', '[' + salaryGroups[3] + '],')
console.log('75:', '[' + salaryGroups[4] + '],')
console.log('90:', '[' + salaryGroups[5] + '],')

/*const getIncreases = (groupName, salaries) => {
  const minSalary = salaries.reduce((minSalary, s) => minSalary < s ? minSalary : s)

  salaries.splice(0, 1) // remove first year's salary

  const increasePerYear = salaries.map((salary, index) => Math.floor((salary - minSalary) / (index + 1)))

  const spans = []
  while (increasePerYear.length > 0) {
    spans.push(increasePerYear.splice(0, 5))
  }

  spans.forEach(s => {
    if (s.length !== 5) throw new Error('invalid span length')
  })

  const averageIncreasesPerYear = spans.map(span => {
    return Math.floor(span.reduce((sum, increasePerYear) => sum + increasePerYear) / span.length)
  })
  console.log(groupName + ': [', averageIncreasesPerYear + '],')
}

getIncreases('mean', salaryGroups[0])
getIncreases('10', salaryGroups[1])
getIncreases('25', salaryGroups[2])
getIncreases('50', salaryGroups[3])
getIncreases('75', salaryGroups[4])
getIncreases('90', salaryGroups[5])*/
