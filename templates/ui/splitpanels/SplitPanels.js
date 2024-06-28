import Sizer from '../sizer/Sizer.js';
import Drag from '../../../plugins/input/drag/Drag.js';
import OnDragSplitter from './methods/OnDragSplitter.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;


class SplitPanels extends Sizer {
    constructor(scene, config) {
        if (!config.hasOwnProperty('orientation')) {
            config.orientation = (config.hasOwnProperty('leftPanel')) ? 0 : 1;
        }

        super(scene, config);
        this.type = 'rexSplit';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var firstChildKey, secondChildKey;
        var minFirstChildSizeKey, minSecondChildSizeKey;
        if (this.orientation === 0) {
            firstChildKey = 'leftPanel';
            secondChildKey = 'rightPanel';
            minFirstChildSizeKey = 'minLeftPanelWidth';
            minSecondChildSizeKey = 'minRightPanelWidth';
        } else {
            firstChildKey = 'topPanel';
            secondChildKey = 'bottomPanel';
            minFirstChildSizeKey = 'minTopPanelHeight';
            minSecondChildSizeKey = 'minBottomPanelHeight';
        }

        var firstChild = GetValue(config, firstChildKey, undefined);
        var splitter = GetValue(config, 'splitter', undefined);
        var secondChild = GetValue(config, secondChildKey, undefined);

        if (background) {
            this.addBackground(background);
        }

        var spaceConfig = GetValue(config, 'space', undefined);

        this.add(
            firstChild,
            {
                proportion: 1,
                expand: true,
                padding: {
                    left: GetValue(spaceConfig, `${firstChildKey}Left`, 0),
                    right: GetValue(spaceConfig, `${firstChildKey}Right`, 0),
                    top: GetValue(spaceConfig, `${firstChildKey}Top`, 0),
                    bottom: GetValue(spaceConfig, `${firstChildKey}Bottom`, 0),
                }
            }
        )

        this.add(splitter,
            {
                proportion: 0,
                expand: true,
                padding: {
                    left: GetValue(spaceConfig, 'splitterLeft', 0),
                    right: GetValue(spaceConfig, 'splitterRight', 0),
                    top: GetValue(spaceConfig, 'splitterTop', 0),
                    bottom: GetValue(spaceConfig, 'splitterBottom', 0),
                }
            }
        );

        this.add(
            secondChild,
            {
                proportion: 1,
                expand: true,
                padding: {
                    left: GetValue(spaceConfig, `${secondChildKey}Left`, 0),
                    right: GetValue(spaceConfig, `${secondChildKey}Right`, 0),
                    top: GetValue(spaceConfig, `${secondChildKey}Top`, 0),
                    bottom: GetValue(spaceConfig, `${secondChildKey}Bottom`, 0),
                }
            }
        );


        this.addChildrenMap('background', background);
        this.addChildrenMap(firstChildKey, firstChild);
        this.addChildrenMap('splitter', splitter)
        this.addChildrenMap(secondChildKey, secondChild);

        this.minFirstChildSize = GetValue(config, minFirstChildSizeKey, 0);
        this.minSecondChildSize = GetValue(config, minSecondChildSizeKey, 0);
        this.setSplitRatio(GetValue(config, 'splitRatio', 0.5));

        this.splitterDragBehavior = new Drag(splitter, {
            axis: (this.orientation === 0) ? 1 : 2,
        });

        splitter
            .on('dragstart', function () {
                this.emit('splitter.dragstart', splitter, this.splitRatio);
            }, this)
            .on('dragend', function () {
                this.emit('splitter.dragend', splitter, this.splitRatio);
            }, this)
            .on('drag', function () {
                OnDragSplitter.call(this);
                this.emit('splitter.drag', splitter, this.splitRatio);
            }, this)
            .on('pointerover', function () {
                this.emit('splitter.over', splitter, this.splitRatio);
            }, this)
            .on('pointerout', function () {
                this.emit('splitter.out', splitter, this.splitRatio);
            }, this)

    }

    get splitterEnable() {
        return this.splitterDragBehavior.enable;
    }

    set splitterEnable(value) {
        this.splitterDragBehavior.setEnable(value);
    }

    setSplitterEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.splitterEnable = enable;
        return this;
    }

    set minLeftPanelWidth(value) {
        this.minFirstChildSize = value;
    }

    get minLeftPanelWidth() {
        return this.minFirstChildSize;
    }

    set minRightPanelWidth(value) {
        this.minSecondChildSize = value;
    }

    get minRightPanelWidth() {
        return this.minSecondChildSize;
    }

    set minTopPanelHeight(value) {
        this.minFirstChildSize = value;
    }

    get minTopPanelHeight() {
        return this.minFirstChildSize;
    }

    set minBottomPanelHeight(value) {
        this.minSecondChildSize = value;
    }

    get minBottomPanelHeight() {
        return this.minSecondChildSize;
    }

    setMinLeftPanelWidth(value) {
        this.minLeftPanelWidth = value;
        return this;
    }

    setMinRightPanelWidth(value) {
        this.minRightPanelWidth = value;
        return this;
    }

    setMinTopPanelHeight(value) {
        this.minTopPanelHeight = value;
        return this;
    }

    setMinBottomPanelHeight(value) {
        this.minBottomPanelHeight = value;
        return this;
    }

    get splitRatio() {
        return this._splitRatio;
    }

    set splitRatio(value) {
        value = Clamp(value, 0, 1);
        if (this._splitRatio === value) {
            return;
        }

        this._splitRatio = value;
        this.getSizerConfig(this.sizerChildren[0]).proportion = value;
        this.getSizerConfig(this.sizerChildren[2]).proportion = 1 - value;
    }

    setSplitRatio(value) {
        this.splitRatio = value;
        return this;
    }
}

export default SplitPanels;