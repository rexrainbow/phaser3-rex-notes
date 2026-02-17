import Sizer from '../../../../sizer/Sizer.js';
import Build from './Build.js';
import OnClickButtonMethods from './OnClickButtonMethods.js';

class CellContainer extends Sizer {
    constructor(scene, config) {
        /*
        config: {
            space,
            background,
            indexLabel,
            inputTweaker,
            deleteButton,
            gridTable,
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

    setItem(item) {
        this.cellItem = item;
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

    setBindingTarget(target) {
        this.childrenMap.inputTweaker.setBindingTarget(target);
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
)

export default CellContainer;
