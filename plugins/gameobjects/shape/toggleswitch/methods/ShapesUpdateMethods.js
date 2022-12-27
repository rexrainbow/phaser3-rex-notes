import { RoundRectangle } from '../../shapes/geoms';
import MixColor from '../../../../utils/color/MixColor';

const Linear = Phaser.Math.Linear;

export default {
    buildShapes() {
        this
            .addShape(new RoundRectangle().setName('track'))
            .addShape(new RoundRectangle().setName('thumb'))
    },

    updateShapes() {
        var width = this.width,
            height = this.height;

        var toggleAnimProgress = (this.value) ? this.toggleAnimProgress : (1 - this.toggleAnimProgress);

        // Track
        var trackShape = this.getShape('track');
        if (this.isSizeChanged) {
            var trackWidth = width * this.trackWidth,
                trackHeight = height * this.trackHeight,
                trackX = (width - trackWidth) / 2,
                trackY = (height - trackHeight) / 2,
                trackRadius = height * this.trackRadius;

            trackShape
                .setTopLeftPosition(trackX, trackY)
                .setSize(trackWidth, trackHeight)
                .setRadius(trackRadius);

        }

        var trackFillColor = MixColor(this.uncheckedTrackFillColor, this.trackFillColor, toggleAnimProgress)
        trackShape
            .fillStyle(trackFillColor, this.trackFillAlpha)
            .lineStyle(this.trackLineWidth, this.trackStrokeColor, this.trackStrokeAlpha)

        // Thumb
        var thumbShape = this.getShape('thumb');
        if (this.isSizeChanged) {
            var thumbWidth = width * this.thumbWidth,
                thumbHeight = height * this.thumbHeight,
                thumbRadius = height * this.thumbRadius;

            thumbShape
                .setSize(thumbWidth, thumbHeight)
                .setRadius(thumbRadius);
        }
        
        var thumbX = Linear(this.thumbLeftX, this.thumbRightX, toggleAnimProgress) * width;
        var thumbY = height / 2;
        thumbShape
            .setCenterPosition(thumbX, thumbY)

        thumbShape
            .fillStyle(this.thumbColor, this.thumbAlpha)
            .lineStyle(this.thumbLineWidth, this.thumbStrokeColor, this.thumbStrokeAlpha)
    }


}