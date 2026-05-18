import HasaAudio from './HasAudio';
import BackgroundMusicMethods from './BackgroundMusicMethods';
import BackgroundMusic2Methods from './BackgroundMusic2Methods';
import SoundEffectsMethods from './SoundEffectsMethods';
import SoundEffects2Methods from './SoundEffects2Methods';

var Methods = {
    hasAudio: HasaAudio
};

Object.assign(
    Methods,
    BackgroundMusicMethods,
    BackgroundMusic2Methods,
    SoundEffectsMethods,
    SoundEffects2Methods,
)

export default Methods;