# crispianm.github.io

Personal site built with React and Vite. Content lives in [`src/data.json`](src/data.json); edit that file to update text, links and projects. Put the CV at `public/Resume.pdf`.

```sh
npm install
npm run dev      # http://localhost:3000
npm test
npm run build    # outputs to build/
```

## Deploying

**GitHub Pages:** pushes to `main` build and deploy via `.github/workflows/deploy.yml`. In the repository settings under Pages, set the source to "GitHub Actions".

**Self-hosting:** `docker compose up -d --build` serves the site on port 8080 (nginx, restarts automatically).
