import Encrypt from './Encrypt.js';
import Decrypt from './Decrypt.js';

class XORPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }
}

// mixin
Object.assign(
    XORPlugin.prototype, {
        Encrypt: Encrypt,
        Decrypt: Decrypt
    }
);

export default XORPlugin;