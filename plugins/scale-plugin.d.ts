import Scale from './scale';
import ScaleDownDestroy from './scale-down-destroy';
import PopUp from './popup';

export default class ScalePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Scale.IConfig
    ): Scale;

    scaleDownDestroy: typeof ScaleDownDestroy;
    popUp: typeof PopUp;
}