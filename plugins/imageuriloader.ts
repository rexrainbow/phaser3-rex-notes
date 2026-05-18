
import LoaderCallback from './loader/imageuri/ImageURILoaderCallback';

import { Loader as PhaserLoader } from 'phaser';
PhaserLoader.FileTypesManager.register('rexImageURI', LoaderCallback);

export default LoaderCallback;