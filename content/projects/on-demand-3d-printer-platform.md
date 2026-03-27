---
title: On-Demand 3D Printer Platform
slug: on-demand-3d-printer-platform
description: API and web application for intake, quoting, queue management, and fulfillment across custom print requests.
status: active
startedAt: 2026-01-12
updatedAt: 2026-03-24
tags:
  - TypeScript
  - API
  - Angular
  - 3D Printing
draft: false
featured: true
repoUrl: https://github.com/benhalverson
---

## Overview

This project is meant to turn a pile of manual print-request coordination into a usable system. The API handles request intake and print-job state. The web app handles quoting, operations visibility, and customer communication.

## Current milestone

Build a dependable order-to-queue path that keeps pricing, material selection, and production status aligned.

## Roadmap

- [ ] Define the request and quote lifecycle clearly
- [ ] Add authenticated operator workflows for reviewing jobs
- [ ] Track printer capacity and queue contention
- [ ] Generate customer-visible status updates
- [ ] Add webhook-driven notifications for state changes

## Notes

The hard part is not rendering another dashboard. It is keeping operational truth in one place so requests do not drift across spreadsheets, messages, and half-finished admin tooling.
