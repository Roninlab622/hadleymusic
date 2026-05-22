# Hadley Music Website — Project Brief

## What this is

A website that brings every Hadley Band concert recording together in one place,
makes it easy for the community to watch them, and channels support to the nonprofit
that funds the program. This file describes the **goals** of the project — not how to
build it. Design, structure, framework, and styling decisions are yours to make.

## Status

Day 1. This is a working draft / concept build, not yet an official site. It will be
hosted on Cloudflare Pages from a GitHub repo to start (a real domain comes later).
Treat everything as a mockup for review until the organizations involved sign off.

## The organizations involved

There are two separate groups, and keeping them distinct matters:

* **Hadley Media** — the Town of Hadley's media branch. They record and produce the
concert videos and **own the footage**. The site showcases their work; it does not
claim ownership of the videos.
* **Hadley Band Boosters** — a registered 501(c)(3) nonprofit (EIN 81-2995612) that
funds the band program (instruments, sheet music, festival fees, scholarships, etc.).
All donations and merchandise support flow to the Boosters. **The site itself never
handles money** — buttons link out to the Boosters' own donation and store pages.

The site should make this two-party relationship clear so neither group feels
overstepped: the town produces the content, the nonprofit receives the support, and
the site simply connects them to the community.

## Core goal (build this first)

**A browsable archive of all Hadley Band concert videos that people can watch on the site.**

Important detail about the source videos:

* The concert videos currently live on the **Hadley Media YouTube channel**, but they
are **mixed in with unrelated content** (town meetings, public-access programming, etc.).
* This means I **cannot point the site at the channel feed** and auto-pull band videos —
there's no clean way to filter just the concerts out of that channel.
* So for now, **I will collect the individual concert video links/IDs by hand** and
provide them. The site should be structured so that adding a concert is as simple as
possible — ideally just adding an entry to a data file (e.g. a list/JSON of concerts),
not editing layout or markup each time.

Each concert entry will minimally have: a title, a date, the YouTube video ID, and
optionally which ensemble performed (full band, jazz, strings, etc.). Design the data
shape so it can hold a little metadata per concert and grow later.

## Secondary goals (present these now, even if not fully wired up)

* **Donate button** → links out to the Hadley Band Boosters' donation page.
(The exact donation URL is TBD — leave it as a clearly-marked placeholder for now.)
* **Merch / shop** → currently the Boosters sell an annual community calendar. Link out
to wherever that's sold. Build it so it could grow into a fuller storefront later, but
don't build an actual store — just a link out for now.

## Longer-term vision (don't build yet, but build *toward*)

The goal is for the site to eventually update itself instead of being maintained by hand:

1. **Per-concert downloads** — a "download" button next to each video so people can keep
a copy. These would come from the band's/Media's own hosted copy of the file, **not**
scraped from YouTube. (Hosting for the downloadable originals is a later decision.)
2. **Auto-updating feed** — the long-term aim is an RSS / Podcasting 2.0–style video feed
so that when Hadley Media publishes a new concert, it appears on the site automatically.
The manual concert list built today should be shaped to mirror what a feed item would
carry (title, date, media reference, description, etc.) so that swapping the hand-kept
list for a feed-driven one later is a small change, not a rewrite.

## Phasing summary

* **Phase 1 (now):** Watch the full concert archive. Videos added by hand from a data file.
* **Phase 2:** Real donate + shop links wired in.
* **Phase 3:** Per-concert downloads from self-hosted originals.
* **Phase 4:** Auto-updating feed (RSS / Podcasting 2.0) replaces the manual list.

## Constraints / notes for the build

* Static-site friendly (it's going on Cloudflare Pages).
* Adding/editing a concert should not require touching layout — keep the concert data
separate from presentation.
* Keep the YouTube relationship clean: embed for watching, never scrape/download from it.
* Money never flows through the site — only outbound links to the Boosters' own pages.
* Until approved, keep it visibly marked as a draft/concept.

