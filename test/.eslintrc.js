module.exports = {
    env: {
        mocha: true
    },
    rules: {
        // tldr: chai uses syntax close to property access, without actually
        // saving its result, which is exactly what this rule is trying to avoid.
        //
        // https://github.com/eslint/eslint/issues/2102
        "no-unused-expressions": "off",

        // Mocha recommends not using arrow functions to keep its context
        "prefer-arrow-callback": "off",

        // Mocha `describe` / `it` common usage uses a lot of unnamed functions
        "func-names": "off"
    },
    globals: {
        chai: true,
        sinon: true
    }
};
