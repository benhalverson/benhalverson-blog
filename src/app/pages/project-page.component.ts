import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BlogContentService } from '../blog/blog-content.service';
import { formatPublishedDate } from '../blog/blog-page.helpers';
import { SeoService } from '../core/seo.service';

@Component({
  imports: [RouterLink],
  template: `
    @if (project(); as project) {
      <section class="project-layout">
        <article class="card">
          <p class="eyebrow">Project</p>
          <h1>{{ project.title }}</h1>
          <p class="lede">{{ project.description }}</p>

          <div class="meta-row">
            <span class="status-pill" [class]="'status-pill status-pill--' + project.status">{{ project.status }}</span>
            <p>Started {{ formatDate(project.startedAt) }}</p>
            @if (project.updatedAt) {
              <p>Updated {{ formatDate(project.updatedAt) }}</p>
            }
          </div>

          <div class="chip-row">
            @for (tag of project.tags; track tag) {
              <span class="chip">{{ tag }}</span>
            }
          </div>

          <div class="link-row" aria-label="Project links">
            @if (project.repoUrl) {
              <a class="button button--primary" [href]="project.repoUrl" target="_blank" rel="noreferrer">Repository</a>
            }
            @if (project.demoUrl) {
              <a class="button" [href]="project.demoUrl" target="_blank" rel="noreferrer">Demo</a>
            }
            @if (project.docsUrl) {
              <a class="button" [href]="project.docsUrl" target="_blank" rel="noreferrer">Docs</a>
            }
          </div>

          <div class="prose" [innerHTML]="project.html"></div>
        </article>

        @if (project.headings.length > 1) {
          <aside class="card toc">
            <h2>On this project page</h2>
            <nav aria-label="Project table of contents">
              <ul>
                @for (heading of project.headings; track heading.id) {
                  <li [class.toc__child]="heading.depth === 3">
                    <a [href]="'#' + heading.id">{{ heading.text }}</a>
                  </li>
                }
              </ul>
            </nav>
          </aside>
        }
      </section>
    } @else {
      <section class="card empty-state">
        <p class="eyebrow">Missing project</p>
        <h1>That project does not exist.</h1>
        <p>There is no published project entry for this slug yet.</p>
        <a class="button button--primary" routerLink="/projects">Back to projects</a>
      </section>
    }
  `,
  styles: `
    .project-layout {
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

    .eyebrow {
      margin-bottom: 0.5rem;
      font-size: 0.82rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-accent);
      font-weight: 700;
    }

    .lede,
    .meta-row {
      color: var(--color-text-muted);
    }

    .meta-row,
    .chip-row,
    .link-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .meta-row,
    .chip-row {
      margin: 1rem 0 1.25rem;
    }

    .link-row {
      margin-bottom: 2rem;
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

    .empty-state {
      display: grid;
      gap: 1rem;
      max-width: 40rem;
    }

    @media (max-width: 980px) {
      .project-layout {
        grid-template-columns: 1fr;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(BlogContentService);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  readonly project = computed(() => this.content.getProjectBySlug(this.slug()));
  readonly formatDate = formatPublishedDate;

  constructor() {
    effect(() => {
      const slug = this.slug();
      const project = this.project();

      if (!slug || !project) {
        this.seo.update({
          title: 'Project not found',
          description: 'The requested project could not be found.',
          path: `/projects/${slug ?? ''}`,
          robots: 'noindex,follow',
        });
        return;
      }

      this.seo.update({
        title: project.title,
        description: project.description,
        path: `/projects/${project.slug}`,
      });
    });
  }
}
