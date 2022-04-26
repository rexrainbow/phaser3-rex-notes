import GetGame from '../../../utils/system/GetGame.js';
import InitializeCubism from '../utils/InitializeCubism.js';

var GlobalDataInstance = undefined;

class GlobalData {
    static getInstance(game) {
        if (!GlobalDataInstance) {
            GlobalDataInstance = new GlobalData(game);
        }
        return GlobalDataInstance;
    }

    constructor(game) {
        game = GetGame(game);
        var gl = game.renderer.gl;

        this.game = game;
        this.gl = gl;
        this.scale = this.game.scale;

        // A frame buffer for all live2d game object
        this.frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        this.viewport = [0, 0, this.scale.width, this.scale.height];

        this.scale.on('resize', this.onResize, this);
        game.events.once('destroy', this.destroy, this);

        // Run this method once
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