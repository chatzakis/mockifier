import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoParams {
  title?: string;
  description?: string;
  lan?: string;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  // PLEASE EDIT
  private baseURL = 'https://mockifier.web.app/';
  private siteName = 'Mockifier - Data generator';
  private defaultTitle = 'Mockifier - Data generator';
  private defaultDescription = 'Generate or Export Data Easily to import in applications and Databases ';
  private defaulImage = 'images/og.jpg';
  private defaultLanguage = 'en_GB';

  constructor(private titleService: Title, private meta: Meta) {}

  private dom = inject(DOCUMENT);

  setSEOData(params: SeoParams) {
    // Set titles
    if (params.title) {
      this.titleService.setTitle(params.title);
      this.meta.updateTag({
        property: 'og:title',
        content: params.title,
      });
    } else {
      this.titleService.setTitle(this.defaultTitle);
      this.meta.updateTag({
        property: 'og:title',
        content: this.defaultTitle,
      });
    }
    // Set Descriptions
    if (params.description) {
      this.meta.updateTag({
        name: 'description',
        content: params.description,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: params.description,
      });
    } else {
      this.meta.updateTag({
        name: 'description',
        content: this.defaultDescription,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: this.defaultDescription,
      });
    }
    // Type
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    // Language
    if (params.lan)
      this.meta.updateTag({ property: 'og:locale', content: params.lan });
    else
      this.meta.updateTag({
        property: 'og:locale',
        content: this.defaultLanguage,
      });
    // Social Image
    if (params.image)
      this.meta.updateTag({ property: 'og:image', content: params.image });
    else
      this.meta.updateTag({ property: 'og:image', content: this.defaulImage });
    // Site Name
    this.meta.updateTag({
      property: 'og:site_name',
      content: this.siteName,
    });
    if (typeof window !== 'undefined') {
      // URL
      this.meta.updateTag({
        property: 'og:url',
        content: window.location.href,
      });
      // Canonical URL
      this.updateCanonicalUrl(window.location.pathname);
    }
  }

  updateCanonicalUrl(url: string) {
    const head = this.dom.getElementsByTagName('head')[0];
    var element: any = this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', this.baseURL + url);
  }
}
