import GridSizer from '../gridsizer/GridSizer.js';
import AddPanel from './AddPanel.js';
import AddSlider from './AddSlider.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class ScrollableXYPanel extends GridSizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create sizer
        config.column = 3;
        config.row = 3;

        var expandPanel = GetValue(config, 'expand.panel', true);
        var expandPanelWidth, expandPanelHeight;
        if (IsPlainObject(expandPanel)) {
            expandPanelWidth = GetValue(expandPanel, 'width', false);
            expandPanelHeight = GetValue(expandPanel, 'height', false);
        } else {
            expandPanelWidth = expandPanel;
            expandPanelHeight = expandPanel;
        }

        config.columnProportions = [0, ((expandPanelWidth) ? 1 : 0), 0];
        config.rowProportions = [0, ((expandPanelHeight) ? 1 : 0), 0];

        super(scene, config);
        this.type = 'rexScrollableXYPanel';

        // Add elements
        // Background
        var background = GetValue(config, 'background', undefined);
        if (background) {
            this.addBackground(background);
        }

        AddPanel(this, config);
        AddSlider(this, 'x', config);
        AddSlider(this, 'y', config);
    }

    //runLayout(parent, newWidth, newHeight) {
    //    // Skip hidden or !dirty sizer
    //    if (this.ignoreLayout) {
    //        return this;
    //    }
    //    super.runLayout(parent, newWidth, newHeight);
    //    this.resizeController();
    //
    //    // Set `t` to 0 at first runLayout()
    //    if (!this.runLayoutFlag) {
    //        this.runLayoutFlag = true;
    //        this.setT(0);
    //    }
    //
    //    return this;
    //}

    set s(value) {
    }

    get s() {
    }

    set t(value) {
    }

    get t() {
    }
}

const Proportions = [0, 1, 0];

export default ScrollableXYPanel;