import { CodeMyData } from './ChunkTypes.js';

var ExtractData = function (pngBuffer) {
    // Get myData chunk

    // Uint8Array -> string -> JSON
    var data;
    data = (new TextDecoder()).decode(data);
    data = JSON.parse(data);
    return data;
}

export default ExtractData;