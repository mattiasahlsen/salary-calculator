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
    },
    data: {
      mean: [34379,36496,38359,41491,44401,46035,48214,47592,50687,51861,53431,56341,55261,57548,59776,61260,61317,62730,64682,64463,67968,66336,66526,69963,72818,70814],
      10: [31000,31862,33300,34800,35900,36990,37700,39000,39030,40200,40000,43000,41862,43785,44000,44800,44100,46700,47000,45700,48151,48630,50000,50300,49000,50200],
      25: [32000,33248,35000,36600,38010,39775,41000,42000,43000,43500,44500,46400,46000,47700,48650,49673,49500,51000,51850,52000,53975,53458,54750,55000,55512,56850],
      50: [33850,35032,37431,39500,41800,43600,45400,45500,47275,48516,49000,51350,52000,54000,55000,56000,56282,57250,59150,58500,60931,60125,60566,62200,64677,65500],
      75: [35400,38123,40900,44000,48000,49342,53000,51500,54800,56400,57000,59500,60000,63000,65000,65900,67000,67000,70340,70000,71000,71000,71163,75000,77436,75862],
      90: [38000,42200,45000,51000,56500,59000,62690,58500,64500,66033,70000,72744,72721,77830,81500,83000,83000,82861,90750,88388,90050,90566,88862,93500,105122,101807],
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
    },
    data: {
      mean: [33550,35279,37251,39470,41822,43290,45041,45066,47584,49078,49747,51976,52046,54032,55201,56510,58381,58676,60061,60723,62091,63047,63691,65996,66710,68398],
      10: [30417,31461,32800,33800,34800,35800,36480,37500,37800,39000,39000,40300,40380,41915,41610,42500,43000,43750,44739,44600,45872,45531,46200,47055,47350,47175],
      25: [31650,32900,34500,35600,36862,38100,39200,40400,41000,42062,42100,44100,44390,45600,45900,46850,47630,48010,49519,49400,50800,51295,51400,52317,52500,52726],
      50: [33000,34400,36387,38000,39900,41273,42800,43500,45000,46400,46817,48920,49397,50500,51450,52500,53719,54084,55000,56000,57156,57700,58200,59525,60000,61135],
      75: [34862,36500,39000,41800,44000,46000,47825,48100,50417,53000,53000,55000,56000,57900,60000,61000,62000,62862,65000,64800,67000,67377,68862,70900,71135,72800],
      90: [36500,40100,43000,46300,51990,52959,56000,54600,59500,61000,62000,66000,66353,68900,71500,74000,78500,77000,78312,80000,80417,83612,85000,91500,87600,89807],
    }
  }
} as SalaryData