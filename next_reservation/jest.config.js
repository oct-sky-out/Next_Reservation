module.exports = {
	rootDir: './',
	setupFilesAfterEnv: ['./jest.setup.js'],
	transform: {
		'\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './.babelrc' }],
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sss|styl)$': '.pnp.cjs/jest-css-modules',
	},
	verbose: true,
	collectCoverage: true,
	coveragePathIgnorePatterns: ['<rootDir>/test/test-utils.js'],
};
