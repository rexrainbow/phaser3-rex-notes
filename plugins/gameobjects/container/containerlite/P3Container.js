import AddToContainer from './p3container/AddToContainer.js';
import RemoveFromContainer from './p3container/RemoveFromContainer.js';
import IsLayerGameObject from '../../../utils/system/IsLayerGameObject.js';

var IsLayer = function (gameObject) {
    return gameObject && (IsLayerGameObject(gameObject) || gameObject.isRexContainerLiteLayer);
}

export default {
    addToContainer(p3Container) {
        this._setParentContainerFlag = true;
        AddToContainer.call(this, p3Container, {
            includeParent: true,
            setLayerState: false,
            clearDepthSort: false,
        });
        this._setParentContainerFlag = false;
        return this;
    },

    addToLayer(layer) {
        AddToContainer.call(this, layer, {
            includeParent: true,
            setLayerState: false,
            clearDepthSort: false,
        });
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

        if (!IsLayer(this.displayList)) {
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

        if (IsLayer(parentLayer)) {
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

export { AddToContainer };
