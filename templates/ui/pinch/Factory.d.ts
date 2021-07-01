import * as Phaser from 'phaser';
import Pinch from "./Pinch";
import { IConfig } from '../../../plugins/input/gestures/pinch/Pinch';

declare type PinchFactory = (
    gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
    config?: IConfig
) => Pinch;

export default PinchFactory;