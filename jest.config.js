export default {
    testMatch: ['<rootDir>/**/*.test.ts'],
    preset: 'ts-jest',
    testEnvironment: 'jest-fixed-jsdom',
    moduleDirectories: ['node_modules', 'src'],
    roots: ['<rootDir>'],
    clearMocks: true,
    transform: {
        '^.+\\.(ts|tsx)$': [
            '@swc/jest',
            {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        decorators: true,
                        tsx: true,
                    },
                    target: 'es2020',
                    transform: {
                        legacyDecorator: true,
                        react: {
                            runtime: 'automatic',
                        },
                    },
                },
                isModule: true,
            },
        ],
    },
    collectCoverage: true,
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    bail: true,
    coverageReporters: ['json-summary', 'lcov'],
};
