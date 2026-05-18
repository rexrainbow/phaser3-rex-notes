import Render from './render/Render';
import Methods from './methods/Methods';
import PoolManager from './poolmanager/PoolManager';

import CheckP3Version from '../../../utils/system/CheckP3Version';
import { Class as PhaserClass, GameObjects as PhaserGameObjects, Renderer as PhaserRenderer, Structs as PhaserStructs, Utils as PhaserUtils } from 'phaser';
CheckP3Version();

const GameObject = PhaserGameObjects.GameObject;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const List = PhaserStructs.List;
const StableSort = PhaserUtils.Array.StableSort;
const DefaultBlitterNodes = PhaserRenderer.WebGL.RenderNodes.Defaults.DefaultBlitterNodes;

class Blitter extends GameObject {
    children: any;
    clearTint: any;
    displayListDirty: any;
    initRenderNodes: any;
    lastAppendedChildren: any;
    poolManager: any;
    removeChildren: any;
    renderList: any;
    setOrigin: any;
    setPosition: any;
    setTexture: any;

    constructor(scene?: any, x?: any, y?: any, texture?: any, frame?: any, config?: any) {
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

            if (needDepthSort?: any) {
                StableSort(this.renderList, SortByDepth)
            }

            this.displayListDirty = false;
        }

        return this.renderList;
    }
}

var ChildCanRender = function(child?: any) {
    return (child.active && child.visible && (child.alpha > 0));
}

var SortByDepth = function(childA?: any, childB?: any) {
    return childA._depth - childB._depth;
}

const Components = PhaserGameObjects.Components;
PhaserClass.mixin(Blitter,
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