import LoaderCallback from './loader/webfontloader/WebFontLoaderCallback.js';

import { Loader as PhaserLoader } from 'phaser';
PhaserLoader.FileTypesManager.register('rexWebFont', LoaderCallback);

export default LoaderCallback;