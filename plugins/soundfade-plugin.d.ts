import FadeIn from './audio/fade/FadeIn';
import FadeOut from './audio/fade/FadeOut';

export default class SoundFadePlugin extends Phaser.Plugins.BasePlugin {
    fadeIn: typeof FadeIn;
    fadeOut: typeof FadeOut;

}