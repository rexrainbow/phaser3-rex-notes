(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexeffectpropertiesplugin = factory());
})(this, (function () { 'use strict';

    var HasProperty = function (obj, prop) {
        if (!obj) {
            return false;
        }

        if (obj.hasOwnProperty(prop)) {
            return true;
        }

        while (obj) {
            if (Object.getOwnPropertyDescriptor(obj, prop)) {
                return true;
            }
            obj = obj.__proto__;
        }

        return false;
    };

    var GetFilterList = function (gameObject, external) {
        if (external === undefined) {
            external = false;
        }

        if (!gameObject.filters) {
            gameObject.enableFilters().focusFilters();
        }

        var filterList = (!external) ? gameObject.filters.internal : gameObject.filters.external;

        return filterList;
    };

    var AddClearEffectCallback = function (gameObject, effectSwitchName) {
        if (!gameObject._effectSwitchNames) {
            gameObject._effectSwitchNames = [];

            gameObject.clearAllEffects = function () {
                var effectSwitchNames = gameObject._effectSwitchNames;
                for (var i = 0, cnt = effectSwitchNames.length; i < cnt; i++) {
                    gameObject[effectSwitchNames[i]] = null;
                }

                return gameObject;
            };
            gameObject.on('destroy', gameObject.clearAllEffects, gameObject);
        }

        gameObject._effectSwitchNames.push(effectSwitchName);
    };

    var AddBarrelProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'barrel')) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var barrel;
        Object.defineProperty(gameObject, 'barrel', {
            get: function () {
                return barrel;
            },
            set: function (value) {
                if (barrel === value) {
                    return;
                }

                barrel = value;

                if ((barrel === null) || (barrel === false)) {
                    if (gameObject._barrelEffect) {
                        filterList.remove(gameObject._barrelEffect);
                        gameObject._barrelEffect = undefined;
                    }
                } else {
                    if (!gameObject._barrelEffect) {
                        gameObject._barrelEffect = filterList.addBarrel();
                    }
                    gameObject._barrelEffect.amount = barrel;
                }

            },
        });

        gameObject.barrel = null;

        AddClearEffectCallback(gameObject, 'barrel');

        return gameObject;
    };

    var AddColorMatrixEffectPropertiesBase = function (gameObject, effectName, inputMode) {
        // Don't attach properties again
        if (HasProperty(gameObject, effectName)) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var EffectInstancePropertyName = `_${effectName}Effect`;

        var currentValue;
        Object.defineProperty(gameObject, effectName, {
            get: function () {
                return currentValue;
            },
            set: function (value) {
                if (currentValue === value) {
                    return;
                }

                currentValue = value;

                if ((currentValue === null) || (currentValue === false)) {
                    if (gameObject[EffectInstancePropertyName]) {
                        filterList.remove(gameObject[EffectInstancePropertyName]);
                        gameObject[EffectInstancePropertyName] = undefined;
                    }
                } else {
                    if (!gameObject[EffectInstancePropertyName]) {
                        gameObject[EffectInstancePropertyName] = filterList.addColorMatrix();
                    }
                    var effectInstance = gameObject[EffectInstancePropertyName];
                    effectInstance.colorMatrix[effectName]((inputMode === 1) ? value : undefined);
                }

            },
        });

        gameObject[effectName] = null;

        AddClearEffectCallback(gameObject, effectName);

        return gameObject;
    };

    var AddBlackWhiteProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'blackWhite');
        return gameObject;
    };

    var AddBlurProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'blurColor')) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var blurColor,
            blurQuality = 0,
            blurX = 1,
            blurY = 1,
            blurStrength = 1,
            blurSteps = 4;
        Object.defineProperty(gameObject, 'blurColor', {
            get: function () {
                return blurColor;
            },
            set: function (value) {
                if (blurColor === value) {
                    return;
                }

                blurColor = value;

                if ((blurColor === null) || (blurColor === false)) {
                    if (gameObject._blur) {
                        filterList.remove(gameObject._blur);
                        gameObject._blur = undefined;
                    }
                } else {
                    if (!gameObject._blur) {
                        gameObject._blur = filterList.addBlur(blurQuality, blurX, blurY, blurStrength, blurColor, blurSteps);
                    }

                    gameObject._blur.color = blurColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'blurQuality', {
            get: function () {
                return blurQuality;
            },
            set: function (value) {
                if (blurQuality === value) {
                    return;
                }

                blurQuality = value;

                if (gameObject._blur) {
                    gameObject._blur.quality = blurQuality;
                }

            },
        });

        Object.defineProperty(gameObject, 'blurX', {
            get: function () {
                return blurX;
            },
            set: function (value) {
                if (blurX === value) {
                    return;
                }

                blurX = value;

                if (gameObject._blur) {
                    gameObject._blur.x = blurX;
                }
            },
        });

        Object.defineProperty(gameObject, 'blurY', {
            get: function () {
                return blurY;
            },
            set: function (value) {
                if (blurY === value) {
                    return;
                }

                blurY = value;

                if (gameObject._blur) {
                    gameObject._blur.y = blurY;
                }
            },
        });

        Object.defineProperty(gameObject, 'blurStrength', {
            get: function () {
                return blurStrength;
            },
            set: function (value) {
                if (blurStrength === value) {
                    return;
                }

                blurStrength = value;

                if (gameObject._blur) {
                    gameObject._blur.strength = blurStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'blurSteps', {
            get: function () {
                return blurSteps;
            },
            set: function (value) {
                if (blurSteps === value) {
                    return;
                }

                blurSteps = value;

                if (gameObject._blur) {
                    gameObject._blur.steps = blurSteps;
                }
            },
        });

        gameObject.blurColor = null;

        AddClearEffectCallback(gameObject, 'blurColor');

        return gameObject;
    };

    var AddBokehProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'bokehRadius')) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var bokehRadius,
            bokehAmount = 1,
            bokehContrast = 0.2;
        Object.defineProperty(gameObject, 'bokehRadius', {
            get: function () {
                return bokehRadius;
            },
            set: function (value) {
                if (bokehRadius === value) {
                    return;
                }

                bokehRadius = value;

                if ((bokehRadius === null) || (bokehRadius === false)) {
                    if (gameObject._bokeh) {
                        filterList.remove(gameObject._bokeh);
                        gameObject._bokeh = undefined;
                    }
                } else {
                    if (!gameObject._bokeh) {
                        gameObject._bokeh = filterList.addBokeh(bokehRadius, bokehAmount, bokehContrast);
                    }

                    gameObject._bokeh.radius = bokehRadius;
                }

            },
        });

        Object.defineProperty(gameObject, 'bokehAmount', {
            get: function () {
                return bokehAmount;
            },
            set: function (value) {
                if (bokehAmount === value) {
                    return;
                }

                bokehAmount = value;

                if (gameObject._bokeh) {
                    gameObject._bokeh.amount = bokehAmount;
                }
            },
        });

        Object.defineProperty(gameObject, 'bokehContrast', {
            get: function () {
                return bokehContrast;
            },
            set: function (value) {
                if (bokehContrast === value) {
                    return;
                }

                bokehContrast = value;

                if (gameObject._bokeh) {
                    gameObject._bokeh.contrast = bokehContrast;
                }
            },
        });

        gameObject.bokehRadius = null;

        AddClearEffectCallback(gameObject, 'bokehRadius');

        return gameObject;
    };

    var AddBrightnessProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'brightness', 1);
        return gameObject;
    };

    var AddBrownProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'brown');
        return gameObject;
    };

    var AddContrastProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'contrast', 1);
        return gameObject;
    };

    var AddDesaturateProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'desaturate', 1);
        return gameObject;
    };

    var AddDesaturateLuminanceProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'desaturateLuminance');
        return gameObject;
    };

    var AddDisplacementProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'displacementKey')) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var displacementKey,
            displacementX = 0.005,
            displacementY = 0.005;
        Object.defineProperty(gameObject, 'displacementKey', {
            get: function () {
                return displacementKey;
            },
            set: function (value) {
                if (displacementKey === value) {
                    return;
                }

                displacementKey = value;

                if ((displacementKey === null) || (displacementKey === false)) {
                    if (gameObject._displacement) {
                        filterList.remove(gameObject._displacement);
                        gameObject._displacement = undefined;
                    }
                } else {
                    if (!gameObject._displacement) {
                        gameObject._displacement = filterList.addDisplacement(displacementKey, displacementX, displacementY);
                    }

                    gameObject._displacement.setTexture(displacementKey);
                }

            },
        });

        Object.defineProperty(gameObject, 'displacementX', {
            get: function () {
                return displacementX;
            },
            set: function (value) {
                if (displacementX === value) {
                    return;
                }

                displacementX = value;

                if (gameObject._displacement) {
                    gameObject._displacement.x = displacementX;
                }
            },
        });

        Object.defineProperty(gameObject, 'displacementY', {
            get: function () {
                return displacementY;
            },
            set: function (value) {
                if (displacementY === value) {
                    return;
                }

                displacementY = value;

                if (gameObject._displacement) {
                    gameObject._displacement.y = displacementY;
                }
            },
        });

        gameObject.displacementKey = null;

        AddClearEffectCallback(gameObject, 'displacementKey');

        return gameObject;
    };

    var AddGlowProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'glowColor')) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var glowColor,
            glowOuterStrength = 4,
            glowInnerStrength = 0;
        Object.defineProperty(gameObject, 'glowColor', {
            get: function () {
                return glowColor;
            },
            set: function (value) {
                if (glowColor === value) {
                    return;
                }

                glowColor = value;

                if ((glowColor === null) || (glowColor === false)) {
                    if (gameObject._glow) {
                        filterList.remove(gameObject._glow);
                        gameObject._glow = undefined;
                    }
                } else {
                    if (!gameObject._glow) {
                        gameObject._glow = filterList.addGlow(glowColor, glowOuterStrength, glowInnerStrength);
                    }

                    gameObject._glow.color = glowColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'glowOuterStrength', {
            get: function () {
                return glowOuterStrength;
            },
            set: function (value) {
                if (glowOuterStrength === value) {
                    return;
                }

                glowOuterStrength = value;

                if (gameObject._glow) {
                    gameObject._glow.outerStrength = glowOuterStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'glowInnerStrength', {
            get: function () {
                return glowInnerStrength;
            },
            set: function (value) {
                if (glowInnerStrength === value) {
                    return;
                }

                glowInnerStrength = value;

                if (gameObject._glow) {
                    gameObject._glow.innerStrength = glowInnerStrength;
                }
            },
        });

        gameObject.glowColor = null;

        AddClearEffectCallback(gameObject, 'glowColor');

        return gameObject;
    };

    var AddGrayscaleProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'grayscale', 1);
        return gameObject;
    };

    var AddHueProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'hue', 1);
        return gameObject;
    };

    var AddKodachromeProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'kodachrome');
        return gameObject;
    };

    var AddLSDProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'lsd');
        return gameObject;
    };

    var AddNegativeProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'negative');
        return gameObject;
    };

    var AddPixelateProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'pixelate')) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var pixelate;
        Object.defineProperty(gameObject, 'pixelate', {
            get: function () {
                return pixelate;
            },
            set: function (value) {
                if (pixelate === value) {
                    return;
                }

                pixelate = value;

                if ((pixelate === null) || (pixelate === false)) {
                    if (gameObject._pixelateEffect) {
                        filterList.remove(gameObject._pixelateEffect);
                        gameObject._pixelateEffect = undefined;
                    }
                } else {
                    if (!gameObject._pixelateEffect) {
                        gameObject._pixelateEffect = filterList.addPixelate();
                    }
                    gameObject._pixelateEffect.amount = pixelate;
                }

            },
        });

        gameObject.pixelate = null;

        AddClearEffectCallback(gameObject, 'pixelate');

        return gameObject;
    };

    var AddPolaroidProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'polaroid');
        return gameObject;
    };

    var AddSaturateProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'saturate', 1);
        return gameObject;
    };

    var AddSepiaProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'sepia');
        return gameObject;
    };

    var AddShadowProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'shadowColor')) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var shadowColor,
            shadowX = 0,
            shadowY = 0,
            shadowDecay = 0.1,
            shadowPower = 1,
            shadowSamples = 6,
            shadowIntensity = 1;
        Object.defineProperty(gameObject, 'shadowColor', {
            get: function () {
                return shadowColor;
            },
            set: function (value) {
                if (shadowColor === value) {
                    return;
                }

                shadowColor = value;

                if ((shadowColor === null) || (shadowColor === false)) {
                    if (gameObject._shadow) {
                        filterList.remove(gameObject._shadow);
                        gameObject._shadow = undefined;
                    }
                } else {
                    if (!gameObject._shadow) {
                        gameObject._shadow = filterList.addShadow(shadowX, shadowY, shadowDecay, shadowPower, shadowColor, shadowSamples, shadowIntensity);
                    }

                    gameObject._shadow.color = shadowColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'shadowX', {
            get: function () {
                return shadowX;
            },
            set: function (value) {
                if (shadowX === value) {
                    return;
                }

                shadowX = value;

                if (gameObject._shadow) {
                    gameObject._shadow.x = shadowX;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowY', {
            get: function () {
                return shadowY;
            },
            set: function (value) {
                if (shadowY === value) {
                    return;
                }

                shadowY = value;

                if (gameObject._shadow) {
                    gameObject._shadow.y = shadowY;
                }
            },
        });

        Object.defineProperty(gameObject, 'decay', {
            get: function () {
                return shadowDecay;
            },
            set: function (value) {
                if (shadowDecay === value) {
                    return;
                }

                shadowDecay = value;

                if (gameObject._shadow) {
                    gameObject._shadow.decay = shadowDecay;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowPower', {
            get: function () {
                return shadowPower;
            },
            set: function (value) {
                if (shadowPower === value) {
                    return;
                }

                shadowPower = value;

                if (gameObject._shadow) {
                    gameObject._shadow.power = shadowPower;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowSamples', {
            get: function () {
                return shadowSamples;
            },
            set: function (value) {
                if (shadowSamples === value) {
                    return;
                }

                shadowSamples = value;

                if (gameObject._shadow) {
                    gameObject._shadow.samples = shadowSamples;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowIntensity', {
            get: function () {
                return shadowIntensity;
            },
            set: function (value) {
                if (shadowIntensity === value) {
                    return;
                }

                shadowIntensity = value;

                if (gameObject._shadow) {
                    gameObject._shadow.intensity = shadowIntensity;
                }
            },
        });

        gameObject.shadowColor = null;

        AddClearEffectCallback(gameObject, 'shadowColor');

        return gameObject;
    };

    var AddShiftToBGRProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'shiftToBGR');
        return gameObject;
    };

    var AddTechnicolorProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'technicolor');
        return gameObject;
    };

    var AddTiltShiftProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'tiltShiftRadius')) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var tiltShiftRadius,
            tiltShiftAmount = 1,
            tiltShiftContrast = 0.2,
            tiltShiftBlurX = 1,
            tiltShiftBlurY = 1,
            tiltShiftStrength = 1;
        Object.defineProperty(gameObject, 'tiltShiftRadius', {
            get: function () {
                return tiltShiftRadius;
            },
            set: function (value) {
                if (tiltShiftRadius === value) {
                    return;
                }

                tiltShiftRadius = value;

                if ((tiltShiftRadius === null) || (tiltShiftRadius === false)) {
                    if (gameObject._tiltShift) {
                        filterList.remove(gameObject._tiltShift);
                        gameObject._tiltShift = undefined;
                    }
                } else {
                    if (!gameObject._tiltShift) {
                        gameObject._tiltShift = filterList.addTiltShift(tiltShiftRadius, tiltShiftAmount, tiltShiftContrast, tiltShiftBlurX, tiltShiftBlurY, tiltShiftStrength);
                    }

                    gameObject._tiltShift.radius = tiltShiftRadius;
                }

            },
        });

        Object.defineProperty(gameObject, 'tiltShiftAmount', {
            get: function () {
                return tiltShiftAmount;
            },
            set: function (value) {
                if (tiltShiftAmount === value) {
                    return;
                }

                tiltShiftAmount = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.amount = tiltShiftAmount;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftContrast', {
            get: function () {
                return tiltShiftContrast;
            },
            set: function (value) {
                if (tiltShiftContrast === value) {
                    return;
                }

                tiltShiftContrast = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.contrast = tiltShiftContrast;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftBlurX', {
            get: function () {
                return tiltShiftBlurX;
            },
            set: function (value) {
                if (tiltShiftBlurX === value) {
                    return;
                }

                tiltShiftBlurX = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.blurX = tiltShiftBlurX;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftBlurY', {
            get: function () {
                return tiltShiftBlurY;
            },
            set: function (value) {
                if (tiltShiftBlurY === value) {
                    return;
                }

                tiltShiftBlurY = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.blurY = tiltShiftBlurY;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftStrength', {
            get: function () {
                return tiltShiftStrength;
            },
            set: function (value) {
                if (tiltShiftStrength === value) {
                    return;
                }

                tiltShiftStrength = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.strength = tiltShiftStrength;
                }
            },
        });

        gameObject.tiltShiftRadius = null;

        AddClearEffectCallback(gameObject, 'tiltShiftRadius');

        return gameObject;
    };

    var AddVintagePinholeProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'vintagePinhole');
        return gameObject;
    };

    const EffectMap = {
        barrel: AddBarrelProperties,
        blackWhite: AddBlackWhiteProperties,
        blur: AddBlurProperties,
        bokeh: AddBokehProperties,
        brightness: AddBrightnessProperties,
        brown: AddBrownProperties,
        contrast: AddContrastProperties,
        desaturate: AddDesaturateProperties,
        desaturateLuminance: AddDesaturateLuminanceProperties,
        displacement: AddDisplacementProperties,
        glow: AddGlowProperties,
        grayscale: AddGrayscaleProperties,
        hue: AddHueProperties,
        kodachrome: AddKodachromeProperties,
        lsd: AddLSDProperties,
        negative: AddNegativeProperties,
        pixelate: AddPixelateProperties,
        polaroid: AddPolaroidProperties,
        saturate: AddSaturateProperties,
        sepia: AddSepiaProperties,
        shadow: AddShadowProperties,
        shiftToBGR: AddShiftToBGRProperties,
        technicolor: AddTechnicolorProperties,
        tiltShift: AddTiltShiftProperties,
        vintagePinhole: AddVintagePinholeProperties,
    };

    var AddEffectProperties = function (gameObject, config) {
        if (config === undefined) {
            config = true;
        } else if (typeof (config) === 'string') {
            config = { config: true };
        } else if (Array.isArray(config)) {
            var nameList = config;
            var config = {};
            for (var i = 0, cnt = nameList.length; i < cnt; i++) {
                config[nameList[i]] = true;
            }
        }

        if (config === true) {
            // Enable all effect properties
            for (var name in EffectMap) {
                EffectMap[name](gameObject);
            }
        } else {
            for (var name in config) {
                if (config[name] && EffectMap[name]) {
                    EffectMap[name](gameObject);
                }
            }
        }

        return gameObject;
    };

    class EffectPropertiesPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return AddEffectProperties(gameObject, config);
        }
    }

    return EffectPropertiesPlugin;

}));
