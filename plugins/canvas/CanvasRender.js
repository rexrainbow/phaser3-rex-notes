/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

import Phaser from 'phaser';
import WebGLRenderer from './CanvasWebGLRenderer.js';
import CanvasRenderer from './CanvasCanvasRenderer.js';

const NOOP = Phaser.Utils.NOOP;
var renderWebGL = NOOP;
var renderCanvas = NOOP;

if (WEBGL_RENDERER)
{
    renderWebGL = WebGLRenderer;
}

if (CANVAS_RENDERER)
{
    renderCanvas = CanvasRenderer;
}

export default {

    renderWebGL: renderWebGL,
    renderCanvas: renderCanvas

};
