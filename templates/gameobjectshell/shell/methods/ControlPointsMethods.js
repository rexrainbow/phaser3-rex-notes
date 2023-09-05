import ControlPoints from '../../controlpoints/ControlPoints.js';

const GetValue = Phaser.Utils.Objects.GetValue;

export default {
    addControlPoints(config) {
        var controlPoints = new ControlPoints(this.scene, GetValue(config, 'controlPoints'));
        this.scene.add.existing(controlPoints);
        this.addToUILayer(controlPoints);

        this.controlPoints = controlPoints;

        return this;
    },

}