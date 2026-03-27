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
    @if (post(); as post) {
      <section class="post-layout">
        <article class="post card">
          <p class="eyebrow">Post</p>
          <h1>{{ post.title }}</h1>
          <p class="lede">{{ post.description }}</p>

          <div class="meta-block">
            <p>{{ formatDate(post.publishedAt) }} · {{ post.readingTime.text }}</p>
            @if (post.updatedAt) {
              <p>Updated {{ formatDate(post.updatedAt) }}</p>
            }
          </div>

          <div class="chip-row" aria-label="Post tags">
            @for (tag of post.tags; track tag) {
              <a class="chip" [routerLink]="toTagLink(tag)">{{ tag }}</a>
            }
          </div>

          <div class="prose" [innerHTML]="post.html"></div>
        </article>

        <aside class="sidebar">
          @if (post.headings.length > 1) {
            <section class="card toc">
              <h2>On this page</h2>
              <nav aria-label="Table of contents">
                <ul>
                  @for (heading of post.headings; track heading.id) {
                    <li [class.toc__child]="heading.depth === 3">
                      <a [href]="'#' + heading.id">{{ heading.text }}</a>
                    </li>
                  }
                </ul>
              </nav>
            </section>
          }

          <section class="card adjacent">
            <h2>Keep reading</h2>

            @if (adjacentPosts().next; as next) {
              <a class="adjacent__link" [routerLink]="['/posts', next.slug]">
                <span>Newer</span>
                <strong>{{ next.title }}</strong>
              </a>
            }

            @if (adjacentPosts().previous; as previous) {
              <a class="adjacent__link" [routerLink]="['/posts', previous.slug]">
                <span>Older</span>
                <strong>{{ previous.title }}</strong>
              </a>
            }
          </section>
        </aside>
      </section>
    } @else {
      <section class="card empty-state">
        <p class="eyebrow">Missing post</p>
        <h1>That post does not exist.</h1>
        <p>The URL is valid structurally, but there is no published Markdown file for that slug.</p>
        <a class="button button--primary" routerLink="/posts">Back to posts</a>
      </section>
    }
  `,
  styles: `
    .post-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 18rem;
      gap: 1.5rem;
      align-items: start;
    }

    .card {
      padding: clamp(1.25rem, 2vw, 2rem);
      border: 1px solid var(--color-border);
      border-radius: 1.75rem;
      background: var(--color-surface);
      box-shadow: var(--shadow-soft);
    }

    .post h1 {
      margin-bottom: 0.75rem;
    }

    .eyebrow {
      margin-bottom: 0.5rem;
      font-size: 0.82rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-accent);
      font-weight: 700;
    }

    .lede,
    .meta-block {
      color: var(--color-text-muted);
    }

    .meta-block {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1.25rem;
      margin: 1rem 0 1.25rem;
    }

    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 2rem;
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

    .sidebar {
      display: grid;
      gap: 1rem;
      position: sticky;
      top: 1rem;
    }

    .toc ul {
      display: grid;
      gap: 0.7rem;
      padding: 0;
      margin: 1rem 0 0;
      list-style: none;
    }

    .toc__child {
      padding-left: 1rem;
    }

    .adjacent {
      display: grid;
      gap: 0.85rem;
    }

    .adjacent__link {
      display: grid;
      gap: 0.2rem;
      padding: 1rem;
      border-radius: 1.1rem;
      background: var(--color-page-accent);
      color: inherit;
      text-decoration: none;
    }

    .adjacent__link span {
      color: var(--color-text-muted);
      font-size: 0.95rem;
    }

    .empty-state {
      display: grid;
      gap: 1rem;
      max-width: 40rem;
    }

    @media (max-width: 980px) {
      .post-layout {
        grid-template-columns: 1fr;
      }

      .sidebar {
        position: static;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(BlogContentService);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  readonly post = computed(() => this.content.getPostBySlug(this.slug()));
  readonly adjacentPosts = computed(() => this.content.getAdjacentPosts(this.slug()));
  readonly formatDate = formatPublishedDate;
  readonly toTagLink = toTagPath;

  constructor() {
    effect(() => {
      const slug = this.slug();
      const post = this.post();

      if (!slug || !post) {
        this.seo.update({
          title: 'Post not found',
          description: 'The requested post could not be found.',
          path: `/posts/${slug ?? ''}`,
          robots: 'noindex,follow',
        });
        return;
      }

      this.seo.update({
        title: post.title,
        description: post.description,
        path: `/posts/${post.slug}`,
        canonicalUrl: post.canonicalUrl,
        type: 'article',
      });
    });
  }
}
