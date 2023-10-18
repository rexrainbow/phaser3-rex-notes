import Sizer from '../../../ui/sizer/Sizer.js';
import PropertiesPanel from '../../propertiespanel/PropertiesPanel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateMainPanel = function (config) {
    var mainPanel = new Sizer(this.scene, {
        orientation: 'y'
    })
    this.scene.add.existing(mainPanel);

    var propertiesPanel = CreatePropertiesPanel.call(this, config);

    mainPanel
        .add(
            propertiesPanel,
            { expand: true }
        )
        .layout()
        .setMinSize(mainPanel.width, mainPanel.height)  // Keep current size

    propertiesPanel.setDirty(false);

    mainPanel.left = 0;
    mainPanel.top = 0;

    mainPanel.setScrollFactor(0);

    this.addToUILayer(mainPanel);

    this.once('destroy', function () {
        mainPanel.destroy();
    }, this);

    return mainPanel;
}

var CreatePropertiesPanel = function (config) {
    var panelConfig = GetValue(config, 'panel', {});
    var extraProperties = GetValue(config, 'extraProperties', {});

    var panel = new PropertiesPanel(this.scene, panelConfig, extraProperties);
    this.scene.add.existing(panel);

    this.panel = panel;

    this.once('destroy', function () {
        this.panel.destroy();
        this.panel = undefined;
    }, this);

    return panel;
}

export default CreateMainPanel;