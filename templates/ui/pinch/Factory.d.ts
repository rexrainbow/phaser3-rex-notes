// import * as Phaser from 'phaser';
import Pinch from "./Pinch";
import { IConfig } from '../../../plugins/input/gestures/pinch/Pinch';

export default function (
    gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
    config?: IConfig
): Pinch;