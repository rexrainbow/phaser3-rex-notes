import Interception from './interception.js';

import { Plugins as PhaserPlugins } from 'phaser';
class InterceptionPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    add(gameObject, config) {
        return new Interception(gameObject, config);
    }
}
export default InterceptionPlugin;