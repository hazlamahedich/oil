# Deferred Work

## Deferred from: code review of 1a-1-project-scaffold-dependencies-design-tokens (2026-04-13)

- **No test script despite vitest installed** [package.json] — Test infrastructure setup belongs to Story 1B.7. Not this story's scope.
- **Missing typecheck script** [package.json] — Nice-to-have for DX, not required by any AC. Can be added in a later story.
- **ignoreDeprecations/erasableSyntaxOnly suppress TS 6.0 diagnostics** [tsconfig.app.json] — Required for TypeScript 6.0 compatibility. Intentional and correct.
