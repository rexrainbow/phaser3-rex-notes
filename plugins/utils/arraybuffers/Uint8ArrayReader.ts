import ByteArrayToUint32 from '../math/ByteArrayToUint32';

class Uint8ArrayReader {
    buf: any;
    lastPointer: any;
    pointer: any;

    constructor(buf?: any) {
        this.buf = buf;
        this.lastPointer = this.buf.length;
        this.pointer = 0;
    }

    seek(value?: any) {
        this.pointer = value;
        return this;
    }

    seekBack(value?: any) {
        this.pointer -= value;
        return this;
    }

    seekForward(value?: any) {
        this.pointer += value;
        return this;
    }

    readUint8() {
        var data = this.buf[this.pointer];
        this.pointer++;
        return data;
    }

    readUint32(bigEndian?: any) {
        if (bigEndian === undefined) {
            bigEndian = false;
        }

        return ByteArrayToUint32(
            this.readUint8(), this.readUint8(), this.readUint8(), this.readUint8(),
            bigEndian
        );
    }

    readString(size?: any) {
        var s = '';
        for (var i = 0; i < size; i++) {
            s += String.fromCharCode(this.readUint8());
        }
        return s;
    }

    readUint8Array(size?: any) {
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

export default Uint8ArrayReader;