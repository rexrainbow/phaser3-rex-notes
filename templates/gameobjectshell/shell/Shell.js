import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';
import PropertiesPanel from '../propertiespanel/PropertiesPanel.js';
import ControlPoints from '../controlpoints/ControlPoints.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Shell extends ComponentBase {
    constructor(scene, config) {
        super(scene, config);
        // this.scene

        var panel = new PropertiesPanel(scene, GetValue(config, 'panel'));
        if ((panel.x === 0) && (panel.y === 0)) {
            panel.setOrigin(0)
        }
        scene.add.existing(panel);
        panel.layout();

        var controlPoints = new ControlPoints(scene, GetValue(config, 'controlPoints'));
        scene.add.existing(controlPoints);

        this.panel = panel;
        this.controlPoints = controlPoints;
    }

    shutdown(fromScene) {
        super.shutdown(fromScene);

        this.panel.destroy();
        this.controlPoints.destroy();

        this.panel = undefined;
        this.controlPoints = undefined;
    }

    destroy(fromScene) {
        this.emit('destroy');
        super.destroy(fromScene);
        return this;
    }

    setBindingTarget(target) {
        this.panel.setBindingTarget(target);
        this.controlPoints.setBindingTarget(target);
        return this;
    }
}

export default Shell;