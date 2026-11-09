# Agent Guidelines

## Development

These principles come from nanocodexyz/nanocode's `AGENTS.md` and apply to every change here.

- Keep code simple and changes small. Match the surrounding code and preserve unrelated work.
- No code comments, doc comments (TSDoc, `@module` blocks) or section dividers, tests or test-only dependencies. Only comments that a tool reads stay, such as `@ts-expect-error`.
- `README.md` is the repository's homepage: the overview, the getting started steps and the entrypoints. Keep its examples compiling against the sources.
- No magic constants or arbitrary caps: a limit comes from a protocol, a measurement or host policy. Surface invalid states; never hide them with silent truncation, clamping or fallbacks.
- Make invalid states unrepresentable: model a lifecycle as one discriminated union whose variants carry only what that phase has.
- Preserve public APIs.
- Validate with `npm run check:types`, `npm run build`, the page in `npm run dev`, and a build of a host that consumes the packed release.
- Check behavior with harnesses in ignored `output/`. Keep every artifact there; never commit them, credentials or personal data.
- Work on master in the main checkout, commit only your own changes and push each one; no pull requests. There is no CI: build, release and deploy by hand. Use subagents only when asked.
- This file holds principles only and rarely changes. DECISIONS.md is the growing log: add what each change establishes and why, with the commands, dates and measurements behind it.

## Project Principles

- nds is the nanocode design system (nanocodexyz/nds): the tokens, page chrome, document components and chat skins of nanocode.xyz and its demos. It follows tempoxyz/ds: one package of Zyzz styles behind constrained components.
- nanocode-ts owns behavior and nds owns the look. Headless components, hooks, transports and the `Skin` contract belong in nanocodexyz/nanocode-ts. Every Zyzz definition, token, theme and styled component belongs here. An application's own pages, copy, routes and transports belong in the application.
- Author every style with Zyzz against the tokens in `src/vars.ts`. Do not add Tailwind, CSS modules or handwritten stylesheets. The clones' stylesheets in `src/clones/*.css.ts` are the one exception, kept as their sources wrote them.
- Keep every color, size and opacity in `src/vars.ts`, so the site and the demos share one palette. Define colors with `{ light, dark }` values, and derive translucent colors with `Vars.compose`.
- The root entrypoint and `nds/site` import no nanocode-ts module, so a page of documents bundles no chat code. Only `nds/skin`, `nds/themes`, `nds/clones` and `nds/agent` take nanocode-ts, an optional peer dependency.
- Components take the host's router and data as props, such as `Card`'s `link`. nds imports no router, no bundler API and no host module.
- Ship the fonts the tokens name. Verify redistribution rights before adding a font, icon or logo.
- Emit CSS ahead of time. Runtime rendering must not insert stylesheet rules.

## TypeScript Conventions

- Treat `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` as design constraints. Include `| undefined` when an optional property can explicitly receive `undefined`, and narrow indexed reads before use.
- Use `readonly T[]` for array types. Preserve mutable arrays only when mutation is part of the contract.
- Use `type` for project-owned shapes. Use `interface` only when declaration merging or an external ambient contract requires it.
- Include `.ts` and `.tsx` extensions on relative imports and exports. `rewriteRelativeImportExtensions` rewrites them to `.js` in `dist/`.
- Author every source file and script in TypeScript. Node runs TypeScript natively (`node scripts/build.ts`), so scripts need no build step.
- Use static imports. Reserve dynamic imports for a real bundle boundary, such as the code highlighter.
- Use `import type` and `export type` where an import or export is type-only.
- Use functions and plain data. Use unions or `as const` objects instead of enums. Prefer `camelCase` constants.
- Never destructure function parameters. React components accept `props`, then destructure inside the body.
- Put a component's prop types in a matching `declare namespace` (`Card.Props`).
- Start a module that uses hooks or event handlers with `'use client'`, so React Server Components can render it.
- Avoid new `any`. Use a precise boundary type, validation, narrowing, or the smallest justified assertion.
- Separate distinct logical steps with one blank line.

## Style Conventions

- Group a component's styles in a `namespace styles {}` at the bottom of its module and apply them as `{...styles.name()}`. A skin, whose definitions are its exports, lives in a `*.styles.ts` module instead.
- Reference tokens by name through the property mappings, such as `borderColor: 'rule'`, `padding: 'indent'` and `width: 'sidebar'`. Inside `calc()` and other composite values, interpolate `vars.*` references with a `' !custom'` suffix. Reserve plain `' !custom'` values for CSS keywords and viewport units.
- Do not write hex colors in components. A theme's token values in `src/Themes.ts` are the exception, since a theme is its colors.
- Page chrome sets base element styles under `:where()`, so a component's classes always win.
- Follow commitmono.com: Commit Mono with `ss01`, `ss03`, `ss04` and `ss05` at 13px on a 17px line, warm paper or near black, hairline rules, an orange accent for the visitor and state, and cyan for the agent and code. Current, selected and pressed items invert in the text color. Hover shows white text on the accent.
- Use accessible native controls with visible focus and accessible names. Respect reduced-motion preferences.

## Alphabetical Ordering

- Alphabetize imports, named specifiers, object properties, type properties, union members, unordered lists, configuration maps, scripts and dependencies. Use case-insensitive lexical order.
- Preserve order with observable semantics: CSS declarations and cascade, navigation and reading order, tuples and workflow steps.

## Prose Conventions

Applies to the README, this file, interface copy and commit messages.

- Write about the code, not about the person using it. Avoid second person outside instructions and interface copy.
- Use precise verbs such as "returns", "renders", "applies", "emits" and "throws".
- Use the short, common word, and one word for one thing.
- Keep an instruction to 20 words or fewer and a descriptive sentence to 25 words or fewer.
- Do not use semicolons or em dashes in prose. Split the sentence, or use a comma, colon or parenthesis.

## Repository Layout

- `src/vars.ts`: the tokens. `src/zyzz.config.ts`: `style`, `variants` and `vars` bound to them, and the keyframes.
- `src/components/`: the document components of the root entrypoint. `src/Site.tsx`: the page chrome.
- `src/Skin.ts`, `src/Themes.ts` and `src/*.styles.ts`: the skins of nanocode-ts's headless chat. `src/clones/` and `src/Agent.tsx`: whole chats built on it.
- `src/fonts/`: Commit Mono and its license. `playground/`: a Vite page of every part. `scripts/`: the build and the release.

## Commands

- `npm install` installs dependencies. `npm run dev` starts the playground.
- `npm run check:types` checks the library and the playground. `npm run build` compiles `dist/` with `tsc` and `zyzz build`.
- `npm run release` builds a clean checkout, packs it and publishes the GitHub release `build-<commit>` with the tarball `nds-<commit>.tgz`. Hosts pin that URL.
