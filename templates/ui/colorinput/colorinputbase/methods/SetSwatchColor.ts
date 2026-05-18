var SetSwatchColor = function(swatch?: any, color?: any) {
    if (!swatch) {
        return;
    }

    if (swatch.setTint) {
        swatch.setTint(color);
    } else if (swatch.setFillStyle) {
        swatch.setFillStyle(color);
    }
}

export default SetSwatchColor;