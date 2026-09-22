# Adding your faculty's fee structure

You don't need to touch any React code. Just add a JSON file.

1. Get your faculty's official fee structure (the same kind of document
   Kirinyaga's registrar publishes — total fee per semester/year).
2. Copy `data/faculties/bachelor-of-technology.json` to a new file named
   after your faculty, e.g. `data/faculties/business-and-economics.json`.
3. Fill in the fields:

```json
{
  "slug": "business-and-economics",
  "programmes": ["Bachelor of Commerce", "Bachelor of Economics"],
  "note": "Optional — mention any discount or special condition here.",
  "years": {
    "1": {
      "firstSemester": 0,
      "secondSemester": 0,
      "totalPerYear": 0
    }
  }
}
```

- `programmes` — every degree that shares this exact fee structure.
- `years` — add a key for each year of study you have figures for (`"1"`,
  `"2"`, ...). It's fine to only have Year 1 to start.
- `slug` — unique, lowercase, hyphenated. Must match the filename.

4. Open a pull request. That's it — the calculator picks it up
   automatically, no other file needs to change.

## If your band percentages differ

Everything in `data/bands.json` currently reflects the HEF band circular
Kirinyaga students were given (income thresholds, government/HELB/household
split, and annual upkeep per band). If your campus uses different figures,
edit that file the same way — it isn't tied to one faculty.
