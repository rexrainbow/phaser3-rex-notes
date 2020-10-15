import Sizer from '../sizer/Sizer.js';
import Buttons from '../buttons/Buttons.js';
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
        var toolbarBackground = GetValue(config, 'toolbarBackground', undefined);
        var leftToolbar = GetValue(config, 'leftToolbar', undefined);
        var leftToolbarBackground = GetValue(config, 'leftToolbarBackground', undefined);
        var content = GetValue(config, 'content', undefined);
        var description = GetValue(config, 'description', undefined);
        var choicesSizer;
        var choices = GetValue(config, 'choices', undefined);
        var choicesBackground = GetValue(config, 'choicesBackground', undefined);
        var actionsSizer;
        var actions = GetValue(config, 'actions', undefined);
        var actionsBackground = GetValue(config, 'actionsBackground', undefined);
        var clickConfig = GetValue(config, 'click', undefined);

        if (background) {
            this.addBackground(background);
        }

        var toolbarSizer;
        if (toolbar) {
            toolbarSizer = new Buttons(scene, {
                groupName: 'toolbar',
                background: toolbarBackground,
                buttons: toolbar,
                orientation: 0, // Left-right
                space: { item: GetValue(config, 'space.toolbarItem', 0) },
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
        }

        var leftToolbarSizer;
        if (leftToolbar) {
            leftToolbarSizer = new Buttons(scene, {
                groupName: 'leftToolbar',
                background: leftToolbarBackground,
                buttons: leftToolbar,
                orientation: 0, // Left-right
                space: { item: GetValue(config, 'space.leftToolbarItem', 0) },
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
        }

        // title only
        if (title && !toolbar && !leftToolbar) {
            var align = GetValue(config, 'align.title', 'center');
            var titleSpace = GetValue(config, 'space.title', 0);
            var padding;
            if (content || description || choices || actions) {
                padding = { bottom: titleSpace };
            }
            var expand = GetValue(config, 'expand.title', true);
            this.add(title, 0, align, padding, expand);
        }

        // toolbar only
        if (toolbar && !title && !leftToolbar) {
            var titleSpace = GetValue(config, 'space.title', 0);
            var padding;
            if (content || description || choices || actions) {
                padding = { bottom: titleSpace };
            }
            var expand = GetValue(config, 'expand.toolbar', true);
            this.add(toolbarSizer, 0, 'right', padding, expand);
        }

        // leftToolbar only
        if (leftToolbar && !title && !toolbar) {
            var titleSpace = GetValue(config, 'space.title', 0);
            var padding;
            if (content || description || choices || actions) {
                padding = { bottom: titleSpace };
            }
            var expand = GetValue(config, 'expand.leftToolbar', true);
            this.add(leftToolbarSizer, 0, 'left', padding, expand);
        }

        // tilte and (toolbar or leftToolbar)
        if (title && (toolbar || leftToolbar)) {
            var titleSizer = new Sizer(scene, {
                orientation: 0
            });
            // Add leftToolbar
            if (leftToolbarSizer) {
                titleSizer.add(leftToolbarSizer, 0, 'right', 0, false);
            }
            // Add title
            var align = GetValue(config, 'align.title', 'left');
            var expand = GetValue(config, 'expand.title', true);
            // Add space if not expand
            if (
                !expand &&
                ((align === 'right') || (align === 'center'))
            ) {
                titleSizer.addSpace();
            }
            var padding = {
                left: GetValue(config, 'space.titleLeft', 0),
                right: GetValue(config, 'space.titleRight', 0)
            }
            var proportion = (expand) ? 1 : 0;
            titleSizer.add(title, proportion, 'center', padding, expand);
            // Add space if not expand
            if (
                !expand &&
                ((align === 'left') || (align === 'center'))
            ) {
                titleSizer.addSpace();
            }
            // Add toolbar
            if (toolbarSizer) {
                titleSizer.add(toolbarSizer, 0, 'right', 0, false);
            }
            // Add sizer to dialog
            var titleSpace = GetValue(config, 'space.title', 0);
            var padding;
            if (content || description || choices || actions) {
                padding = { bottom: titleSpace };
            }
            this.add(titleSizer, 0, 'center', padding, true);
        }

        if (content) {
            var align = GetValue(config, 'align.content', 'center');
            var contentSpace = GetValue(config, 'space.content', 0);
            var padding = {
                left: GetValue(config, 'space.contentLeft', 0),
                right: GetValue(config, 'space.contentRight', 0),
                bottom: ((description || choices || actions) ? contentSpace : 0)
            }
            var expand = GetValue(config, 'expand.content', true);
            this.add(content, 0, align, padding, expand);
        }

        if (description) {
            var align = GetValue(config, 'align.description', 'center');
            var descriptionSpace = GetValue(config, 'space.description', 0);
            var padding = {
                left: GetValue(config, 'space.descriptionLeft', 0),
                right: GetValue(config, 'space.descriptionRight', 0),
                bottom: ((choices || actions) ? descriptionSpace : 0)
            }
            var expand = GetValue(config, 'expand.description', true);
            this.add(description, 0, align, padding, expand);
        }

        if (choices) {
            var align = GetValue(config, 'align.choices', 'center');
            choicesSizer = new Buttons(scene, {
                groupName: 'choices',
                background: choicesBackground,
                buttons: choices,
                orientation: 1, // Top-Bottom
                space: { item: GetValue(config, 'space.choice', 0) },
                click: clickConfig,
                eventEmitter: this.eventEmitter,
                type: GetValue(config, 'choicesType', undefined),
                setValueCallback: GetValue(config, 'choicesSetValueCallback', undefined),
                setValueCallbackScope: GetValue(config, 'choicesSetValueCallbackScope', undefined)
            });
            var choicesSpace = GetValue(config, 'space.choices', 0);
            var padding = {
                left: GetValue(config, 'space.choicesLeft', 0),
                right: GetValue(config, 'space.choicesRight', 0),
                bottom: ((actions) ? choicesSpace : 0)
            }
            var expand = GetValue(config, 'expand.choices', true);
            this.add(choicesSizer, 0, align, padding, expand);
        }

        if (actions) {
            actionsSizer = new Buttons(scene, {
                groupName: 'actions',
                background: actionsBackground,
                buttons: actions,
                orientation: 0, // Left-right
                space: { item: GetValue(config, 'space.action', 0) },
                expand: GetValue(config, 'expand.actions', false),
                align: GetValue(config, 'align.actions', 'center'),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            })
            var padding = {
                left: GetValue(config, 'space.actionsLeft', 0),
                right: GetValue(config, 'space.actionsRight', 0)
            }
            this.add(actionsSizer, 0, 'center', padding, true);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('title', title);
        this.addChildrenMap('toolbar', toolbar);
        this.addChildrenMap('leftToolbar', leftToolbar);
        this.addChildrenMap('content', content);
        this.addChildrenMap('description', description);
        this.addChildrenMap('choices', choices);
        this.addChildrenMap('actions', actions);
        this.addChildrenMap('choicesSizer', choicesSizer);
        this.addChildrenMap('actionsSizer', actionsSizer);
        this.addChildrenMap('toolbarSizer', toolbarSizer);
        this.addChildrenMap('leftToolbarSizer', leftToolbarSizer);
    }
}

Object.assign(
    Dialog.prototype,
    ButtonMethods
);

export default Dialog;