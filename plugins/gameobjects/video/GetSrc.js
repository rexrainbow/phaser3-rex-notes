var GetSrc = function (src, videoSupport) {
    if (typeof (src) === 'string') {
        return src;
    }

    if (videoSupport.webmVideo && src.hasOwnProperty('webm')) {
        return src.webm;
    } else if (videoSupport.oggVideo && src.hasOwnProperty('ogg')) {
        return src.ogg;
    } else if (videoSupport.mp4Video && src.hasOwnProperty('mp4')) {
        return src.mp4;
    }

    return '';
}

export default GetSrc;