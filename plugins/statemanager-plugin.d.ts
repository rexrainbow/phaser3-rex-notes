import StateManager from './statemanager';

export default class StateManagerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: StateManager.IConfig
    ): StateManager;

}