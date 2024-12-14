var CSSColorStringToInteger = function (cssColor) {
    // Create a temporary, invisible element
    var div = document.createElement('div');
    div.style.color = cssColor;
    document.body.appendChild(div);

    // Let the browser parse the CSS color
    var computedColor = window.getComputedStyle(div).color;
    document.body.removeChild(div);

    // Usually in "rgb(r, g, b)" form
    var rgbMatch = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbMatch) {
        var R = parseInt(rgbMatch[1], 10);
        var G = parseInt(rgbMatch[2], 10);
        var B = parseInt(rgbMatch[3], 10);
        return (R << 16) | (G << 8) | B;
    }

    return null; // return null if can't parse
}

export default CSSColorStringToInteger;