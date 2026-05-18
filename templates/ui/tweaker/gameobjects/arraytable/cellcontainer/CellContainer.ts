import Sizer from '../../../../sizer/Sizer';
import Build from './Build';
import OnClickButtonMethods from './OnClickButtonMethods';
import OnPointerOverOutMethods from './OnPointerOverOutMethods';

class CellContainer extends Sizer {
    build: any;
    cellIndex: any;
    childrenMap: any;
    gridTable: any;
    type: any;

    constructor(scene?: any, config?: any) {
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

    setItem(items?: any, index?: any) {
        var item = items[index];

        this.cellIndex = index;

        if (typeof item === 'object') {
            this.setBindingTarget(item);
        } else {
            this.setBindingTarget(items, index);
        }

        this.setReadOnly(this.gridTable.readOnly);

        return this;
    }

    setIndexLabel(content?: any) {
        var indexLabel = this.childrenMap.index;
        if (typeof (content) === 'string') {
            indexLabel.setText(content);
        } else {
            indexLabel.setTitle(content);
        }
        return this;
    }

    setBindingTarget(target?: any, key?: any) {
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

    setReadOnly(value?: any) {
        this.childrenMap.inputTweaker.setReadOnly(value);
        return this;
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