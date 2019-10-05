import Sizer from '../sizer/Sizer.js';
import Buttons from '../buttons/Buttons.js';
import Space from '../utils/Space.js';
import ButtonMethods from './ButtonMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Dialog extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
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
        var choicesSizer;
        var choices = GetValue(config, 'choices', undefined);
        if (choices && choices.length === 0) {
            choices = undefined;
        }
        var actionsSizer;
        var actions = GetValue(config, 'actions', undefined);
        if (actions && actions.length === 0) {
            actions = undefined;
        }
        var clickConfig = GetValue(config, 'click', undefined);

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
                click: clickConfig,
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
            var align = GetValue(config, 'align.title', 'left');
            var expand = GetValue(config, 'expand.title', true);
            // Add space if not expand
            if (
                !expand &&
                ((align === 'right') || (align === 'center'))
            ) {
                titleSizer.add(Space(scene), 1, 'center', 0, false);
            }
            var padding = {
                left: GetValue(config, 'space.titleLeft', 0),
                right: GetValue(config, 'space.titleRight', 0),
                top: 0,
                bottom: 0
            }
            titleSizer.add(title, (expand) ? 1 : 0, 'center', padding, expand);
            // Add space if not expand
            if (
                !expand &&
                ((align === 'left') || (align === 'center'))
            ) {
                titleSizer.add(Space(scene), 1, 'center', 0, false);
            }
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
                left: paddingLeft + GetValue(config, 'space.contentLeft', 0),
                right: paddingRight + GetValue(config, 'space.contentRight', 0),
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
                left: paddingLeft + GetValue(config, 'space.descriptionLeft', 0),
                right: paddingRight + GetValue(config, 'space.descriptionRight', 0),
                top: (title || toolbar || content) ? 0 : paddingTop,
                bottom: (choices || actions) ? descriptionSpace : paddingBottom
            }
            var expand = GetValue(config, 'expand.description', true);
            this.add(description, 0, align, padding, expand);
        }

        if (choices) {
            var align = GetValue(config, 'align.choices', 'center');
            choicesSizer = new Buttons(scene, {
                groupName: 'choices',
                buttons: choices,
                orientation: 1, // Top-Bottom
                space: GetValue(config, 'space.choice', 0),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var choicesSpace = GetValue(config, 'space.choices', 0);
            var padding = {
                left: paddingLeft + GetValue(config, 'space.choicesLeft', 0),
                right: paddingRight + GetValue(config, 'space.choicesRight', 0),
                top: (title || toolbar || content || description) ? 0 : paddingTop,
                bottom: (actions) ? choicesSpace : paddingBottom
            }
            var expand = GetValue(config, 'expand.choices', true);
            this.add(choicesSizer, 0, align, padding, expand);
        }

        if (actions) {
            actionsSizer = new Buttons(scene, {
                groupName: 'actions',
                buttons: actions,
                orientation: 0, // Left-right
                space: GetValue(config, 'space.action', 0),
                align: GetValue(config, 'align.actions', 'center'),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            })
            var padding = {
                left: paddingLeft + GetValue(config, 'space.actionsLeft', 0),
                right: paddingRight + GetValue(config, 'space.actionsRight', 0),
                top: (title || toolbar || content || description || choices) ? 0 : paddingTop,
                bottom: paddingBottom
            }
            var expand = GetValue(config, 'expand.actions', true);
            this.add(actionsSizer, 0, 'center', padding, expand);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('title', title);
        this.addChildrenMap('toolbar', toolbar);
        this.addChildrenMap('content', content);
        this.addChildrenMap('choices', choices);
        this.addChildrenMap('actions', actions);
        this.addChildrenMap('choicesSizer', choicesSizer);
        this.addChildrenMap('actionsSizer', actionsSizer);
    }
}

Object.assign(
    Dialog.prototype,
    ButtonMethods
);

export default Dialog;