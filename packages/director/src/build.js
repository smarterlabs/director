const { move } = require(`fs-extra`)
const { join } = require(`path`)

module.exports = async function build(options){
	console.log(`Assembling build...`)
	let promises = []
	options.paths.forEach(path => {
		let src = join(options.src, path.src)
		let dist = join(options.dist, path.url || path.dist)
		promises.push(move(src, dist, { overwrite: true }))
	})
	await Promise.all(promises)
	console.log(`Done assembling`)
}