export default SoundManager;

declare namespace SoundManager {
    interface IConfig {
        bgm?: {
            volume?: number,
            loop?: boolean,
            fade?: number,
            initial?: Phaser.Sound.BaseSound
        },

        soundEffect?: {
            volume?: number,
        }
    }
}

declare class SoundManager {
    constructor(
        game: Phaser.Game | Phaser.Scene,
        config: SoundManager.IConfig
    );

    destroy(): this;

    // Background music
    setBackgroundMusicLoopValue(value: boolean): this;

    setBackgroundMusicFadeTime(time: number): this;

    getBackgroundMusic(): Phaser.Sound.BaseSound;

    playBackgroundMusic(key: string): this;

    pauseBackgroundMusic(): this;

    resumeBackgroundMusic(): this;

    stopBackgroundMusic(): this;

    fadeInBackgroundMusic(time: number): this;

    fadeOutBackgroundMusic(time: number, isStopped?: boolean): this;

    crossFadeBackgroundMusic(key: string, time: number): this;

    setBackgroundMusicVolume(volume: number): this;
    backgroundMusicVolume: number;


    // Sound effect
    getSoundEffects(): Phaser.Sound.BaseSound[];

    getLastSoundEffect(): Phaser.Sound.BaseSound;

    playSoundEffect(key: string): this;

    fadeInSoundEffect(time: number): this;

    fadeOutSoundEffect(time: number, isStopped?: boolean): this;

    fadeOutAllSoundEffects(time: number, isStopped?: boolean): this;

    setSoundEffectVolume(volume: number, lastSoundEffect?: boolean): this;
    soundEffectsVolume: number;
}