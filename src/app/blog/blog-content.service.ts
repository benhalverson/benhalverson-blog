import { Injectable, computed, signal } from '@angular/core';
import { generatedPages, generatedPosts, generatedProjects } from './generated/content.generated';
import type { GeneratedPage, GeneratedPost, GeneratedProject, TagSummary } from './models';

@Injectable({ providedIn: 'root' })
export class BlogContentService {
  private readonly postsState = signal(generatedPosts);
  private readonly pagesState = signal(generatedPages);
  private readonly projectsState = signal(generatedProjects);

  readonly publishedPosts = computed(() => {
    return [...this.postsState()]
      .filter((post) => !post.draft)
      .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
  });

  readonly featuredPosts = computed(() => {
    const publishedPosts = this.publishedPosts();
    const featuredPosts = publishedPosts.filter((post) => post.featured);

    return featuredPosts.length > 0 ? featuredPosts.slice(0, 3) : publishedPosts.slice(0, 3);
  });

  readonly latestPosts = computed(() => this.publishedPosts().slice(0, 4));

  readonly tags = computed<TagSummary[]>(() => {
    const tagMap = new Map<string, number>();

    for (const post of this.publishedPosts()) {
      for (const tag of post.tags) {
        tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
      }
    }

    return [...tagMap.entries()]
      .map(([name, postCount]) => ({ name, postCount }))
      .sort((left, right) => left.name.localeCompare(right.name));
  });

  readonly aboutPage = computed(() => this.pagesState().find((page) => page.slug === 'about') ?? null);
  readonly publishedProjects = computed(() => {
    return [...this.projectsState()]
      .filter((project) => !project.draft)
      .sort((left, right) => (right.updatedAt ?? right.startedAt).localeCompare(left.updatedAt ?? left.startedAt));
  });

  readonly featuredProjects = computed(() => {
    const publishedProjects = this.publishedProjects();
    const featuredProjects = publishedProjects.filter((project) => project.featured);

    return featuredProjects.length > 0 ? featuredProjects.slice(0, 3) : publishedProjects.slice(0, 3);
  });

  getPostBySlug(slug: string | null | undefined): GeneratedPost | null {
    if (!slug) {
      return null;
    }

    return this.publishedPosts().find((post) => post.slug === slug) ?? null;
  }

  getPostsByTag(tag: string | null | undefined): GeneratedPost[] {
    if (!tag) {
      return [];
    }

    const normalizedTag = tag.toLowerCase();

    return this.publishedPosts().filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === normalizedTag));
  }

  getAdjacentPosts(slug: string | null | undefined): { previous: GeneratedPost | null; next: GeneratedPost | null } {
    const posts = this.publishedPosts();
    const currentIndex = posts.findIndex((post) => post.slug === slug);

    if (currentIndex === -1) {
      return { previous: null, next: null };
    }

    return {
      previous: posts[currentIndex + 1] ?? null,
      next: posts[currentIndex - 1] ?? null,
    };
  }

  getPageBySlug(slug: string | null | undefined): GeneratedPage | null {
    if (!slug) {
      return null;
    }

    return this.pagesState().find((page) => page.slug === slug) ?? null;
  }

  getProjectBySlug(slug: string | null | undefined): GeneratedProject | null {
    if (!slug) {
      return null;
    }

    return this.publishedProjects().find((project) => project.slug === slug) ?? null;
  }
}
