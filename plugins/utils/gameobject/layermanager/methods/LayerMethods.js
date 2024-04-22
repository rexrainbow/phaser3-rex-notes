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
                children.destroy();
            }
        } else {
            layer.removeAll();
        }

        return this;
    },
}