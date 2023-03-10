Try on: [Codespace](https://github.com/codespaces/new?template_repository=abernier%2Fportfolio) | [StackBlitz](https://stackblitz.com/github/abernier/portfolio)

# INSTALL

Pre-requisites:

- Node

```sh
$ npm ci
```

# Dev

```sh
$ npm run dev
```

# Assets

Some heavy mp4 assets are stored into [abernier-portfolio](https://console.cloud.google.com/storage/browser/abernier-portfolio;tab=objects?forceOnBucketsSortingFiltering=false&project=portfolio-375123&supportedpurview=project&prefix=&forceOnObjectsSortingFiltering=false) Google Cloud Storage bucket.

# Build

```sh
$ npm run build
```

## Deploy

Pre-requisites:

- Make sure you have Github Pages set to `Github Actions` in your [project's Settings](/../../settings/pages)

A Github Actions [deploy](.github/workflows/deploy.yml) task will build and deploy to `https://{username}.github.io/{reponame}` when pushing on `main`.
