import * as Phaser from 'phaser';
import Swipe from "./Swipe";
import { IConfig } from '../../../plugins/input/gestures/swipe/Swipe';

declare type SwipeFactory = (
    gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
    config?: IConfig
) => Swipe;

export default SwipeFactory;