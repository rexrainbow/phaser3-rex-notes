import OverlapSizer from '../overlapsizer/OverlapSizer';
import ProgressBase from '../../../plugins/utils/progressbase/ProgressBase';
import CircularProgress from '../circularprogresscanvas/CircularProgressCanvas';
import InstallTouchPadEvents from './input/OnTouchPad';
import InstallPanPadEvents from './input/OnPanPad';
import TextObjectMethods from './TextObjectMethods';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const SnapTo = PhaserMath.Snap.To;

class Knob extends ProgressBase(OverlapSizer) {
    enable: any;

    add: any;
    addBackground: any;
    addChildrenMap: any;
    bootProgressBase: any;
    eventEmitter: any;
    gap: any;
    setTextFormatCallback: any;
    setValue: any;
    sizerChildren: any;
    type: any;
    updateText: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexKnob';

        this.bootProgressBase(config);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var textObject = GetValue(config, 'text', undefined);

        if (background?: any) {
            this.addBackground(background);
        }
        // Get text object
        if (textObject?: any) {
            // Don't draw text on knob directly
            config.textColor = undefined;
            config.textStrokeColor = undefined;
            this.setTextFormatCallback(
                GetValue(config, 'textFormatCallback', undefined),
                GetValue(config, 'textFormatCallbackScope', undefined)
            );
            config.textFormatCallback = undefined;
            config.textFormatCallbackScope = undefined;
        }
        // Create circular progress object
        var knob = new CircularProgress(scene, config);
        knob.setDepth(GetValue(config, 'knobDepth', 0));
        knob._value = -1; // To trigger text updating
        scene.add.existing(knob);

        this.add(knob, 'knob');
        if (textObject?: any) {
            this.add(textObject, 'text', 'center', 0, false);
            scene.children.moveBelow(knob, textObject); // Move knob below textObject
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('knob', knob);
        this.addChildrenMap('text', textObject);

        this.setEnable(GetValue(config, 'enable', undefined));

        this.setGap(GetValue(config, 'gap', undefined));
        this.setValue(GetValue(config, 'value', 0), GetValue(config, 'min', undefined), GetValue(config, 'max', undefined));

        // Input
        var inputMode = GetValue(config, 'input', 0);
        if (typeof (inputMode) === 'string') {
            inputMode = INPUTMODE[inputMode];
        }
        switch (inputMode?: any) {
            case 0: // 'pan'
                InstallPanPadEvents.call(this);
                break;
            case 1: // 'click'
                InstallTouchPadEvents.call(this);
                break;
        }
    }

    setEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setGap(gap?: any) {
        this.gap = gap;
        return this;
    }

    // Override
    get value() {
        return this.sizerChildren.knob.value;
    }

    // Override
    set value(value) {
        if (this.gap !== undefined) {
            value = SnapTo(value, this.gap);
        }
        var oldValue = this.value;
        this.sizerChildren.knob.value = value;

        var newValue = this.value;
        if (oldValue !== newValue) {
            this.updateText();
            this.eventEmitter.emit('valuechange', newValue, oldValue, this.eventEmitter);
        }
    }

}

const INPUTMODE = {
    pan: 0,
    drag: 0,
    click: 1,
    none: -1,
}

Object.assign(
    Knob.prototype,
    TextObjectMethods,
);

export default Knob;