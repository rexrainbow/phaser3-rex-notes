import * as Phaser from 'phaser';
import Tap from "./Tap";
import { IConfig } from '../../../plugins/input/gestures/tap/Tap';

declare type TapFactory = (
    gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
    config?: IConfig
) => Tap;

export default TapFactory;