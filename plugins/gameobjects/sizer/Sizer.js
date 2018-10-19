import ContainerLite from '../containerlite/ContainerLite.js';
import Layout from './Layout.js';

const GetValue = Phaser.Utils.Objects.GetValue;

const Container = ContainerLite;
class Sizer extends Container {
    constructor(scene, x, y, width, height, config) {
        if (typeof (x) !== 'number') {
            config = x;
            x = 0;
            y = 0;
        }
        if (typeof (width) !== 'number') {
            config = width;
            width = undefined;
            height = undefined;
        }
        super(scene, x, y, width, height);
        this.type = 'rexSizer';
        this.isRexSizer = true;

        this.setOrientation(GetValue(config, 'orientation', 0));
    }

    setOrientation(orientation) {
        if (typeof (orientation) === 'string') {
            orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
        return this;
    }

    add(gameObject, sizeFlag, proportion) {
        super.add(gameObject);
        if (sizeFlag === undefined) {
            return this;
        }
        if ((typeof (sizeFlag) !== 'number') && (typeof (sizeFlag) !== 'string')) {
            var config = sizeFlag;
            sizeFlag = GetValue(config, 'sizeFlag', 0);
            proportion = (sizeFlag === 0) ? 0 : GetValue(config, 'proportion', 0);
        }
        if (typeof (sizeFlag) === 'string') {
            sizeFlag = SIZEMODE[sizeFlag];
        }
        if (proportion === undefined) {
            proportion = 0;
        }

        var state = this.getLocalState(gameObject);
        state.sizeFlag = sizeFlag
        state.proportion = proportion;
        return this;
    }
}

var methods = {
    layout: Layout,
}
Object.assign(
    Sizer.prototype,
    methods
);

const ORIENTATIONMODE = {
    x: 0,
    h: 0,
    horizontal: 0,
    y: 1,
    v: 1,
    vertical: 1
}

const SIZEMODE = {
    min: 0,
    expand: 1
}
export default Sizer;