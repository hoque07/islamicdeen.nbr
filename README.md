# DEEN & DIN (Islamic Web App) - islamicdeen.nbr

DEEN & DIN is a premium Bangla-first Islamic lifestyle Angular SPA. Version 1.1 includes prayer times, Quran reader, Hadith, Dua collection, Asmaul Husna, Tasbih counter, Ramadan tools, articles, global search, dark mode, bookmarks, and localStorage-backed preferences.

## Tech Stack

- Angular latest stable
- TypeScript
- SCSS
- RxJS
- Angular Router
- LocalStorage
- GitHub Pages ready

## Local Setup

~~~bash
cd D:\DEEN-AND-DIN\deen-and-din
npm install
npm start
~~~

Open the local URL shown by Angular CLI, usually http://localhost:4200/.

## Build

~~~bash
npm run build
~~~

Production output is generated under dist/deen-and-din/browser.

## GitHub Repository

Repository name:

~~~text
islamicdeen.nbr
~~~

Branch:

~~~text
main
~~~

Remote:

~~~text
https://github.com/hoque07/islamicdeen.nbr
~~~

## GitHub Pages Deployment

Build with the repository base href:

~~~bash
npm run build:pages
~~~

Deploy:

~~~bash
npm run deploy:pages
~~~

Live URL:

~~~text
https://hoque07.github.io/islamicdeen.nbr/
~~~

## Features

- Home dashboard with Bangla hero, live Bangladesh-time clock, prayer preview, and RxJS countdown
- Prayer times page with next prayer highlight
- Quran reader with Arabic and Bangla translation samples
- Quran bookmark system using localStorage
- Hadith daily card and list
- Dua categories with copy and favorite actions
- Tasbih counter with presets and localStorage persistence
- Ramadan Sehri/Iftar cards and countdown
- Islamic articles cards
- Global English/Bangla search
- Dark mode toggle with saved preference
- Mobile bottom navigation and desktop navbar

## Notes

Version 1.1 keeps the app static for GitHub Pages. The Asmaul Husna data comes from public/data/asmaul_husna.json, so it also works offline after the project is installed locally.
