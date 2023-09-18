import PropertiesPanel from '../../propertiespanel/PropertiesPanel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

export default {
    addPropertiesPanel(config) {
        var panelConfig = GetValue(config, 'panel');
        var extraProperties = GetValue(config, 'extraProperties');
        var panel = new PropertiesPanel(this.scene, panelConfig, extraProperties);
        if ((panel.x === 0) && (panel.y === 0)) {
            panel.setOrigin(0)
        }
        this.scene.add.existing(panel);
        panel.layout();
        this.addToUILayer(panel);

        this.panel = panel;

        return this;
    },
}