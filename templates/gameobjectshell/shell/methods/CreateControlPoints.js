import ControlPoints from '../../controlpoints/ControlPoints.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateControlPoints = function (config) {
    var controlPoints = new ControlPoints(this.scene, GetValue(config, 'controlPoints'));
    this.scene.add.existing(controlPoints);
    this.addToMonitorLayer(controlPoints, 'top');

    this.controlPoints = controlPoints;

    this.once('destroy', function () {
        this.controlPoints.destroy();
        this.controlPoints = undefined;
    }, this);

    return controlPoints;
}

export default CreateControlPoints;