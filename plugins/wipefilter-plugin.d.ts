// import * as Phaser from 'phaser';
import {
    WipeFilter,
    WipeController
} from './wipefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default WipeFilterPlugin;

declare namespace WipeFilterPlugin {
}

declare class WipeFilterPlugin extends FilterPluginBase<WipeController, WipeController.IConfig> {
}