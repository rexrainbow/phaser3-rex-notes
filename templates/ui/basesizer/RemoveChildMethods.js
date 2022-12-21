import GetParentSizerMethods from './GetParentSizerMethods.js';

export default {
    removeFromParentSizer() {
        var parent = GetParentSizerMethods.getParentSizer(gameObject);
        if (parent) {
            parent.remove(this);
        }
        return this;
    }
}