import LoaderCallback from './loader/awaitloader/AwaitLoaderCallback';

import { Loader as PhaserLoader } from 'phaser';
PhaserLoader.FileTypesManager.register('rexAwait', LoaderCallback);

export default LoaderCallback;