import LZString from './lzstring.js';

class LZStringPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.lzstring = new LZString();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    setEncoding(m) {
        this.lzstring.setEncoding(m);
        return this;
    }

    compress(s) {
        return this.lzstring.compress(s);
    }

    decompress(s) {
        return this.lzstring.decompress(s);
    }
}
export default LZStringPlugin;