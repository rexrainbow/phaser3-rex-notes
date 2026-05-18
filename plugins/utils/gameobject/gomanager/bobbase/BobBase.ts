import PropertyMethods from './PropertyMethods';
import CallMethods from './CallMethods';
import DataMethods from './DataMethods';

class BobBase {
    effects: any;
    freeTweens: any;
    gameObject: any;
    GOManager: any;
    name: any;
    tweens: any;

    constructor(GOManager?: any, gameObject?: any, name?: any) {
        this.GOManager = GOManager;
        this.tweens = {};
        this.effects = {};
        this.setGO(gameObject, name);
    }

    get scene() {
        return this.GOManager.scene;
    }

    get timeScale() {
        return this.GOManager.timeScale;
    }

    destroy() {
        this.freeGO();
        this.GOManager = undefined;
    }

    freeGO() {
        this.freeTweens();
        this.gameObject.bob = undefined;
        this.gameObject.destroy();
        this.gameObject = undefined;
        return this;
    }

    setGO(gameObject?: any, name?: any) {
        gameObject.goName = name;
        gameObject.goType = this.GOManager.name;
        gameObject.bob = this;
        this.gameObject = gameObject;
        this.name = name;
        this.freeTweens();
        return this;
    }

    setTimeScale(timeScale?: any) {
        var tweenTasks = this.tweens;
        for (var key in tweenTasks) {
            var tweenTask = tweenTasks[key];
            if (tweenTask?: any) {
                tweenTask.timeScale = timeScale;
            }
        }

        return this;
    }

}

Object.assign(
    BobBase.prototype,
    PropertyMethods,
    CallMethods,
    DataMethods,
)
export default BobBase;