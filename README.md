# Aura Gain

A React + Vite browser game where you climb from `-10000` aura to absurd status by working jobs, surviving AI interviews, buying brainrots, and managing cringe penalties as your collection evolves.

## Local Development

```bash
cd /Users/ninadkamath/Developer/Aura-gain
npm install
npm run dev
```

## Checks

```bash
npm test
npm run lint
npm run build
```

## Deploy

This app builds to static files in `dist/`. It is now set up for GitHub Pages with a GitHub Actions workflow.

### GitHub Pages

1. Create a GitHub repository for this project.
2. Push the code to the `main` branch.
3. In GitHub, open `Settings` -> `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Push again to `main` or run the `Deploy to GitHub Pages` workflow manually from the `Actions` tab.

The workflow will:

- install dependencies
- run tests
- run lint
- build the app
- publish it to GitHub Pages

### Local Pages Build

If you want to verify the Pages build locally:

```bash
npm run build:pages
```

### Notes

- If your repository is named `Aura-gain`, GitHub Pages will usually publish it at `https://<your-github-username>.github.io/Aura-gain/`.
- GitHub’s docs confirm GitHub Pages is available for public repositories on GitHub Free: [Getting started with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages).
