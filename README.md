# benhalverson-blog

Personal developer blog for `benhalverson.com`, built with Angular, Markdown, and Cloudflare-friendly server output.

## What This Repo Is

This repo is a content-driven engineering blog and project site.

It includes:

- Markdown-authored blog posts in `content/posts`
- Markdown-authored project pages in `content/projects`
- an About page in `content/pages`
- generated RSS, sitemap, and robots files
- prerendered routes for known content pages
- Cloudflare Worker deployment via `wrangler`

The site is designed to stay repo-first and low-maintenance: content lives in Markdown, the build step generates the structured artifacts, and Angular handles the routed UI.

## Current Sections

- `/` homepage with latest posts and featured projects
- `/posts` post archive
- `/posts/:slug` individual post pages
- `/tags/:tag` tag archives
- `/projects` project index
- `/projects/:slug` individual project pages
- `/about` about page

## Content Workflow

Add or update content in:

```text
content/
  posts/
  projects/
  pages/
```

Then run:

```bash
pnpm run generate:content
```

That generation step produces:

- `src/app/blog/generated/content.generated.ts`
- `public/rss.xml`
- `public/sitemap.xml`
- `public/robots.txt`

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the app:

```bash
pnpm start
```

The content generator runs automatically before dev, test, and build.

## Useful Commands

```bash
pnpm start
pnpm run generate:content
pnpm test
pnpm build
pnpm preview
pnpm deploy
```

## Deployment

This repo is configured for Cloudflare Worker deployment.

- Worker config: `wrangler.jsonc`
- build output: `dist/`
- local preview: `pnpm preview`
- deploy: `pnpm deploy`

## Tech Stack

- Angular 21
- TypeScript
- Markdown content pipeline with frontmatter
- `remark` / `rehype` for Markdown rendering
- Tailwind CSS import plus custom styling
- Cloudflare Workers / Wrangler

## Status

The current MVP includes:

- blog posts
- project pages with roadmap-style content
- RSS feed
- sitemap
- robots.txt
- prerendered content routes

Remaining work is mostly polish, especially accessibility verification and deployment automation choices.
