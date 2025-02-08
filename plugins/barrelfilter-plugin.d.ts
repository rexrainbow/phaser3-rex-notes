// import * as Phaser from 'phaser';
import {
    BarrelFilter,
    BarrelController
} from './barrelfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default BarrelFilterPlugin;

declare namespace BarrelFilterPlugin {
}

declare class BarrelFilterPlugin extends FilterPluginBase<BarrelController, BarrelController.IConfig> {
}