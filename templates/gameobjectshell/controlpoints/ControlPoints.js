import ContainerLite from '../../../plugins/containerlite.js';
import Methods from './methods/Methods.js';
import DefaultConfig from './DefaultConfig.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js';
import AddBoundsRectangle from './methods/boundsrectangle/AddBoundsRectangle.js'
import AddControlPoints from './methods/controlpoints/AddControlPoints.js';

// const GetValue = Phaser.Utils.Objects.GetValue;

class ControlPoints extends ContainerLite {
    constructor(scene, config) {
        if (config === undefined) {
            config = DeepClone(DefaultConfig);
        }

        super(scene, 0, 0, 1, 1);

        this.childrenMap = {};

        AddBoundsRectangle(this, config);
        AddControlPoints(this, config);

        this.setVisible(false);
    }
}

Object.assign(
    ControlPoints.prototype,
    Methods
)
export default ControlPoints;