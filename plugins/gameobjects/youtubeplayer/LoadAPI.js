import LoadScript from '../../utils/loader/LoadScript.js';

var IsAPIReady = false;
var LoadAPI = function (onLoaded) {
    if (IsAPIReady) {
        onLoaded();
    } else {
        window.onYouTubeIframeAPIReady = function () {
            IsAPIReady = true;
            onLoaded();
        };
        LoadScript('https://www.youtube.com/iframe_api');
        // Function onYouTubeIframeAPIReady() should be defined before loading 
    }
}
export default LoadAPI;