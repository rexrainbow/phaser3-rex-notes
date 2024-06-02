import {
    BGLayer, BGTopLayer, BGBottomLayer,
    GOLayer, GOTopLayer, GOBottomLayer,
    UILayer, UITopLayer, UIBottomLayer,
} from './Layers.js';


var GetLayerName = function (depth, defaultLayerName, topLayerName, bottomLayerName) {
    switch (depth) {
        case 1:
        case 'top':
            return topLayerName;

        case -1:
        case 'bottom':
            return bottomLayerName;

        default:
            return defaultLayerName
    }
}

export default {
    addToUILayer(gameObject, depth) {
        var layerName = GetLayerName(depth, UILayer, UITopLayer, UIBottomLayer);
        this.layerManager.addToLayer(layerName, gameObject);
        return this;
    },

    addToMonitorLayer(gameObjects, depth) {
        if (!Array.isArray(gameObjects)) {
            gameObjects = [gameObjects];
        }

        var layerName = GetLayerName(depth, GOLayer, GOTopLayer, GOBottomLayer);

        // Not a monitor-able game object
        if (layerName !== GOLayer) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                let gameObject = gameObjects[i];
                this.layerManager.addToLayer(layerName, gameObject);
            }
            return this;
        }

        // Monitor-able game object
        var shell = this;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            let gameObject = gameObjects[i];

            this.layerManager.addToLayer(layerName, gameObject);

            gameObject.setInteractive();

            if (!gameObject.removeFromMonitorLayerCallback) {
                var onSelectGameObject = function () {
                    shell.onSelectGameObjectCallback(shell, gameObject);
                }
                gameObject.on('pointerdown', onSelectGameObject);
                gameObject.removeFromMonitorLayerCallback = function () {
                    gameObject.removeFromMonitorLayerCallback = undefined;
                    gameObject.off('pointerdown', onSelectGameObject);
                }
            }
        }

        return this;
    },

    addToBackgroundLayer(gameObject, depth) {
        var layerName = GetLayerName(depth, BGLayer, BGTopLayer, BGBottomLayer);
        this.layerManager.addToLayer(layerName, gameObject);
        return this;
    },


    removeFromMonitorLayer(gameObject, addToScene, depth) {
        var layerName = GetLayerName(depth, GOLayer, GOTopLayer, GOBottomLayer);
        this.layerManager.removeFromLayer(layerName, gameObject, addToScene);
        if (gameObject.removeFromMonitorLayerCallback) {
            gameObject.removeFromMonitorLayerCallback();
        }
        return this;
    },

    clearMonitorLayer(depth) {
        var layerName = GetLayerName(depth, GOLayer, GOTopLayer, GOBottomLayer);
        this.layerManager.clearLayer(layerName);
        return this;
    },

    getBackgroundLayer(depth) {
        var layerName = GetLayerName(depth, BGLayer, BGTopLayer, BGBottomLayer);
        return this.layerManager.getLayer(layerName);
    },

    getMonitorLayer(depth) {
        var layerName = GetLayerName(depth, GOLayer, GOTopLayer, GOBottomLayer);
        return this.layerManager.getLayer(layerName);
    },

    getUILayer(depth) {
        var layerName = GetLayerName(depth, UILayer, UITopLayer, UIBottomLayer);
        return this.layerManager.getLayer(layerName);
    },

    getMonitorGameObjects(depth) {
        var layerName = GetLayerName(depth, GOLayer, GOTopLayer, GOBottomLayer);
        return this.layerManager.getLayer(layerName).getAll();
    },

}