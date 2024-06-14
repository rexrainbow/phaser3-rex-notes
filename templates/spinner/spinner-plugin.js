import ObjectFactory from './ObjectFactory.js';

import AIOFactory from './aio/Factory.js';
import AudioFactory from './audio/Factory.js';
import ArrowFactory from './arrow/Factory.js';
import BallFactory from './ball/Factory.js';
import BarsFactory from './bars/Factory.js';
import BoxFactory from './box/Factory.js';
import ClockFactory from './clock/Factory.js';
import CubeFactory from './cube/Factory.js';
import CustomFactory from './custom/Factory.js';
import DotsFactory from './dots/Factory.js';
import FacebookFactory from './facebook/Factory.js';
import GridFactory from './grid/Factory.js';
import HeartFactory from './hearts/Factory.js';
import IosFactory from './ios/Factory.js';
import OrbitFactory from './orbit/Factory.js';
import OvalFactory from './oval/Factory.js';
import PieFactory from './pie/Factory.js';
import PuffFactory from './puff/Factory.js';
import RadioFactory from './radio/Factory.js';
import RingsFactory from './rings/Factory.js';
import SpinnerFactory from './spinner/Factory.js';


class SpinnerPlugin extends Phaser.Plugins.ScenePlugin {
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
export default SpinnerPlugin;