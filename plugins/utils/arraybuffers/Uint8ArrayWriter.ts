import Uint32ToByteArray from '../math/Uint32ToByteArray';

class Uint8ArrayWriter {
    buf: any;
    pointer: any;

    constructor(size?: any) {
        this.buf = new Uint8Array(size);
        this.pointer = 0;
    }

    seek(pointer?: any) {
        this.pointer = pointer;
        return this;
    }

    writeUint8(value?: any) {
        this.buf[this.pointer] = value;
        this.pointer++;
        return this;
    }

    writeUint8Array(buf?: any) {
        this.buf.set(buf, this.pointer);
        this.pointer += buf.length;
        return this;
    }

    writeUint32(value?: any, bigEndian?: any) {
        var buf = Uint32ToByteArray(value, bigEndian)
        this.writeUint8Array(buf);
        return this;
    }

    writeString(s?: any) {
        var buf = (new TextEncoder()).encode(s);
        this.writeUint8Array(buf);
        return this;
    }

    get outOfArray() {
        return this.pointer === this.buf.length;
    }
}

export default Uint8ArrayWriter;