import * as Phaser from 'phaser';
import Click from "./Click";
import { IConfig } from '../../../plugins/button';

declare type ClickFactory = (
    gameObject: Phaser.GameObjects.GameObject,
    config?: IConfig
) => Click;

export default ClickFactory;