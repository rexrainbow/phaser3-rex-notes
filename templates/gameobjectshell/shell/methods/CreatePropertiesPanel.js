import PropertiesPanel from '../../propertiespanel/PropertiesPanel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreatePropertiesPanel = function (config) {
    var panelConfig = GetValue(config, 'panel', {});
    var unknowPositon = (panelConfig.x === undefined) && (panelConfig.y === undefined);

    var extraProperties = GetValue(config, 'extraProperties', {});

    var panel = new PropertiesPanel(this.scene, panelConfig, extraProperties);
    panel.setScrollFactor(0);

    this.scene.add.existing(panel);
    panel.layout();
    this.addToUILayer(panel);

    if (unknowPositon) {
        panel.left = 0;
        panel.top = 0;
    }

    this.panel = panel;
}

export default CreatePropertiesPanel;