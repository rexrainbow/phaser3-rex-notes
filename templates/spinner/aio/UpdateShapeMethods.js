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
    leftArrow: ArrowUpdateShapesMethods,
    rightArrow: ArrowUpdateShapesMethods,
    upArrow: ArrowUpdateShapesMethods,
    downArrow: ArrowUpdateShapesMethods,
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

const GetRandomItem = Phaser.Utils.Array.GetRandom;

export default {
    setAnimationMode(mode, config) {
        if (!AnimationModeMap.hasOwnProperty(mode)) {
            mode = GetRandomItem(AnimationModeList);
        }
        this.animationMode = mode;
        var updateMethods = AnimationModeMap[mode];

        if (config) {
            this.resetFromConfig(config);
        }

        switch (mode) {
            case 'leftArrow':
                // ArrowUpdateShapesMethods
                updateMethods.setDirection.call(this, 'left');
                break;

            case 'rightArrow':
                // ArrowUpdateShapesMethods
                updateMethods.setDirection.call(this, 'right');
                break;

            case 'upArrow':
                // ArrowUpdateShapesMethods
                updateMethods.setDirection.call(this, 'up');
                break;

            case 'downArrow':
                // ArrowUpdateShapesMethods
                updateMethods.setDirection.call(this, 'down');
                break;
        }

        this.clear();
        updateMethods.buildShapes.call(this);
        this.updateShapes = updateMethods.updateShapes.bind(this);

        this.stop().start();

        return this;
    },

    setRandomAnimationMode(config) {
        var mode = GetRandomItem(AnimationModeList);
        this.setAnimationMode(mode, config);
        return this;
    }
}