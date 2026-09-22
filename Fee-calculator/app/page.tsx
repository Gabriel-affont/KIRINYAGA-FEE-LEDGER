import fs from "node:fs";
import path from "node:path";
import type { Band, Faculty } from "@/lib/types";
import FeeCalculator from "@/components/FeeCalculator";

function loadBands(): Band[] {
  const file = path.join(process.cwd(), "data", "bands.json");
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function loadFaculties(): Faculty[] {
  const dir = path.join(process.cwd(), "data", "faculties");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")));
}

export default function Home() {
  const bands = loadBands();
  const faculties = loadFaculties();

  return (
    <main className="min-h-screen px-5 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 border-b border-ledger-line pb-6">
          <p className="font-mono text-xs uppercase tracking-wide text-ledger-inkmuted">
            Kirinyaga University · Student-built, unofficial
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            Fee Ledger
          </h1>
          <p className="mt-3 max-w-md text-ledger-inkmuted">
            The bursar asks for 60% of your household fee while government
            disbursement is delayed. Pick your programme and band to see
            exactly what that comes to.
          </p>
        </header>

        <FeeCalculator bands={bands} faculties={faculties} />

        <footer className="mt-14 border-t border-ledger-line pt-6 text-sm text-ledger-inkmuted">
          <p>
            Numbers come from the official fee structure and HEF band
            circular. This tool is not run by the university — verify any
            figure that determines what you actually pay against your own
            fee statement.
          </p>
          <p className="mt-2">
            Don&apos;t see your programme?{" "}
            <a
              href="https://github.com/"
              className="underline decoration-ledger-gold decoration-2 underline-offset-2 hover:text-ledger-ink"
            >
              Add it on GitHub
            </a>{" "}
            — see CONTRIBUTING.md for the two-minute version.
          </p>
        </footer>
      </div>
    </main>
  );
}
