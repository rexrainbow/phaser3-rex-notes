import Sizer from '../sizer/Sizer.js';
import GetElement from '../utils/GetElement.js';
import ButtonSetInteractive from '../utils/ButtonSetInteractive.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Dialog extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = defaultConfig;
        }
        // Create sizer        
        config.orientation = 1; // Top to bottom
        super(scene, config);
        this.type = 'rexDialog';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var title = GetValue(config, 'title', undefined);
        var content = GetValue(config, 'content', undefined);
        var description = GetValue(config, 'description', undefined);
        var choices = GetValue(config, 'choices', undefined);
        if (choices && choices.length === 0) {
            choices = undefined;
        }
        var actions = GetValue(config, 'actions', undefined);
        if (actions && actions.length === 0) {
            actions = undefined;
        }

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var titleSpace = GetValue(config, 'space.title', 0);
        var contentSpace = GetValue(config, 'space.content', 0);
        var descriptionSpace = GetValue(config, 'space.description', 0);
        var choicesSpace = GetValue(config, 'space.choices', 0);
        var choiceSpace = GetValue(config, 'space.choice', 0);
        var actionSpace = GetValue(config, 'space.action', 0);

        if (background) {
            this.addBackground(background);
        }

        if (title) {
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: (content || description || choices || actions) ? titleSpace : paddingBottom
            }
            this.add(title, 0, 'center', padding, true);
        }

        if (content) {
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title) ? 0 : paddingTop,
                bottom: (description || choices || actions) ? contentSpace : paddingBottom
            }
            this.add(content, 0, 'center', padding);
        }

        if (description) {
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title) ? 0 : paddingTop,
                bottom: (choices || actions) ? descriptionSpace : paddingBottom
            }
            this.add(description, 0, 'center', padding);
        }

        if (choices) {
            var buttonsSizer = this;
            var button, proportion;
            var lastBottomPadding = (actions) ? choicesSpace : paddingBottom;
            for (var i = 0, cnt = choices.length; i < cnt; i++) {
                button = choices[i];
                // Add to sizer
                var padding = {
                    left: paddingLeft,
                    right: paddingRight,
                    top: (i >= 1) ? choiceSpace : 0,
                    bottom: (i === (cnt - 1)) ? lastBottomPadding : 0
                }
                buttonsSizer.add(button, 0, 'center', padding, true);
                ButtonSetInteractive.call(this, button, 'choices', i);
            }
        }

        if (actions) {
            var buttonsSizer = new Sizer(scene, 0, 0, 0, 0, {
                orientation: 0 // Left-right
            });
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title || content || description || choices) ? 0 : paddingTop,
                bottom: paddingBottom
            }
            this.add(buttonsSizer, 0, 'center', padding, true);

            var actionsAlign = GetValue(config, 'actionsAlign', 'center');
            var button, proportion;
            for (var i = 0, cnt = actions.length; i < cnt; i++) {
                button = actions[i];
                // Add to sizer
                var padding = {
                    left: (i >= 1) ? actionSpace : 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
                switch (actionsAlign) {
                    case 'left':
                        proportion = 0;
                        break;
                    case 'right':
                        proportion = (i === 0) ? 1 : 0;
                        break;
                    default:
                        proportion = 1;
                        break;
                }
                buttonsSizer.add(button, proportion, actionsAlign, padding, true);
                ButtonSetInteractive.call(this, button, 'actions', i);
            }
        }

        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.title = title;
        this.childrenMap.content = content;
        this.childrenMap.choices = choices;
        this.childrenMap.actions = actions;
    }
}


var methods = {
    getElement: GetElement,
}
Object.assign(
    Dialog.prototype,
    methods
);

const defaultConfig = {};

export default Dialog;