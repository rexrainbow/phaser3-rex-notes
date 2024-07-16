// Layer name
export const BGLayer = 'bgLayer';
export const GOLayer = 'gameObjectLayer';
export const UILayer = 'uiLayer';

export const BGBottomLayer = `${BGLayer}Bottom`;
export const BGTopLayer = `${BGLayer}Top`;
export const GOBottomLayer = `${GOLayer}Bottom`;
export const GOTopLayer = `${GOLayer}Top`;
export const UIBottomLayer = `${UILayer}Bottom`;
export const UITopLayer = `${UILayer}Top`;

export const BGCamera = 'bg';
export const GOCamera = 'go';
export const UICamera = 'ui';

export const LayerConfigMultipleCamras = [
    { name: BGBottomLayer, cameraName: BGCamera },
    { name: BGLayer, cameraName: BGCamera },
    { name: BGTopLayer, cameraName: BGCamera },

    { name: GOBottomLayer, cameraName: GOCamera },
    { name: GOLayer, cameraName: GOCamera },
    { name: GOTopLayer, cameraName: GOCamera },

    { name: UIBottomLayer, cameraName: UICamera },
    { name: UILayer, cameraName: UICamera },
    { name: UITopLayer, cameraName: UICamera },
];

export const LayerConfigSingleCamera = [
    BGBottomLayer,
    BGLayer,
    BGTopLayer,

    GOBottomLayer,
    GOLayer,
    GOTopLayer,

    UIBottomLayer,
    UILayer,
    UITopLayer
]