var FillCallback = function (imgData, imgDataIndex) {
    return (imgData[imgDataIndex + 3] > 0) ? 1 : 0;
}

export default FillCallback;