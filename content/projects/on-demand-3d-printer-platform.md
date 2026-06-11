---
title: On-Demand 3D Printer Platform
slug: on-demand-3d-printer-platform
description: API and web application for intake, quoting, queue management, and fulfillment across custom print requests.
status: active
startedAt: 2026-01-12
updatedAt: 2026-06-11
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

### 2026-03-18 · [Bump wrangler from 4.35.0 to 4.75.0 (#126)](https://github.com/benhalverson/3dprinter-farm/pull/126)

Bumps [wrangler](https://github.com/cloudflare/workers-sdk/tree/HEAD/packages/wrangler) from 4.35.0 to 4.75.0.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/cloudflare/workers-sdk/releases">wrangler's releases</a>.</em></p>
<blockquote>
<h2>wrangler@4.75.0</h2>
<h3>Minor Changes</h3>
<ul>
<li>
<p><a href="https://redirect.github.com/cloudflare/workers-sdk/pull/12492">#12492</a> <a href="https://github.com/cloudflare/workers-sdk/commit/3b81fc6a75857d5c158824f17d9316adc55878fc"><code>3b81fc6</code></a> Thanks <a href="https://github.com/thomasgauvin"><code>@​thomasgauvin</code></a>! - feat: add <code>wrangler tunnel</code> commands for managing Cloudflare Tunnels</p>
<p>Adds a new set of commands for managing remotely-managed Cloudflare Tunnels directly from Wrangler:</p>
<ul>
<li><code>wrangler tunnel create &lt;name&gt;</code> - Create a new Cloudflare Tunnel</li>
<li><code>wrangler tunnel list</code> - List all tunnels in your account</li>
<li><code>wrangler tunnel info &lt;tunnel&gt;</code> - Display details about a specific tunnel</li>
<li><code>wrangler tunnel delete &lt;tunnel&gt;</code> - Delete a tunnel (with confirmation)</li>
<li><code>wrangler tunnel run &lt;tunnel&gt;</code> - Run a tunnel using cloudflared</li>
<li><code>wrangler tunnel quick-start &lt;url&gt;</code> - Start a temporary tunnel (Try Cloudflare)</li>
</ul>
<p>The <code>run</code> and <code>quick-start</code> commands automatically download and manage the cloudflared binary, caching it in <code>~/.wrangler/cloudflared/</code>. Users are prompted before downloading and warned if their PATH-installed cloudflared is outdated. You can override the binary location with the <code>CLOUDFLARED_PATH</code> environment variable.</p>
<p>All commands are marked as experimental.</p>
</li>
</ul>
<h3>Patch Changes</h3>
<ul>
<li>
<p><a href="https://redirect.github.com/cloudflare/workers-sdk/pull/12927">#12927</a> <a href="https://github.com/cloudflare/workers-sdk/commit/c9b31840631585418b8926e8228db486b619b4c7"><code>c9b3184</code></a> Thanks <a href="https://github.com/penalosa"><code>@​penalosa</code></a>! - Bump undici from 7.18.2 to 7.24.4</p>
</li>
<li>
<p><a href="https://redirect.github.com/cloudflare/workers-sdk/pull/12875">#12875</a> <a href="https://github.com/cloudflare/workers-sdk/commit/13df6c75be49ac32fc1c57e2e24523e86ced2115"><code>13df6c7</code></a> Thanks <a href="https://github.com/apps/dependabot"><code>@​dependabot</code></a>! - Update dependencies of &quot;miniflare&quot;, &quot;wrangler&quot;</p>
<p>The following dependency versions have been updated:</p>
<table>
<thead>
<tr>
<th>Dependency</th>
<th>From</th>
<th>To</th>
</tr>
</thead>
<tbody>
<tr>
<td>workerd</td>
<td>1.20260312.1</td>
<td>1.20260316.1</td>
</tr>
</tbody>
</table>
</li>
<li>
<p><a href="https://redirect.github.com/cloudflare/workers-sdk/pull/12935">#12935</a> <a href="https://github.com/cloudflare/workers-sdk/commit/df0d1120a856bd65553bf92b4bc6380c15e81cc7"><code>df0d112</code></a> Thanks <a href="https://github.com/apps/dependabot"><code>@​dependabot</code></a>! - Update dependencies of &quot;miniflare&quot;, &quot;wrangler&quot;</p>
<p>The following dependency versions have been updated:</p>
<table>
<thead>
<tr>
<th>Dependency</th>
<th>From</th>
<th>To</th>
</tr>
</thead>
<tbody>
<tr>
<td>workerd</td>
<td>1.20260316.1</td>
<td>1.20260317.1</td>
</tr>
</tbody>
</table>
</li>
<li>
<p><a href="https://redirect.github.com/cloudflare/workers-sdk/pull/12928">#12928</a> <a href="https://github.com/cloudflare/workers-sdk/commit/81ee98e6a0c6be879757289ef6e34e1559d6ee2a"><code>81ee98e</code></a> Thanks <a href="https://github.com/petebacondarwin"><code>@​petebacondarwin</code></a>! - Migrate chrome-devtools-patches deployment from Cloudflare Pages to Workers + Assets</p>
<p>The DevTools frontend is now deployed as a Cloudflare Workers + Assets project instead of a Cloudflare Pages project. This uses <code>wrangler deploy</code> for production deployments and <code>wrangler versions upload</code> for PR preview deployments.</p>
<p>The inspector proxy origin allowlists in both wrangler and miniflare have been updated to accept connections from the new <code>workers.dev</code> domain patterns, while retaining the legacy <code>pages.dev</code> patterns for backward compatibility.</p>
</li>
<li>
<p><a href="https://redirect.github.com/cloudflare/workers-sdk/pull/12835">#12835</a> <a href="https://github.com/cloudflare/workers-sdk/commit/c600ce0a45ad334a5a961cf7774758860581d9d2"><code>c600ce0</code></a> Thanks <a href="https://github.com/dario-piotrowicz"><code>@​dario-piotrowicz</code></a>! - Fix execution freezing on <code>debugger</code> statements when DevTools is not attached</p>
<p>Previously, <code>wrangler</code> always sent <code>Debugger.enable</code> to the runtime on connection, even when DevTools wasn't open. This caused scripts to freeze on <code>debugger</code> statements. Now <code>Debugger.enable</code> is only sent when DevTools is actually attached, and <code>Debugger.disable</code> is sent when DevTools disconnects to stop the runtime from performing debugging work.</p>
</li>
<li>
<p><a href="https://redirect.github.com/cloudflare/workers-sdk/pull/12894">#12894</a> <a href="https://github.com/cloudflare/workers-sdk/commit/f509d13b97a832a28ed6bc568c7bcf6fc7d4a4ff"><code>f509d13</code></a> Thanks <a href="https://github.com/gpanders"><code>@​gpanders</code></a>! - Simplify description of --json option</p>
</li>
</ul>

Impact: </blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/a671740787a95779f89e3b1bb2154990c6e14212"><code>a671740</code></a> Version Packages (<a href="https://github.com/cloudflare/workers-sdk/tree/HEAD/packages/wrangler/issues/12923">#12923</a>)</li>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/e25bd0ef64753e12c7ac5849a2b3d35b45e5fe2a"><code>e25bd0e</code></a> Update prettier to 3.8.1 (<a href="https://github.com/cloudflare/workers-sdk/tree/HEAD/packages/wrangler/issues/12939">#12939</a>)</li>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/df0d1120a856bd65553bf92b4bc6380c15e81cc7"><code>df0d112</code></a> Bump the workerd-and-workers-types group with 2 updates (<a href="https://github.com/cloudflare/workers-sdk/tree/HEAD/packages/wrangler/issues/12935">#12935</a>)</li>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/81ee98e6a0c6be879757289ef6e34e1559d6ee2a"><code>81ee98e</code></a> [chrome-devtools-patches] Migrate deployment from Cloudflare Pages to Workers...</li>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/3b81fc6a75857d5c158824f17d9316adc55878fc"><code>3b81fc6</code></a> feat(wrangler): add wrangler tunnel (<a href="https://github.com/cloudflare/workers-sdk/tree/HEAD/packages/wrangler/issues/12492">#12492</a>)</li>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/13df6c75be49ac32fc1c57e2e24523e86ced2115"><code>13df6c7</code></a> Bump the workerd-and-workers-types group with 2 updates (<a href="https://github.com/cloudflare/workers-sdk/tree/HEAD/packages/wrangler/issues/12875">#12875</a>)</li>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/0a7fef9ee924b6d0817a69be9d893dc8a40c9a19"><code>0a7fef9</code></a> wrangler: reject cross-drive module paths (<a href="https://github.com/cloudflare/workers-sdk/tree/HEAD/packages/wrangler/issues/11888">#11888</a>)</li>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/f509d13b97a832a28ed6bc568c7bcf6fc7d4a4ff"><code>f509d13</code></a> Remove superfluous adjective from --json description (<a href="https://github.com/cloudflare/workers-sdk/tree/HEAD/packages/wrangler/issues/12894">#12894</a>)</li>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/c600ce0a45ad334a5a961cf7774758860581d9d2"><code>c600ce0</code></a> Fix execution freezing on <code>debugger</code> statements when DevTools is not attached...</li>
<li><a href="https://github.com/cloudflare/workers-sdk/commit/2e6b4ab2b85543bdf3e29ff82004e33538dcf063"><code>2e6b4ab</code></a> Version Packages (<a href="https://github.com/cloudflare/workers-sdk/tree/HEAD/packages/wrangler/issues/12876">#12876</a>)</li>
<li>Additional commits viewable in <a href="https://github.com/cloudflare/workers-sdk/commits/wrangler@4.75.0/packages/wrangler">compare view</a></li>
</ul>
</details>
<details>
<summary>Maintainer changes</summary>
<p>This version was pushed to npm by [GitHub Actions](<a href="https://www.npmjs.com/~GitHub">https://www.npmjs.com/~GitHub</a> Actions), a new releaser for wrangler since your current version.</p>
</details>
<br />

Context: labels `dependencies`, `javascript` | paths `pnpm-lock.yaml`

### 2026-03-18 · [Fix payment intent metadata userId trust issue (#121)](https://github.com/benhalverson/3dprinter-farm/pull/121)

Fixes a security vulnerability where the `POST /cart/:cartId/payment-intent` route accepted a client-supplied `userId` in the request body and forwarded it into Stripe payment metadata, allowing an attacker to misattribute fulfillment to another user.

Impact: - ✅ All 16 shopping cart tests pass
- ✅ All payments tests pass
- ✅ CodeQL security scan finds 0 alerts

Context: paths `src`, `test`

### 2026-03-18 · [Enforce cart ownership across all cart mutation routes (#120)](https://github.com/benhalverson/3dprinter-farm/pull/120)

Cart routes accepted arbitrary `cartId` values without verifying the caller owned that cart, allowing authenticated users to tamper with, read, or check out other users' carts.

Impact: | Route | Change |
|---|---|
| `POST /cart/add` | `optionalAuthMiddleware` — binds new items to `userId`; 403 if caller is a different authenticated user |
| `PUT /cart/update` | `optionalAuthMiddleware` — 401/403 if cart is owned and caller doesn't match |
| `DELETE /cart/remove` | `optionalAuthMiddleware` — select-before-delete ownership check; 401/403 on mismatch |
| `GET /cart/shipping` | Fetches `cart.userId` inline; 403 on cross-user access |
| `POST /cart/:cartId/payment-intent` | **Removes body-supplied `userId`** (was a privilege-escalation vector); always derives identity from JWT; 403 on cross-user access |

Context: paths `drizzle`, `src`, `test`

### 2026-03-18 · [Fix SSRF in v2/add-product: restrict STL fetches to trusted R2 origin (#122)](https://github.com/benhalverson/3dprinter-farm/pull/122)

`POST /v2/add-product` passed `data.stl` directly to a server-side `fetch()` with no origin validation, enabling SSRF via attacker-controlled URLs.

Impact: ```ts
if (!isAllowedStlUrl(data.stl, c.env.R2_PUBLIC_BASE_URL)) {
  return c.json({ error: 'Invalid STL URL', details: '...' }, 400);
}
const fileResponse = await fetch(data.stl);
```

Context: paths `src`, `test`

### 2026-03-18 · [Fix hosted checkout: include userId in Stripe session metadata (#124)](https://github.com/benhalverson/3dprinter-farm/pull/124)

The `/cart/:cartId/checkout` route stored only `cartId` in Stripe session metadata, while the `checkout.session.completed` webhook handler requires both `cartId` and `userId` to fulfill orders — causing silent fulfillment failures after successful payments.

Impact: **`src/routes/shoppingCart.ts`**
- Added `authMiddleware` to the checkout route (consistent with `/cart/:cartId/payment-intent`)
- Extracted `userId` from the JWT session payload using a typed interface; returns `401` if absent
- `customerEmail` falls back to the session email if not provided in the request body
- Metadata now includes both required fields:

Context: paths `src`, `test`

### 2026-03-18 · [Require authentication for presigned upload endpoints and bind ownerId server-side (#119)](https://github.com/benhalverson/3dprinter-farm/pull/119)

`POST /v2/presigned-upload` and `POST /v2/confirm` were publicly accessible, and `ownerId` was caller-controlled with an `anonymous` fallback — enabling unauthenticated platform usage and ownership spoofing.

Impact: // After
  const { fileName } = requestBody as Record<string, unknown>;
  const ownerId = c.get('userId') as string | undefined;
  if (!ownerId) return c.json({ success: false, error: 'Unauthorized' }, 401);
  // ...
  ownerId: ownerId
  ```

Context: paths `src`, `test`

## Notes

- 2026-06-11: Project-notes tests and workflow scripts are environment-sensitive (Node/runtime flags and test runner context), so keeping CI workflow settings aligned during merges is important to avoid regressions.

<!-- project-notes-sync: {"sourceRepository":"benhalverson/3dprinter-farm","sourceBranch":"main","generatorVersion":"1.0.0","generatedAt":"2026-06-11T08:07:24.259Z"} -->
