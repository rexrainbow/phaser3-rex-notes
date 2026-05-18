export default {
    setDefaultTypingSpeed(speed?: any) {
        this.defaultSpeed = speed;
        return this;
    },

    setTypingSpeed(speed?: any) {
        if (speed === undefined) {
            speed = this.defaultSpeed;
        }
        this.speed = speed;
        return this;
    },
}