import ContainerLite from '../../../plugins/containerlite';
import Methods from './methods/Methods';
import DefaultConfig from './DefaultConfig';
import DeepClone from '../../../plugins/utils/object/DeepClone';
import AddBoundsRectangle from './methods/boundsrectangle/AddBoundsRectangle'
import AddControlPoints from './methods/controlpoints/AddControlPoints';

// const GetValue = Phaser.Utils.Objects.GetValue;

class ControlPoints extends ContainerLite {
    childrenMap: any;
    setVisible: any;

    constructor(scene?: any, config?: any) {
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