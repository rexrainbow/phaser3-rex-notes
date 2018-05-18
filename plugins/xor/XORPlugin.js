import XOR from './XOR.js';

class XORPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }
}

// mixin
Object.assign(
    XORPlugin.prototype,
    XOR
);

export default XORPlugin;