import * as Phaser from 'phaser';
import Pan from "./Pan";
import { IConfig } from '../../../plugins/input/gestures/pan/Pan';

declare type PanFactory = (
    gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
    config?: IConfig
) => Pan;

export default PanFactory;