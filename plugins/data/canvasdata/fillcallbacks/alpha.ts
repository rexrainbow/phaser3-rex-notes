var FillCallback = function(imgData?: any, imgDataIndex?: any) {
    return (imgData[imgDataIndex + 3] > 0);
}

export default FillCallback;