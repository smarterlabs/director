const express = require(`express`)
const { createProxyMiddleware } = require(`http-proxy-middleware`)
const open = require(`open`)
const { join } = require(`path`)

const app = express()
const proxy = createProxyMiddleware
const defaultOptions = {
	paths: [],
	port: 5555,
}

module.exports = function startServer(options){
	options = {
		...defaultOptions,
		...options,
	}
	let paths = getPaths(options)

	paths.forEach(path => {
		if (path.port) {
			app.use(path.url, proxy({
				target: `http://localhost:${path.port}`,
				changeOrigin: true,
				pathRewrite: {
					[path.url]: ``,
				},
				...options.proxyOptions,
				...path.proxyOptions,
			}))
		}
		else{
			let staticDir = join(process.cwd(), options.src, path.src)
			app.use(path.url, express.static(staticDir))
		}
	})

	app.listen(options.port)
	console.log(`Director started at ${options.port}`)
	if(options.open){
		open(`http://localhost:${options.port}/`)
	}
}

// Build an array of objects containing path information
function getPaths(options) {
	let paths = []

	if (Array.isArray(options.paths)) {
		paths.push(...options.paths)
	}
	else {
		let keys = Object.keys(options.paths)
		keys.forEach(url => {
			paths.push({
				url,
				...options.paths[url],
			})
		})
	}
	if (options.sort) {
		paths.sort(options.sort)
	}

	return paths
}