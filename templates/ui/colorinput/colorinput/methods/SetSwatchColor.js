var SetSwatchColor = function (swatch, color) {
    if (swatch.setTint) {
        swatch.setTint(color);
    } else if (swatch.setFillStyle) {
        swatch.setFillStyle(color);
    }
}

export default SetSwatchColor;