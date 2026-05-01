import LoaderCallback from './loader/awaitloader/AwaitLoaderCallback.js';

import { Loader as PhaserLoader } from 'phaser';
PhaserLoader.FileTypesManager.register('rexAwait', LoaderCallback);

export default LoaderCallback;