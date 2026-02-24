# Air Canada Strike Tracker

> Real-time Air Canada strike status tracker with flight impact dashboards, timeline, analysis, and bilingual (EN/FR) i18n support.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-Bilingual-26A69A?logo=i18next&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-000000?logo=shadcnui&logoColor=white)

## Overview

The Air Canada Strike Tracker (strikecost.ca) is a comprehensive information dashboard tracking the Air Canada labor dispute. It provides real-time strike status updates, an impact dashboard, interactive analysis tools, a detailed event timeline, sourced journalism, and resources for affected travelers. The entire site is fully bilingual with English and French language support via i18next. The project was created by Izzy Piyale-Sheard and built with Lovable.

## Features

- **Breaking News Banner** -- Persistent banner with the latest strike developments
- **Strike Impact Dashboard** -- Visual overview of strike cost and operational impact metrics
- **The Strike Story** -- Narrative-driven breakdown of the labor dispute with dual-perspective analysis
- **Interactive Analysis Tools** -- Strike vs. settlement comparator, contract value analyzer, settlement customizer, and storytelling calculator
- **Live Strike Cost Counter** -- Real-time counter estimating ongoing financial impact
- **Stock Tracker** -- Air Canada stock performance tracking during the dispute
- **Strike Timeline** -- Chronological event log with story highlights
- **Source Verification** -- Cited sources with informative tooltips throughout
- **Resources Section** -- Links and guidance for travelers affected by the strike
- **Changelog** -- Dedicated changelog pages (EN/FR) tracking site updates
- **Bilingual i18n** -- Full English and French translations via i18next with browser language detection
- **Career/Ad Integration** -- Strategic ad placements for career-related services
- **Resume Bottom Sheet** -- Mobile-friendly resume viewing component

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript 5 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 + tailwindcss-animate |
| UI Components | shadcn/ui (Radix primitives) |
| i18n | i18next + react-i18next + browser language detector |
| Routing | React Router DOM 6 |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| State | TanStack React Query |

## Getting Started

```bash
# Clone the repository
git clone git@github.com:izzydoesizzy/air-canada-strike-tracker.git
cd air-canada-strike-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/
│   ├── BreakingNewsBanner.tsx       # Breaking news alert bar
│   ├── Navigation.tsx               # Main nav with language switching
│   ├── LanguageNavigation.tsx       # EN/FR language toggle
│   ├── DesktopNavigationMenu.tsx    # Desktop nav menu
│   ├── MobileNavigationMenu.tsx     # Mobile nav menu
│   ├── StrikeImpactDashboard.tsx    # Impact metrics dashboard
│   ├── TheStrikeStory.tsx           # Narrative strike breakdown
│   ├── StrikeTimeline.tsx           # Chronological event timeline
│   ├── StrikeAnalysis.tsx           # Comprehensive analysis section
│   ├── StrikeOverview.tsx           # High-level strike overview
│   ├── StrikeInfo.tsx               # Key strike information
│   ├── StrikeVsSettlement.tsx       # Strike vs. settlement comparison
│   ├── StorytellingCalculator.tsx   # Interactive impact calculator
│   ├── ContractValueAnalyzer.tsx    # Contract value analysis tool
│   ├── SettlementCustomizer.tsx     # Settlement scenario builder
│   ├── DualPerspectiveAnalysis.tsx  # Union vs. airline perspective view
│   ├── LiveStrikeCostCounter.tsx    # Real-time cost counter
│   ├── StockTracker.tsx             # Stock performance tracker
│   ├── StoryHighlights.tsx          # Key story highlights
│   ├── StoryIntroduction.tsx        # Story intro section
│   ├── Resources.tsx                # Traveler resources
│   ├── Sources.tsx                  # Source citations
│   ├── SourceTooltip.tsx            # Source tooltip component
│   ├── InformativeTooltip.tsx       # Informational tooltips
│   ├── CareerAd.tsx                 # Career ad component
│   ├── AdSpot.tsx                   # Ad placement component
│   ├── EnhancedMobileAd.tsx         # Mobile-optimized ad
│   ├── ResumeBottomSheet.tsx        # Mobile resume viewer
│   └── ui/                          # shadcn/ui primitives
├── pages/
│   ├── IndexEN.tsx                  # English home page
│   ├── IndexFR.tsx                  # French home page
│   ├── ChangelogEN.tsx              # English changelog
│   ├── ChangelogFR.tsx              # French changelog
│   └── NotFound.tsx                 # 404 page
└── main.tsx                         # App entry point
```

## Deployment

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

The build output is a static site that can be deployed to any hosting provider.

---

**Tags:** `web-app`, `fun-project`
**Created:** 2025-08
**Status:** Functional
**Author:** [Izzy Piyale-Sheard](https://github.com/izzydoesizzy) -- @izzydoesizzy
