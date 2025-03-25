// import * as Phaser from 'phaser';
import {
    CircleFilter,
    CircleController
} from './circlefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default CircleFilterPlugin;

declare namespace CircleFilterPlugin {
}

declare class CircleFilterPlugin extends FilterPluginBase<CircleController, CircleController.IConfig> {
}