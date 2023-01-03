import PNGChunks from './PNGChunks.js';
import { MyDataChunkType } from './ChunkTypes.js';
import Uint8ArrayWriter from '../../utils/arraybuffers/Uint8ArrayWriter.js';

var AppendData = function (pngBuffer, data) {
    // Get End of last png chunk (IEND)
    var pngChunks = new PNGChunks(pngBuffer);
    pngChunks.seekToChunkEnd('IEND');
    var pngByteLength = pngChunks.pointer;

    // JSON -> string -> Uint8Array
    var dataUint8Array;
    if (data != null) {
        dataUint8Array = (new TextEncoder()).encode(JSON.stringify(data));
    } else {
        dataUint8Array = [];
    }

    // Merge png chunks with myData chunk
    var outputArrayLength = pngByteLength + (4 + 4 + dataUint8Array.length + 4);
    var writer = new Uint8ArrayWriter(outputArrayLength);

    writer
        .writeUint8Array(pngBuffer.slice(0, pngByteLength))
        .writeUint32(dataUint8Array.length, true)
        .writeString(MyDataChunkType)
        .writeUint8Array(dataUint8Array)
        .writeUint32(0);

    return writer.buf;
}

/*
Chunk structure:

- dataLength: 4 bytes -> uint32 (big-endian)
- chunkType: 4 bytes -> string
- data: dataLength bytes -> unit8Array
- crc: 4 bytes -> uint32 (big-endian)
*/

export default AppendData;