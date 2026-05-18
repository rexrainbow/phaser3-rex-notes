export default {
    setInnerBoundsColor(color?: any, color2?: any, isHorizontalGradient?: any) {
        this.innerBounds.setColor(color, color2, isHorizontalGradient);
        return this;
    },

    setInnerBoundsStroke(color?: any, lineWidth?: any) {
        this.innerBounds.setStroke(color, lineWidth);
        return this;
    },
}