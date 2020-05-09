// Build an array of objects containing path information
module.exports = function getPaths(options) {
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