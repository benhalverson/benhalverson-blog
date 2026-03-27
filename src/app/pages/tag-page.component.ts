import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BlogContentService } from '../blog/blog-content.service';
import { formatPublishedDate, toTagPath } from '../blog/blog-page.helpers';
import { SeoService } from '../core/seo.service';

@Component({
  imports: [RouterLink],
  template: `
    <section class="page-header">
      <p class="eyebrow">Tag</p>
      <h1>{{ tagLabel() }}</h1>
      <p>{{ posts().length }} published post@if (posts().length !== 1) {s} in this topic.</p>
    </section>

    @if (posts().length > 0) {
      <section class="post-list">
        @for (post of posts(); track post.slug) {
          <article class="post-row">
            <p class="meta">{{ formatDate(post.publishedAt) }} · {{ post.readingTime.text }}</p>
            <h2><a [routerLink]="['/posts', post.slug]">{{ post.title }}</a></h2>
            <p>{{ post.description }}</p>
            <div class="chip-row">
              @for (tag of post.tags; track tag) {
                <a
                  class="chip"
                  [class.chip--active]="tag.toLowerCase() === normalizedTag()"
                  [routerLink]="toTagLink(tag)"
                >
                  {{ tag }}
                </a>
              }
            </div>
          </article>
        }
      </section>
    } @else {
      <section class="empty-state">
        <p>No published posts match this tag yet.</p>
        <a class="button button--primary" routerLink="/posts">Browse all posts</a>
      </section>
    }
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

    .post-row,
    .empty-state {
      padding: 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: 1.5rem;
      background: var(--color-surface);
      box-shadow: var(--shadow-soft);
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

    .chip--active {
      background: var(--color-surface-strong);
      color: var(--color-page);
    }

    .meta {
      color: var(--color-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(BlogContentService);
  private readonly seo = inject(SeoService);

  private readonly tagParam = toSignal(this.route.paramMap.pipe(map((params) => params.get('tag'))), {
    initialValue: this.route.snapshot.paramMap.get('tag'),
  });

  readonly normalizedTag = computed(() => this.tagParam()?.toLowerCase() ?? '');
  readonly posts = computed(() => this.content.getPostsByTag(this.tagParam()));
  readonly tagLabel = computed(() => this.posts()[0]?.tags.find((tag) => tag.toLowerCase() === this.normalizedTag()) ?? this.tagParam() ?? 'Unknown tag');
  readonly formatDate = formatPublishedDate;
  readonly toTagLink = toTagPath;

  constructor() {
    effect(() => {
      const tag = this.tagParam() ?? 'unknown-tag';

      this.seo.update({
        title: `Tag: ${this.tagLabel()}`,
        description: `Posts filed under ${this.tagLabel()} on Ben Halverson's developer blog.`,
        path: `/tags/${encodeURIComponent(tag)}`,
      });
    });
  }
}
