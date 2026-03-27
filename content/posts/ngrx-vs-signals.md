---
title: "State Management: NgRx vs Signals"
slug: ngrx-vs-signals
description: Comparing NgRx and Angular Signals by the cost they introduce and the kinds of problems they solve well.
publishedAt: 2026-03-18
tags:
  - Angular
  - State Management
  - TypeScript
draft: false
featured: true
---

The right state tool depends less on ideology and more on the shape of your constraints.

## When signals are enough

Signals are a strong default for component-local state and many page-level workflows. They make data flow easier to trace, and they remove a large amount of ceremony when the application does not need event sourcing or cross-feature replayability.

## When NgRx still earns its place

NgRx becomes more valuable when the application needs explicit event history, complex side effects, or large teams aligning around predictable update boundaries.

## A practical rule

Start with signals unless you can name the coordination problems that require a bigger state model. That keeps the codebase smaller and lets complexity appear only when it is actually justified.

```ts
readonly selectedTag = signal<string | null>(null);
readonly filteredPosts = computed(() => {
  const tag = this.selectedTag();

  return tag ? this.posts().filter((post) => post.tags.includes(tag)) : this.posts();
});
```
