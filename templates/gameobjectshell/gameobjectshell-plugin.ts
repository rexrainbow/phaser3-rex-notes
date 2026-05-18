import ObjectFactory from './ObjectFactory';

import CameraControllerFactory from './cameracontroller/Factory';
import ControlPointsFactory from './controlpoints/Factory';
import FullWindowRectangleFactory from './fullwindowrectangle/Factory';
import LayerManagerFactory from './layermanager/Factory';
import GameObjectPanelFactory from './gameobjectpanel/Factory';
import ShellFactory from './shell/Factory';


import { Plugins as PhaserPlugins } from 'phaser';
class GameObjectShellPlugin extends PhaserPlugins.ScenePlugin {
    add: any;
    scene: any;

    constructor(scene?: any, pluginManager?: any) {
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