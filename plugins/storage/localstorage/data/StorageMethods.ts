import {
    GetStoreKey, GetDataKey,
    SetItem, GetItem, RemoveItem
} from '../utils/StorageMethods';

export default {
    getStoreKey(dataKey?: any) {
        return GetStoreKey(dataKey, this.name);
    },

    getDataKey(storeKey?: any) {
        return GetDataKey(storeKey, this.name);
    },

    setItem(dataKey?: any, value?: any) {
        SetItem(dataKey, this.name, value);
        return this;
    },

    getItem(dataKey?: any) {
        return GetItem(dataKey, this.name);
    },

    removeItem(dataKey?: any) {
        RemoveItem(dataKey, this.name);
        return this;
    }
}