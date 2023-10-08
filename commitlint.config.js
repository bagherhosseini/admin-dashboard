module.exports = { 
    extends: ['@commitlint/config-conventional'] ,
    rules: {
        'subject-case': [0, 'always', 'upper-case'],
        'scope-case': [0, 'always', 'upper-case'],
    },
};
