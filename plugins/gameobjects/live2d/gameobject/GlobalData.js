import GetGame from '../../../utils/system/GetGame.js';
import InitializeCubism from '../utils/InitializeCubism.js';

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
        this.viewport = [0, 0, scale.width, scale.height];

        scale.on('resize', this.onResize, this);
        game.events.once('destroy', this.destroy, this);

        // Run this method once, before creating CubismModel
        InitializeCubism();
    }

    destroy() {
        this.game = undefined;
        this.gl = undefined;
        this.scale = undefined;

        this.frameBuffer = undefined;
        this.viewport = undefined;

        GlobalDataInstance = undefined;
    }

    onResize(gameSize, baseSize, displaySize, previousWidth, previousHeight) {
        this.viewport[2] = this.scale.width;
        this.viewport[3] = this.scale.height;
    }
}

export default GlobalData;