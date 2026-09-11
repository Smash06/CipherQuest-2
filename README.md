# CipherQuest: Escape the Ancient Vault

An offline-friendly educational cryptography game made with HTML, CSS and JavaScript.

## Run locally

Open `index.html` in Chrome, Edge or Firefox. No installation or internet connection is required.

## Project structure

- `index.html` contains the game screens and educational review.
- `styles.css` and `team.css` control the responsive ancient-vault design.
- `game.js` contains the puzzle generators, answers, scoring, lives, hints and timer.
- `backend/` contains the optional Node.js score API (not required to play).

## Randomized puzzles

Every time "Enter the vault" is pressed, all four chambers generate a fresh puzzle:
- **Caesar Gate** — random word + random shift, encoded live.
- **Katapayadi Chamber** — random syllables picked from the mapping chart.
- **Bhuta Sankhya Library** — random set of four symbolic word/number pairs.
- **Whispering Wall** — random acrostic word with randomly chosen lines per letter.

This means the on-screen puzzle and the demonstration answers below will differ each playthrough — the puzzles are still generated so the panel text always decodes correctly to the stored answer.

## Four-member responsibility plan

These roles describe genuine, separable work areas; every member should study and customize their assigned part.

1. **Shaikh Armaan — Project lead and cryptography research:** objectives, historical concepts, accuracy, security comparison and report content.
2. **Arshad Ahmed — Interface and experience developer:** `dist/index.html`, semantic structure, game screens and accessible controls.
3. **Niti Nakti — Game logic and backend developer:** `dist/game.js`, levels, validation, score, lives, hints, timer and `backend/server.js` score API.
4. **Riya Arabatti — Visual design, testing and documentation:** `dist/styles.css`, responsive design, test cases, screenshots, presentation and viva demonstration.

## Frontend and backend

The published version is a static offline game:

`index.html → styles.css + game.js → web browser`

All questions and game state run locally in JavaScript. An optional Node.js backend is included to demonstrate two REST endpoints:

- `POST /api/scores` validates and stores a completed score.
- `GET /api/scores` returns the ten highest scores.

Run it with `cd backend`, followed by `npm start`, then open `http://localhost:3000`. It uses Node's built-in modules and needs no package installation. Scores are stored in memory and reset when the server stops.

## Demonstration answers

1. Caesar Gate: `HELLO VAULT`
2. Katapayadi Chamber: `321`
3. Bhuta Sankhya Library: `1246`
4. Whispering Wall: `SEAL`
5. Final vault code: `7319`

## Academic accuracy

Katapayadi and Bhuta Sankhya are presented as historical encoding or number-representation systems, not secure encryption. The Caesar cipher demonstrates substitution encryption but is insecure by modern standards. The game recommends established modern algorithms such as AES for protecting sensitive data.
