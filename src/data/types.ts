export interface RegionSalaryData {
  mean: number[];
  10: number[];
  25: number[];
  50: number[];
  75: number[];
  90: number[];
}

export interface SalaryData {
  Stockholm: RegionSalaryData;
  'Hela Sverige': RegionSalaryData;
}

export interface DataPoint {
  salary: number;
  experience: number;
}
