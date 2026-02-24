import SortGameObjectsByDepth from '../../../utils/system/SortGameObjectsByDepth.js';
import FilterDisplayGameObjects from '../../../utils/system/FilterDisplayGameObjects.js';

export default {
    setDepth(value, containerOnly) {
        this.depth = value;

        if (!this.layerRendererEnable) {
            if (!containerOnly && this.children) {
                var children = this.getAllChildren();
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    children[i].depth = value;
                }
            }
        }
        // else: children are inside rendererLayer, not in scene's display list
        return this;
    },

    swapDepth(containerB) {
        var depthA = this.depth;
        var depthB = containerB.depth;
        this.setDepth(depthB);
        containerB.setDepth(depthA);
        return this;
    },

    incDepth(inc) {
        this.depth += inc;

        if (!this.layerRendererEnable) {
            if (this.children) {
                var children = this.getAllChildren();
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    children[i].depth += inc;
                }
            }
        }
        // else: children are inside rendererLayer, not in scene's display list
        return this;
    },

    bringToTop() {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }

        if (!this.layerRendererEnable) {
            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, false);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.bringToTop(child);
                }
            }
        } else {
            if (displayList.exists(this)) {
                displayList.bringToTop(this);
            }
            // children are inside rendererLayer, not in scene's display list
        }

        return this;
    },

    bringMeToTop() {
        return this.bringToTop();
    },

    sendToBack() {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }

        if (!this.layerRendererEnable) {
            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, true);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.sendToBack(child);
                }
            }
        } else {
            if (displayList.exists(this)) {
                displayList.sendToBack(this);
            }
            // children are inside rendererLayer, not in scene's display list
        }
        return this;
    },

    sendMeToBack() {
        return this.sendToBack();
    },

    moveDepthBelow(gameObject) {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }

        if (gameObject.displayList !== displayList) {
            // Do nothing if not at the same display list
            return this;
        }

        if (!this.layerRendererEnable) {
            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, false);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.moveBelow(gameObject, child);
                    break;
                }
            }
        } else {
            if (displayList.exists(this)) {
                displayList.moveBelow(gameObject, this);
            }
            // children are inside rendererLayer, not in scene's display list
        }
        return this;
    },

    moveMyDepthBelow(gameObject) {
        return this.moveDepthBelow(gameObject);
    },

    moveDepthAbove(gameObject) {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }

        if (gameObject.displayList !== displayList) {
            // Do nothing if not at the same display list
            return this;
        }

        if (!this.layerRendererEnable) {
            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, true);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.moveAbove(gameObject, child);
                    break;
                }
            }
        } else {
            if (displayList.exists(this)) {
                displayList.moveAbove(gameObject, this);
            }
            // children are inside rendererLayer, not in scene's display list
        }
        return this;
    },

    moveMyDepthAbove(gameObject) {
        return this.moveDepthAbove(gameObject);
    },

    bringChildToTop(child) {
        if ((child === this) && (this.layerRendererEnable)) {
            // containterLite is at the very bottom, can't move it to top
            return this;
        }

        var gameObjects;
        if ((child !== this) && child.isRexContainerLite && (!child.layerRendererEnable)) {
            gameObjects = child.getAllChildren([child]);
            gameObjects = FilterDisplayGameObjects(gameObjects);
            gameObjects = SortGameObjectsByDepth(gameObjects, false);

        } else {
            gameObjects = [child];
        }

        var topChild;
        if (!this.layerRendererEnable) {
            var children = this.getAllChildren([this]);
            children = FilterDisplayGameObjects(children);
            children = SortGameObjectsByDepth(children, false);
            topChild = children[children.length - 1];
        } else {
            topChild = this;
        }

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (topChild === gameObject) {
                continue;
            }
            if ((gameObject !== this) && (topChild.displayList !== gameObject.displayList)) {
                continue;
            }

            topChild.displayList.moveAbove(gameObject, topChild);
            topChild = gameObject;
        }

        return this;
    },

    sendChildToBack(child) {
        if ((child === this) && (this.layerRendererEnable)) {
            // containterLite is at the very bottom, do nothing
            return this;
        }

        var gameObjects;
        if ((child !== this) && child.isRexContainerLite && (!child.layerRendererEnable)) {
            gameObjects = child.getAllChildren([child]);
            gameObjects = FilterDisplayGameObjects(gameObjects);
            gameObjects = SortGameObjectsByDepth(gameObjects, false);
        } else {
            gameObjects = [child];
        }

        var bottomChild;
        if (!this.layerRendererEnable) {
            var children = this.getAllChildren([this]);
            children = FilterDisplayGameObjects(children);
            children = SortGameObjectsByDepth(children, false);
            bottomChild = children[0];
        } else {
            bottomChild = this;
        }

        for (var i = gameObjects.length - 1; i >= 0; i--) {
            var gameObject = gameObjects[i];
            if (bottomChild === gameObject) {
                continue;
            }
            if ((gameObject !== this) && (bottomChild.displayList !== gameObject.displayList)) {
                continue;
            }

            bottomChild.displayList.moveBelow(gameObject, bottomChild);
            bottomChild = gameObject;
        }

        return this;
    },
};