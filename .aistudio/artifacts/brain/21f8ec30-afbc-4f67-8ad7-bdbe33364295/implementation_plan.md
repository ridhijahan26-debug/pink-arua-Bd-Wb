# Adsterra Ads Network Integration Plan — Pink Aura BD

Integration of user-supplied Adsterra advertising tags (Popunder, Social Bar, and Native Ads widget) across the live Pink Aura BD video discovery platform and the downloadable WordPress Astra Child Theme suite.

## User Review & Critical Decisions

> [!IMPORTANT]
> The exact Adsterra scripts provided by the user will be embedded:
> - **Popunder Script**: `https://ahuramazda.org/1/d6fbfa8198745fa537bebf4396a053f2`
> - **Social Bar Script**: `https://brijmohan.org/14/db4168cfe37f586af8254e9f49cd9741`
> - **Native Ads Script & Container**: `https://brijmohan.org/21/3a604443ad36d86d2d1f80e17d7c66bb` with `<div id="container-3a604443ad36d86d2d1f80e17d7c66bb"></div>`

- **Confirmed Decision 1**: Native Ads widget will be embedded both on the homepage discovery feed (between Trending and Region sections) and under the single video post player for maximum monetization.
- **Confirmed Decision 2**: Popunder and Social Bar scripts will be injected globally across all user sessions and interactions without interfering with video controls or layout stability.
- **Confirmed Decision 3**: Synchronize WordPress Astra Child Theme templates (`functions.php`, `front-page.php`, `single-video.php`) with the user's exact Adsterra script URLs so theme exports work out-of-the-box.

---

## 1. Overview & Core Concept

- **What It Does**: Activates real Adsterra revenue generation on Pink Aura BD. Visitors browsing video feeds and playing content will encounter high-converting Popunder triggers, an interactive Social Bar notification, and responsive in-feed Native Ads that blend seamlessly with the dark neon aesthetic.
- **Target Audience / Persona**: Media discovery platform owners monetizing video traffic via CPM, CPC, and popunder formats.
- **Key Value**: Zero layout distortion, script sandbox resilience, and exact code synchronization between React live preview and production WordPress files.

---

## 2. User Experience & Visual Design

- **Popunder**: Injected in `index.html` `<head>` and WordPress `wp_head` with `data-cfasync="false"`, triggering on visitor interaction without obstructing video playback controls.
- **Social Bar**: Injected asynchronously before `</body>` to render a sticky, high-CTR interactive notification banner across mobile and desktop.
- **Native Ads Widget**: Wrapped inside a dedicated, styled container (`id="container-3a604443ad36d86d2d1f80e17d7c66bb"`) with dark-theme container borders and fallback presentation so the layout remains clean before and during ad delivery.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: React Script Injection Strategy for Native Ads**
  - *Chosen Approach*: Implement a dedicated `AdsterraNativeAd` component using `useEffect` to safely append the script `https://brijmohan.org/21/3a604443ad36d86d2d1f80e17d7c66bb` and mount the container element `<div id="container-3a604443ad36d86d2d1f80e17d7c66bb"></div>` without duplicate script execution.
  - *Why*: Ensures clean execution in single-page React environments without crashing virtual DOM re-renders.

- **Decision 2: WordPress Child Theme Parity**
  - *Chosen Approach*: Embed the exact scripts in `functions.php` via `wp_enqueue_script` / `wp_head` hooks, and place the container in `front-page.php` and `single-video.php`.
  - *Why*: When the user downloads or copies the WordPress files, they will work on their live WordPress site immediately with no editing required.

---

## 4. Technical Architecture & Integration Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Pink Aura BD - Ads Engine                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┴──────────────────────────────┐
    ▼                                                              ▼
┌─────────────────────────────────┐              ┌─────────────────────────────────┐
│       Live Web Application      │              │   WordPress Astra Child Theme   │
│ ┌─────────────────────────────┐ │              │ ┌─────────────────────────────┐ │
│ │ index.html: Popunder &      │ │              │ │ functions.php: wp_head &    │ │
│ │ Social Bar scripts          │ │              │ │ wp_footer hooks             │ │
│ ├─────────────────────────────┤ │              │ ├─────────────────────────────┤ │
│ │ AdsterraNativeAd Component  │ │              │ │ front-page.php: Native      │ │
│ │ with container-3a604443...  │ │              │ │ container-3a604443...       │ │
│ ├─────────────────────────────┤ │              │ ├─────────────────────────────┤ │
│ │ SingleVideoModal & Feed     │ │              │ │ single-video.php: Under-    │ │
│ │ Integration                 │ │              │ │ player native container     │ │
│ └─────────────────────────────┘ │              │ └─────────────────────────────┘ │
└─────────────────────────────────┘              └─────────────────────────────────┘
```
