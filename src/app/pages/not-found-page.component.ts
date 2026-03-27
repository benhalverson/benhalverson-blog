import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';

@Component({
  imports: [RouterLink],
  template: `
    <section class="card">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The route exists in the app, but nothing has been published for it yet.</p>
      <div class="actions">
        <a class="button button--primary" routerLink="/">Home</a>
        <a class="button" routerLink="/posts">Posts</a>
      </div>
    </section>
  `,
  styles: `
    .card {
      display: grid;
      gap: 1rem;
      max-width: 40rem;
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

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => {
      this.seo.update({
        title: 'Page not found',
        description: 'The requested page could not be found.',
        path: '/404',
        robots: 'noindex,follow',
      });
    });
  }
}
