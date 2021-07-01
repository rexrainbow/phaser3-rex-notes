import * as Phaser from 'phaser';
import Flip from "./Flip";
import { IConfig } from '../../../plugins/flip';

declare type FlipFactory = (
    gameObject: Phaser.GameObjects.GameObject,
    config?: IConfig
) => Flip;

export default FlipFactory;