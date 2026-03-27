import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogContentService } from '../blog/blog-content.service';
import { formatPublishedDate, toTagPath } from '../blog/blog-page.helpers';
import { SeoService } from '../core/seo.service';

@Component({
  imports: [RouterLink],
  template: `
    <section class="page-header">
      <p class="eyebrow">Archive</p>
      <h1>All posts</h1>
      <p>Markdown-authored technical writing, sorted newest first.</p>
    </section>

    <section class="post-list">
      @for (post of content.publishedPosts(); track post.slug) {
        <article class="post-row">
          <div class="post-row__main">
            <p class="meta">
              {{ formatDate(post.publishedAt) }} · {{ post.readingTime.text }}
              @if (post.updatedAt) {
                <span> · Updated {{ formatDate(post.updatedAt) }}</span>
              }
            </p>
            <h2><a [routerLink]="['/posts', post.slug]">{{ post.title }}</a></h2>
            <p>{{ post.description }}</p>
            <div class="chip-row" aria-label="Post tags">
              @for (tag of post.tags; track tag) {
                <a class="chip" [routerLink]="toTagLink(tag)">{{ tag }}</a>
              }
            </div>
          </div>
        </article>
      }
    </section>
  `,
  styles: `
    .page-header {
      margin-bottom: 2rem;
    }

    .eyebrow {
      margin-bottom: 0.5rem;
      font-size: 0.82rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-accent);
      font-weight: 700;
    }

    .post-list {
      display: grid;
      gap: 1rem;
    }

    .post-row {
      padding: 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: 1.5rem;
      background: var(--color-surface);
      box-shadow: var(--shadow-soft);
    }

    .meta {
      color: var(--color-text-muted);
    }

    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      min-height: 2.2rem;
      padding-inline: 0.85rem;
      border-radius: 999px;
      background: var(--color-page-accent);
      color: inherit;
      text-decoration: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsPageComponent {
  readonly content = inject(BlogContentService);
  private readonly seo = inject(SeoService);

  readonly formatDate = formatPublishedDate;
  readonly toTagLink = toTagPath;

  constructor() {
    effect(() => {
      this.seo.update({
        title: 'Posts',
        description: 'Technical blog posts by Ben Halverson on Angular, TypeScript, performance, and Cloudflare.',
        path: '/posts',
      });
    });
  }
}
