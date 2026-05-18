import LoaderCallback from './loader/awaitcomlink/AwaitComlinkCallback';

import { Loader as PhaserLoader } from 'phaser';
PhaserLoader.FileTypesManager.register('rexAwaitComlink', LoaderCallback);

export default LoaderCallback;