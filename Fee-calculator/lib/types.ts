export type Band = {
  id: number;
  label: string;
  incomeMin: number;
  incomeMax: number | null;
  govPercent: number;
  helbPercent: number;
  householdPercent: number;
  annualUpkeep: number;
};

export type YearFee = {
  firstSemester: number;
  secondSemester: number;
  totalPerYear: number;
};

export type Faculty = {
  slug: string;
  programmes: string[];
  note?: string;
  years: Record<string, YearFee>;
};

export type CalculationResult = {
  band: Band;
  totalAnnualFee: number;
  govScholarship: number;
  helbLoan: number;
  householdTuitionShare: number;
  dueNow: number;
  dueLater: number;
  annualUpkeep: number;
};
