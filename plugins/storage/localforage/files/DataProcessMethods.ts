import LZString from '../../../utils/lzstring/lz-string.min';

export default {
    toSaveData(data?: any) {
        if (this.zipMode) {
            data = LZString.compress(JSON.stringify(data));
        }
        return data;
    },

    toLoadData(data?: any) {
        if (this.zipMode) {
            data = JSON.parse(LZString.decompress(data))
        }
        return data;
    }
}