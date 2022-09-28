import GOManager from '../../gameobject/gomanager/GOManager.js';

class LayerManager extends GOManager {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('fade')) {
            config.fade = 0;
        }

        super(scene, config);
    }

    setCreateGameObjectCallback(callback, scope) {
        if (!callback) {
            callback = CreateLayer;
        }
        super.setCreateGameObjectCallback(callback, scope);
        return this;
    }

    getLayer(name) {
        return this.getGO(name);
    }

    addToLayer(name, gameObject) {
        var layer = this.getGO(name);
        if (!layer) {
            console.warn(`Can't get layer "${name}"`);
            return;
        }

        if (gameObject.isRexContainerLite) {
            gameObject.addToLayer(layer);
        } else {
            layer.add(gameObject);
        }

        return this;
    }
}

var CreateLayer = function (scene, depth) {
    var layer = scene.add.layer();
    if (depth !== undefined) {
        layer.setDepth(depth);
    }
    return layer;
}


export default LayerManager;