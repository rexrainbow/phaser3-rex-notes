import ObjectFactory from './ObjectFactory.js';

import CameraControllerFactory from './cameracontroller/Factory.js';
import ControlPointsFactory from './controlpoints/Factory.js';
import FullWindowRectangleFactory from './fullwindowrectangle/Factory.js';
import LayerManagerFactory from './layermanager/Factory.js';
import GameObjectPanelFactory from './gameobjectpanel/Factory.js';
import ShellFactory from './shell/Factory.js';


import { Plugins as PhaserPlugins } from 'phaser';
class GameObjectShellPlugin extends PhaserPlugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }

    boot() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.add.destroy();
        super.destroy();
    }
}
export default GameObjectShellPlugin;