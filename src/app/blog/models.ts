export type HeadingLink = {
  depth: number;
  id: string;
  text: string;
};

export type ReadingTime = {
  text: string;
  minutes: number;
  words: number;
};

export type GeneratedPost = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  draft: boolean;
  coverImage?: string;
  canonicalUrl?: string;
  featured: boolean;
  readingTime: ReadingTime;
  headings: HeadingLink[];
  html: string;
};

export type GeneratedPage = {
  title: string;
  slug: string;
  description: string;
  headings: HeadingLink[];
  html: string;
};

export type ProjectStatus = 'active' | 'paused' | 'planning' | 'shipping';

export type GeneratedProject = {
  title: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  startedAt: string;
  updatedAt?: string;
  tags: string[];
  draft: boolean;
  featured: boolean;
  repoUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  headings: HeadingLink[];
  html: string;
};

export type TagSummary = {
  name: string;
  postCount: number;
};
