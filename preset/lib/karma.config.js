var path = require('path')
    , getKarmaConfig = require('../../config/karma.common.js')
    , helpers = require('../../config/helpers')
    , srcPath = helpers.root('./')
    , projectConfig = require('./project.config')
    ;

var karmaConfig = getKarmaConfig(projectConfig);

module.exports = karmaConfig;

