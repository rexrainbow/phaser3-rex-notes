var SetCharacterInteractive = function () {
    this

        .on('pointerdown', OnAreaDown, this)

        .on('pointerup', OnAreaUp, this)

        .on('pointermove', OnAreaOverOut, this)
        .on('pointerover', OnAreaOverOut, this)
        .on('pointerout', function (pointer, event) {
            OnAreaOverOut.call(this, pointer, null, null, event);
        }, this);

    return this;
}



export default SetCharacterInteractive;