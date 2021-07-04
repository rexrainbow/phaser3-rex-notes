import * as Phaser from 'phaser';
import Swipe from "./Swipe";
import { IConfig } from '../../../plugins/input/gestures/swipe/Swipe';

export default function (
    gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
    config?: IConfig
): Swipe;