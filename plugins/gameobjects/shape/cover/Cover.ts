import FullWindowRectangle from '../../../fullwindowrectangle';
import TouchEventStop from '../../../toucheventstop';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Cover extends FullWindowRectangle {
    touchEventStop: any;

    constructor(scene?: any, config?: any) {
        var fillColor = GetValue(config, 'color', 0x0);
        var fillAlpha = GetValue(config, 'alpha', 0.8);
        super(scene, fillColor, fillAlpha);

        this.touchEventStop = new TouchEventStop(this, { hitAreaMode: 1 });
    }
}

export default Cover;