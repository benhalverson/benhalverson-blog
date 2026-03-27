import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogContentService } from '../blog/blog-content.service';
import { formatPublishedDate } from '../blog/blog-page.helpers';
import { SeoService } from '../core/seo.service';

@Component({
  imports: [RouterLink],
  template: `
    <section class="page-header">
      <p class="eyebrow">Projects</p>
      <h1>Things I am building in the open</h1>
      <p>Working systems, experiments, and long-lived roadmaps that do not fit cleanly into standalone blog posts.</p>
    </section>

    <section class="project-list">
      @for (project of content.publishedProjects(); track project.slug) {
        <article class="project-card">
          <div class="project-card__header">
            <span class="status-pill" [class]="'status-pill status-pill--' + project.status">{{ project.status }}</span>
            <p class="meta">
              Started {{ formatDate(project.startedAt) }}
              @if (project.updatedAt) {
                <span> · Updated {{ formatDate(project.updatedAt) }}</span>
              }
            </p>
          </div>

          <h2><a [routerLink]="['/projects', project.slug]">{{ project.title }}</a></h2>
          <p>{{ project.description }}</p>

          <div class="chip-row">
            @for (tag of project.tags; track tag) {
              <span class="chip">{{ tag }}</span>
            }
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

    .project-list {
      display: grid;
      gap: 1rem;
    }

    .project-card {
      padding: 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: 1.5rem;
      background: var(--color-surface);
      box-shadow: var(--shadow-soft);
    }

    .project-card__header {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
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

    .chip,
    .status-pill {
      display: inline-flex;
      align-items: center;
      min-height: 2rem;
      padding-inline: 0.8rem;
      border-radius: 999px;
      background: var(--color-page-accent);
    }

    .status-pill {
      text-transform: capitalize;
      font-weight: 700;
    }

    .status-pill--active,
    .status-pill--shipping {
      background: color-mix(in srgb, var(--color-surface-strong) 16%, var(--color-page));
    }

    .status-pill--planning,
    .status-pill--paused {
      background: color-mix(in srgb, var(--color-accent) 14%, var(--color-page));
    }

    @media (max-width: 720px) {
      .project-card__header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  readonly content = inject(BlogContentService);
  private readonly seo = inject(SeoService);

  readonly formatDate = formatPublishedDate;

  constructor() {
    effect(() => {
      this.seo.update({
        title: 'Projects',
        description: 'Active projects, experiments, and roadmaps from Ben Halverson.',
        path: '/projects',
      });
    });
  }
}
