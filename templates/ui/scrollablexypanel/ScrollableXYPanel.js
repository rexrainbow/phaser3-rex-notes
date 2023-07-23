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

        var panelColumnProportions = (GetValue(config, 'panel.expandX', true)) ? 1 : 0;
        config.columnProportions = [0, panelColumnProportions, 0];

        var panelRowProportions = (GetValue(config, 'panel.expandY', true)) ? 1 : 0;
        config.rowProportions = [0, panelRowProportions, 0];

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