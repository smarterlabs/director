const del = require(`del`)

module.exports = async function clean(options){
	await del([options.dist])
}