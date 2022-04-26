import GetGame from '../../../utils/system/GetGame.js';

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

        // A frame buffer for all live2d game object
        this.frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);

        game.events.once('destroy', this.destroy, this);
    }

    destroy() {
        this.game = undefined;
        this.gl = undefined;
        this.frameBuffer = undefined;
        GlobalDataInstance = undefined;
    }
}

export default GlobalData;