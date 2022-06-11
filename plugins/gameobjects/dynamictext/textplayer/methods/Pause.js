var Pause = function () {
    // Pause typing, typing timer and animation progresses
    this.typeWriter.pauseTyping().pause();

    return this;
}

export default Pause;