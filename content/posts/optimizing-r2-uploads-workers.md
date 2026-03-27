---
title: Optimizing R2 Uploads on Workers
slug: optimizing-r2-uploads-workers
description: Practical notes on keeping upload paths reliable and efficient when handling file traffic at the edge.
publishedAt: 2026-03-05
tags:
  - Cloudflare
  - JavaScript
  - Performance
draft: true
featured: false
---

Upload workflows usually fail for operational reasons before they fail for algorithmic ones.

## Push work to the edge carefully

Workers are a good fit for shaping requests, validating inputs, and enforcing policy close to users. They are less useful when the request flow still depends on unstable assumptions about payload size or retries.

## Keep failure modes visible

The most useful optimization is often better observability around upload duration, object size, and retry patterns. Without that, it is easy to overfit for the wrong bottleneck.

## Focus on the slow path

Measure the largest uploads, the highest latency regions, and the paths that trigger retries. Those are usually more informative than median timings.
