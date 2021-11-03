export default {
    getStoreKey(key) {
        if (this.name !== '') {
            return `${this.name}.${key}`;
        } else {
            return key;
        }
    },

    getDataKey(key) {
        if (this.name !== '') {
            return key.substring(this.name.length + 1)
        } else {
            return key;
        }
    },

    setItem(dataKey, value) {
        // Ref : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#basic_concepts
        // **The keys and the values are always strings**
        value = JSON.stringify([value]);
        localStorage.setItem(this.getStoreKey(dataKey), value);
        return this;
    },

    getItem(dataKey) {
        var value = localStorage.getItem(this.getStoreKey(dataKey));

        if (value == null) {
            return undefined;
        } else {
            value = JSON.parse(value)[0];
            return value
        }
    },

    removeItem(dataKey) {
        localStorage.removeItem(this.getStoreKey(dataKey));
        return this;
    }
}