export default SoundManager;

declare namespace SoundManager {
    interface IConfig {
        bgm?: {
            /**
             * Background music volume.
             */
            volume?: number,
            /**
             * True to loop.
             */
            loop?: boolean,
            /**
             * Fade time.
             */
            fade?: number,
            /**
             * Initial sound instance.
             */
            initial?: Phaser.Sound.BaseSound
        },

        soundEffect?: {
            /**
             * Sound effect volume.
             */
            volume?: number,
        }
    }

    interface IPlaySoundConfig {
        /**
         * True to loop.
         */
        loop?: boolean,
        /**
         * Volume value.
         */
        volume?: number,
        /**
         * True to mute.
         */
        mute?: boolean,
        /**
         * Detune value.
         */
        detune?: number,
        /**
         * Playback rate.
         */
        rate?: number,
    }
}

/**
 * Sound manager for background music and sound effects.
 */
declare class SoundManager {
    /**
     * Create a sound manager.
     * @param game - Game or Scene instance.
     * @param config - Configuration options.
     */
    constructor(
        game: Phaser.Game | Phaser.Scene,
        config: SoundManager.IConfig
    );

    /**
     * Destroy the manager.
     * @returns This instance.
     */
    destroy(): this;

    /**
     * Return true if audio key exists.
     * @param key - Audio key.
     * @returns True if exists.
     */
    hasAudio(key: string): boolean;

    // Background music
    /**
     * Set background music loop.
     * @param value - True to loop.
     * @returns This instance.
     */
    setBackgroundMusicLoop(value?: boolean): this;

    /**
     * Set background music fade time.
     * @param time - Fade time.
     * @returns This instance.
     */
    setBackgroundMusicFadeTime(time: number): this;

    /**
     * Get background music.
     * @returns Sound instance.
     */
    getBackgroundMusic(): Phaser.Sound.BaseSound;

    /**
     * Play background music.
     * @param key - Audio key.
     * @param config - Play config.
     * @returns This instance.
     */
    playBackgroundMusic(key: string, config?: SoundManager.IPlaySoundConfig): this;

    /**
     * Pause background music.
     * @returns This instance.
     */
    pauseBackgroundMusic(): this;

    /**
     * Resume background music.
     * @returns This instance.
     */
    resumeBackgroundMusic(): this;

    /**
     * Stop background music.
     * @returns This instance.
     */
    stopBackgroundMusic(): this;

    /**
     * Fade in background music.
     * @param time - Fade time.
     * @returns This instance.
     */
    fadeInBackgroundMusic(time: number): this;

    /**
     * Fade out background music.
     * @param time - Fade time.
     * @param isStopped - True to stop after fade.
     * @returns This instance.
     */
    fadeOutBackgroundMusic(time: number, isStopped?: boolean): this;

    /**
     * Cross fade background music.
     * @param key - Audio key.
     * @param time - Fade time.
     * @returns This instance.
     */
    crossFadeBackgroundMusic(key: string, time: number): this;

    /**
     * Set background music mute.
     * @param mute - True to mute.
     * @returns This instance.
     */
    setBackgroundMusicMute(mute?: boolean): this;
    /**
     * Background music mute flag.
     */
    backgroundMusicMute: boolean;

    /**
     * Set background music volume.
     * @param volume - Volume value.
     * @returns This instance.
     */
    setBackgroundMusicVolume(volume: number): this;
    /**
     * Background music volume.
     */
    backgroundMusicVolume: number;

    /**
     * Set background music rate.
     * @param rate - Rate value.
     * @returns This instance.
     */
    setBackgroundMusicRate(rate: number): this;

    /**
     * Set background music detune.
     * @param detune - Detune value.
     * @returns This instance.
     */
    setBackgroundMusicDetune(detune: number): this;

    // Background music2
    /**
     * Set background music2 loop.
     * @param value - True to loop.
     * @returns This instance.
     */
    setBackgroundMusic2Loop(value?: boolean): this;

    /**
     * Set background music2 fade time.
     * @param time - Fade time.
     * @returns This instance.
     */
    setBackgroundMusic2FadeTime(time: number): this;

    /**
     * Get background music2.
     * @returns Sound instance.
     */
    getBackgroundMusic2(): Phaser.Sound.BaseSound;

    /**
     * Play background music2.
     * @param key - Audio key.
     * @param config - Play config.
     * @returns This instance.
     */
    playBackgroundMusic2(key: string, config?: SoundManager.IPlaySoundConfig): this;

    /**
     * Pause background music2.
     * @returns This instance.
     */
    pauseBackgroundMusic2(): this;

    /**
     * Resume background music2.
     * @returns This instance.
     */
    resumeBackgroundMusic2(): this;

    /**
     * Stop background music2.
     * @returns This instance.
     */
    stopBackgroundMusic2(): this;

    /**
     * Fade in background music2.
     * @param time - Fade time.
     * @returns This instance.
     */
    fadeInBackgroundMusic2(time: number): this;

    /**
     * Fade out background music2.
     * @param time - Fade time.
     * @param isStopped - True to stop after fade.
     * @returns This instance.
     */
    fadeOutBackgroundMusic2(time: number, isStopped?: boolean): this;

    /**
     * Cross fade background music2.
     * @param key - Audio key.
     * @param time - Fade time.
     * @returns This instance.
     */
    crossFadeBackgroundMusic2(key: string, time: number): this;

    /**
     * Set background music2 mute.
     * @param mute - True to mute.
     * @returns This instance.
     */
    setBackgroundMusic2Mute(mute?: boolean): this;
    /**
     * Background music2 mute flag.
     */
    backgroundMusic2Mute: boolean;

    /**
     * Set background music2 volume.
     * @param volume - Volume value.
     * @returns This instance.
     */
    setBackgroundMusicVolume2(volume: number): this;
    /**
     * Background music2 volume.
     */
    backgroundMusicVolume2: number;

    /**
     * Set background music2 rate.
     * @param rate - Rate value.
     * @returns This instance.
     */
    setBackgroundMusic2Rate(rate: number): this;

    /**
     * Set background music2 detune.
     * @param detune - Detune value.
     * @returns This instance.
     */
    setBackgroundMusic2Detune(detune: number): this;

    // Sound effect
    /**
     * Get sound effects.
     * @returns Sound effect list.
     */
    getSoundEffects(): Phaser.Sound.BaseSound[];

    /**
     * Get last sound effect.
     * @returns Sound instance.
     */
    getLastSoundEffect(): Phaser.Sound.BaseSound;

    /**
     * Play a sound effect.
     * @param key - Audio key.
     * @param config - Play config.
     * @returns This instance.
     */
    playSoundEffect(key: string, config?: SoundManager.IPlaySoundConfig): this;

    /**
     * Stop all sound effects.
     * @returns This instance.
     */
    stopAllSoundEffects(): this;

    /**
     * Fade in sound effects.
     * @param time - Fade time.
     * @returns This instance.
     */
    fadeInSoundEffect(time: number): this;

    /**
     * Fade out sound effects.
     * @param time - Fade time.
     * @param isStopped - True to stop after fade.
     * @returns This instance.
     */
    fadeOutSoundEffect(time: number, isStopped?: boolean): this;

    /**
     * Fade out all sound effects.
     * @param time - Fade time.
     * @param isStopped - True to stop after fade.
     * @returns This instance.
     */
    fadeOutAllSoundEffects(time: number, isStopped?: boolean): this;

    /**
     * Set sound effect mute.
     * @param mute - True to mute.
     * @param lastSoundEffect - True to apply to last sound only.
     * @returns This instance.
     */
    setSoundEffectMute(mute?: boolean, lastSoundEffect?: boolean): this;
    /**
     * Sound effects mute flag.
     */
    soundEffectsMute: boolean;

    /**
     * Set sound effect volume.
     * @param volume - Volume value.
     * @param lastSoundEffect - True to apply to last sound only.
     * @returns This instance.
     */
    setSoundEffectVolume(volume: number, lastSoundEffect?: boolean): this;
    /**
     * Sound effects volume.
     */
    soundEffectsVolume: number;

    /**
     * Set sound effect detune.
     * @param detune - Detune value.
     * @param lastSoundEffect - True to apply to last sound only.
     * @returns This instance.
     */
    setSoundEffectDetune(detune?: number, lastSoundEffect?: boolean): this;

    /**
     * Set sound effect rate.
     * @param rate - Rate value.
     * @param lastSoundEffect - True to apply to last sound only.
     * @returns This instance.
     */
    setSoundEffectRate(rate?: number, lastSoundEffect?: boolean): this;

    // Sound effect2
    /**
     * Get sound effects2.
     * @returns Sound effect list.
     */
    getSoundEffects2(): Phaser.Sound.BaseSound[];

    /**
     * Get last sound effect2.
     * @returns Sound instance.
     */
    getLastSoundEffect2(): Phaser.Sound.BaseSound;

    /**
     * Play a sound effect2.
     * @param key - Audio key.
     * @param config - Play config.
     * @returns This instance.
     */
    playSoundEffect2(key: string, config?: SoundManager.IPlaySoundConfig): this;

    /**
     * Stop all sound effects2.
     * @returns This instance.
     */
    stopAllSoundEffects2(): this;

    /**
     * Fade in sound effects2.
     * @param time - Fade time.
     * @returns This instance.
     */
    fadeInSoundEffect2(time: number): this;

    /**
     * Fade out sound effects2.
     * @param time - Fade time.
     * @param isStopped - True to stop after fade.
     * @returns This instance.
     */
    fadeOutSoundEffect2(time: number, isStopped?: boolean): this;

    /**
     * Fade out all sound effects2.
     * @param time - Fade time.
     * @param isStopped - True to stop after fade.
     * @returns This instance.
     */
    fadeOutAllSoundEffects2(time: number, isStopped?: boolean): this;

    /**
     * Set sound effect2 mute.
     * @param mute - True to mute.
     * @param lastSoundEffect - True to apply to last sound only.
     * @returns This instance.
     */
    setSoundEffect2Mute(mute?: boolean, lastSoundEffect?: boolean): this;
    /**
     * Sound effects2 mute flag.
     */
    soundEffects2Mute: boolean;

    /**
     * Set sound effect2 volume.
     * @param volume - Volume value.
     * @param lastSoundEffect - True to apply to last sound only.
     * @returns This instance.
     */
    setSoundEffect2Volume(volume: number, lastSoundEffect?: boolean): this;
    /**
     * Sound effects2 volume.
     */
    soundEffects2Volume: number;

    /**
     * Set sound effect2 detune.
     * @param detune - Detune value.
     * @param lastSoundEffect - True to apply to last sound only.
     * @returns This instance.
     */
    setSoundEffect2Detune(detune?: number, lastSoundEffect?: boolean): this;

    /**
     * Set sound effect2 rate.
     * @param rate - Rate value.
     * @param lastSoundEffect - True to apply to last sound only.
     * @returns This instance.
     */
    setSoundEffect2Rate(rate?: number, lastSoundEffect?: boolean): this;

}
