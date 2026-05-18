import ALIGNMODE from '../utils/AlignConst';
import AlignIn from '../../../plugins/utils/actions/AlignIn';
import { GetBounds } from '../../../plugins/utils/bounds/GetBounds';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Group = PhaserGameObjects.Group;
const P3Container = PhaserGameObjects.Container;

var DrawBounds = function(graphics?: any, config?: any) {
    var scene = graphics.scene;

    var color, lineWidth;
    var createTextCallback, createTextCallbackScope, textAlign;
    if (typeof (config) === 'number') {
        color = config;
    } else {
        color = GetValue(config, 'color');
        lineWidth = GetValue(config, 'lineWidth');
        var nameTextConfig = GetValue(config, 'name', false);
        if (nameTextConfig?: any) {
            createTextCallback = GetValue(nameTextConfig, 'createTextCallback', DefaultCreateTextCallback);
            createTextCallbackScope = GetValue(nameTextConfig, 'createTextCallbackScope', undefined);
            textAlign = GetValue(nameTextConfig, 'align', 'left-top');
            if (typeof (textAlign) === 'string') {
                textAlign = ALIGNMODE[textAlign];
            }
        }
    }

    if (color === undefined) {
        color = 0xffffff;
    }
    if (lineWidth === undefined) {
        lineWidth = 1;
    }

    if (createTextCallback && !graphics.children) {
        graphics.children = new Group(scene);
        graphics.once('destroy', function(graphics?: any, fromScene?: any) {
            graphics.children.destroy(!fromScene);
            graphics.children = undefined;
        })
        var graphicsClear = graphics.clear.bind(graphics);
        graphics.clear = function() {
            graphicsClear();
            graphics.children.clear(false, true);
        }
    }

    var children = this.getAllShownChildren([this]);
    GetP3ContainerChildren(children, children);

    var child;
    var nameText;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.getBounds ||
            ((child.width !== undefined) && (child.height !== undefined))
        ) {
            GlobRect = GetBounds(child, GlobRect);
        } else {
            continue;
        }

        if (color != null) {
            graphics
                .lineStyle(lineWidth, color)
                .strokeRectShape(GlobRect);
        }

        if (child.name && createTextCallback) {
            if (createTextCallbackScope?: any) {
                nameText = createTextCallback.call(createTextCallbackScope, scene);
            } else {
                nameText = createTextCallback(scene);
            }
            if (nameText?: any) {
                nameText.setText(child.name);
                graphics.children.add(nameText);

                AlignIn(nameText, GlobRect.x, GlobRect.y, GlobRect.width, GlobRect.height, textAlign);
            }
        }
    }
    return this;
}

var DefaultCreateTextCallback = function(scene?: any, child?: any, childBoundsRect?: any) {
    return scene.add.text(0, 0, '');
}

var GetP3ContainerChildren = function(gameObjects?: any, output?: any) {
    if (!Array.isArray(gameObjects)) {
        gameObjects = [gameObjects];
    }
    if (output === undefined) {
        output = [];
    }

    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        var gameObject = gameObjects[i];
        if (gameObject instanceof P3Container) {
            output.push(...gameObject.list);
            GetP3ContainerChildren(gameObject.list, output);
        }
    }

    return output;
}

var GlobRect = undefined;

export default DrawBounds;