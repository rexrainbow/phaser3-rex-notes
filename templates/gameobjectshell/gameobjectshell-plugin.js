import ObjectFactory from './ObjectFactory.js';

import ControlPointsFactory from './controlpoints/Factory.js';
import CursorAtBoundsFactory from './cursoratbounds/Factory.js';

import FullWindowRectangleFactory from './fullwindowrectangle/Factory.js';
import LayerManagerFactory from './layermanager/Factory.js';
import MouseWhellToUpDownFactory from './mousewheeltoupdown/Factory.js';
import PinchFactory from './pinch/Factory.js';
import PropertiesPanelFactory from './propertiespanel/Factory.js';
import ShellFactory from './shell/Factory.js';


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