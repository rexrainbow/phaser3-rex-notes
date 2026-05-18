import CheckP3Version from '../../../utils/system/CheckP3Version';
CheckP3Version();

import Renderer from './renderer/Renderer';
import ChildrenDisplayList from './renderer/ChildrenDisplayList';
import AddToContainer from './p3container/AddToContainer';

import { BlendModes as PhaserBlendModes, Class as PhaserClass, GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const Zone = PhaserGameObjects.Zone;
const AddItem = PhaserUtils.Array.Add;
const RemoveItem = PhaserUtils.Array.Remove;
const SKIP_CHECK_BLEND_MODE = PhaserBlendModes.SKIP_CHECK;

class Base extends Zone {
    children: any;
    filterCamera: any;
    ignoreDestroy: any;
    layerRendererEnable: any;
    rendererLayer: any;
    scene: any;
    setBlendMode: any;
    setFiltersFocusContext: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any) {
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

        this.setBlendMode(SKIP_CHECK_BLEND_MODE);
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (fromScene?: any) {
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

    contains(gameObject?: any) {
        return (this.children.indexOf(gameObject) !== -1);
    }

    add(gameObjects?: any) {
        AddItem(this.children, gameObjects, 0,
            // Callback of item added
            function(gameObject?: any) {
                gameObject.once('destroy', this.onChildDestroy, this);
                this.addChildCallback(gameObject);
            }, this);
        return this;
    }

    remove(gameObjects?: any, destroyChild?: any) {
        RemoveItem(this.children, gameObjects,
            // Callback of item removed
            function(gameObject?: any) {
                gameObject.off('destroy', this.onChildDestroy, this);
                this.removeChildCallback(gameObject, destroyChild);
                if (destroyChild?: any) {
                    gameObject.destroy();
                }
            }, this);
        return this;
    }

    // Overwrite it
    addChildCallback(gameObject?: any) {
        var layer = this.rendererLayer;
        if (layer?: any) {
            layer.add(gameObject); // will invoke rendererLayer.queueDepthSort()
        }
    }

    // Overwrite it
    removeChildCallback(gameObject?: any, destroyChild?: any) {
        var layer = this.rendererLayer;
        if (layer?: any) {
            layer.remove(gameObject); // will invoke rendererLayer.queueDepthSort()
        }
    }

    onChildDestroy(child?: any, fromScene?: any) {
        // Only remove reference
        this.remove(child, false);
    }

    clear(destroyChild?: any) {
        var gameObject;
        var children = this.children.slice();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            gameObject = children[i];

            if (!gameObject) {
                continue;
            }

            gameObject.off('destroy', this.onChildDestroy, this);
            this.removeChildCallback(gameObject, destroyChild);
            if (destroyChild?: any) {
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

        AddToContainer.call(this, rendererLayer, {
            includeParent: false,
            setLayerState: true,
            clearDepthSort: true,
        });

        return this;
    }

    enableFilters() {
        if (this.filterCamera || !this.scene.renderer.gl) {
            return this;
        }

        this.enableLayerRenderer();

        /*
        Layer renderer requires filtersFocusContext=true 
        to avoid object-bounds clipping when using any filter.
        */
        this.setFiltersFocusContext(true);

        super.enableFilters();

        return this;
    }
}

const Components = PhaserGameObjects.Components;
PhaserClass.mixin(Base,
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