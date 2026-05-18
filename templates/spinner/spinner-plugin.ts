import ObjectFactory from './ObjectFactory';

import AIOFactory from './aio/Factory';
import AudioFactory from './audio/Factory';
import ArrowFactory from './arrow/Factory';
import BallFactory from './ball/Factory';
import BarsFactory from './bars/Factory';
import BoxFactory from './box/Factory';
import ClockFactory from './clock/Factory';
import CubeFactory from './cube/Factory';
import CustomFactory from './custom/Factory';
import DotsFactory from './dots/Factory';
import FacebookFactory from './facebook/Factory';
import GridFactory from './grid/Factory';
import HeartFactory from './hearts/Factory';
import IosFactory from './ios/Factory';
import OrbitFactory from './orbit/Factory';
import OvalFactory from './oval/Factory';
import PieFactory from './pie/Factory';
import PuffFactory from './puff/Factory';
import RadioFactory from './radio/Factory';
import RingsFactory from './rings/Factory';
import SpinnerFactory from './spinner/Factory';


import { Plugins as PhaserPlugins } from 'phaser';
class SpinnerPlugin extends PhaserPlugins.ScenePlugin {
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
export default SpinnerPlugin;