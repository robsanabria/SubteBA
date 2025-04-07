module.exports = {
    root: true,
    extends: ['next/core-web-vitals'],
    rules: {
        // Disable strict TypeScript rules that might block deployment
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        // Disable rules that might cause issues with Next.js API routes
        'import/no-anonymous-default-export': 'off',
        // Allow console logs (you might want to enable this in production)
        'no-console': 'off',
    }
};