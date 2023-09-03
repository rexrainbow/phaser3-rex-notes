import ContainerLite from '../../../plugins/containerlite.js';
import Methods from './methods/Methods.js';
import { AddBoundsRectangle } from './methods/BoundsRectangleMethods.js'
import { AddControlPoints } from './methods/ControlPointMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TransformController extends ContainerLite {
    constructor(scene, config) {
        super(scene, 0, 0, 1, 1);

        this.childrenMap = {};

        AddBoundsRectangle(this, GetValue(config, 'boundsRectangle'));
        AddControlPoints(this, GetValue(config, 'controlPoint'));

        this.setVisible(false);
    }
}

Object.assign(
    TransformController.prototype,
    Methods
)
export default TransformController;