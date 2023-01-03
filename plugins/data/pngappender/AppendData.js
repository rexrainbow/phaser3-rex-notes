import { CodeIEND, CodeMyData } from './ChunkTypes.js';

var AppendData = function (pngBuffer, data) {
    // JSON -> string -> Uint8Array
    data = JSON.stringify(data);
    data = (new TextEncoder()).encode(data);

    // Get End of last png chunk (IEND)

    // Merge png chunks with myData chunk

    var output;  // Uint8Array
    return output;
}

export default AppendData;