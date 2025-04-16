import * as EffectProperties from './EffectProperties.js'

const EffectMap = {
    barrel: EffectProperties.AddBarrelProperties,
    blackWhite: EffectProperties.AddBlackWhiteProperties,
    bloom: EffectProperties.AddBloomProperties,
    blur: EffectProperties.AddBlurProperties,
    bokeh: EffectProperties.AddBokehProperties,
    brightness: EffectProperties.AddBrightnessProperties,
    brown: EffectProperties.AddBrownProperties,
    circle: EffectProperties.AddCircleProperties,
    contrast: EffectProperties.AddContrastProperties,
    desaturate: EffectProperties.AddDesaturateProperties,
    desaturateLuminance: EffectProperties.AddDesaturateLuminanceProperties,
    displacement: EffectProperties.AddDisplacementProperties,
    glow: EffectProperties.AddGlowProperties,
    gradient: EffectProperties.AddGradientProperties,
    grayscale: EffectProperties.AddGrayscaleProperties,
    hue: EffectProperties.AddHueProperties,
    kodachrome: EffectProperties.AddKodachromeProperties,
    lsd: EffectProperties.AddLSDProperties,
    negative: EffectProperties.AddNegativeProperties,
    pixelate: EffectProperties.AddPixelateProperties,
    polaroid: EffectProperties.AddPolaroidProperties,
    reveal: EffectProperties.AddRevealProperties,
    saturate: EffectProperties.AddSaturateProperties,
    sepia: EffectProperties.AddSepiaProperties,
    shadow: EffectProperties.AddShadowProperties,
    shiftToBGR: EffectProperties.AddShiftToBGRProperties,
    shine: EffectProperties.AddShineProperties,
    technicolor: EffectProperties.AddTechnicolorProperties,
    tiltShift: EffectProperties.AddTiltShiftProperties,
    vignette: EffectProperties.AddVignetteProperties,
    vintagePinhole: EffectProperties.AddVintagePinholeProperties,
    wipe: EffectProperties.AddWipeProperties
}

export default EffectMap;