---
title: On-Demand 3D Printer Platform
slug: on-demand-3d-printer-platform
description: API and web application for intake, quoting, queue management, and fulfillment across custom print requests.
status: active
startedAt: 2026-01-12
updatedAt: 2026-06-12
tags:
  - TypeScript
  - API
  - Angular
  - 3D Printing
draft: false
featured: true
repoUrl: https://github.com/benhalverson/3dprinter-farm
---

## Overview

This project is meant to turn a pile of manual print-request coordination into a usable system. The API handles request intake and print-job state. The web app handles quoting, operations visibility, and customer communication.

## Current milestone

Build a dependable order-to-queue path that keeps pricing, material selection, and production status aligned.

## Roadmap

- [x] Define the request and quote lifecycle clearly
- [x] Add authenticated operator workflows for reviewing jobs
- [ ] Track printer capacity and queue contention
- [ ] Generate customer-visible status updates
- [ ] Add webhook-driven notifications for state changes

## Recent progress

### 2026-06-12 · [Use Slant3D V2 draft orders for cart shipping estimates (#154)](https://github.com/benhalverson/3dprinter-farm/pull/154)

`/cart/shipping` now estimates shipping via Slant3D V2 draft orders instead of the V1 `order/estimate` flow. The route builds a V2 order payload from cart items plus the authenticated user’s shipping profile, while keeping the existing caller-facing response shape.

- **Integration change**
  - Replace V1 `order/estimate` with V2 `POST /orders`
  - Stop short of any follow-up `POST /orders/{publicOrderId}` call
  - Normalize V2 estimate responses back to `{ shippingCost }`

- **Order payload construction**
  - Source print items from cart rows joined to product metadata
  - Require `products.publicFileServiceId` per item
  - Use cart `filamentId` when present; otherwise fall back to PLA Black
  - Carry shipping/billing address data from the authenticated user profile

```ts
{
  shippingAddress: { ...profileAddress },
  billingAddress: { ...profileAddress },
  orderItems: [
    {
      publicFileServiceId,
      filamentId,
      quantity,
    },
  ],
}
```

Impact: - **API behavior**
  - Existing `/cart/shipping` callers still receive `{ shippingCost }`
  - Missing `publicFileServiceId` now returns a clear 400-style response
  - Slant3D draft-order failures now return a clear upstream failure response with status/details

- **Operationally**
  - Shipping estimation now depends on V2 draft-order semantics and `publicFileServiceId` being populated on products

Context: paths `src`, `test`

### 2026-06-12 · [Add cart filamentId support for Slant3D V2 fulfillment (#153)](https://github.com/benhalverson/3dprinter-farm/pull/153)

Cart items now carry an optional Slant3D V2 `filamentId` while preserving existing `color` and `filamentType` behavior. The cart API also normalizes missing filament IDs to the default PLA Black filament so legacy and new callers behave consistently.

- **Schema + persistence**
  - Added cart-level `filamentId` storage.
  - Added a D1 migration for the new `filament_id` column.
  - Reused a shared PLA Black default filament ID constant.

- **API behavior**
  - `POST /cart/add` accepts optional `filamentId` and validates it as a UUID.
  - Missing `filamentId` is defaulted to PLA Black.
  - Cart item reads include `filamentId`.
  - Existing cart matching/backcompat still respects `color` and `filamentType`; legacy rows without `filamentId` are treated as default PLA Black.

- **Coverage**
  - Added focused cart tests for explicit filament preservation, UUID validation, and default filament behavior.

```ts
{
  cartId,
  skuNumber,
  quantity,
  color,
  filamentType,
  filamentId: '76fe1f79-3f1e-43e4-b8f4-61159de5b93c' // defaulted when omitted
}
```

Impact: Cart callers can now send and retrieve Slant3D filament public IDs for V2 fulfillment. Callers that only use `color` and `filamentType` continue to work unchanged, and carts without a supplied filament ID resolve to PLA Black.

Context: paths `drizzle`, `src`, `test`

### 2026-06-12 · [Stop /v2/upload from self-fetching protected V2 routes (#152)](https://github.com/benhalverson/3dprinter-farm/pull/152)

`/v2/upload` was routing through protected local Worker endpoints for presign, confirm, and estimate, which broke the authenticated upload flow unless those internal self-fetches succeeded. This change moves the Slant3D V2 file operations into shared helpers so `/v2/upload` calls Slant directly while the public helper endpoints keep their existing response contracts.

- **Shared Slant3D V2 file helpers**
  - Extract direct-upload, confirm-upload, and estimate calls into `src/lib/slant3d-v2-files.ts`
  - Centralize request construction and error parsing for the V2 file workflow
  - `parseResponseDetails` tries `response.json()` first, then falls back to `text()` + `JSON.parse` to handle varied Slant3D error response shapes

- **`/v2/upload` flow**
  - Replace internal fetches to `/v2/presigned-upload`, `/v2/confirm`, and `/v2/estimate`
  - Preserve current STL validation behavior and `/v2/upload` response shape
  - Keep the same default estimate behavior for PLA BLACK / quantity 1

- **Protected route compatibility**
  - Rewire `/v2/presigned-upload`, `/v2/confirm`, and `/v2/estimate` to use the same shared helpers
  - Add malformed-response validation in each route handler (missing `total`, `presignedUrl`/`key`, or `publicFileServiceId`/`name`/`fileURL`) to preserve 500 error contracts
  - Adopt estimate response normalization from main, filling in fallback values for `publicFileServiceId`, `quantity`, `filamentId`, and `estimatedCost`
  - Preserve their public JSON contracts instead of introducing a second code path

```ts
const presigned = await createSlant3DDirectUpload(c.env, {
  name: fileName.replace(/\.stl$/i, ''),
  ownerId: userId?.toString() || 'anonymous',
});

const confirmed = await confirmSlant3DUpload(c.env, presigned.filePlaceholder);

const estimate = await estimateSlant3DFile(c.env, confirmed.publicFileServiceId, {
  filamentId: defaultFilamentId,
  quantity: 1,
});
```

Impact: - `/v2/upload` no longer depends on unauthenticated self-fetches to protected local routes
- Authenticated uploads continue returning the same payload, but now complete through direct Slant3D helper calls
- `/v2/estimate` response now includes normalized fields (`estimatedCost`, fallback `quantity`, `filamentId`, `publicFileServiceId`) for more consistent downstream consumption
- Coverage now explicitly includes invalid type, empty file, oversized file, Slant failures, success, and the absence of local protected endpoint self-fetching

Context: paths `src`, `test`

### 2026-06-12 · [Align Slant3D V2 file routes with live file API contract (#151)](https://github.com/benhalverson/3dprinter-farm/pull/151)

Aligned the Slant3D V2 file flow with the live contract used by the printer routes. `/v2/presigned-upload`, `/v2/confirm`, and `/v2/estimate` now follow the live file endpoints and treat estimate totals as `data.total`.

- **Route contract alignment**
  - kept direct upload on `POST /files/direct-upload`
  - kept confirm on `POST /files/confirm-upload`
  - kept estimate on `POST /files/{publicFileId}/estimate`

- **Response shape normalization**
  - validated successful Slant responses before using them
  - normalized local estimate responses from Slant `data.total`
  - preserved local `estimatedCost` as a compatibility alias for existing callers

- **Failure handling**
  - return explicit errors when Slant returns malformed successful payloads
  - tightened add-product estimate parsing to require the live estimate shape instead of falling back across legacy fields

```ts
const total = estimateResponse.data.total;

return {
  success: true,
  data: {
    total,
    estimatedCost: total, // compatibility
  },
};
```

Impact: Users and operators get more predictable failures when Slant returns malformed payloads instead of partial/implicit parsing. Estimate-backed flows now consistently price from the live Slant V2 total field while keeping existing local response consumers compatible.

Context: paths `src`, `test`

### 2026-06-12 · [Remove duplicate mounted Stripe webhook route (#156)](https://github.com/benhalverson/3dprinter-farm/pull/156)

Removed the stale duplicate Stripe webhook route so the mounted app has a single authoritative `/webhook/stripe` implementation in `src/routes/payments.ts`. This cleanup also removes the obsolete TODO-only handler path and adds a regression check around the mounted webhook behavior.

- **Route ownership**
  - Removed the standalone `src/routes/webhooks.ts` implementation.
  - Stopped mounting the duplicate webhook router from `src/index.ts`.
  - Kept `src/routes/payments.ts` as the sole mounted owner of `/webhook/stripe`.

- **Behavior guardrail**
  - Added a focused payments-route test covering an unhandled Stripe event to assert the app resolves through the payments webhook handler, not the deleted stale route.

```ts
.route('/', paymentsRouter)
.route('/', shoppingCart);
```

Impact: - Stripe webhooks now resolve through one mounted handler only, eliminating ambiguity in request handling and OpenAPI ownership.
- Operators should configure Stripe against the existing `/webhook/stripe` endpoint owned by payments.

Context: paths `src`, `test`

### 2026-06-11 · [Remove legacy PayPal payment surface (#150)](https://github.com/benhalverson/3dprinter-farm/pull/150)

- **API surface**
  - Removed `POST /paypal` from payments routing.
  - Deleted the PayPal access helper and removed PayPal response types.

- **Dependencies / test scaffolding**
  - Removed `@paypal/checkout-server-sdk` from `package.json` and `pnpm-lock.yaml`.
  - Removed PayPal mocks and skipped PayPal route tests.
  - Added a focused assertion that the legacy route is no longer exposed.

```ts
const res = await app.fetch(new Request('http://localhost/paypal', {
  method: 'POST',
}), env);

expect(res.status).toBe(404);
```

- **Package management cleanup**
  - Removed the tracked `package-lock.json` file so the repo only keeps pnpm lock metadata.

Impact: - Stripe remains unchanged.
- `POST /paypal` is no longer available; callers now receive `404`.
- PayPal env/config is no longer required by app code.
- Maintainers should use pnpm lockfiles only; `package-lock.json` is no longer tracked.

Context: paths `package-lock.json`, `package.json`, `pnpm-lock.yaml`, `src`, `test`

### 2026-06-11 · [Bump vite from 6.3.4 to 6.4.2 (#141)](https://github.com/benhalverson/3dprinter-farm/pull/141)

Bumps [vite](https://github.com/vitejs/vite/tree/HEAD/packages/vite) from 6.3.4 to 6.4.2.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/vitejs/vite/releases">vite's releases</a>.</em></p>
<blockquote>
<h2>v6.4.2</h2>
<p>Please refer to <a href="https://github.com/vitejs/vite/blob/v6.4.2/packages/vite/CHANGELOG.md">CHANGELOG.md</a> for details.</p>
<h2>v6.4.1</h2>
<p>Please refer to <a href="https://github.com/vitejs/vite/blob/v6.4.1/packages/vite/CHANGELOG.md">CHANGELOG.md</a> for details.</p>
<h2>v6.4.0</h2>
<p>Please refer to <a href="https://github.com/vitejs/vite/blob/v6.4.0/packages/vite/CHANGELOG.md">CHANGELOG.md</a> for details.</p>
<h2>v6.3.7</h2>
<p>Please refer to <a href="https://github.com/vitejs/vite/blob/v6.3.7/packages/vite/CHANGELOG.md">CHANGELOG.md</a> for details.</p>
<h2>v6.3.6</h2>
<p>Please refer to <a href="https://github.com/vitejs/vite/blob/v6.3.6/packages/vite/CHANGELOG.md">CHANGELOG.md</a> for details.</p>
</blockquote>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/vitejs/vite/blob/v6.4.2/packages/vite/CHANGELOG.md">vite's changelog</a>.</em></p>
<blockquote>
<h2>6.4.2 (2026-04-06)</h2>
<ul>
<li>fix: apply server.fs check to env transport (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22159">#22159</a>) (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22163">#22163</a>) (<a href="https://github.com/vitejs/vite/commit/fe28e47e9463e4c9619f94bfa06d2f8f1411b44b">fe28e47</a>), closes <a href="https://redirect.github.com/vitejs/vite/issues/22159">#22159</a> <a href="https://redirect.github.com/vitejs/vite/issues/22163">#22163</a></li>
<li>fix: avoid path traversal with optimize deps sourcemap handler (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22161">#22161</a>) (<a href="https://github.com/vitejs/vite/commit/ca4da5d1fb45c9cfdce606aa30825095791b164b">ca4da5d</a>), closes <a href="https://redirect.github.com/vitejs/vite/issues/22161">#22161</a></li>
</ul>
<h2>6.4.1 (2025-10-20)</h2>
<ul>
<li>fix(dev): trim trailing slash before <code>server.fs.deny</code> check (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20968">#20968</a>) (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20969">#20969</a>) (<a href="https://github.com/vitejs/vite/commit/1114b5d7ea03e26572708715343bec69db4536e8">1114b5d</a>), closes <a href="https://redirect.github.com/vitejs/vite/issues/20968">#20968</a> <a href="https://redirect.github.com/vitejs/vite/issues/20969">#20969</a></li>
</ul>
<h2>6.4.0 (2025-10-15)</h2>
<ul>
<li>feat: allow passing down resolved config to vite's createServer (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20932">#20932</a>) (<a href="https://github.com/vitejs/vite/commit/ca6455ee9eb6111a9caa9810506a1b9ac96a520a">ca6455e</a>), closes <a href="https://redirect.github.com/vitejs/vite/issues/20932">#20932</a></li>
</ul>
<h2>6.3.7 (2025-10-14)</h2>
<ul>
<li>fix(esbuild): inject esbuild helpers correctly for esbuild 0.25.9+ (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20940">#20940</a>) (<a href="https://github.com/vitejs/vite/commit/c59a222aa584c087cfe710173de1b9ecb597a3ff">c59a222</a>), closes <a href="https://redirect.github.com/vitejs/vite/issues/20940">#20940</a></li>
</ul>
<h2>6.3.6 (2025-09-08)</h2>
<ul>
<li>fix: apply <code>fs.strict</code> check to HTML files (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20736">#20736</a>) (<a href="https://github.com/vitejs/vite/commit/0ab19ea9fcb66f544328f442cf6e70f7c0528d5f">0ab19ea</a>), closes <a href="https://redirect.github.com/vitejs/vite/issues/20736">#20736</a></li>
<li>fix: upgrade sirv to 3.0.2 (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20735">#20735</a>) (<a href="https://github.com/vitejs/vite/commit/e11d24008b97d4ca731ecc1a3b95260a6d12e7e0">e11d240</a>), closes <a href="https://redirect.github.com/vitejs/vite/issues/20735">#20735</a></li>
<li>test: detect ts support via <code>process.features</code> (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20544">#20544</a>) (<a href="https://github.com/vitejs/vite/commit/7d9922972b62329d37a71d4da5a4a382d0bf8a79">7d99229</a>), closes <a href="https://redirect.github.com/vitejs/vite/issues/20544">#20544</a></li>
</ul>
<h2>6.3.5 (2025-05-05)</h2>
<ul>
<li>fix(ssr): handle uninitialized export access as undefined (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/19959">#19959</a>) (<a href="https://github.com/vitejs/vite/commit/fd38d076fe2455aac1e00a7b15cd51159bf12bb5">fd38d07</a>), closes <a href="https://redirect.github.com/vitejs/vite/issues/19959">#19959</a></li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/vitejs/vite/commit/6b3fad02abd550bd7b79934ff92c58dbd7f33045"><code>6b3fad0</code></a> release: v6.4.2</li>
<li><a href="https://github.com/vitejs/vite/commit/ca4da5d1fb45c9cfdce606aa30825095791b164b"><code>ca4da5d</code></a> fix: avoid path traversal with optimize deps sourcemap handler (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22161">#22161</a>)</li>
<li><a href="https://github.com/vitejs/vite/commit/fe28e47e9463e4c9619f94bfa06d2f8f1411b44b"><code>fe28e47</code></a> fix: apply server.fs check to env transport (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22159">#22159</a>) (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22163">#22163</a>)</li>
<li><a href="https://github.com/vitejs/vite/commit/5487f4f641f70c47ea05fd101a4319897df048b3"><code>5487f4f</code></a> release: v6.4.1</li>
<li><a href="https://github.com/vitejs/vite/commit/1114b5d7ea03e26572708715343bec69db4536e8"><code>1114b5d</code></a> fix(dev): trim trailing slash before <code>server.fs.deny</code> check (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20968">#20968</a>) (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20969">#20969</a>)</li>
<li><a href="https://github.com/vitejs/vite/commit/f12697c0f64b9a37196b9ab218a0911829d5b103"><code>f12697c</code></a> release: v6.4.0</li>
<li><a href="https://github.com/vitejs/vite/commit/ca6455ee9eb6111a9caa9810506a1b9ac96a520a"><code>ca6455e</code></a> feat: allow passing down resolved config to vite's createServer (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20932">#20932</a>)</li>
<li><a href="https://github.com/vitejs/vite/commit/0e173d83681daa31be10fa8a62d56b1ec84690af"><code>0e173d8</code></a> release: v6.3.7</li>
<li><a href="https://github.com/vitejs/vite/commit/c59a222aa584c087cfe710173de1b9ecb597a3ff"><code>c59a222</code></a> fix(esbuild): inject esbuild helpers correctly for esbuild 0.25.9+ (<a href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/20940">#20940</a>)</li>
<li><a href="https://github.com/vitejs/vite/commit/3f337c5e24504e51188d29c970de1416ee523dbb"><code>3f337c5</code></a> release: v6.3.6</li>
<li>Additional commits viewable in <a href="https://github.com/vitejs/vite/commits/v6.4.2/packages/vite">compare view</a></li>
</ul>
</details>
<details>
<summary>Maintainer changes</summary>
<p>This version was pushed to npm by <a href="https://www.npmjs.com/~GitHub%20Actions">GitHub Actions</a>, a new releaser for vite since your current version.</p>
</details>
<br />

Impact: See the linked pull request for implementation details.

Context: labels `dependencies`, `javascript` | paths `package.json`, `pnpm-lock.yaml`

### 2026-06-11 · [new workflow for blog setup (#128)](https://github.com/benhalverson/3dprinter-farm/pull/128)

Adds the project-notes automation workflow set for this repository (PR-note validation, markdown generation, and blog-sync flow), plus follow-up fixes from review feedback.
Also reconciles merge conflicts with `main` so the Node CI workflow keeps running both the standard test suite and `test:project-notes` with a frozen lockfile install.

Impact: No direct end-user product behavior changes.
Maintainers get updated CI/workflow behavior for project-notes automation and a conflict-free branch aligned with current `main` test infrastructure.

Context: paths `.github`, `README.md`, `package.json`, `project-notes.config.json`, `test`, `tools`

### 2026-06-11 · [fixed tests (#129)](https://github.com/benhalverson/3dprinter-farm/pull/129)

fixed tests

Impact: See the linked pull request for implementation details.

Context: paths `.github`, `package.json`, `pnpm-lock.yaml`, `test`, `worker-configuration.d.ts`

### 2026-03-18 · [Revert "Bump wrangler from 4.35.0 to 4.75.0" (#127)](https://github.com/benhalverson/3dprinter-farm/pull/127)

Reverts benhalverson/3dprinter-farm#126

Impact: See the linked pull request for implementation details.

Context: paths `pnpm-lock.yaml`

## Notes

- 2026-06-12: - **Compatibility** - The route intentionally preserves the old outward response contract while adapting to a different upstream API shape - **Fallback behavior** - Filament defaults to PLA Black until cart-level `filamentId` is reliably available everywhere
- 2026-06-12: Legacy cart rows may not have `filament_id`; the cart layer treats those as PLA Black and backfills that default during add/merge flows to keep behavior stable across pre- and post-migration data.
- 2026-06-12: - The V2 file workflow was duplicated across route handlers; extracting shared helpers removes the internal routing dependency without changing the external helper-route contracts - `estimate` cost fallback handling remains in place because the current Slant response shape is not fully uniform across callers - Spying on `File.size` does not survive Cloudflare Workers multipart serialisation in the vitest pool — the oversized-file test requires an actual `Uint8Array` allocation to cross the 100 MB threshold reliably - `parseResponseDetails` must attempt `json()` before `text()` because different Slant3D error responses (and test mocks) surface the body through different methods; falling back through both with a `JSON.parse` attempt handles all cases
- 2026-06-12: The live Slant V2 estimate contract should be treated as `data.total`, not a mix of legacy top-level or alternate cost fields. The local `/v2/estimate` route intentionally continues to expose `estimatedCost` alongside `total` to avoid breaking downstream callers during the transition.
- 2026-06-12: - The deleted webhook route had diverged into a TODO-only implementation with different response semantics; keeping a single mounted handler avoids silent drift between duplicate webhook paths.
- 2026-06-11: - This repository uses pnpm, so npm lockfiles should not be committed or updated here.

<!-- project-notes-sync: {"sourceRepository":"benhalverson/3dprinter-farm","sourceBranch":"main","generatorVersion":"1.0.0","generatedAt":"2026-06-12T05:47:21.386Z"} -->
