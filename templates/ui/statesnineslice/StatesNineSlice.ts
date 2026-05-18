import AddEffectProperties from '../../../plugins/effectproperties';
import Style from './Style';
import HelperMethods from '../utils/stylemanager/HelperMethods';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const PhaserNineSlice = PhaserGameObjects.NineSlice;
const GetValue = PhaserUtils.Objects.GetValue;

class StatesNineSlice extends PhaserNineSlice {
    addStyleManager: any;
    style: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var key = GetValue(config, 'key', null);
        var frame = GetValue(config, 'frame', null);
        var width = GetValue(config, 'width', 0);
        var height = GetValue(config, 'height', 0);
        var leftWidth = GetValue(config, 'leftWidth', 0);
        var rightWidth = GetValue(config, 'rightWidth', 0);
        var topHeight = GetValue(config, 'topHeight', 0);
        var bottomHeight = GetValue(config, 'bottomHeight', 0);
        super(scene, x, y, key, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight);
        this.type = 'rexStatesNineSlice';

        var effectConfig = GetValue(config, 'effects', true);
        if (effectConfig?: any) {
            AddEffectProperties(this, effectConfig);
        }

        this.style = new Style(this, config);

        config.style = this.style;
        this.addStyleManager(config);

        delete config.style;
    }
}

Object.assign(
    StatesNineSlice.prototype,
    HelperMethods
)

export default StatesNineSlice;