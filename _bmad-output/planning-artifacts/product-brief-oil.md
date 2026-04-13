---
title: "Product Brief: Global Energy Crisis Command Center"
status: "complete"
created: "2026-04-12"
updated: "2026-04-12"
inputs:
  - "PRD-Energy-Crisis-Command-Center.md (v1.1 BMAD Standard)"
  - "prd-validation-report-v2.md"
  - "prd-validation-report.md (original validation)"
---

# Product Brief: Global Energy Crisis Command Center

## Executive Summary

The Global Energy Crisis Command Center is a single-file, zero-backend interactive web application that consolidates economic analysis of the 2026 energy crisis into one view. Triggered by the Iran war and Strait of Hormuz closure, this crisis has shut in 9.1 million barrels/day of oil production, blocked 20% of global oil and LNG flows, and pushed Brent crude above $100/barrel. The cascading impacts reach fertilizer, helium, petrochemicals, shipping, aviation, food prices, and industrial output. The UN projects global trade growth halving from 4.7% to 1.5-2.5%.

No single existing tool provides an integrated, interactive view of the full economic picture. This application fills that gap — 14 analytical panels covering supply, demand, macro, scenarios, and cascading supply chain effects, all in a dark-themed command center aesthetic. Free, offline-capable, no authentication required.

## The Problem

Analysts, journalists, and policymakers tracking the 2026 energy crisis must manually synthesize data from dozens of fragmented sources — IEA trackers, EIA outlooks, ECB projections, OECD reports, shipping monitors, UNCTAD trade data. Each source covers one dimension. Understanding how an oil price shock cascades through GDP, inflation, supply chains, food prices, and policy responses requires stitching together multiple platforms manually.

This fragmentation has a real cost: delayed briefings, missed second-order effects, and incomplete analysis. A policy analyst at the IMF preparing a morning briefing must visit 5+ platforms to get the full picture. A Reuters energy correspondent verifying data points for an article must cross-reference across sources that don't talk to each other. The status quo is slow, error-prone, and leaves blind spots.

## The Solution

A single-page web application with 14 interactive panels:

- **Overview Dashboard** — 6 KPI cards, oil price trend, written briefing with sourced data
- **Hormuz Monitor** — Shipping traffic across 9 time periods, ceasefire status
- **GDP/CPI Heatmap** — 8-region sortable grid with dual-bar visualization
- **Stagflation Dashboard** — 8 macro indicators with danger/safe classification
- **Supply Chain Cascade** — 19-node dependency graph tracing upstream causes and downstream effects
- **Scenario War Room** — 4 probability-weighted geopolitical scenarios with projected metrics
- **Economic Simulator** — 3 adjustable sliders producing 5 computed outputs in real-time
- **Oil Price Chart, Supply Disruption, Country Vulnerability, Crisis Timeline, Policy Tracker, Historical Comparison, Energy Transition** — Specialized analytical panels

All data is embedded as static constants. Zero backend, zero API keys, zero paid dependencies. Works offline. Opens directly in a browser — no build step.

## What Makes This Different

| Competitor | What They Do | What They Don't |
|-----------|-------------|----------------|
| IEA Policy Tracker | Official country-level policy data | No simulation, no cascade analysis, no scenario modeling |
| Bloomberg Terminal | Comprehensive financial data | $25K/year, not public, no educational focus |
| EIA STEO Reports | Authoritative US energy data | PDF-only, no interactivity, US-centric |
| OECD Economic Outlook | Rigorous macro modeling | No energy-specific drill-down, no visualization |

**This product combines five dimensions no existing tool integrates:** supply dynamics, demand modeling, macro impact, scenario projection, and supply chain cascade analysis — in a free, offline, zero-authentication package.

The technical moat is simplicity: a single HTML file under 35KB that renders 14 interactive analytical panels with custom SVG charts. No build step, no dependencies, no server. That constraint forces clarity and enables distribution — share the file, it works.

**Data staleness protocol:** Static embedded data carries a "Data as of [date]" timestamp per panel. Panels older than 7 days trigger an amber stale indicator. Data updates follow a manual swap protocol: replace embedded data constants, verify zero logic changes required, re-share the file. This keeps the app honest about currency without pretending to be real-time.

**Distribution:** Initial reach through energy economics communities on Reddit (r/energy, r/economics), targeted threads on X/Twitter tagging energy journalists and analysts, and direct outreach to university economics departments teaching crisis analysis. The single-file format enables frictionless sharing — no install, no signup, no server costs.

## Who This Serves

**Primary: Policy Analyst** (e.g., IMF/World Bank energy division)
Needs rapid synthesis of macro data, scenario comparison, and export-ready insights for briefings. Success = complete crisis picture in under 5 minutes.

**Primary: Journalist** (e.g., Reuters energy correspondent)
Needs citable data with source attribution, visual evidence for articles, and rapid answers to specific questions. Success = verified data points for an article in under 10 minutes.

**Secondary:** Economists, students, investors, and the informed public seeking a single integrated view of the crisis.

## Success Criteria

Validation is self-contained — no external user testing panel required. Criteria are either machine-verifiable or demonstrable through solo walkthrough.

| # | Criterion | Validation Method |
|---|-----------|-------------------|
| SC-01 | Country GDP exposure visible within 2 interactions from landing (Overview → GDP Heatmap) | Click count: verify path is 2 clicks from any panel |
| SC-02 | Scenario comparison shows oil price, GDP impact, and recovery timeline when 2+ scenarios selected | Visual check: all 3 metrics render on scenario selection |
| SC-03 | Supply chain cascade traces to 3rd-order effects in ≤4 node selections | Click count: select node → verify children → select child → verify children of children |
| SC-04 | Economic simulator recalculates 5 outputs within 100ms of any slider change | Performance: measure with Chrome DevTools on slider drag |
| SC-05 | All 14 panels load with zero console errors across Chrome, Firefox, Safari | Automated: open file in each browser, verify `window.onerror` count = 0 |
| SC-06 | Displayed data matches official sources within 2% deviation | Manual audit: spot-check 10 random data points against cited sources |

## Scope

**In (MVP):**
- 14 interactive panels with embedded static data (as of April 11, 2026)
- Dark theme command center aesthetic
- Desktop and mobile responsive
- Offline capable, single-file deployment
- WCAG 2.1 AA accessibility

**Out (Phase 2/3):**
- Live API integration, server-side caching, push notifications
- User accounts, saved configurations, collaborative features
- Monte Carlo simulation, ML forecasting, NL briefing generation
- PDF/PNG export, internationalization

## Vision

Phase 1 proves the concept: a single integrated view of the crisis that works anywhere, costs nothing, and needs no infrastructure. Phase 2 plugs in live data sources (EIA, FRED, AIS shipping) for real-time monitoring. Phase 3 adds advanced analytics — Monte Carlo simulation, AI-powered briefings, collaborative annotation — transforming it from a crisis tracker into an ongoing energy intelligence platform.

The long-term play: become the go-to open tool for energy crisis analysis. Every future energy shock — and there will be more — needs exactly this. If the 2026 crisis resolves, the historical comparison panel (1973 embargo, 1990 Gulf War, 2026 crisis side-by-side) gives the app enduring reference value, and the architecture becomes a reusable template for future energy disruption analysis.
