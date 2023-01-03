import Uint8ArrayReader from '../../utils/arraybuffers/Uint8ArrayReader.js';

const CHUNKSTART = 0;
const CHUNKEND = 1;
const CHUNKDATA = 2;

class PNGChunks {
    constructor(pngBuffer) {
        this.reader = new Uint8ArrayReader(pngBuffer);
    }

    get pointer() {
        return this.reader.pointer;
    }

    seekToChunk(targetChunkType, position) {
        if (position === undefined) {
            position = CHUNKSTART;
        }

        this.reader.seek(8); // Skip header
        while (!this.reader.outOfArray) {
            var dataLength = this.reader.readUint32(true);
            var chunkType = this.reader.readString(4);
            if (targetChunkType === chunkType) {
                switch (position) {
                    case CHUNKSTART:
                        this.reader.seekBack(8);
                        return true;

                    case CHUNKEND:
                        this.reader.seekForward(dataLength + 4);
                        return true;

                    case CHUNKDATA:
                        return true;
                }

                break;
            } else {
                this.reader.seekForward(dataLength + 4);
            }
        }

        return false;
    }

    seekToChunkStart(chunkType) {
        return this.seekToChunk(chunkType, CHUNKSTART);
    }

    seekToChunkEnd(chunkType) {
        return this.seekToChunk(chunkType, CHUNKEND);
    }

    getData(chunkType) {
        var hasChunk = this.seekToChunkStart(chunkType);
        if (!hasChunk) {
            return null;
        }

        var dataLength = this.reader.readUint32(true);
        var startPointer = this.reader.pointer + 4;
        var endPointer = startPointer + dataLength;
        this.reader.seek(endPointer);

        return this.reader.buf.slice(startPointer, endPointer);
    }


}

export default PNGChunks;