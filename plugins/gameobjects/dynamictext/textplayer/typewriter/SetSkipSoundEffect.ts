var SetSkipSoundEffect = function(value?: any) {
    if (value === undefined) {
        value = true;
    }
    this.skipSoundEffect = value;

    if (value?: any) {
        var soundManager = this.textPlayer._soundManager;
        if (soundManager?: any) {
            soundManager.fadeOutAllSoundEffects(100, true);
        }
    }
    return this;
}

export default SetSkipSoundEffect;