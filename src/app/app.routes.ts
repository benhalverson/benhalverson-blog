import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page.component').then((module) => module.HomePageComponent),
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts-page.component').then((module) => module.PostsPageComponent),
  },
  {
    path: 'posts/:slug',
    loadComponent: () => import('./pages/post-page.component').then((module) => module.PostPageComponent),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects-page.component').then((module) => module.ProjectsPageComponent),
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./pages/project-page.component').then((module) => module.ProjectPageComponent),
  },
  {
    path: 'tags/:tag',
    loadComponent: () => import('./pages/tag-page.component').then((module) => module.TagPageComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page.component').then((module) => module.AboutPageComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found-page.component').then((module) => module.NotFoundPageComponent),
  },
];
