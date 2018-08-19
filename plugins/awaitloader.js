
'use strict'

import loaderCallback from './awaitloader/awaitLoaderCallback.js';

Phaser.Loader.FileTypesManager.register('rexAwait', loaderCallback);

export default loaderCallback;