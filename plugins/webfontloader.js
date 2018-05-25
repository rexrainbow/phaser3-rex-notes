
'use strict'

import loaderCallback from './webfontloader/webFontLoaderCallback.js';

Phaser.Loader.FileTypesManager.register('rexWebFont', loaderCallback);

export default loaderCallback;