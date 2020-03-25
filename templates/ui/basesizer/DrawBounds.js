import ALIGNMODE from '../utils/AlignConst.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Group = Phaser.GameObjects.Group;

var DrawBounds = function (graphics, config) {
    var scene = graphics.scene;

    var color;
    var createTextCallback, createTextCallbackScope, textAlign;
    if (typeof (config) === 'number') {
        color = config;
    } else {
        color = GetValue(config, 'color', 0xffffff);
        var nameTextConfig = GetValue(config, 'name', false);
        if (nameTextConfig) {
            createTextCallback = GetValue(nameTextConfig, 'createTextCallback', DefaultCreateTextCallback);
            createTextCallbackScope = GetValue(nameTextConfig, 'createTextCallbackScope', undefined);
            textAlign = GetValue(nameTextConfig, 'align', 'left-top');
            if (typeof (textAlign) === 'string') {
                textAlign = ALIGNMODE[textAlign];
            }
        }
    }

    if (createTextCallback && !graphics.children) {
        graphics.children = new Group(scene);
        graphics.on('destroy', function () {
            graphics.children.destroy(true);
            graphics.children = undefined;
        })
        var graphicsClear = graphics.clear.bind(graphics);
        graphics.clear = function () {
            graphicsClear();
            graphics.children.clear(false, true);
        }
    }

    var children = this.getAllChildren([this]), child;
    var nameText;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (!child.getBounds) {
            continue;
        }
        if (color) {
            graphics
                .lineStyle(1, color)
                .strokeRectShape(child.getBounds(globRect));
        }

        if (child.name && createTextCallback) {
            if (createTextCallbackScope) {
                nameText = createTextCallback.call(createTextCallbackScope, scene);
            } else {
                nameText = createTextCallback(scene);
            }
            if (nameText) {
                nameText.setText(child.name);
                graphics.children.add(nameText);

                GlobZone.setPosition(globRect.x, globRect.y).setSize(globRect.width, globRect.height);
                AlignIn(nameText, GlobZone, textAlign);
            }
        }
    }
    return this;
}

var DefaultCreateTextCallback = function (scene, child, childBoundsRect) {
    return scene.add.text(0, 0, '');
}

var globRect = new Phaser.Geom.Rectangle();

export default DrawBounds;