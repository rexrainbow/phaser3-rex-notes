import Audio from './audio/Audio';
import Ball from './ball/Ball';
import Bars from './bars/Bars';
import Box from './box/Box';
import Clock from './clock/Clock';
import Cube from './cube/Cube';
import Custom from './custom/Custom';
import Dots from './dots/Dots';
import Facebook from './facebook/Facebook';
import Grid from './grid/Grid';
import Los from './los/Los';
import Orbit from './orbit/Orbit';
import Oval from './oval/Oval';
import Pie from './pie/Pie';
import Puff from './puff/Puff';
import Radio from './radio/Radio';
import Rings from './rings/Rings';
import Spinner from './spinner/Spinner';

import { IConfig as ICongfigBase } from './base/Base';
import { IConfig as IConfigCustom } from './custom/Custom';


export default class UIFactories {
    constructor(scene: Phaser.Scene);

    add: {
        audio: (config?: ICongfigBase) => Audio,
        ball: (config?: ICongfigBase) => Ball,
        bars: (config?: ICongfigBase) => Bars,
        box: (config?: ICongfigBase) => Box,
        clock: (config?: ICongfigBase) => Clock,
        cube: (config?: ICongfigBase) => Cube,
        custom: (config?: IConfigCustom) => Custom,
        dots: (config?: ICongfigBase) => Dots,
        facebook: (config?: ICongfigBase) => Facebook,
        grid: (config?: ICongfigBase) => Grid,
        los: (config?: ICongfigBase) => Los,
        orbit: (config?: ICongfigBase) => Orbit,
        oval: (config?: ICongfigBase) => Oval,
        pie: (config?: ICongfigBase) => Pie,
        puff: (config?: ICongfigBase) => Puff,
        radio: (config?: ICongfigBase) => Radio,
        rings: (config?: ICongfigBase) => Rings,
        spinner: (config?: ICongfigBase) => Spinner,
    }
}

import * as ShapeTypes from '../../plugins/gameobjects/shape/shapes/geoms';
export { ShapeTypes };