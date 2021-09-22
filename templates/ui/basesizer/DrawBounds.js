import ALIGNMODE from '../utils/AlignConst.js';
import AlignIn from '../../../plugins/utils/actions/AlignIn.js';

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
        graphics.once('destroy', function (graphics, fromScene) {
            graphics.children.destroy(!fromScene);
            graphics.children = undefined;
        })
        var graphicsClear = graphics.clear.bind(graphics);
        graphics.clear = function () {
            graphicsClear();
            graphics.children.clear(false, true);
        }
    }

    var children = this.getAllShownChildren([this]), child;
    var nameText;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (!child.getBounds) {
            continue;
        }
        if (color) {
            graphics
                .lineStyle(1, color)
                .strokeRectShape(child.getBounds(GlobRect));
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

                AlignIn(nameText, GlobRect.x, GlobRect.y, GlobRect.width, GlobRect.height, textAlign);
            }
        }
    }
    return this;
}

var DefaultCreateTextCallback = function (scene, child, childBoundsRect) {
    return scene.add.text(0, 0, '');
}

var GlobRect = new Phaser.Geom.Rectangle();

export default DrawBounds;