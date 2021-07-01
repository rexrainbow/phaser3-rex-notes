import * as Phaser from 'phaser';
import Press from "./Press";
import { IConfig } from '../../../plugins/input/gestures/press/Press';

declare type PressFactory = (
    gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
    config?: IConfig
) => Press;

export default PressFactory;