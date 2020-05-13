const { join } = require(`path`)
const { ncp } = require(`ncp`)
const getPaths = require(`./get-paths`)

const cwd = process.cwd()

module.exports = async function build(options){
	console.log(`Assembling build...`)
	let paths = getPaths(options)
	for (let i = paths.length; i--;) {
		let path = paths[i]
		let src = join(cwd, options.src, path.src)
		let dist = join(cwd, options.dist, path.url || path.dist)
		let err = await ncp(src, dist)
		if(err){
			console.error(err)
			process.exit(1)
		}
	}
	console.log(`Done assembling`)
}