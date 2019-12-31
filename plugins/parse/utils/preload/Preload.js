import LoadScriptPromise from '../../../utils/loader/LoadScriptPromise.js';

const VERSION = '2.9.1';
const CDNURL = `https://cdnjs.cloudflare.com/ajax/libs/parse/${VERSION}/parse.min.js`;

var Preload = function (url) {
    if (url === undefined) {
        url = CDNURL;
    }

    return LoadScriptPromise(url);
}

export default Preload;