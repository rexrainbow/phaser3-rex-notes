// import * as Phaser from 'phaser';
import Pan from "./Pan";
import { IConfig } from '../../../plugins/input/gestures/pan/Pan';

export default function (
    gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
    config?: IConfig
): Pan;