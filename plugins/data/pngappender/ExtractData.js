import GetChunkEndByteIndex from './GetChunkEndByteIndex.js';

var ExtractData = function (pngBuffer) {
    // Get End of last png chunk (IEND)        
    var pngByteLength = GetChunkEndByteIndex(pngBuffer, 'IEND');    
    // Uint8Array -> string -> JSON
    var data = pngBuffer.slice(pngByteLength);
    if (data.length === 0) {
        return null;
    }

    data = (new TextDecoder()).decode(data);
    data = JSON.parse(data);
    return data;
}

export default ExtractData;