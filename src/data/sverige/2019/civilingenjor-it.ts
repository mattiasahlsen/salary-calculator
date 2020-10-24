// data for engineers with IT-major working in IT

import SalaryData from '../../types'

export default {
  'Stockholm': {
    // data from 2018 and 2019
    firstJob: {
      surveyd: 30,
      mean: 36977,
      
      10: 32500,
      25: 34000,
      50: 35400,
      75: 38600,
      90: 42800
    },
    yearlyIncrease: {
      mean: [ 2790,2200,1711,1481,1235],
      10: [ 1437,1134,1048,811,732],
      25: [ 2080,1572,1232,1057,875],
      50: [ 2756,2142,1573,1306,1104],
      75: [ 3593,2487,1960,1722,1250],
      90: [ 3818,3321,2650,2328,1657],
    }
  },
  'Hela Sverige': {
    firstJob: {
      surveyd: 100,
      mean: 34914,
      
      10: 31450,
      25: 32500,
      50: 34000,
      75: 35850,
      90: 40000,
    },
    yearlyIncrease: {
      // average increase per yer in 5-year spans
      // 0-5 years, 5-10 years, 10-15 years, 15-20 years, 20-25 years
      mean: [ 2245,1865,1490,1272,1142],
      10: [ 1083,1020,891,733,668],
      25: [ 1570,1298,1097,904,785],
      50: [ 1925,1683,1326,1142,1009],
      75: [ 2968,2349,1719,1447,1284],
      90: [ 3510,2782,2200,1888,1559],
    }
  }
} as SalaryData
