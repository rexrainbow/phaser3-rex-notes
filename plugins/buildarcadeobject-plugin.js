import BuildArcadeObject from './buildarcadeobject.js';
import ArcadeMethods from './utils/arcade/ArcadeMethods.js';

class BuildArcadeObjectPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    build(gameObject, isStatic) {
        return BuildArcadeObject(gameObject, isStatic);
    }

    injectMethods(gameObject) {
        Object.assign(gameObject, ArcadeMethods);
        return gameObject;
    }

    injectMethodsToRootClass() {
        this.injectMethods(Phaser.GameObjects.GameObject.prototype);
        return this;
    }
}

export default BuildArcadeObjectPlugin;