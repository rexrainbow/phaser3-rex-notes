import Render from './render/Render.js';
import Methods from './methods/Methods.js';
import PoolManager from './poolmanager/PoolManager.js';

import CheckP3Version from '../../../utils/system/CheckP3Version.js';
CheckP3Version();

const GameObject = Phaser.GameObjects.GameObject;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const List = Phaser.Structs.List;
const StableSort = Phaser.Utils.Array.StableSort;
const DefaultBlitterNodes = Phaser.Renderer.WebGL.RenderNodes.Defaults.DefaultBlitterNodes;

class Blitter extends GameObject {
    constructor(scene, x, y, texture, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            texture = GetValue(config, 'texture');
            frame = GetValue(config, 'frame');
        }

        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        super(scene, 'rexBlitter');

        this.children = new List();
        this.renderList = [];
        this.displayListDirty = false;
        this.lastAppendedChildren = [];

        var reuseBob = GetValue(config, 'reuseBob', true);
        this.poolManager = (reuseBob) ? (new PoolManager(config)) : undefined;

        this.setTexture(texture, frame);
        this.setPosition(x, y);        
        this.initRenderNodes(this._defaultRenderNodesMap);
        this.setOrigin(0, 0);
        this.clearTint();

    }

    get _defaultRenderNodesMap() {
        return DefaultBlitterNodes;
    }


    preDestroy() {
        this.removeChildren();
        this.children.destroy();
        this.renderList.length = 0;

        if (this.poolManager) {
            this.poolManager.destroy();
        }
    }

    getRenderList() {
        if (this.displayListDirty) {
            this.renderList.length = 0;
            var needDepthSort = false;

            var children = this.children.list;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (ChildCanRender(child)) {
                    this.renderList.push(child);

                    if (!needDepthSort) {
                        needDepthSort = (child.depth !== 0);
                    }
                }
            }

            if (needDepthSort) {
                StableSort(this.renderList, SortByDepth)
            }

            this.displayListDirty = false;
        }

        return this.renderList;
    }
}

var ChildCanRender = function (child) {
    return (child.active && child.visible && (child.alpha > 0));
}

var SortByDepth = function (childA, childB) {
    return childA._depth - childB._depth;
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Blitter,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Depth,
        Components.GetBounds,
        Components.Mask,
        Components.RenderNodes,
        Components.Origin,
        Components.ScrollFactor,
        Components.Transform,
        Components.Visible,
        Render,

        Methods
    ]
);


export default Blitter;