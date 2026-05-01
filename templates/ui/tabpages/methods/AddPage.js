import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const UUID = PhaserUtils.String.UUID;

var AddPage = function (key, tabGameObject, pageGameObject) {
    if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key');
        tabGameObject = GetValue(config, 'tab');
        pageGameObject = GetValue(config, 'page');
    }

    if (!key) {
        key = UUID();
    }

    tabGameObject.name = key;  // For ratio buttons

    this.childrenMap.tabs.addButton(tabGameObject);
    this.childrenMap.pages.addPage(pageGameObject, { key: key });

    return this;
}

export default AddPage;