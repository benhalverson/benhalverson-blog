import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogContentService } from '../blog/blog-content.service';
import { SeoService } from '../core/seo.service';

@Component({
  imports: [RouterLink],
  template: `
    @if (aboutPage(); as aboutPage) {
      <section class="about-layout">
        <article class="card">
          <p class="eyebrow">About</p>
          <h1>{{ aboutPage.title }}</h1>
          <p class="lede">{{ aboutPage.description }}</p>
          <div class="prose" [innerHTML]="aboutPage.html"></div>
        </article>

        @if (aboutPage.headings.length > 1) {
          <aside class="card toc">
            <h2>Sections</h2>
            <nav aria-label="About page sections">
              <ul>
                @for (heading of aboutPage.headings; track heading.id) {
                  <li><a [href]="'#' + heading.id">{{ heading.text }}</a></li>
                }
              </ul>
            </nav>
            <a class="button button--primary" routerLink="/posts">Read the posts</a>
          </aside>
        }
      </section>
    } @else {
      <section class="card">
        <p class="eyebrow">About</p>
        <h1>About page missing</h1>
        <p>The about page Markdown file has not been generated into the app yet.</p>
      </section>
    }
  `,
  styles: `
    .about-layout {
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

    .lede {
      color: var(--color-text-muted);
      margin-bottom: 1.5rem;
    }

    .toc ul {
      display: grid;
      gap: 0.7rem;
      padding: 0;
      margin: 1rem 0 1.25rem;
      list-style: none;
    }

    @media (max-width: 980px) {
      .about-layout {
        grid-template-columns: 1fr;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  private readonly content = inject(BlogContentService);
  private readonly seo = inject(SeoService);

  readonly aboutPage = computed(() => this.content.aboutPage());

  constructor() {
    effect(() => {
      const aboutPage = this.aboutPage();

      this.seo.update({
        title: aboutPage?.title ?? 'About',
        description: aboutPage?.description ?? 'About Ben Halverson.',
        path: '/about',
      });
    });
  }
}
