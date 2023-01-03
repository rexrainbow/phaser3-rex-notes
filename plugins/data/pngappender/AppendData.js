import GetChunkEndByteIndex from './GetChunkEndByteIndex.js';
import Uint8ArrayWriter from '../../utils/arraybuffers/Uint8ArrayWriter.js';

var AppendData = function (pngBuffer, data) {
    // Get End of last png chunk (IEND)        
    var pngByteLength = GetChunkEndByteIndex(pngBuffer, 'IEND');

    // JSON -> string -> Uint8Array
    var dataUint8Array;
    if (data != null) {
        if (IsUint8ArrayObject(data)) {
            dataUint8Array = data;
        } else {
            dataUint8Array = (new TextEncoder()).encode(JSON.stringify(data));
        }
    } else {
        dataUint8Array = [];
    }

    // Append dataUint8Array after png-chunks  
    var writer = (new Uint8ArrayWriter(pngByteLength + dataUint8Array.length))
        .writeUint8Array(pngBuffer.slice(0, pngByteLength))
        .writeUint8Array(dataUint8Array)

    return writer.buf;
}

var IsUint8ArrayObject = function (obj) {
    return (typeof (obj) === 'object') && (obj.constructor === Uint8Array);
}

export default AppendData;