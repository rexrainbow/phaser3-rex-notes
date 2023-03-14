class HowlerSound {
    constructor(manager, key) {
        this.manager = manager;
        this.key = key;
        this.soundBuffer = manager.get(key);
        this.id = this.soundBuffer.play();
    }

    play() {
        this.soundBuffer.play(this.id);
    }

    pause() {
        this.soundBuffer.pause(this.id);
    }

}

export default HowlerSound;