var FillCallback = function(imgData?: any, imgDataIndex?: any) {
    return (imgData[imgDataIndex + 3] << 24) |
        (imgData[imgDataIndex + 0] << 16) |
        (imgData[imgDataIndex + 1] << 8) |
        imgData[imgDataIndex + 2];
};

export default FillCallback;