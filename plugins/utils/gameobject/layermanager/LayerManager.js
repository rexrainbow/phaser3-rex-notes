import GOManager from '../gomanager/GOManager.js';
import Methods from './methods/Methods.js';

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

}

var CreateLayer = function (scene, depth) {
    var layer = scene.add.layer();
    if (depth !== undefined) {
        layer.setDepth(depth);
    }
    return layer;
}

Object.assign(
    LayerManager.prototype,
    Methods
)


export default LayerManager;