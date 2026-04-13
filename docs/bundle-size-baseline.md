# Bundle Size Baseline

Tracking production build sizes for the Energy Crisis Command Center.

## Measurement History

| Date | Story | Uncompressed | Gzipped | Threshold | Status |
|------|-------|-------------|---------|-----------|--------|
| 2026-04-13 | 1A.2a (pre-Recharts) | 191.72 KB | 60.04 KB | 1,500 KB | PASS |
| 2026-04-13 | 1A.2a (with Recharts spike) | 527.67 KB | 157.07 KB | 1,500 KB | PASS |

## Method

- Build: `npm run build`
- Artifact: `dist/index.html` (single file via vite-plugin-singlefile)
- Gate: `npm run check-bundle` (runs automatically via postbuild)
- Hard fail: 1.5 MB uncompressed
- Gzipped: logged only (not gated until Epic 2 baseline)

## Notes

- React + minimal app: ~192 KB
- Recharts adds ~336 KB uncompressed (~97 KB gzipped)
- Well under 1.5 MB threshold — plenty of room for 14 panels
- Gzipped threshold will be established in Epic 2
