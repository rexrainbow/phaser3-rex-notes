import Base from './base/Base';
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

declare class Factories {
    audio: (config?: Base.IConfig) => Audio;
    ball: (config?: Base.IConfig) => Ball;
    bars: (config?: Base.IConfig) => Bars;
    box: (config?: Base.IConfig) => Box;
    clock: (config?: Base.IConfig) => Clock;
    cube: (config?: Base.IConfig) => Cube;
    custom: (config?: Custom.IConfig) => Custom;
    dots: (config?: Base.IConfig) => Dots;
    facebook: (config?: Base.IConfig) => Facebook;
    grid: (config?: Base.IConfig) => Grid;
    los: (config?: Base.IConfig) => Los;
    orbit: (config?: Base.IConfig) => Orbit;
    oval: (config?: Base.IConfig) => Oval;
    pie: (config?: Base.IConfig) => Pie;
    puff: (config?: Base.IConfig) => Puff;
    radio: (config?: Base.IConfig) => Radio;
    rings: (config?: Base.IConfig) => Rings;
    spinner: (config?: Base.IConfig) => Spinner;
}

export default class UIFactories {
    constructor(scene: Phaser.Scene);

    add: Factories;
}