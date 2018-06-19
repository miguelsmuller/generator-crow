'use strict';

module.exports = {
    source: {
        views   : 'source/views/**/!(_)*.pug',
        styles  : 'source/styles/**/!(_)*.scss',
        scripts : 'source/scripts/**/*.js',
        images  : 'source/images/**/*'
    },
    public: {
        html   : 'public',
        css    : 'public/assets/styles/',
        js     : 'public/assets/scripts',
        images : 'public/assets/images'
    }
}
