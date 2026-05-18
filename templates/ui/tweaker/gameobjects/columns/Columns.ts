import Sizer from '../../../sizer/Sizer';
import BindingTargetMethods from './BindingTargetMethods';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods';
import SetReadOnlyMethods from './SetReadOnlyMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Columns extends Sizer {
    add: any;
    addBackground: any;
    addChildrenMap: any;
    alignInputRowTitleStartFlag: any;
    childrenMap: any;
    getMaxInputRowTitleWidth: any;
    setInputRowTitleWidth: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 'y';

        super(scene, config);
        this.type = 'rexTweaker.Columns';

        this.alignInputRowTitleStartFlag = GetValue(config, 'alignTitle');

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var title = GetValue(config, 'title', undefined);

        if (background?: any) {
            this.addBackground(background);
        }

        if (title?: any) {
            this.add(
                title,
                {
                    expand: true,
                    space: {
                        bottom: GetValue(config, 'space.title', 0)
                    }
                }
            );
        }

        var columnsSizer = new Sizer(scene, {
            orientation: 'x',
            space: {
                item: GetValue(config, 'space.column', 0)
            }
        });
        scene.add.existing(columnsSizer);

        var columnConfigArray = GetValue(config, 'columns', undefined);
        var columnConfig;
        var columnChild;
        for (var i = 0, cnt = columnConfigArray.length; i < cnt; i++) {
            columnConfig = columnConfigArray[i];
            columnChild = columnConfig.child;
            columnsSizer.add(
                columnConfig.child,
                {
                    proportion: (columnChild.minWidth === 0) ? 1 : 0,
                    expand: GetValue(columnConfig, 'expand', true)
                }
            )
        }

        this.add(
            columnsSizer,
            { expand: true }
        );

        this.addChildrenMap('title', title);
        this.addChildrenMap('columnsSizer', columnsSizer);
        this.addChildrenMap('columns', columnsSizer.childrenMap.items);
    }

    preLayout() {
        super.preLayout();

        if (this.alignInputRowTitleStartFlag) {
            this.setInputRowTitleWidth(this.getMaxInputRowTitleWidth());
        }
    }

    setTitle(config?: any) {
        var title = this.childrenMap.title;

        if (config.text || config.title || config.icon) {
            title.show().setTitle(config);
        } else {
            title.hide();
        }

        return this;
    }

    getColumns() {
        return this.childrenMap.columns;
    }

    getColumn(index?: any) {
        return this.childrenMap.columns[index];
    }
}

Object.assign(
    Columns.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
    SetReadOnlyMethods,
)

export default Columns;