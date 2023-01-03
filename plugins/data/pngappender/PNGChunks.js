class PNGChunks {
    constructor(pngBuffer) {
        this.reader;
    }

    get pointer() {
        return this.reader.pointer;
    }

    seekToChunk(chunkType) {

    }

    getData(chunkType) {
        if (chunkType !== undefined) {
            this.seekToChunk(chunkType);
        }
    }


}

export default PNGChunks;