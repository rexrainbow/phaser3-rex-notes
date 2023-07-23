import GridSizer from '../gridsizer/GridSizer.js';
import AddPanel from './AddPanel.js';
import AddSlider from './AddSlider.js';

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
            expandPanelWidth = expand;
            expandPanelHeight = expand;
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