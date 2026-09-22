"use client";

import { useMemo, useState } from "react";
import type { Band, Faculty } from "@/lib/types";
import { calculateFees, findBandByIncome, formatKsh, HOUSEHOLD_PORTION_DUE_NOW } from "@/lib/calculate";

type Props = {
  bands: Band[];
  faculties: Faculty[];
};

type ProgrammeOption = {
  programme: string;
  facultySlug: string;
};

export default function FeeCalculator({ bands, faculties }: Props) {
  const programmeOptions: ProgrammeOption[] = useMemo(
    () =>
      faculties.flatMap((faculty) =>
        faculty.programmes.map((programme) => ({ programme, facultySlug: faculty.slug }))
      ),
    [faculties]
  );

  const [programmeIndex, setProgrammeIndex] = useState(0);
  const selectedFaculty = faculties.find(
    (f) => f.slug === programmeOptions[programmeIndex]?.facultySlug
  );
  const availableYears = selectedFaculty ? Object.keys(selectedFaculty.years) : [];
  const [year, setYear] = useState(availableYears[0] ?? "1");

  const [mode, setMode] = useState<"income" | "band">("income");
  const [income, setIncome] = useState<string>("");
  const [manualBandId, setManualBandId] = useState<number>(bands[0]?.id ?? 1);

  const incomeValue = Number(income.replace(/,/g, ""));
  const detectedBand =
    mode === "income" && income !== "" && !Number.isNaN(incomeValue)
      ? findBandByIncome(bands, incomeValue)
      : undefined;
  const activeBand =
    mode === "income" ? detectedBand : bands.find((b) => b.id === manualBandId);

  const yearFee = selectedFaculty?.years[year];
  const result = activeBand && yearFee ? calculateFees(activeBand, yearFee.totalPerYear) : undefined;

  return (
    <div className="space-y-8">
      {/* Programme + year */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Programme">
          <select
            className="ledger-input"
            value={programmeIndex}
            onChange={(e) => setProgrammeIndex(Number(e.target.value))}
          >
            {programmeOptions.map((opt, i) => (
              <option key={opt.programme} value={i}>
                {opt.programme}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Year of study">
          <select className="ledger-input" value={year} onChange={(e) => setYear(e.target.value)}>
            {availableYears.map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {selectedFaculty?.note && (
        <p className="-mt-4 text-sm text-ledger-inkmuted">{selectedFaculty.note}</p>
      )}

      {/* Band selection */}
      <div>
        <div className="mb-3 flex gap-1 font-mono text-xs">
          <ModeButton active={mode === "income"} onClick={() => setMode("income")}>
            By household income
          </ModeButton>
          <ModeButton active={mode === "band"} onClick={() => setMode("band")}>
            By known band
          </ModeButton>
        </div>

        {mode === "income" ? (
          <Field label="Monthly household income (KSh)">
            <input
              className="ledger-input"
              inputMode="numeric"
              placeholder="e.g. 18,000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            {income !== "" && !detectedBand && (
              <p className="mt-2 text-sm text-ledger-due">Enter a valid income to detect your band.</p>
            )}
            {detectedBand && (
              <p className="mt-2 text-sm text-ledger-inkmuted">
                Falls under <span className="text-ledger-ink">{detectedBand.label}</span>
              </p>
            )}
          </Field>
        ) : (
          <Field label="Band">
            <select
              className="ledger-input"
              value={manualBandId}
              onChange={(e) => setManualBandId(Number(e.target.value))}
            >
              {bands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </Field>
        )}
      </div>

      {/* Result */}
      {result ? <Ledger result={result} /> : (
        <p className="rounded border border-dashed border-ledger-line px-4 py-6 text-center text-sm text-ledger-inkmuted">
          Enter your household income, or pick a band, to see your breakdown.
        </p>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ledger-inkmuted">{label}</span>
      {children}
    </label>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-sm px-3 py-1.5 transition-colors ${
        active
          ? "bg-ledger-ink text-ledger-paper"
          : "bg-transparent text-ledger-inkmuted hover:text-ledger-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Ledger({ result }: { result: ReturnType<typeof calculateFees> }) {
  const { band, totalAnnualFee, govScholarship, helbLoan, householdTuitionShare, dueNow, dueLater, annualUpkeep } =
    result;

  return (
    <div className="border border-ledger-line bg-white/40">
      <div className="border-b border-ledger-line px-5 py-3">
        <p className="font-mono text-xs uppercase tracking-wide text-ledger-inkmuted">
          {band.label}
        </p>
      </div>

      <dl className="divide-y divide-ledger-line">
        <Row label="Total annual tuition fee" value={totalAnnualFee} />
        <Row label={`Government scholarship (${band.govPercent}%)`} value={govScholarship} tone="ok" />
        <Row label={`HELB tuition loan (${band.helbPercent}%)`} value={helbLoan} tone="ok" />
        <Row label={`Household tuition share (${band.householdPercent}%)`} value={householdTuitionShare} />
      </dl>

      <div className="border-t border-ledger-line bg-ledger-duesoft px-5 py-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-ledger-ink">
            Due now ({Math.round(HOUSEHOLD_PORTION_DUE_NOW * 100)}% of household share)
          </span>
          <span className="tabular font-mono text-xl font-semibold text-ledger-due">
            {formatKsh(dueNow)}
          </span>
        </div>
        <div className="mt-1 flex items-baseline justify-between text-sm text-ledger-inkmuted">
          <span>Remaining household balance</span>
          <span className="tabular font-mono">{formatKsh(dueLater)}</span>
        </div>
      </div>

      <div className="border-t border-ledger-line px-5 py-3">
        <div className="flex items-baseline justify-between text-sm text-ledger-inkmuted">
          <span>Annual upkeep (paid separately, in full)</span>
          <span className="tabular font-mono">{formatKsh(annualUpkeep)}</span>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "ok";
}) {
  return (
    <div className="flex items-baseline justify-between px-5 py-3">
      <span className="text-sm text-ledger-inkmuted">{label}</span>
      <span
        className={`tabular font-mono text-sm ${tone === "ok" ? "text-ledger-ok" : "text-ledger-ink"}`}
      >
        {formatKsh(value)}
      </span>
    </div>
  );
}
