import Scale from './scale';
import ScaleDownDestroy from './scale-down-destroy';
import PopUp from './popup';
import Yoyo from './behaviors/scale/Yoyo';

export default class ScalePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Scale.IConfig
    ): Scale;

    scaleDownDestroy: typeof ScaleDownDestroy;
    popUp: typeof PopUp;
    yoyo: typeof Yoyo;
}