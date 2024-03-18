import IsContainerGameObject from '../../../utils/system/IsContainerGameObject.js';
import IsLayerGameObject from '../../../utils/system/IsLayerGameObject.js';
import SortGameObjectsByDepth from '../../../utils/system/SortGameObjectsByDepth.js';

var GetValidChildren = function (parent) {
    var children = parent.getAllChildren([parent]);
    children = children.filter(function (gameObject) {
        return !!gameObject.displayList ||   // At scene's displayList or at a layer
            !!gameObject.parentContainer;  // At a container
    })
    return children;
}

var AddToContainer = function (p3Container) {
    var gameObjects = GetValidChildren(this);
    // This containerLite parent should be considered.
    if (gameObjects.indexOf(this) === -1) {
        gameObjects.push(this);
    }

    SortGameObjectsByDepth(gameObjects);

    p3Container.add(gameObjects);
}

var RemoveFromContainer = function (p3Container, descending, addToScene) {
    if (!this.scene) {
        // Destroyed
        return;
    }

    var gameObjects = GetValidChildren(this);

    SortGameObjectsByDepth(gameObjects, descending);

    p3Container.remove(gameObjects);

    if (addToScene) {
        gameObjects.forEach(function (gameObject) {
            gameObject.addToDisplayList();
        });
    }
}

export default {
    addToContainer(p3Container) {
        if (!IsContainerGameObject(p3Container)) {
            return this;
        }

        this._setParentContainerFlag = true;
        AddToContainer.call(this, p3Container);
        this._setParentContainerFlag = false;
        return this;
    },

    addToLayer(layer) {
        if (!IsLayerGameObject(layer)) {
            return this;
        }

        AddToContainer.call(this, layer);

        return this;
    },

    removeFromContainer() {
        if (!this.parentContainer) {
            return this;
        }

        this._setParentContainerFlag = true;
        RemoveFromContainer.call(this, this.parentContainer, true, false);
        this._setParentContainerFlag = false;
        return this;
    },

    removeFromLayer(addToScene) {
        if (addToScene === undefined) {
            addToScene = true;
        }

        if (!IsLayerGameObject(this.displayList)) {
            return this;
        }

        RemoveFromContainer.call(this, this.displayList, false, addToScene);

        return this;
    },

    getParentContainer() {
        if (this.parentContainer) {
            return this.parentContainer;
        }

        // One of parent container has a layer
        var parent = this.getParent();
        while (parent) {
            var p3Container = parent.parentContainer;
            if (p3Container) {
                return p3Container;
            }
            parent = parent.getParent();
        }

        return null;
    },

    addToParentContainer(gameObject) {
        // Do nothing if gameObject is not in any displayList
        if (!gameObject.displayList) {
            return this;
        }

        var p3Container = this.getParentContainer();
        if (!p3Container) {
            return this;
        }

        if (gameObject.isRexContainerLite) {
            // Add containerLite and its children
            gameObject.addToContainer(p3Container);
        } else {
            // Add gameObject directly
            p3Container.add(gameObject);
        }

        return this;
    },

    addToPatentLayer(gameObject) {
        // Do nothing if gameObject is not in any displayList
        if (!gameObject.displayList) {
            return this;
        }

        // At the same display list
        var parentLayer = this.displayList;
        if (parentLayer === gameObject.displayList) {
            return this;
        }

        if (IsLayerGameObject(parentLayer)) {
            if (gameObject.isRexContainerLite) {
                // Add containerLite and its children
                gameObject.addToLayer(parentLayer);
            } else {
                // Add gameObject directly
                parentLayer.add(gameObject);
            }
        } else {

        }

        return this;
    }
}