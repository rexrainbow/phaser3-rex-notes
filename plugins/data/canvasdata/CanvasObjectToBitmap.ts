import CanvasData from './canvasdata/CanvasData';
import CanvasToData from './canvasdata/CanvasToData';
import BooleanBuffer from '../../utils/arraybuffers/BooleanBuffer';
import FillAlpha from './fillcallbacks/alpha';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CanvasObjectToBitmap = function(canvasObject?: any, config?: any, out?: any) {
    if (config instanceof CanvasData) {
        out = config;
        config = undefined;
    }

    var x = GetValue(config, 'x', undefined);
    var y = GetValue(config, 'y', undefined);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);

    return CanvasToData(
        canvasObject.canvas, // canvas
        x, y, width, height, // x, y, width, height
        BooleanBuffer, FillAlpha, undefined, // BufferClass, fillCallback, fillCallbackScope
        out);
};

export default CanvasObjectToBitmap;