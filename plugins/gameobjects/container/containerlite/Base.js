import CheckP3Version from '../../../utils/system/CheckP3Version.js';
CheckP3Version();

import Renderer from './renderer/Renderer.js';
import ChildrenDisplayList from './renderer/ChildrenDisplayList.js';

const Zone = Phaser.GameObjects.Zone;
const AddItem = Phaser.Utils.Array.Add;
const RemoveItem = Phaser.Utils.Array.Remove;

class Base extends Zone {
    constructor(scene, x, y, width, height) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = 1;
        }
        if (height === undefined) {
            height = 1;
        }
        super(scene, x, y, width, height);
        this.children = [];

        /*
        Internal layer-like renderer
        All children will be put into this internal layer, instead of displayList of scene,
        and Base/ContainerLite will be very bottom of all children
        */
        this.layerRendererEnable = false;
        this.rendererLayer = undefined;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (fromScene) {
            // Stop scene
            var child;
            for (var i = this.children.length - 1; i >= 0; i--) {
                child = this.children[i];
                if (!child.parentContainer &&  // Not in container
                    (
                        !child.displayList ||   // Not in any display list
                        (child.displayList === this.rendererLayer) // In internal children display list
                    )
                ) {
                    // Destroy child which is not in scene, container, or layer manually
                    child.destroy(fromScene);
                }
            }
        }

        // Destroy/remove children
        this.clear(!fromScene);
        super.destroy(fromScene);

        this.rendererLayer = undefined;
    }

    contains(gameObject) {
        return (this.children.indexOf(gameObject) !== -1);
    }

    add(gameObjects) {
        AddItem(this.children, gameObjects, 0,
            // Callback of item added
            function (gameObject) {
                gameObject.once('destroy', this.onChildDestroy, this);
                this.addChildCallback(gameObject);
            }, this);
        return this;
    }

    remove(gameObjects, destroyChild) {
        RemoveItem(this.children, gameObjects,
            // Callback of item removed
            function (gameObject) {
                gameObject.off('destroy', this.onChildDestroy, this);
                this.removeChildCallback(gameObject, destroyChild);
                if (destroyChild) {
                    gameObject.destroy();
                }
            }, this);
        return this;
    }

    // Overwrite it
    addChildCallback(gameObject) {
        var layer = this.rendererLayer;
        if (layer) {
            layer.add(gameObject); // will invoke rendererLayer.queueDepthSort()
        }
    }

    // Overwrite it
    removeChildCallback(gameObject, destroyChild) {
        var layer = this.rendererLayer;
        if (layer) {
            layer.remove(gameObject); // will invoke rendererLayer.queueDepthSort()
        }
    }

    onChildDestroy(child, fromScene) {
        // Only remove reference
        this.remove(child, false);
    }

    clear(destroyChild) {
        var gameObject;
        var children = this.children.slice();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            gameObject = children[i];

            if (!gameObject) {
                continue;
            }

            gameObject.off('destroy', this.onChildDestroy, this);
            this.removeChildCallback(gameObject, destroyChild);
            if (destroyChild) {
                gameObject.destroy();
            }
        }
        this.children.length = 0;

        return this;
    }

    enableLayerRenderer() {
        if (this.layerRendererEnable) {
            return this;
        }

        this.layerRendererEnable = true;

        var rendererLayer = new ChildrenDisplayList(this);

        this.rendererLayer = rendererLayer;

        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            this.addChildCallback(this.children[i]);
        }

        rendererLayer.queueDepthSort();

        return this;
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Base,
    [
        Components.Alpha,
        Components.Flip
    ]
);

Object.assign(
    Base.prototype,
    Renderer,
)

export default Base;
