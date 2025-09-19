README for Alaria Dynamics site

This repository contains a minimal Jekyll-based GitHub Pages site scaffold under the `docs/` folder.

This repository contains a static, HTML-only site under `docs/`. The site is ready to be served directly by GitHub Pages from the `docs/` folder.

Preview locally (no Jekyll required):

Using Python 3's built-in HTTP server (works on Windows PowerShell):

```powershell
cd docs
python -m http.server 8000
# then open http://127.0.0.1:8000
```

Deployment:

- Push to `main`. GitHub Pages can serve from the `docs/` folder on the `main` branch.
- To use a custom domain, add a `CNAME` file under `docs/` and configure DNS.

Notes:

- Product images should live in `docs/assets/img/` and brochures in `docs/assets/docs/`.
- Contact form in `docs/contact/index.html` uses a Formspree example action — replace with your real endpoint.
- `docs/search.json` contains a small static index that can be used by client-side search libraries.

New features added:

- SEO & sitemap: `jekyll-seo-tag` and `jekyll-sitemap` enabled in `docs/_config.yml`.
- Client-side search index: `docs/search.json` is generated for basic indexing.
- Formspree contact form example added to `docs/contact.md`.
- Favicon and improved homepage layout to present a professional corporate look.

Local CI test (run the same build the workflow does):

```powershell
gem install bundler jekyll
bundle install
bundle exec jekyll build --source docs --destination _site
```

If the build completes without errors, the generated site will be in `_site/`.