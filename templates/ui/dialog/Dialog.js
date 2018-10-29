import Sizer from '../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Dialog extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = defaultConfig;
        }
        // Create sizer
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var minWidth = GetValue(config, 'width', 0);
        var minHeight = GetValue(config, 'height', 0);
        config.orientation = 1; // Top to bottom
        super(scene, x, y, minWidth, minHeight, config);
        scene.add.existing(this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var title = GetValue(config, 'title', undefined);
        var content = GetValue(config, 'content', undefined);
        var buttons = GetValue(config, 'buttons', undefined);
        if (buttons && buttons.length === 0) {
            buttons = undefined;
        }

        // Space
        var titleSpace = GetValue(config, 'space.title', 0);
        var contentSpace = GetValue(config, 'space.content', 0);
        var buttonSpace = GetValue(config, 'space.button', 0);
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);

        if (background) {
            this.add(background, -1, undefined, undefined, true);
        }

        if (title) {
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: (content || buttons) ? titleSpace : paddingBottom
            }
            this.add(title, 0, 'center', padding, true);
        }

        if (content) {
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title) ? 0 : paddingTop,
                bottom: (buttons) ? contentSpace : paddingBottom
            }
            this.add(content, 0, 'center', padding);
        }

        if (buttons) {
            var buttonsOrientation = GetValue(config, 'buttonsOrientation', 0);
            if (typeof (buttonsOrientation) === 'string') {
                buttonsOrientation = ORIENTATIONMODE[buttonsOrientation];
            }
            var buttonsSizer;
            if (buttonsOrientation === 0) { // Left-right
                buttonsSizer = new Sizer(scene, 0, 0, 0, 0, {
                    orientation: 0 // Left-right
                });
                var padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (title || content) ? 0 : paddingTop,
                    bottom: paddingBottom
                }
                this.add(buttonsSizer, 0, 'center', padding, true);
            } else { // Top-bottom               
                buttonsSizer = this;
            }

            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                if (buttonsOrientation === 0) { // Left-right
                    var padding = {
                        left: (i >= 1) ? buttonSpace : 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                    buttonsSizer.add(buttons[i], 1, 'center', padding, true);
                } else { // Top-bottom       
                    var padding = {
                        left: paddingLeft,
                        right: paddingRight,
                        top: (i >= 1) ? buttonSpace : 0,
                        bottom: (i === (cnt - 1)) ? paddingBottom : 0
                    }
                    buttonsSizer.add(buttons[i], 0, 'center', padding, true);
                }
            }
        }

        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.title = title;
        this.childrenMap.content = content;
        this.childrenMap.buttons = buttons;
    }
}

const defaultConfig = {};

const ORIENTATIONMODE = {
    x: 0,
    h: 0,
    horizontal: 0,
    y: 1,
    v: 1,
    vertical: 1
}

export default Dialog;