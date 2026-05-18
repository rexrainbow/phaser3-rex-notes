var SetMaxFixedPartScale = function(scaleX?: any, scaleY?: any) {
    if (scaleY === undefined) {
        scaleY = scaleX;
    }

    this.maxFixedPartScaleX = scaleX;
    this.maxFixedPartScaleY = scaleY;
    return this;
};

export default SetMaxFixedPartScale;