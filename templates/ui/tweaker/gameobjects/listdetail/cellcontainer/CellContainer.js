import Sizer from '../../../../sizer/Sizer.js';
import Build from './Build.js';
import OnClickButtonMethods from './OnClickButtonMethods.js';
import OnPointerOverOutMethods from './OnPointerOverOutMethods.js';

class CellContainer extends Sizer {
    constructor(scene, config) {
        /*
        config: {
            space,
            gridTable,
            background,
            indexLabel,
            displayNameLabel,
            deleteButton,
            moveUpButton,
            moveDownButton,
        }
        */

        // Create sizer
        super(scene, {
            space: config.space
        });
        this.type = 'rexTweaker.ListDetail.ListTable.CellContainer';

        this.gridTable = config.gridTable;

        this.build(config);
    }

    setItem(items, index) {
        var item = items[index];

        this.cellIndex = index;

        // item is an object
        this.setBindingTarget(item);

        return this;
    }

    setIndexLabel(content) {
        var indexLabel = this.childrenMap.index;
        if (typeof (content) === 'string') {
            indexLabel.setText(content);
        } else {
            indexLabel.setTitle(content);
        }
        return this;
    }

    setDisplayNameLabel(content) {
        var displayNameLabel = this.childrenMap.displayName;
        if (typeof (content) === 'string') {
            displayNameLabel.setText(content);
        } else {
            displayNameLabel.setTitle(content);
        }
        return this;
    }

    setBindingTarget(target, key) {
        this.bindingTarget = target;
        this.bindingKey = key;
        return this;
    }

    setSelectedState(enable) {
        var background = this.childrenMap.background;
        if (background.setActiveState) {
            background.setActiveState(enable);
        }
        return this;
    }

    get visible() {
        return super.visible;
    }

    set visible(value) {
        super.visible = value;

        if (!value) {
            this.setBindingTarget();
        }
    }

}

var Methods = {
    build: Build
}

Object.assign(
    CellContainer.prototype,
    Methods,
    OnClickButtonMethods,
    OnPointerOverOutMethods,
)

export default CellContainer;
