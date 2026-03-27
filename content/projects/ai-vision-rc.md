---
title: AI Vision for RC Systems
slug: ai-vision-rc
description: Computer vision experiments for RC vehicles, onboard perception, and human-in-the-loop control workflows.
status: planning
startedAt: 2026-02-03
updatedAt: 2026-03-21
tags:
  - AI
  - Vision
  - Robotics
  - Edge
draft: false
featured: true
repoUrl: https://github.com/benhalverson
---

## Overview

This is a collection of experiments around using lightweight vision models for RC use cases: environment awareness, target recognition, telemetry overlays, and assistive control loops.

## Current milestone

Identify which perception tasks are realistic under tight compute and battery constraints before building a lot of integration code.

## Roadmap

- [ ] Benchmark small vision models on target hardware
- [ ] Capture representative field data for evaluation
- [ ] Build a repeatable inference and telemetry pipeline
- [ ] Prototype alerting and assistive control behaviors
- [ ] Decide what should stay local versus off-device

## Notes

The value here depends on disciplined testing more than clever demos. If the data collection and evaluation loop is weak, the rest of the project will look more capable than it really is.
