import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogContentService } from '../blog/blog-content.service';
import { formatPublishedDate, toTagPath } from '../blog/blog-page.helpers';
import { SeoService } from '../core/seo.service';

@Component({
  imports: [RouterLink],
  template: `
    <section class="hero card">
      <p class="eyebrow">Developer blog</p>
      <h1>Practical notes on Angular, TypeScript, performance, and shipping on the web.</h1>
      <p class="lede">
        Ben Halverson writes about front-end architecture, edge delivery, and keeping systems useful
        without making them harder to run than they need to be.
      </p>

      <div class="hero__actions">
        <a class="button button--primary" routerLink="/posts">Read the posts</a>
        <a class="button" routerLink="/about">About Ben</a>
      </div>
    </section>

    <section class="grid-two">
      <div class="card">
        <div class="section-heading">
          <h2>Featured posts</h2>
          <a routerLink="/posts">Browse all</a>
        </div>

        <div class="stack-list">
          @for (post of content.featuredPosts(); track post.slug) {
            <article class="post-card">
              <p class="meta">{{ formatDate(post.publishedAt) }} · {{ post.readingTime.text }}</p>
              <h3><a [routerLink]="['/posts', post.slug]">{{ post.title }}</a></h3>
              <p>{{ post.description }}</p>
              <div class="chip-row" aria-label="Post tags">
                @for (tag of post.tags; track tag) {
                  <a class="chip" [routerLink]="toTagLink(tag)">{{ tag }}</a>
                }
              </div>
            </article>
          }
        </div>
      </div>

      <div class="card">
        <div class="section-heading">
          <h2>Topics</h2>
          <a routerLink="/about">Why these topics</a>
        </div>

        <div class="chip-row">
          @for (tag of content.tags(); track tag.name) {
            <a class="chip" [routerLink]="toTagLink(tag.name)">
              {{ tag.name }} <span class="chip__count">{{ tag.postCount }}</span>
            </a>
          }
        </div>

        @if (content.aboutPage(); as aboutPage) {
          <div class="about-preview prose" [innerHTML]="aboutPage.html"></div>
        }
      </div>
    </section>

    <section class="card">
      <div class="section-heading">
        <h2>Active projects</h2>
        <a routerLink="/projects">See all projects</a>
      </div>

      <div class="timeline">
        @for (project of content.featuredProjects(); track project.slug) {
          <article class="timeline__item">
            <div>
              <p class="meta">{{ formatDate(project.updatedAt ?? project.startedAt) }} · {{ project.status }}</p>
              <h3><a [routerLink]="['/projects', project.slug]">{{ project.title }}</a></h3>
            </div>
            <p>{{ project.description }}</p>
          </article>
        }
      </div>
    </section>

    <section class="card">
      <div class="section-heading">
        <h2>Latest writing</h2>
        <a routerLink="/posts">Archive</a>
      </div>

      <div class="timeline">
        @for (post of content.latestPosts(); track post.slug) {
          <article class="timeline__item">
            <div>
              <p class="meta">{{ formatDate(post.publishedAt) }}</p>
              <h3><a [routerLink]="['/posts', post.slug]">{{ post.title }}</a></h3>
            </div>
            <p>{{ post.description }}</p>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .hero,
    .card {
      padding: clamp(1.25rem, 2vw, 2rem);
      border: 1px solid var(--color-border);
      border-radius: 1.75rem;
      background: var(--color-surface);
      box-shadow: var(--shadow-soft);
    }

    .hero {
      margin-bottom: 1.5rem;
      background:
        linear-gradient(135deg, rgba(25, 82, 62, 0.08), transparent 55%),
        var(--color-surface);
    }

    .hero h1 {
      max-width: 12ch;
      margin-bottom: 1rem;
      font-size: clamp(2.6rem, 5vw, 4.5rem);
      line-height: 0.95;
    }

    .lede {
      max-width: 44rem;
      font-size: 1.15rem;
      color: var(--color-text-muted);
    }

    .eyebrow {
      margin-bottom: 0.75rem;
      font-size: 0.82rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-accent);
      font-weight: 700;
    }

    .hero__actions,
    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .hero__actions {
      margin-top: 1.5rem;
    }

    .grid-two {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .section-heading,
    .timeline__item {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    .section-heading {
      align-items: center;
      margin-bottom: 1.25rem;
    }

    .stack-list {
      display: grid;
      gap: 1rem;
    }

    .post-card {
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    .post-card:first-child {
      padding-top: 0;
      border-top: 0;
    }

    .meta {
      color: var(--color-text-muted);
      font-size: 0.94rem;
    }

    .chip {
      display: inline-flex;
      gap: 0.4rem;
      align-items: center;
      min-height: 2.2rem;
      padding-inline: 0.85rem;
      border-radius: 999px;
      background: var(--color-page-accent);
      color: inherit;
      text-decoration: none;
    }

    .chip__count {
      color: var(--color-text-muted);
      font-size: 0.92rem;
    }

    .about-preview {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    .timeline {
      display: grid;
      gap: 1rem;
    }

    .timeline__item {
      align-items: start;
      padding: 1rem 0;
      border-top: 1px solid var(--color-border);
    }

    .timeline__item:first-child {
      padding-top: 0;
      border-top: 0;
    }

    @media (max-width: 800px) {
      .grid-two {
        grid-template-columns: 1fr;
      }

      .section-heading,
      .timeline__item {
        flex-direction: column;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly content = inject(BlogContentService);
  private readonly seo = inject(SeoService);

  readonly formatDate = formatPublishedDate;
  readonly toTagLink = toTagPath;

  constructor() {
    effect(() => {
      this.seo.update({
        title: 'Home',
        description:
          'Developer writing by Ben Halverson on Angular, TypeScript, performance, SSR, and edge delivery.',
        path: '/',
      });
    });
  }
}
