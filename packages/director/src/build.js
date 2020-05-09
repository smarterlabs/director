const { copy } = require(`fs-extra`)
const { join } = require(`path`)
const getPaths = require(`./get-paths`)

const cwd = process.cwd()

module.exports = async function build(options){
	console.log(`Assembling build...`)
	let promises = []
	let paths = getPaths(options)
	paths.forEach(path => {
		let src = join(cwd, options.src, path.src)
		let dist = join(cwd, options.dist, path.url || path.dist)
		promises.push(copy(src, dist, { overwrite: true }))
	})
	await Promise.all(promises)
	console.log(`Done assembling`)
}