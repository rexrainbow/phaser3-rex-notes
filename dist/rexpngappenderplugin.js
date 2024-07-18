(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexpngappenderplugin = factory());
})(this, (function () { 'use strict';

    var ByteArrayToUint32 = function (a, b, c, d, bigEndian) {
        if (bigEndian === undefined) {
            bigEndian = false;
        }
        var value;
        if (bigEndian) {
            value = (a << 24) | (b << 16) | (c << 8) | d;
        } else {
            value = a | (b << 8) | (c << 16) | (d << 24);
        }

        return value;
    };

    class Uint8ArrayReader {
        constructor(buf) {
            this.buf = buf;
            this.lastPointer = this.buf.length;
            this.pointer = 0;
        }

        seek(value) {
            this.pointer = value;
            return this;
        }

        seekBack(value) {
            this.pointer -= value;
            return this;
        }

        seekForward(value) {
            this.pointer += value;
            return this;
        }

        readUint8() {
            var data = this.buf[this.pointer];
            this.pointer++;
            return data;
        }

        readUint32(bigEndian) {
            if (bigEndian === undefined) {
                bigEndian = false;
            }

            return ByteArrayToUint32(
                this.readUint8(), this.readUint8(), this.readUint8(), this.readUint8(),
                bigEndian
            );
        }

        readString(size) {
            var s = '';
            for (var i = 0; i < size; i++) {
                s += String.fromCharCode(this.readUint8());
            }
            return s;
        }

        readUint8Array(size) {
            var data;
            if (size !== undefined) {
                data = this.buf.slice(this.pointer, this.pointer + size);
            } else {
                data = this.buf.slice(this.pointer);
            }
            this.pointer += data.length;
            return data;
        }

        get outOfArray() {
            return this.pointer >= this.lastPointer;
        }
    }

    var GetChunkEndByteIndex = function (pngBuffer, chunkType) {
        var reader;
        if (pngBuffer instanceof (Uint8ArrayReader)) {
            reader = pngBuffer;
        } else {
            reader = new Uint8ArrayReader(pngBuffer);
        }

        reader.seek(8); // Skip png header
        while (!reader.outOfArray) {
            var dataLength = reader.readUint32(true);
            if (chunkType === reader.readString(4)) {
                return reader.pointer + dataLength + 4;
            } else {
                reader.seekForward(dataLength + 4);
            }
        }

        return -1;
    };

    var Uint32ToByteArray = function (value, bigEndian, output) {
        if (bigEndian === undefined) {
            bigEndian = false;
        }

        if (output === undefined) {
            output = [];
        }
        output.length = 4;

        if (bigEndian) {
            output[0] = (value >> 24) & 0xff;
            output[1] = (value >> 16) & 0xff;
            output[2] = (value >> 8) & 0xff;
            output[3] = value & 0xff;
        } else {
            output[0] = value & 0xff;
            output[1] = (value >> 8) & 0xff;
            output[2] = (value >> 16) & 0xff;
            output[3] = (value >> 24) & 0xff;
        }

        return output;
    };

    class Uint8ArrayWriter {
        constructor(size) {
            this.buf = new Uint8Array(size);
            this.pointer = 0;
        }

        seek(pointer) {
            this.pointer = pointer;
            return this;
        }

        writeUint8(value) {
            this.buf[this.pointer] = value;
            this.pointer++;
            return this;
        }

        writeUint8Array(buf) {
            this.buf.set(buf, this.pointer);
            this.pointer += buf.length;
            return this;
        }

        writeUint32(value, bigEndian) {
            var buf = Uint32ToByteArray(value, bigEndian);
            this.writeUint8Array(buf);
            return this;
        }

        writeString(s) {
            var buf = (new TextEncoder()).encode(s);
            this.writeUint8Array(buf);
            return this;
        }

        get outOfArray() {
            return this.pointer === this.buf.length;
        }
    }

    var AppendData = function (pngBuffer, data) {
        // Get End of last png chunk (IEND)        
        var pngByteLength = GetChunkEndByteIndex(pngBuffer, 'IEND');

        var isUint8Array = (typeof (obj) === 'object') && (obj.constructor === Uint8Array);
        var dataType = (isUint8Array) ? 1 : 0;
        var header0 = dataType;
        var header1 = 0;

        var dataUint8Array;
        if (isUint8Array) {
            dataUint8Array = data;
        } else {
            if (data != null) {
                // JSON -> string -> Uint8Array
                data = JSON.stringify(data);
                dataUint8Array = (new TextEncoder()).encode(data);
            } else {
                dataUint8Array = new Uint8Array(0);
            }
        }

        // Append dataUint8Array after png-chunks
        var outputLength = pngByteLength + 8 + dataUint8Array.length;
        var writer = (new Uint8ArrayWriter(outputLength))
            // png-buffer
            .writeUint8Array(pngBuffer.slice(0, pngByteLength))
            // header0: dataType
            .writeUint32(header0)
            // header1: 0x0
            .writeUint32(header1)
            // myData
            .writeUint8Array(dataUint8Array);

        return writer.buf;
    };

    var ExtractData = function (pngBuffer) {
        var reader = new Uint8ArrayReader(pngBuffer);

        // Get End of last png chunk (IEND)        
        var pngByteLength = GetChunkEndByteIndex(reader, 'IEND');
        reader.seek(pngByteLength);
        if (reader.outOfArray) {
            return null;
        }

        // Get header0, header1
        var header0 = reader.readUint32();
        var dataType = header0 & 0xf;
        reader.readUint32();
        // Get myData
        var data = reader.readUint8Array();
        if (dataType === 0) {
            if (data.length === 0) {
                return null;
            } else {
                // Uint8Array -> string -> JSON
                data = (new TextDecoder()).decode(data);
                data = JSON.parse(data);
            }
        }

        return data;
    };

    var PNGAppender = {
        append: AppendData,
        extract: ExtractData
    };

    class PNGAppenderPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    // mixin
    Object.assign(
        PNGAppenderPlugin.prototype,
        PNGAppender
    );

    return PNGAppenderPlugin;

}));
