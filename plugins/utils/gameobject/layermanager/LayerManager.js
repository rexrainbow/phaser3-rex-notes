import GOManager from '../gomanager/GOManager.js';
import SortGameObjectsByDepth from '../../system/SortGameObjectsByDepth.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class LayerManager extends GOManager {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        } else if (Array.isArray(config)) {
            config = {
                layers: config
            }
        }

        if (!config.hasOwnProperty('fade')) {
            config.fade = 0;
        }

        config.viewportCoordinate = false;

        super(scene, config);

        var rootLayer = GetValue(config, 'rootLayer')
        this.setRootLayer(rootLayer);

        var initLayers = GetValue(config, 'layers');
        if (initLayers) {
            for (var i = 0, cnt = initLayers.length; i < cnt; i++) {
                this.add(initLayers[i]);
            }
        }
    }

    setCreateGameObjectCallback(callback, scope) {
        if (!callback) {
            callback = CreateLayer;
        }
        super.setCreateGameObjectCallback(callback, scope);
        return this;
    }

    setRootLayer(rootLayer) {
        if (rootLayer === this.rootLayer) {
            return this;
        }

        var currentLayers = this.getAllGO();
        if (rootLayer) {
            rootLayer.add(currentLayers);
        } else {
            this.scene.displayList.add(currentLayers);
        }

        this.rootLayer = rootLayer;

        return this;
    }

    // Override
    addGO(name, gameObject) {
        super.addGO(name, gameObject);
        gameObject.name = name;

        if (this.rootLayer) {
            this.rootLayer.add(gameObject);
        }

        return this;
    }

    // New methods
    getLayer(name) {
        return this.getGO(name);
    }

    getLayers(out) {
        if (out === undefined) {
            out = [];
        }
        this.forEachGO(function (gameObject) {
            out.push(gameObject);
        })
        SortGameObjectsByDepth(out, false);
        return out;
    }

    addToLayer(name, gameObject) {
        var layer = this.getGO(name);
        if (!layer) {
            console.warn(`[LayerManager] Can't get layer "${name}"`);
            return;
        }

        if (gameObject.isRexContainerLite) {
            gameObject.addToLayer(layer);
        } else {
            layer.add(gameObject);
        }

        return this;
    }

    removeFromLayer(name, gameObject, addToScene) {
        var layer = this.getGO(name);
        if (!layer) {
            console.warn(`[LayerManager] Can't get layer "${name}"`);
            return;
        }

        if (addToScene === undefined) {
            addToScene = true;
        }

        if (gameObject.isRexContainerLite) {
            gameObject.removeFromLayer(layer, addToScene);
        } else {
            layer.remove(gameObject);
            if (addToScene) {
                gameObject.addToDisplayList();
            }
        }

        return this;
    }

    clearLayer(name, destroyChildren) {
        if (destroyChildren === undefined) {
            destroyChildren = true;
        }

        var layer = this.getGO(name);
        if (!layer) {
            console.warn(`Can't get layer "${name}"`);
            return;
        }

        if (destroyChildren) {
            var children = layer.getAll();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children.destroy();
            }
        } else {
            layer.removeAll();
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