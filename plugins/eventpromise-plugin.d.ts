import { WaitEvent, WaitComplete } from './eventpromise'

export default class EventPromisePlugin extends Phaser.Plugins.BasePlugin {
    waitEvent: typeof WaitEvent;
    waitComplete: typeof WaitComplete;

}