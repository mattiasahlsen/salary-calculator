
interface RegionSalaryData {
  firstJob: {
      surveyd: number;
      mean: number;
      10: number;
      25: number;
      50: number;
      75: number;
      90: number;
  };
  yearlyIncrease: {
      mean: number[];
      10: number[];
      25: number[];
      50: number[];
      75: number[];
      90: number[];
  };
}

export default interface SalaryData {
  Stockholm: RegionSalaryData;
  'Hela Sverige': RegionSalaryData;
}
