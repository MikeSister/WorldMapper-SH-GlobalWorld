export interface PortInfo {
  lat: number;
  lng: number;
}

export interface EmployeeType {
  city: string;
  lat: number;
  lng: number;
  employeeCount: number;
}

export interface OutsourceEmployeeType {
  year: string;
  data: EmployeeType[];
}

export interface StatisticItem {
  description: string;
  value: number;
  unit: string;
}

export interface StatisticsType {
  globalEmployees: StatisticItem;
  activeCities: StatisticItem;
  avgEmployeesPerCity: StatisticItem;
  topCityEmployees: StatisticItem;
  totalOperatingCost: StatisticItem;
  avgCostPerEmployee: StatisticItem;
  growthRate: StatisticItem;
};
