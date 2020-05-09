const argv = require(`yargs`).argv
const dev = require(`./dev`)
const build = require(`./build`)
const clean = require(`./clean`)

const cmd = (label) => argv._.includes(label)

module.exports = function Director(options){
	options = {
		...defaultOptions,
		...options,
	}
	const director = {
		dev: () => dev(options),
		build: () => build(options),
		clean: () => clean(options),
	}
	if (cmd(`develop`)) {
		director.dev()
	}
	else if (cmd(`build`)){
		director.build()
	}
	else if (cmd(`clean`)){
		director.clean()
	}
	return director
}

const defaultOptions = {
	sort: (a, b) => {
		if(a.url == `/`) return 1
		if(b.url == `/`) return -1
		let aDepth = a.url.split(`/`).length
		let bDepth = b.url.split(`/`).length
		if(aDepth > bDepth) return -1
		else if(aDepth < bDepth) return 1
		return 0
	},
}