import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly theme = inject(ThemeService);

  readonly navItems = [
    { href: '/', label: 'Home', exact: true },
    { href: '/posts', label: 'Posts', exact: false },
    { href: '/projects', label: 'Projects', exact: false },
    { href: '/about', label: 'About', exact: true },
  ] as const;

  readonly exactMatchOptions = { exact: true } as const;
  readonly subsetMatchOptions = { exact: false } as const;

  readonly themeToggleLabel = computed(() =>
    this.theme.isDark() ? 'Switch to light theme' : 'Switch to dark theme',
  );
}
