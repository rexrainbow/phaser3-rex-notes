import SortGameObjectsByDepth from '../../../system/SortGameObjectsByDepth.js';

export default {
    getLayer(name) {
        return this.getGO(name);
    },

    getLayers(out) {
        if (out === undefined) {
            out = [];
        }
        this.forEachGO(function (gameObject) {
            out.push(gameObject);
        })
        SortGameObjectsByDepth(out, false);
        return out;
    },

    addToLayer(name, gameObjects) {
        var layer = this.getGO(name);
        if (!layer) {
            console.warn(`[LayerManager] Can't get layer "${name}"`);
            return;
        }

        if (!Array.isArray(gameObjects)) {
            gameObjects = [gameObjects];
        }

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (gameObject.isRexContainerLite) {
                gameObject.addToLayer(layer);
            } else {
                layer.add(gameObject);
            }
        }

        if (layer.scrollFactorX !== undefined) {
            gameObject.setScrollFactor(layer.scrollFactorX, layer.scrollFactorY);
        }

        return this;
    },

    addToBottomLayer(gameObjects) {
        var bottomLayer = this.getLayers()[0];
        this.addToLayer(bottomLayer.goName, gameObjects);
        return this;
    },

    addToTopLayer(gameObjects) {
        var layers = this.getLayers();
        var topLayer = layers[layers.length - 1];
        this.addToLayer(topLayer.goName, gameObjects);
        return this;
    },

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
    },

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
                children[i].destroy();
            }
        } else {
            layer.removeAll();
        }

        return this;
    },

}