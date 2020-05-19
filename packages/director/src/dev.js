const express = require(`express`)
const { createProxyMiddleware } = require(`http-proxy-middleware`)
const open = require(`open`)
const { join } = require(`path`)
const getStatusCode = require(`url-status-code`)
const getPaths = require(`./get-paths`)

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
			// Proxy
			if (!path.redirect) {
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
			// Redirect
			else{
				app.get(path.url, function (req, res) {
					res.redirect(`http://localhost:${path.port}`)
				})
			}
		}
		else{
			let staticDir = join(process.cwd(), options.src, path.src)
			app.use(path.url, express.static(staticDir))
		}
	})

	app.listen(options.port)
	console.log(`Director started at ${options.port}`)
	if(options.open){
		let url = `http://localhost:${options.port}/`
		openUrl(url)
	}
}

async function openUrl(url){
	console.log(`Checking dev URL status...`)
	const statusCode = await getStatusCode(url)
	if(statusCode === 200){
		return open(url)
	}
	await waitFor(3000)
	openUrl(url)
}

function waitFor(n){
	return new Promise(resolve => {
		setTimeout(resolve, n)
	})
}