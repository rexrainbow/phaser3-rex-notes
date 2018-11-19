import Sizer from '../sizer/Sizer.js';
import Buttons from '../buttons/Buttons.js';

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
                top: (title || content) ? 0 : paddingTop,
                bottom: (choices || actions) ? descriptionSpace : paddingBottom
            }
            this.add(description, 0, 'center', padding);
        }

        if (choices) {
            var buttonsSizer = new Buttons(scene, {
                groupName: 'choices',
                buttons: choices,
                orientation: 1, // Top-Bottom
                space: choiceSpace,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title || content || description) ? 0 : paddingTop,
                bottom: (actions) ? choicesSpace : paddingBottom
            }
            this.add(buttonsSizer, 0, 'center', padding, true);
        }

        if (actions) {
            var buttonsSizer = new Buttons(scene, {
                groupName: 'actions',
                buttons: actions,
                orientation: 0, // Left-right
                space: actionSpace,
                align: GetValue(config, 'actionsAlign', 'center'),
                eventEmitter: this.eventEmitter,
            })
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title || content || description || choices) ? 0 : paddingTop,
                bottom: paddingBottom
            }
            this.add(buttonsSizer, 0, 'center', padding, true);
        }

        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.title = title;
        this.childrenMap.content = content;
        this.childrenMap.choices = choices;
        this.childrenMap.actions = actions;
    }
}

const defaultConfig = {};

export default Dialog;