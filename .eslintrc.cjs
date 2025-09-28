module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es2022: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'eslint-config-prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 2022,
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint', 'prettier'],
	rules: {
		// Vue 관련 규칙
		'vue/multi-word-component-names': 'off',
		'vue/no-v-html': 'off',

		// TypeScript 관련 규칙
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-empty-object-type': 'off',

		// 일반 JavaScript 규칙
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'prefer-const': 'error',
		'no-var': 'error',
	},
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
	},
	ignorePatterns: ['dist/', 'node_modules/', '*.min.js'],
};
