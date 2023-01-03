import PNGChunks from './PNGChunks.js';
import { MyDataChunkType } from './ChunkTypes.js';

var ExtractData = function (pngBuffer) {
    // Get myData chunk
    var pngChunks = new PNGChunks(pngBuffer);
    var data = pngChunks.getData(MyDataChunkType);

    // Uint8Array -> string -> JSON
    if (data.length === 0) {
        return null;
    }

    data = (new TextDecoder()).decode(data);
    data = JSON.parse(data);
    return data;
}

export default ExtractData;