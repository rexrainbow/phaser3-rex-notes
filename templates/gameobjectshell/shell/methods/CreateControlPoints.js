import ControlPoints from '../../controlpoints/ControlPoints.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateControlPoints = function (config) {
    var controlPoints = new ControlPoints(this.scene, GetValue(config, 'controlPoints'));
    this.scene.add.existing(controlPoints);
    this.addToUILayer(controlPoints);

    this.controlPoints = controlPoints;

    this.once('destroy', function () {
        this.controlPoints.destroy();
        this.controlPoints = undefined;
    }, this);

    return controlPoints;
}

export default CreateControlPoints;