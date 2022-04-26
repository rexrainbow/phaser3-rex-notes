import GetGame from '../../../../utils/system/GetGame.js';
import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';
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

        this.viewport = [0, 0, 0, 0];
        this.viewportMatrix = new CubismMatrix44();
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
        this.viewport = undefined;
        this.viewportMatrix = undefined;

        GlobalDataInstance = undefined;
    }

    onResize() {
        var width = this.scale.width;
        var height = this.scale.height;

        // Set view port
        this.viewport[2] = width;
        this.viewport[3] = height;

        // Set viewportMatrix
        if (width < height) {
            this.viewportMatrix.scale(1.0, width / height);
        } else {
            this.viewportMatrix.scale(height / width, 1.0);
        }
    }
}

export default GlobalData;