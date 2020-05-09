# Director

**Note:** Director is currently in Alpha.

Director binds multiple services together by proxying ports on your machine for a cohesive local development environment. It can also be used with your build script to merge files into a single bundle.

It's not necessary, but recommended you use Director with a monorepo.

## Installation

```bash
npm i --save-dev @smarterlabs/director
```

or with Yarn:

```bash
yarn add -D @smarterlabs/director
```

## Usage

Create a `director-config.js` file, ideally in a seperate package from the rest of your services.

```js
const Director = require(`@smarterlabs/director`)

Director({
	paths: {
		'/': {                     // The absolute URL path for this service of the app
			port: 5000,             // Port that the dev server the path `/` is running on
			src: `website/public`,  // Source of the build files to be copied for path `/`
      },
      // You can also serve static assets by not supplying the port
		'/images': {
			src: `assets/images`,
		},
	},
	src: `../`,    // Optional, a source path for your services
	dist: `dist`,  // Where your dist files will bundle to on "build"
	port: 5555,    // The port Director binds to on "develop"
	open: true,    // Set to true to open up your local dev server in a browser
})
```

Start the dev server with:

```bash
node director-config develop
```

Or merge the dist files in your app with:

```bash
node director-config build
```
