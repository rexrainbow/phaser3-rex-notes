import * as Phaser from 'phaser';
import Rotate from "./Rotate";
import { IConfig } from '../../../plugins/input/gestures/rotate/Rotate';

declare type RotateFactory = (
    gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
    config?: IConfig
) => Rotate;

export default RotateFactory;