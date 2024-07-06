import SortGameObjectsByDepth from '../../../utils/system/SortGameObjectsByDepth.js';
import FilterDisplayGameObjects from '../../../utils/system/FilterDisplayGameObjects.js';

export default {
    setDepth(value, containerOnly) {
        this.depth = value;
        if (!containerOnly && this.children) {
            var children = this.getAllChildren();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].depth = value;
            }
        }
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
        if (this.children) {
            var children = this.getAllChildren();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].depth += inc;
            }
        }
        return this;
    },

    bringToTop() {
        var displayList = this.displayList;
        if (!displayList) {
            return this;
        }

        var children = this.getAllChildren([this]);
        SortGameObjectsByDepth(children, false);
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (displayList.exists(child)) {
                displayList.bringToTop(child);
            }
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

        var children = this.getAllChildren([this]);
        SortGameObjectsByDepth(children, true);
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (displayList.exists(child)) {
                displayList.sendToBack(child);
            }
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

        var children = this.getAllChildren([this]);
        SortGameObjectsByDepth(children, false);
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (displayList.exists(child)) {
                displayList.moveBelow(gameObject, child);
                break;
            }
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

        var children = this.getAllChildren([this]);
        SortGameObjectsByDepth(children, true);
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (displayList.exists(child)) {
                displayList.moveAbove(gameObject, child);
                break;
            }
        }
        return this;
    },

    moveMyDepthAbove(gameObject) {
        return this.moveDepthAbove(gameObject);
    },

    bringChildToTop(child) {
        var gameObjects;
        if ((child !== this) && child.isRexContainerLite) {
            gameObjects = child.getAllChildren([child]);
            gameObjects = FilterDisplayGameObjects(gameObjects);
            gameObjects = SortGameObjectsByDepth(gameObjects, false);
        } else {
            gameObjects = [child];
        }

        var children = this.getAllChildren([this]);
        children = FilterDisplayGameObjects(children);
        children = SortGameObjectsByDepth(children, false);
        var topChild = children[children.length - 1];

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
        var gameObjects;
        if ((child !== this) && child.isRexContainerLite) {
            gameObjects = child.getAllChildren([child]);
            gameObjects = FilterDisplayGameObjects(gameObjects);
            gameObjects = SortGameObjectsByDepth(gameObjects, false);
        } else {
            gameObjects = [child];
        }

        var children = this.getAllChildren([this]);
        children = FilterDisplayGameObjects(children);
        children = SortGameObjectsByDepth(children, false);
        var bottomChild = children[0];

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