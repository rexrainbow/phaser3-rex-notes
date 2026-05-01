import LoaderCallback from './loader/yamlloader/YAMLLoaderCallback.js';

import { Loader as PhaserLoader } from 'phaser';
PhaserLoader.FileTypesManager.register('rexYAML', LoaderCallback);

export default LoaderCallback;