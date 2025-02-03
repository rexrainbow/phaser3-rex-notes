import * as EffectProperties from './EffectProperties.js'

const EffectMap = {
    barrel: EffectProperties.AddBarrelProperties,
    blackWhite: EffectProperties.AddBlackWhiteProperties,
    blur: EffectProperties.AddBlurProperties,
    bokeh: EffectProperties.AddBokehProperties,
    brightness: EffectProperties.AddBrightnessProperties,
    brown: EffectProperties.AddBrownProperties,
    contrast: EffectProperties.AddContrastProperties,
    desaturate: EffectProperties.AddDesaturateProperties,
    desaturateLuminance: EffectProperties.AddDesaturateLuminanceProperties,
    displacement: EffectProperties.AddDisplacementProperties,
    glow: EffectProperties.AddGlowProperties,
    grayscale: EffectProperties.AddGrayscaleProperties,
    hue: EffectProperties.AddHueProperties,
    kodachrome: EffectProperties.AddKodachromeProperties,
    lsd: EffectProperties.AddLSDProperties,
    negative: EffectProperties.AddNegativeProperties,
    pixelate: EffectProperties.AddPixelateProperties,
    polaroid: EffectProperties.AddPolaroidProperties,
    saturate: EffectProperties.AddSaturateProperties,
    sepia: EffectProperties.AddSepiaProperties,
    shadow: EffectProperties.AddShadowProperties,
    shiftToBGR: EffectProperties.AddShiftToBGRProperties,
    technicolor: EffectProperties.AddTechnicolorProperties,
    tiltShift: EffectProperties.AddTiltShiftProperties,
    vintagePinhole: EffectProperties.AddVintagePinholeProperties,
}

export default EffectMap;