import FadeIn from './audio/fade/FadeIn';
import FadeOut from './audio/fade/FadeOut';

declare type SoundFade = {
    fadeIn: typeof FadeIn,
    fadeOut: typeof FadeOut
}

export default SoundFade;