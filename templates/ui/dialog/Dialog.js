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
        var toolbar = GetValue(config, 'toolbar', undefined);
        if (toolbar && toolbar.length === 0) {
            toolbar = undefined;
        }
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

        if (background) {
            this.addBackground(background);
        }

        // title only
        if (title && !toolbar) {
            var align = GetValue(config, 'align.title', 'center');
            var titleSpace = GetValue(config, 'space.title', 0);
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: (content || description || choices || actions) ? titleSpace : paddingBottom
            }
            var expand = GetValue(config, 'expand.title', true);
            this.add(title, 0, align, padding, expand);
        }

        var toolbarSizer;
        if (toolbar) {
            toolbarSizer = new Buttons(scene, {
                groupName: 'toolbar',
                buttons: toolbar,
                orientation: 0, // Left-right
                space: GetValue(config, 'space.toolbarItem', 0),
                align: GetValue(config, 'align.toolbar', 'right'),
                eventEmitter: this.eventEmitter,
            });
        }

        // toolbar only
        if (toolbar && !title) {
            var titleSpace = GetValue(config, 'space.title', 0);
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: (content || description || choices || actions) ? titleSpace : paddingBottom
            }
            var expand = GetValue(config, 'expand.toolbar', true);
            this.add(toolbarSizer, 0, 'center', padding, expand);
        }

        // tilte and toolbar
        if (title && toolbar) {
            var titleSizer = new Sizer(scene, {
                orientation: 0
            });
            // Add title
            var align = GetValue(config, 'align.title', 'center');
            var expand = GetValue(config, 'expand.title', true);
            titleSizer.add(title, 1, align, 0, expand);
            // Add toolbar
            titleSizer.add(toolbarSizer, 0, 'right', 0, false);
            // Add sizer to dialog
            var titleSpace = GetValue(config, 'space.title', 0);
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: (content || description || choices || actions) ? titleSpace : paddingBottom
            };
            this.add(titleSizer, 0, 'center', padding, true);
        }

        if (content) {
            var align = GetValue(config, 'align.content', 'center');
            var contentSpace = GetValue(config, 'space.content', 0);
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title || toolbar) ? 0 : paddingTop,
                bottom: (description || choices || actions) ? contentSpace : paddingBottom
            }
            var expand = GetValue(config, 'expand.content', true);
            this.add(content, 0, align, padding, expand);
        }

        if (description) {
            var align = GetValue(config, 'align.description', 'center');
            var descriptionSpace = GetValue(config, 'space.description', 0);
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title || toolbar || content) ? 0 : paddingTop,
                bottom: (choices || actions) ? descriptionSpace : paddingBottom
            }
            var expand = GetValue(config, 'expand.description', true);
            this.add(description, 0, align, padding, expand);
        }

        if (choices) {
            var align = GetValue(config, 'align.choices', 'center');
            var buttonsSizer = new Buttons(scene, {
                groupName: 'choices',
                buttons: choices,
                orientation: 1, // Top-Bottom
                space: GetValue(config, 'space.choice', 0),
                align: 'left',
                eventEmitter: this.eventEmitter,
            });
            var choicesSpace = GetValue(config, 'space.choices', 0);
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title || toolbar || content || description) ? 0 : paddingTop,
                bottom: (actions) ? choicesSpace : paddingBottom
            }
            var expand = GetValue(config, 'expand.choices', true);
            this.add(buttonsSizer, 0, align, padding, expand);
        }

        if (actions) {
            var buttonsSizer = new Buttons(scene, {
                groupName: 'actions',
                buttons: actions,
                orientation: 0, // Left-right
                space: GetValue(config, 'space.action', 0),
                align: GetValue(config, 'align.actions', 'center'),
                eventEmitter: this.eventEmitter,
            })
            var padding = {
                left: paddingLeft,
                right: paddingRight,
                top: (title || toolbar || content || description || choices) ? 0 : paddingTop,
                bottom: paddingBottom
            }
            var expand = GetValue(config, 'expand.actions', true);
            this.add(buttonsSizer, 0, 'center', padding, expand);
        }

        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.title = title;
        this.childrenMap.toolbar = toolbar;
        this.childrenMap.content = content;
        this.childrenMap.choices = choices;
        this.childrenMap.actions = actions;
    }
}

const defaultConfig = {};

export default Dialog;