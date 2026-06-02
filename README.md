

# 📘 DailyFlow — UI Architecture & State-Driven Orchestration
**Version:** 1.0.0 | **Status:** Phase 1 (Frontend Architecture & System Design)

> An elegant, glassmorphic frontend architecture designed to streamline daily workflows, transitioning analog daily planning into a scalable, event-driven digital ecosystem.

## 🔮 Visual Interface & Design Prototyping

This repository encompasses two distinct architectural layers of the frontend development process:

### 1. Visionary Concept (The Ultimate Goal)
The core design philosophy features an abstract, ethereal **Glassmorphism theme** (Dark/Purple aesthetics). These conceptual prototypes define the target UI/UX for the final scalable product.

![DailyFlow Concept UI Part 1](https://github.com/mahla-sys/DailyFlow-Workflow-Orchestration/blob/main/Screenshot%202026-06-02%20130306.png?raw=true)

![DailyFlow Concept UI Part 2](https://github.com/mahla-sys/DailyFlow-Workflow-Orchestration/blob/main/Screenshot%202026-06-02%20130334.png?raw=true)

### 2. Modular MVP (Current Implementation)
The foundation of the application, built with strict modularity. While visually stripped down for development, it implements the underlying structural patterns required to scale the application to 10,000+ lines of code without style leaks or state conflicts.

![Modular Architecture UI](https://github.com/mahla-sys/DailyFlow-Workflow-Orchestration/blob/main/Screenshot%202026-06-01%20175355.png?raw=true)

---

## 🏗️ System Architecture: Feature-Sliced Design (FSD)
The codebase is structured around **Business Features** rather than file types, strictly adhering to the **One-Way Dependency Rule**. Upper layers can utilize lower layers, but never the reverse.

```text
app/        ← Orchestration Layer (Initialization & Routing)
  ↓
pages/      ← Routing Layer (URL-specific views)
  ↓
widgets/    ← Composition Layer (Complex UI blocks)
  ↓
features/   ← Business Logic Layer (User interactions & capabilities)
  ↓
entities/   ← Data Model Layer (Business entities)
  ↓
shared/     ← Global Layer (UI kits, Store, Utils, APIs)

```

## 🌳 Core Directory Structure

```text
📁 src/
├── 📂 app/              # Application entry point, global styles, and providers
├── 📂 pages/            # Page-level components (Dashboard, Settings, Analytics)
├── 📂 widgets/          # Assembled UI blocks (Header, Sidebar, ChartPanels)
├── 📂 features/         # Functional units (MoodTracker, TaskManager, VoiceInput)
├── 📂 entities/         # Data models and schemas (Day, Task, Mood)
└── 📂 shared/           # Reusable components, Central Store, EventBus, Utils

```

## 🧠 State Management & Infrastructure

* **Central Store:** A custom-built, lightweight state management system ensuring unidirectional data flow.
* **Pub/Sub Event Bus:** Decoupled communication across distinct features preventing direct file dependencies.
* **Storage Adapters:** Abstracted storage layers currently utilizing `IndexedDB` and `LocalStorage`, structured for seamless future migration to backend databases (e.g., Supabase).

## 🗺️ Development Roadmap

| Phase | Focus Area | Status |
| --- | --- | --- |
| **Phase 0** | Core Architecture (FSD Setup, Custom Store, Event Bus, Storage Adapters) | ✅ Completed |
| **Phase 1** | Modular MVP (Dashboard Page, Core Widgets, Task/Mood Features) | 🚧 In Progress |
| **Phase 2** | UI/UX Overhaul (Implementing the Glassmorphic Concept, Transitions) | ⏳ Pending |
| **Phase 3** | Advanced Capabilities (Voice Input Parsing, Pomodoro Timer, Analytics) | ⏳ Pending |
| **Phase 4** | Backend Integration (Cloud Sync, Supabase DB, Auth) | ⏳ Pending |
| **Phase 5** | AI & Automation (Telegram Bot Integration, AI Pattern Analysis) | ⏳ Pending |

## 📐 Strict Coding Guidelines

1. **Unidirectional Dependency:** `widgets` → `features` → `entities` → `shared`. Circular dependencies are strictly prohibited.
2. **Public API Rule:** Every module must expose its elements exclusively through an `index.js` file (Encapsulation).
3. **Single Responsibility Principle:** Files are strictly separated by logic: `Model`, `UI`, and `Feature/Controller`.
4. **Scalability Thresholds:** Files exceeding 200 lines (JS) or 150 lines (CSS) must be refactored into smaller sub-modules.

---

*Developed & Architected by **mahla-systems**.*
