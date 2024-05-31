import BuildArcadeObject from './buildarcadeobject';
import ArcadeGameObject from './utils/arcade/ArcadeGameObject';

export default class BuildArcadeObjectPlugin extends Phaser.Plugins.BasePlugin {
    build: typeof BuildArcadeObject

    injectMethods(
        gameObject: Phaser.GameObjects.GameObject
    ): ArcadeGameObject;

    injectMethodsToRootClass(): this;
}