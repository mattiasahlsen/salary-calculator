// based on data from 2019

import SalaryData from '../../types'

export default {
  'Stockholm': {
    // data from 2018 and 2019
    firstJob: {
      surveyd: 900,
      mean: 35658,
      
      // percentiles
      10: 31400,
      25: 33000,
      50: 34500,
      75: 37000,
      90: 41000,
    },
    yearlyIncrease: {
      // average increase per yer in 5-year spans
      // 0-5 years, 5-10 years, 10-15 years, 15-20 years, 20-25 years

      mean: [ 2262,2015,1824,1659,1517],
      10: [ 1140,1036,965,851,811],
      25: [ 1467,1366,1209,1092,1005],
      50: [ 1758,1682,1527,1366,1249],
      75: [ 2855,2430,2102,1875,1682],
      90: [ 4171,3333,3044,2726,2515],
    }
  },
  'Hela Sverige': {
    firstJob: {
      surveyd: 2200,
      mean: 34579,
      10: 31000,
      25: 32200,
      50: 34000,
      75: 35700,
      90: 39000,
    },
    yearlyIncrease: {
      mean: [ 1913,1731,1573,1471,1391],
      10: [ 1106,950,843,776,706],
      25: [ 1316,1175,1059,968,888],
      50: [ 1627,1500,1355,1234,1144],
      75: [ 2106,1964,1780,1639,1537],
      90: [ 3455,2796,2532,2362,2219],
    }
  }
} as SalaryData
