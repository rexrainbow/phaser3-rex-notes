export default {
    setBackgroundColor(color?: any, color2?: any, isHorizontalGradient?: any) {
        this.background.setColor(color, color2, isHorizontalGradient);
        return this;
    },

    setBackgroundStroke(color?: any, lineWidth?: any) {
        this.background.setStroke(color, lineWidth);
        return this;
    },

    setBackgroundCornerRadius(radius?: any, iteration?: any) {
        this.background.setCornerRadius(radius, iteration);
        return this;
    }
}