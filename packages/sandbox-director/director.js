const Director = require(`@smarterlabs/director`)

Director({
	paths: {
		'/': {
			port: 5000,
			src: `sandbox-a/www`,
		},
		'/assets': {
			src: `sandbox-b/www`,
		},
	},
	src: `../`,
	dist: `dist`,
	port: 5555,
	open: true,
})