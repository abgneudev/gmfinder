<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Testing is required for new features

This repo uses Playwright E2E tests (`e2e/*.spec.ts`). When you add or change a
feature, add/extend a spec **in the same change** and run `npm test` before
considering it done. See `TESTING.md` for the convention, selector rules, and a
template. Cover the happy path, an observable state change, and the edge/empty
case.
