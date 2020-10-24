const lines = `
68398
66710
65996
63691
63047
62091
60723
60061
58676
58381
56510
55201
54032
52046
51976
49747
49078
47584
45066
45041
43290
41822
39470
37251
35279
33550
`
const salaries = lines.split('\n').filter(s => !!s).reverse()
const increases = []
for (let i = 1; i < salaries.length; i++) {
  const s1 = parseInt(salaries[i])
  const s2 = parseInt(salaries[i - 1])
  increases.push(s1 - s2)
}
const totals = []
while (increases.length > 0) {
  const span = increases.splice(0, 5)
  console.log(span.length)
  totals.push(span.reduce((prev, curr) => prev + curr, 0))
}
const means = totals.map(t => t / 5)
console.log('means:', means)
