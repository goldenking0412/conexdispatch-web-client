module.exports = {
    extends: ["airbnb", "prettier"],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            impliedStrict: true,
            jsx: true
        }
    },
    env: {
        browser: true
    },
    rules: {
        // Both styles are awesome ;)
        "arrow-body-style": "off",

        // Forces class to use `this` or be `static`, making them arguably
        // harder to update, thus decreasing the semantic meaning of `static`.
        "class-methods-use-this": "off",

        // with prettier, we get extra commas in function args which (still)
        // creates issues in some JS parsers
        "comma-dangle": "off",

        // Autofocus can be useful to have more control in forms.
        "jsx-a11y/no-autofocus": "off",

        // FIXME: usages of handlers on static element, this would increase
        // accessibility
        "jsx-a11y/no-static-element-interactions": "off",

        // Enable 100 chars lines, with a couple of exceptions
        "max-len": [
            "error",
            100,
            2,
            {
                ignoreUrls: true,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ],

        // Bitwise operations can be useful, confusing them with logical
        // operators should be catch with unit tests, not a linter
        "no-bitwise": "off",

        // FIXME: no proper logging in the client, so `console` is used :/
        "no-console": "off",

        // Personal choice for Kin
        "no-underscore-dangle": "off",

        // Do not use half-indentation common in React projects
        "react/jsx-indent": ["error", 4],

        // (mostly) useless
        "react/require-default-props": 0,

        // Personal choice for Kin
        camelcase: "off",

        // Personal choice for Kin
        indent: ["error", 4]
    },
    globals: {
        // Those are both injected by webpack (see webpack config)
        $: false,
        KIN_ENV_NAME: false
    },
    settings: {
        "import/resolver": {
            "babel-module": {}
        }
    }
};
