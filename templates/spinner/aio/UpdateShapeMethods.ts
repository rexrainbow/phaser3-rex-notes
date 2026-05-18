import ArrowUpdateShapesMethods from '../arrow/UpdateShapeMethods';
import AudioUpdateShapeMethods from '../audio/UpdateShapeMethods';
import BallUpdateShapeMethods from '../ball/UpdateShapeMethods';
import BarsUpdateShapeMethods from '../bars/UpdateShapeMethods';
import BoxUpdateShapeMethods from '../box/UpdateShapeMethods';
import ClockUpdateShapeMethods from '../clock/UpdateShapeMethods';
import CubeUpdateShapeMethods from '../cube/UpdateShapeMethods';
import DotsUpdateShapeMethods from '../dots/UpdateShapeMethods';
import FacebookUpdateShapeMethods from '../facebook/UpdateShapeMethods';
import GridUpdateShapeMethods from '../grid/UpdateShapeMethods';
import HeartsUpdateShapeMethods from '../hearts/UpdateShapeMethods';
import IosUpdateShapeMethods from '../ios/UpdateShapeMethods';
import OribitUpdateShapeMethods from '../orbit/UpdateShapeMethods';
import OvalUpdateShapeMethods from '../oval/UpdateShapeMethods';
import PieUpdateShapeMethods from '../pie/UpdateShapeMethods';
import PuffUpdateShapeMethods from '../puff/UpdateShapeMethods';
import RadioUpdateShapeMethods from '../radio/UpdateShapeMethods';
import RingsUpdateShapeMethods from '../rings/UpdateShapeMethods';
import SpinnerUpdateShapeMethods from '../spinner/UpdateShapeMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

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

const GetRandomItem = PhaserUtils.Array.GetRandom;

export default {
    setAnimationMode(mode?: any, config?: any) {
        if (!AnimationModeMap.hasOwnProperty(mode)) {
            mode = GetRandomItem(AnimationModeList);
        }
        this.animationMode = mode;
        var updateMethods = AnimationModeMap[mode];

        if (config?: any) {
            this.resetFromConfig(config);
        }

        switch (mode?: any) {
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

    setRandomAnimationMode(config?: any) {
        var mode = GetRandomItem(AnimationModeList);
        this.setAnimationMode(mode, config);
        return this;
    }
}