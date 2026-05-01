
import LoaderCallback from './loader/scripttag/ScriptTagLoaderCallback.js';

import { Loader as PhaserLoader } from 'phaser';
PhaserLoader.FileTypesManager.register('rexScriptTag', LoaderCallback);

export default LoaderCallback;