import Sizer from '../../../ui/sizer/Sizer';
import GameObjectPanel from '../../gameobjectpanel/GameObjectPanel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateMainPanel = function(config?: any) {
    var mainPanel = new Sizer(this.scene, {
        orientation: 'y'
    })
    this.scene.add.existing(mainPanel);

    var gameObjectPanel = CreateGameObjectPanel.call(this, config);

    mainPanel
        .add(
            gameObjectPanel,
            { expand: true }
        )
        .layout()
        .setMinSize(mainPanel.width, mainPanel.height)  // Keep current size

    gameObjectPanel.setDirty(false);

    mainPanel.left = 10;
    mainPanel.top = 10;

    this.addToUILayer(mainPanel);

    this.once('destroy', function() {
        mainPanel.destroy();
    }, this);

    return mainPanel;
}

var CreateGameObjectPanel = function(config?: any) {
    var panelConfig = GetValue(config, 'panel', {});
    var extraProperties = GetValue(config, 'extraProperties', {});

    var panel = new GameObjectPanel(this.scene, panelConfig, extraProperties);
    this.scene.add.existing(panel);

    this.panel = panel;

    this.once('destroy', function() {
        this.panel.destroy();
        this.panel = undefined;
    }, this);

    return panel;
}

export default CreateMainPanel;