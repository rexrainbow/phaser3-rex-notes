import ObjectFactory from './ObjectFactory.js';

import TransfromControllerFactory from './transformcontroller/Factory.js';
import PropertiesTweakerFactory from './propertiestweaker/Factory.js';
import ShellFactory from './shell/Factory.js';
import FullWindowRectangle from './fullwindowrectangle/Factory.js';

class GameObjectShellPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }

    start() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}
export default GameObjectShellPlugin;