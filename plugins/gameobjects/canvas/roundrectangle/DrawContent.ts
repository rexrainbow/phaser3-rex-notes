import DrawRoundRectangleBackground from '../utils/DrawRoundRectangleBackground';

var DrawContent = function() {
    DrawRoundRectangleBackground(
        this,
        this.fillStyle,
        this.strokeStyle,
        this.lineWidth,
        this.radius,
        this.fillColor2,
        this.isHorizontalGradient,
        this.iteration
    );
}

export default DrawContent;