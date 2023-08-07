import GetCharacterCache from './GetCharacterCache.js';

var CreateBitmapTextClass = function (BaseClass) {
    class BitmapTextClass extends BaseClass {
        constructor(scene, x, y, key, text, size, align) {
            var characterCache;
            if (typeof (key) === 'string') {
                characterCache = GetCharacterCache(scene, key);
            } else {
                characterCache = key;
                key = characterCache.key;
            }

            if (!characterCache) {
                console.error(`Character cache : '${key}' is not available`)
            }

            super(scene, x, y, key, '', size, align);

            this.characterCache = characterCache;
            this.setText(text);
        }

        setText(text, lock) {
            if (!this.characterCache) {
                return this;
            }

            this.characterCache.load(text, lock);
            super.setText(text);
            return this;
        }
    }

    return BitmapTextClass;
}

export default CreateBitmapTextClass;