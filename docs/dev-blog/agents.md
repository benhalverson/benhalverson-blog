# Dev Blog MVP Agents

## Project

Build a personal developer blog for **benhalverson.com** using **Angular**, **Markdown**, and **Tailwind CSS**.

The blog should be fast, clean, easy to maintain, and work well with a static or prerendered deployment model on Cloudflare.

---

## Product goal

Create a simple, professional dev blog that lets Ben publish technical writing in Markdown without needing a CMS, database, or server-side authoring workflow.

The MVP should prioritize:

- writing in Markdown
- strong readability
- good SEO
- clean code presentation
- easy content publishing through the repo
- low maintenance overhead

---

## Target outcomes

- Publish posts by adding Markdown files to the repo
- Generate a blog index and individual post pages
- Support tags and metadata
- Produce a site that looks professional on desktop and mobile
- Keep the architecture simple enough to extend later

---

## MVP feature list

### 1. Markdown-based posts

Authors should be able to create a blog post by adding a Markdown file under a content directory.

Each post must support frontmatter fields:

- `title`
- `slug`
- `description`
- `publishedAt`
- `updatedAt`
- `tags`
- `draft`
- `coverImage` (optional)
- `canonicalUrl` (optional)

### 2. Blog post listing page

Create a `/posts` page that displays all published posts.

Each item should show:

- title
- short description
- publish date
- tags
- reading time

The list should be sorted newest first.

### 3. Individual blog post pages

Create a route for each post:

- `/posts/:slug`

Each post page should render:

- title
- description or subtitle
- publish date
- updated date if present
- tags
- Markdown body content
- syntax-highlighted code blocks
- previous and next post links

### 4. Homepage with blog entry points

Homepage should include:

- short intro / personal summary
- featured or latest posts
- link to all posts
- link to GitHub or other relevant profile

This should feel like a personal site, not just a generic blog archive.

### 5. Tag pages

Create tag routes:

- `/tags/:tag`

Each tag page should list posts associated with that tag.

### 6. About page

Create an `/about` page using either Markdown or Angular content.

This page should explain:

- who Ben is
- what kinds of topics the blog covers
- links to key profiles/projects

### 7. Tailwind-based styling

Use Tailwind CSS for layout and styling.

The visual direction should be:

- minimal
- readable
- code-friendly
- professional
- mobile-friendly

### 8. Dark mode

Include dark mode in MVP.

At minimum:

- system preference support
- manual toggle preferred
- theme should apply to content, code blocks, and navigation

### 9. Syntax highlighting for code blocks

Markdown code fences must render with syntax highlighting.

This is required for a dev blog MVP.

### 10. Table of contents for long posts

Generate or render a table of contents for posts with multiple headings.

This can be hidden on short posts.

### 11. Reading time

Show estimated reading time for each post.

### 12. SEO metadata

Each post page must support:

- unique page title
- meta description
- canonical URL
- Open Graph metadata
- Twitter/X card metadata

### 13. Sitemap and robots

Generate:

- `sitemap.xml`
- `robots.txt`

### 14. RSS feed

Generate an RSS feed for published posts.

### 15. 404 page

Include a custom not found page.

---

## Content architecture

Recommended structure:

```text
content/
  posts/
    my-first-post.md
    angular-notes.md
  pages/
    about.md
```

Generated assets may include:

```text
src/assets/blog/generated/
  posts.json
  tags.json
  search-index.json
```

---

## Publishing workflow

MVP workflow should be repo-first:

1. Add a Markdown file
2. Run build/generation step
3. Prerender or statically build site
4. Deploy to Cloudflare

No CMS is required for MVP.

---

## Non-goals for MVP

Do **not** include these in the initial build:

- CMS integration
- comments
- newsletter signup
- database-backed search
- user accounts
- admin panel
- MDX-style embedded Angular components inside posts
- analytics dashboard UI

These can be added later if needed.

---

## Technical expectations

- Angular app architecture should stay simple and maintainable
- Blog content should be processed at build time where possible
- Output should work well with prerendering/static hosting
- Avoid unnecessary runtime complexity
- Keep content as the source of truth, not hardcoded post data in components

---

## UX expectations

The site should feel like a personal engineering blog.

It should emphasize:

- legibility
- strong typography
- clean spacing
- easy navigation
- good mobile reading experience
- code samples that are pleasant to read

Navigation should be simple:

- Home
- Posts
- About
- external profile links as needed

---

## Suggested future features after MVP

- client-side search UI
- series support
- project case study pages
- image zoom/lightbox
- related posts
- pinned posts
- auto-generated social images
- view count integration
- webmentions or lightweight comments

---

## Definition of done for MVP

The MVP is complete when:

- posts can be added entirely through Markdown files
- all major blog pages exist and render correctly
- styling is consistent across desktop and mobile
- code blocks render correctly
- SEO basics are implemented
- sitemap and RSS are generated
- deployment works cleanly on benhalverson.com

