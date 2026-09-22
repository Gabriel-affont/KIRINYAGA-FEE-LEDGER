import type { Band, CalculationResult } from "./types";

/**
 * The university currently asks students to pay a portion of their
 * household tuition share upfront while government disbursement (HEF
 * scholarship + HELB loan) is delayed. This is that portion, as a
 * fraction of the household's tuition share — not of the whole fee,
 * and not including annual upkeep, which is paid separately by the
 * household regardless of disbursement timing.
 *
 * If your university changes this percentage, this is the only line
 * that needs to change.
 */
export const HOUSEHOLD_PORTION_DUE_NOW = 0.6;

/** Finds the band whose income range contains the given monthly household income. */
export function findBandByIncome(bands: Band[], monthlyIncome: number): Band | undefined {
  return bands.find(
    (band) =>
      monthlyIncome >= band.incomeMin &&
      (band.incomeMax === null || monthlyIncome <= band.incomeMax)
  );
}

/** Computes the fee breakdown for a given band and total annual tuition fee. */
export function calculateFees(band: Band, totalAnnualFee: number): CalculationResult {
  const govScholarship = round(totalAnnualFee * (band.govPercent / 100));
  const helbLoan = round(totalAnnualFee * (band.helbPercent / 100));
  const householdTuitionShare = round(totalAnnualFee * (band.householdPercent / 100));
  const dueNow = round(householdTuitionShare * HOUSEHOLD_PORTION_DUE_NOW);
  const dueLater = householdTuitionShare - dueNow;

  return {
    band,
    totalAnnualFee,
    govScholarship,
    helbLoan,
    householdTuitionShare,
    dueNow,
    dueLater,
    annualUpkeep: band.annualUpkeep,
  };
}

function round(value: number): number {
  return Math.round(value);
}

export function formatKsh(value: number): string {
  return `KSh ${value.toLocaleString("en-KE")}`;
}
