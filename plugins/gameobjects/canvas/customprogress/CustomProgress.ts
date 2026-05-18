import Canvas from '../canvasbase/Canvas';
import ProgressBase from '../../../utils/progressbase/ProgressBase';

class CustomProgress extends ProgressBase(Canvas) {
    height: any;
    width: any;

    bootProgressBase: any;
    setValue: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
        }
        if (config === undefined) {
            config = {};
        }
        if (!config.type) {
            config.type = 'rexCustomProgressCanvas';
        }

        super(scene, x, y, width, height);

        this.bootProgressBase(config);

        this.setValue(GetValue(config, 'value', 0));
    }

    get centerX() {
        return this.width / 2;;
    }

    get centerY() {
        return this.height / 2;
    }

    get radius() {
        return Math.min(this.centerX, this.centerY);
    }

}

export default CustomProgress;