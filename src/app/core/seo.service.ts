import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

type SeoConfig = {
  title: string;
  description: string;
  path: string;
  canonicalUrl?: string;
  robots?: string;
  type?: 'article' | 'website';
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly baseUrl = 'https://benhalverson.com';
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(config: SeoConfig): void {
    const pageTitle = `${config.title} | Ben Halverson`;
    const canonicalUrl = config.canonicalUrl ?? `${this.baseUrl}${config.path}`;
    const type = config.type ?? 'website';

    this.title.setTitle(pageTitle);
    this.setTag('name', 'description', config.description);
    this.setTag('name', 'robots', config.robots ?? 'index,follow');
    this.setTag('property', 'og:title', pageTitle);
    this.setTag('property', 'og:description', config.description);
    this.setTag('property', 'og:url', canonicalUrl);
    this.setTag('property', 'og:type', type);
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', pageTitle);
    this.setTag('name', 'twitter:description', config.description);
    this.setCanonicalUrl(canonicalUrl);
  }

  private setTag(attributeName: 'name' | 'property', attributeValue: string, content: string): void {
    this.meta.updateTag({ [attributeName]: attributeValue, content });
  }

  private setCanonicalUrl(url: string): void {
    let linkElement = this.document.head.querySelector('link[rel="canonical"]');

    if (!(linkElement instanceof HTMLLinkElement)) {
      linkElement = this.document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      this.document.head.appendChild(linkElement);
    }

    linkElement.setAttribute('href', url);
  }
}
