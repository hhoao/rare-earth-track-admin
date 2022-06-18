module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        'plugin:vue/vue3-recommended',
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'no-use-before-define': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/script-setup-uses-vars': 'error',
        'no-unused-vars': [
          'off',
            {
                match: '^_',
            }
        ],
        'vue/attributes-order': 'off',
        'vue/one-component-per-file': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'vue/multi-word-component-names': 'off',
    }
}
