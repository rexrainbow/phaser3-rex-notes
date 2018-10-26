import Sizer from '../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class List extends Sizer {
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
        var backgroundObject = GetValue(config, 'background', undefined);
        if (backgroundObject) {
            this.add(backgroundObject, -1);
        }

        var titleObject = GetValue(config, 'title', undefined);
        var items = GetValue(config, 'items', undefined);
        var titleSpace = (items && (items.length > 0)) ? GetValue(config, 'space.title', 0) : 0;
        var itemSpace = GetValue(config, 'space.item', 0);

        if (titleObject) {
            var padding;
            if (titleSpace > 0) {
                padding = {
                    bottom: titleSpace
                }
            }
            this.add(titleObject, 0, 'center', padding);
        }

        if (items) {
            var padding;
            if (itemSpace > 0) {
                padding = {
                    bottom: itemSpace,
                }
            }
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                this.add(items[i], 0, 'left', (i < (cnt - 1)) ? padding : 0);
            }
        }

        this.childrenMap = {};
        this.childrenMap.background = backgroundObject;
        this.childrenMap.title = titleObject;
        this.childrenMap.items = items;
    }
}

const defaultConfig = {};

export default List;