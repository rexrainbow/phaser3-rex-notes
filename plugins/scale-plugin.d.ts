import Scale from './scale';
import ScaleDown from './behaviors/scale/ScaleDown';
import ScaleDownDestroy from './scale-down-destroy';
import PopUp from './popup';
import Yoyo from './behaviors/scale/Yoyo';
import {
    PopUp as PopUp_, PopUpPromise,
    ScaleDown as ScaleDown_, ScaleDownPromise,
    ScaleDownDestroy as ScaleDownDestroy_, ScaleDownDestroyPromise,
    ScaleYoyo, ScaleYoyoPromise,

    IsRunningPopUp, IsRunningScaleDown, IsRunningScaleYoyo, IsRunningEaseScale,
} from './behaviors/scale/ScaleMethods';

declare namespace ScalePlugin {
    interface ScaleMethodsGameObject extends Phaser.GameObjects.GameObject {
        popUp: typeof PopUp_,
        popUpPromise: typeof PopUpPromise,
        scaleDownDestroyPromise: typeof ScaleDownDestroyPromise,
        scaleDown: typeof ScaleDown_,
        scaleDownDestroy: typeof ScaleDownDestroy_,
        scaleDownPromise: typeof ScaleDownPromise,
        scaleYoyo: typeof ScaleYoyo,
        scaleYoyoPromise: typeof ScaleYoyoPromise,

        isRunningPopUp: typeof IsRunningPopUp,
        isRunningScaleDown: typeof IsRunningScaleDown,
        isRunningScaleYoyo: typeof IsRunningScaleYoyo,
        isRunningEaseScale: typeof IsRunningEaseScale,
    }
}

export default class ScalePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Scale.IConfig
    ): Scale;

    scaleDown: typeof ScaleDown;
    scaleDownDestroy: typeof ScaleDownDestroy;
    popUp: typeof PopUp;
    yoyo: typeof Yoyo;

    injectMethods(
        gameObject: Phaser.GameObjects.GameObject
    ): ScalePlugin.ScaleMethodsGameObject;

    injectMethodsToRootClass(): this;
}