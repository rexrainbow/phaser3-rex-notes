import Interception from './interception';

import { Plugins as PhaserPlugins } from 'phaser';
class InterceptionPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    add(gameObject?: any, config?: any) {
        return new Interception(gameObject, config);
    }
}
export default InterceptionPlugin;