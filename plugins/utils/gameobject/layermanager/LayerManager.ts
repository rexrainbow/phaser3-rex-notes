import GOManager from '../gomanager/GOManager';
import IsGameObject from '../../system/IsGameObject';
import GetLayer from '../../system/GetLayer';
import Methods from './methods/Methods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class LayerManager extends GOManager {
    add: any;
    getAllGO: any;
    rootLayer: any;
    scene: any;
    setCamera: any;
    setScrollFactor: any;

    constructor(scene?: any, config?: any) {
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
        if (initLayers?: any) {
            for (var i = 0, cnt = initLayers.length; i < cnt; i++) {
                var layerConfig = initLayers[i];
                if (typeof (layerConfig) === 'string') {
                    this.add(layerConfig);
                } else {
                    var layerName = layerConfig.name;

                    this.add(layerName);

                    var scrollFactor = layerConfig.scrollFactor;
                    var scrollFactorX = GetValue(layerConfig, 'scrollFactorX', scrollFactor);
                    var scrollFactorY = GetValue(layerConfig, 'scrollFactorY', scrollFactor);
                    if (scrollFactorX !== undefined) {
                        this.setScrollFactor(layerName, scrollFactorX, scrollFactorY);
                    }

                    this.setCamera(layerName, layerConfig.cameraName);

                }
            }
        }
    }

    setCreateGameObjectCallback(callback?: any, scope?: any) {
        if (!callback) {
            callback = CreateLayer;
        }
        super.setCreateGameObjectCallback(callback, scope);
        return this;
    }

    setRootLayer(rootLayer?: any) {
        if (rootLayer === this.rootLayer) {
            return this;
        }

        var currentLayers = this.getAllGO();
        if (rootLayer?: any) {
            rootLayer.add(currentLayers);
        } else {
            this.scene.displayList.add(currentLayers);
        }

        this.rootLayer = rootLayer;

        return this;
    }

    // Override
    addGO(name?: any, gameObject?: any) {
        super.addGO(name, gameObject);
        gameObject.name = name;

        if (this.rootLayer) {
            this.rootLayer.add(gameObject);
        }

        return this;
    }

    // Override
    get(name?: any, out?: any) {
        if (IsGameObject(name)) {
            var layer = GetLayer(name);
            if (!layer) {
                return undefined;
            }
            name = layer.name;
            if (!name) {
                return undefined;
            }
        }

        return super.get(name, out);
    }

}

var CreateLayer = function(scene?: any, depth?: any) {
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