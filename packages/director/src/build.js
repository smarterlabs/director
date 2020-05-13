const { join } = require(`path`)
const { ncp } = require(`ncp`)
const getPaths = require(`./get-paths`)

const cwd = process.cwd()

module.exports = async function build(options){
	console.log(`Assembling build...`)
	let promises = []
	let paths = getPaths(options)
	paths.forEach(path => {
		let src = join(cwd, options.src, path.src)
		let dist = join(cwd, options.dist, path.url || path.dist)
		promises.push(ncp(src, dist))
	})
	const errs = await Promise.all(promises)
	errs.forEach(err => {
		if(err){
			console.error(err)
			process.exit(1)
		}
	})
	console.log(`Done assembling`)
}