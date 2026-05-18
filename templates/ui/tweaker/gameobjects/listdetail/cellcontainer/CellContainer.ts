import Sizer from '../../../../sizer/Sizer';
import Build from './Build';
import OnClickButtonMethods from './OnClickButtonMethods';
import OnPointerOverOutMethods from './OnPointerOverOutMethods';

class CellContainer extends Sizer {
    bindingKey: any;
    bindingTarget: any;
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

    setItem(items?: any, index?: any) {
        var item = items[index];

        this.cellIndex = index;

        // item is an object
        this.setBindingTarget(item);

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

    setDisplayNameLabel(content?: any) {
        var displayNameLabel = this.childrenMap.displayName;
        if (typeof (content) === 'string') {
            displayNameLabel.setText(content);
        } else {
            displayNameLabel.setTitle(content);
        }
        return this;
    }

    setBindingTarget(target?: any, key?: any) {
        this.bindingTarget = target;
        this.bindingKey = key;
        return this;
    }

    setSelectedState(enable?: any) {
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