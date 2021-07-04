import * as Phaser from 'phaser';
import VirtualJoyStick from './virtualjoystick';
import { IConfig } from './input/virtualjoystick/VirtualJoyStick';

export default class VirtualJoyStickPlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config?: IConfig
    ): VirtualJoyStick;
}