import GetGame from '../../../../utils/system/GetGame.js';
import CanvasMatrix from './CanvasMatrix.js';
import InitializeCubism from '../../utils/InitializeCubism.js';

var GlobalDataInstance = undefined;

// Global data shared for all Live2dGameObjects
class GlobalData {
    static getInstance(gameObject) {
        if (!GlobalDataInstance) {
            GlobalDataInstance = new GlobalData(gameObject);
        }
        return GlobalDataInstance;
    }

    constructor(gameObject) {
        var game = GetGame(gameObject);
        var gl = game.renderer.gl;
        var scale = game.scale;

        this.game = game;
        this.gl = gl;
        this.scale = scale;

        // A frame buffer for all live2d game object
        this.frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);

        this.viewportRect = [0, 0, 0, 0];
        this.canvasMatrix = new CanvasMatrix();
        this.onResize();

        scale.on('resize', this.onResize, this);
        game.events.once('destroy', this.destroy, this);

        // Run this method once, before creating CubismModel
        InitializeCubism();
    }

    destroy() {
        this.scale.off('resize', this.onResize, this);

        this.game = undefined;
        this.gl = undefined;
        this.scale = undefined;

        this.frameBuffer = undefined;
        this.viewportRect = undefined;
        this.canvasMatrix = undefined;

        GlobalDataInstance = undefined;
    }

    get canvasWidth() {
        return this.scale.width;
    }

    get canvasHeight() {
        return this.scale.height;
    }

    onResize() {
        var width = this.canvasWidth;
        var height = this.canvasHeight;

        // Set view port
        this.viewportRect[2] = width;
        this.viewportRect[3] = height;

        // Set canvasMatrix
        this.canvasMatrix.setSize(width, height);
    }
}

export default GlobalData;