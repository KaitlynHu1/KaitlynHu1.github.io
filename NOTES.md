# NOTES — design decisions and changelog

## Decisions (Oct 29, 2026)
- Starting point: a copy of the Oct 27 site in `website_lab/kaitlyn-hu/` (that folder is unchanged). Same layout, IBM Plex Sans, five type sizes, no animation, and the "Used where?" skill buttons on Home.
- Audience: recruiters in financial services / corporate finance. Kaitlyn asked for "clean and professional" and neutral colors.
- Palette (neutral): white #FFFFFF ground, near-black #1A1C20 ink, gray #5B6068 muted, warm gray #F3F2EF panels, graphite #3A3F47 for links and the selected skill (replaces the Oct 27 blue). Résumé-sheet links also graphite.
- Home: headline "Kaitlyn Hu"; role line "Aiming for corporate finance: FP&A or risk management"; supporting line from Kaitlyn's Oct 29 prompt.
- Privacy (In-Class 16 rules): GPA removed from Home and the web résumé. No phone, home address, student ID or transcript.
- Photo: Kaitlyn's headshot copied in as `photo.jpg`.
- Résumé PDF: shown as "Résumé (PDF) coming soon", because the PDF Kaitlyn provided lists her GPA.
- Projects: industry study card first, title from `project/industry_interview.md`; summary and report/slides/charts are [PLACEHOLDER] text, not links, so nothing is a dead link.
- Contact: email, LinkedIn, [PLACEHOLDER] GitHub (username not chosen yet).
- About text is still Claude's Oct 27 draft; Kaitlyn to rewrite in her own words.

## Changelog
- 2026-10-29 — Round 1: built `site/` from the Oct 27 site with the changes above.
