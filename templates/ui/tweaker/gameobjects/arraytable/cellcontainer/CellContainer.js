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
            inputTweaker,
            deleteButton,
            moveUpButton,
            moveDownButton,
        }
        */

        // Create sizer
        super(scene, {
            space: config.space
        });
        this.type = 'rexTweaker.ArrayTable.CellContainer';

        this.gridTable = config.gridTable;

        this.build(config);
    }

    setItem(items, index) {
        var item = items[index];

        this.cellIndex = index;

        if (typeof item === 'object') {
            this.setBindingTarget(item);
        } else {
            this.setBindingTarget(items, index);
        }

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

    setBindingTarget(target, key) {
        this.childrenMap.inputTweaker.setBindingTarget(target, key);
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
