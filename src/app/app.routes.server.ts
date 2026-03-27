import { RenderMode, ServerRoute } from '@angular/ssr';
import { generatedPosts, generatedProjects } from './blog/generated/content.generated';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'posts',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'projects',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'posts/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return generatedPosts
        .filter((post) => !post.draft)
        .map((post) => ({ slug: post.slug }));
    },
  },
  {
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return generatedProjects
        .filter((project) => !project.draft)
        .map((project) => ({ slug: project.slug }));
    },
  },
  {
    path: 'tags/:tag',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const tags = [...new Set(generatedPosts.flatMap((post) => post.tags.map((tag) => tag.toLowerCase())))];

      return tags.map((tag) => ({ tag }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
