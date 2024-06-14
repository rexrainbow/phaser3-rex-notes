import ArrowUpdateShapesMethods from '../arrow/UpdateShapeMethods.js';
import AudioUpdateShapeMethods from '../audio/UpdateShapeMethods.js';
import BallUpdateShapeMethods from '../ball/UpdateShapeMethods.js';
import BarsUpdateShapeMethods from '../bars/UpdateShapeMethods.js';
import BoxUpdateShapeMethods from '../box/UpdateShapeMethods.js';
import ClockUpdateShapeMethods from '../clock/UpdateShapeMethods.js';
import CubeUpdateShapeMethods from '../cube/UpdateShapeMethods.js';
import DotsUpdateShapeMethods from '../dots/UpdateShapeMethods.js';
import FacebookUpdateShapeMethods from '../facebook/UpdateShapeMethods.js';
import GridUpdateShapeMethods from '../grid/UpdateShapeMethods.js';
import HeartsUpdateShapeMethods from '../hearts/UpdateShapeMethods.js';
import IosUpdateShapeMethods from '../ios/UpdateShapeMethods.js';
import OribitUpdateShapeMethods from '../orbit/UpdateShapeMethods.js';
import OvalUpdateShapeMethods from '../oval/UpdateShapeMethods.js';
import PieUpdateShapeMethods from '../pie/UpdateShapeMethods.js';
import PuffUpdateShapeMethods from '../puff/UpdateShapeMethods.js';
import RadioUpdateShapeMethods from '../radio/UpdateShapeMethods.js';
import RingsUpdateShapeMethods from '../rings/UpdateShapeMethods.js';
import SpinnerUpdateShapeMethods from '../spinner/UpdateShapeMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

const AnimationModeMap = {
    arrow: ArrowUpdateShapesMethods,
    audio: AudioUpdateShapeMethods,
    ball: BallUpdateShapeMethods,
    bars: BarsUpdateShapeMethods,
    box: BoxUpdateShapeMethods,
    clock: ClockUpdateShapeMethods,
    cube: CubeUpdateShapeMethods,
    dots: DotsUpdateShapeMethods,
    facebook: FacebookUpdateShapeMethods,
    grid: GridUpdateShapeMethods,
    hearts: HeartsUpdateShapeMethods,
    ios: IosUpdateShapeMethods,
    oribit: OribitUpdateShapeMethods,
    oval: OvalUpdateShapeMethods,
    pie: PieUpdateShapeMethods,
    puff: PuffUpdateShapeMethods,
    radio: RadioUpdateShapeMethods,
    rings: RingsUpdateShapeMethods,
    spinner: SpinnerUpdateShapeMethods
}

const AnimationModeList = [];
for (var name in AnimationModeMap) {
    AnimationModeList.push(name);
}

const ArrowDirectionModeList = ['up', 'down', 'left', 'right'];

const GetRandomItem = Phaser.Utils.Array.GetRandom;

export default {
    setAnimationMode(mode, config) {
        if (!AnimationModeMap.hasOwnProperty(mode)) {
            mode = 'spinner';
        }
        this.animationMode = mode;
        var updateMethods = AnimationModeMap[mode];

        if (config) {
            if (!config.hasOwnProperty('value')) {
                config.value = 0;
            }

            this.resetFromConfig(config);

            switch (mode) {
                case 'arrow':
                    // ArrowUpdateShapesMethods
                    updateMethods.setDirection.call(this, GetValue(config, 'direction', 'down'));
                    break;
            }
        }

        this.clear();
        updateMethods.buildShapes.call(this);
        this.updateShapes = updateMethods.updateShapes.bind(this);

        this.stop().start();

        return this;
    },

    setRandomAnimationMode(config) {
        if (config === undefined) {
            config = {};
        }

        var mode = GetRandomItem(AnimationModeList);

        switch (mode) {
            case 'arrow':
                config.direction = GetRandomItem(ArrowDirectionModeList);
                break;
        }

        this.setAnimationMode(mode, config);
        return this;
    }
}