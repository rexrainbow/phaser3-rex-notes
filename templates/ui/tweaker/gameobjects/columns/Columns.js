import Sizer from '../../../sizer/Sizer.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Columns extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 'y';

        super(scene, config);
        this.type = 'rexTweaker.Columns';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var header = GetValue(config, 'header', undefined);
        var footer = GetValue(config, 'footer', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (header) {
            this.add(
                header,
                { expand: true }
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

        if (footer) {
            this.add(
                footer,
                { expand: true }
            );
        }

        this.addChildrenMap('header', header);
        this.addChildrenMap('columnsSizer', columnsSizer);
        this.addChildrenMap('columns', columnsSizer.childrenMap.items);
        this.addChildrenMap('footer', footer);
    }

    setTitle(config) {
        var title = this.childrenMap.header;

        if (config.title || config.icon) {
            title.show().setTitle(config);
        } else {
            title.hide();
        }

        return this;
    }

    getColumns() {
        return this.childrenMap.columns;
    }

    getColumn(index) {
        return this.childrenMap.columns[index];
    }
}

Object.assign(
    Columns.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
)

export default Columns;