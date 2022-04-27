"use strict";
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cubismmath_1 = require("../math/cubismmath");
var cubismvector2_1 = require("../math/cubismvector2");
var cubismphysicsinternal_1 = require("./cubismphysicsinternal");
var cubismphysicsjson_1 = require("./cubismphysicsjson");
// physics types tags.
var PhysicsTypeTagX = 'X';
var PhysicsTypeTagY = 'Y';
var PhysicsTypeTagAngle = 'Angle';
// Constant of air resistance.
var AirResistance = 5.0;
// Constant of maximum weight of input and output ratio.
var MaximumWeight = 100.0;
// Constant of threshold of movement.
var MovementThreshold = 0.001;
/**
 * 物理演算クラス
 */
var CubismPhysics = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismPhysics() {
        this._physicsRig = null;
        // set default options
        this._options = new Options();
        this._options.gravity.y = -1.0;
        this._options.gravity.x = 0;
        this._options.wind.x = 0;
        this._options.wind.y = 0;
    }
    /**
     * インスタンスの作成
     * @param buffer    physics3.jsonが読み込まれているバッファ
     * @param size      バッファのサイズ
     * @return 作成されたインスタンス
     */
    CubismPhysics.create = function (buffer, size) {
        var ret = new CubismPhysics();
        ret.parse(buffer, size);
        ret._physicsRig.gravity.y = 0;
        return ret;
    };
    /**
     * インスタンスを破棄する
     * @param physics 破棄するインスタンス
     */
    CubismPhysics.delete = function (physics) {
        if (physics != null) {
            physics.release();
            physics = null;
        }
    };
    /**
     * 物理演算の評価
     * @param model 物理演算の結果を適用するモデル
     * @param deltaTimeSeconds デルタ時間[秒]
     */
    CubismPhysics.prototype.evaluate = function (model, deltaTimeSeconds) {
        var totalAngle;
        var weight;
        var radAngle;
        var outputValue;
        var totalTranslation = new cubismvector2_1.CubismVector2();
        var currentSetting;
        var currentInput;
        var currentOutput;
        var currentParticles;
        var parameterValue;
        var parameterMaximumValue;
        var parameterMinimumValue;
        var parameterDefaultValue;
        parameterValue = model.getModel().parameters.values;
        parameterMaximumValue = model.getModel().parameters.maximumValues;
        parameterMinimumValue = model.getModel().parameters.minimumValues;
        parameterDefaultValue = model.getModel().parameters.defaultValues;
        for (var settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            totalAngle = { angle: 0.0 };
            totalTranslation.x = 0.0;
            totalTranslation.y = 0.0;
            currentSetting = this._physicsRig.settings.at(settingIndex);
            currentInput = this._physicsRig.inputs.get(currentSetting.baseInputIndex);
            currentOutput = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
            currentParticles = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
            // Load input parameters
            for (var i = 0; i < currentSetting.inputCount; ++i) {
                weight = currentInput[i].weight / MaximumWeight;
                if (currentInput[i].sourceParameterIndex == -1) {
                    currentInput[i].sourceParameterIndex = model.getParameterIndex(currentInput[i].source.id);
                }
                currentInput[i].getNormalizedParameterValue(totalTranslation, totalAngle, parameterValue[currentInput[i].sourceParameterIndex], parameterMinimumValue[currentInput[i].sourceParameterIndex], parameterMaximumValue[currentInput[i].sourceParameterIndex], parameterDefaultValue[currentInput[i].sourceParameterIndex], currentSetting.normalizationPosition, currentSetting.normalizationAngle, currentInput[i].reflect, weight);
            }
            radAngle = cubismmath_1.CubismMath.degreesToRadian(-totalAngle.angle);
            totalTranslation.x =
                totalTranslation.x * cubismmath_1.CubismMath.cos(radAngle) -
                    totalTranslation.y * cubismmath_1.CubismMath.sin(radAngle);
            totalTranslation.y =
                totalTranslation.x * cubismmath_1.CubismMath.sin(radAngle) +
                    totalTranslation.y * cubismmath_1.CubismMath.cos(radAngle);
            // Calculate particles position.
            updateParticles(currentParticles, currentSetting.particleCount, totalTranslation, totalAngle.angle, this._options.wind, MovementThreshold * currentSetting.normalizationPosition.maximum, deltaTimeSeconds, AirResistance);
            // Update output parameters.
            for (var i = 0; i < currentSetting.outputCount; ++i) {
                var particleIndex = currentOutput[i].vertexIndex;
                if (particleIndex < 1 ||
                    particleIndex >= currentSetting.particleCount) {
                    break;
                }
                if (currentOutput[i].destinationParameterIndex == -1) {
                    currentOutput[i].destinationParameterIndex = model.getParameterIndex(currentOutput[i].destination.id);
                }
                var translation = new cubismvector2_1.CubismVector2();
                translation.x =
                    currentParticles[particleIndex].position.x -
                        currentParticles[particleIndex - 1].position.x;
                translation.y =
                    currentParticles[particleIndex].position.y -
                        currentParticles[particleIndex - 1].position.y;
                outputValue = currentOutput[i].getValue(translation, currentParticles, particleIndex, currentOutput[i].reflect, this._options.gravity);
                var destinationParameterIndex = currentOutput[i].destinationParameterIndex;
                var outParameterValue = !Float32Array.prototype.slice && 'subarray' in Float32Array.prototype
                    ? JSON.parse(JSON.stringify(parameterValue.subarray(destinationParameterIndex))) // 値渡しするため、JSON.parse, JSON.stringify
                    : parameterValue.slice(destinationParameterIndex);
                updateOutputParameterValue(outParameterValue, parameterMinimumValue[destinationParameterIndex], parameterMaximumValue[destinationParameterIndex], outputValue, currentOutput[i]);
                // 値を反映
                for (var offset = destinationParameterIndex, outParamIndex = 0; offset < parameterValue.length; offset++, outParamIndex++) {
                    parameterValue[offset] = outParameterValue[outParamIndex];
                }
            }
        }
    };
    /**
     * オプションの設定
     * @param options オプション
     */
    CubismPhysics.prototype.setOptions = function (options) {
        this._options = options;
    };
    /**
     * オプションの取得
     * @return オプション
     */
    CubismPhysics.prototype.getOption = function () {
        return this._options;
    };
    /**
     * デストラクタ相当の処理
     */
    CubismPhysics.prototype.release = function () {
        this._physicsRig = void 0;
        this._physicsRig = null;
    };
    /**
     * physics3.jsonをパースする。
     * @param physicsJson physics3.jsonが読み込まれているバッファ
     * @param size バッファのサイズ
     */
    CubismPhysics.prototype.parse = function (physicsJson, size) {
        this._physicsRig = new cubismphysicsinternal_1.CubismPhysicsRig();
        var json = new cubismphysicsjson_1.CubismPhysicsJson(physicsJson, size);
        this._physicsRig.gravity = json.getGravity();
        this._physicsRig.wind = json.getWind();
        this._physicsRig.subRigCount = json.getSubRigCount();
        this._physicsRig.settings.updateSize(this._physicsRig.subRigCount, cubismphysicsinternal_1.CubismPhysicsSubRig, true);
        this._physicsRig.inputs.updateSize(json.getTotalInputCount(), cubismphysicsinternal_1.CubismPhysicsInput, true);
        this._physicsRig.outputs.updateSize(json.getTotalOutputCount(), cubismphysicsinternal_1.CubismPhysicsOutput, true);
        this._physicsRig.particles.updateSize(json.getVertexCount(), cubismphysicsinternal_1.CubismPhysicsParticle, true);
        var inputIndex = 0, outputIndex = 0, particleIndex = 0;
        for (var i = 0; i < this._physicsRig.settings.getSize(); ++i) {
            this._physicsRig.settings.at(i).normalizationPosition.minimum = json.getNormalizationPositionMinimumValue(i);
            this._physicsRig.settings.at(i).normalizationPosition.maximum = json.getNormalizationPositionMaximumValue(i);
            this._physicsRig.settings.at(i).normalizationPosition.defalut = json.getNormalizationPositionDefaultValue(i);
            this._physicsRig.settings.at(i).normalizationAngle.minimum = json.getNormalizationAngleMinimumValue(i);
            this._physicsRig.settings.at(i).normalizationAngle.maximum = json.getNormalizationAngleMaximumValue(i);
            this._physicsRig.settings.at(i).normalizationAngle.defalut = json.getNormalizationAngleDefaultValue(i);
            // Input
            this._physicsRig.settings.at(i).inputCount = json.getInputCount(i);
            this._physicsRig.settings.at(i).baseInputIndex = inputIndex;
            for (var j = 0; j < this._physicsRig.settings.at(i).inputCount; ++j) {
                this._physicsRig.inputs.at(inputIndex + j).sourceParameterIndex = -1;
                this._physicsRig.inputs.at(inputIndex + j).weight = json.getInputWeight(i, j);
                this._physicsRig.inputs.at(inputIndex + j).reflect = json.getInputReflect(i, j);
                if (json.getInputType(i, j) == PhysicsTypeTagX) {
                    this._physicsRig.inputs.at(inputIndex + j).type =
                        cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_X;
                    this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue = getInputTranslationXFromNormalizedParameterValue;
                }
                else if (json.getInputType(i, j) == PhysicsTypeTagY) {
                    this._physicsRig.inputs.at(inputIndex + j).type =
                        cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_Y;
                    this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue = getInputTranslationYFromNormalizedParamterValue;
                }
                else if (json.getInputType(i, j) == PhysicsTypeTagAngle) {
                    this._physicsRig.inputs.at(inputIndex + j).type =
                        cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_Angle;
                    this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue = getInputAngleFromNormalizedParameterValue;
                }
                this._physicsRig.inputs.at(inputIndex + j).source.targetType =
                    cubismphysicsinternal_1.CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
                this._physicsRig.inputs.at(inputIndex + j).source.id = json.getInputSourceId(i, j);
            }
            inputIndex += this._physicsRig.settings.at(i).inputCount;
            // Output
            this._physicsRig.settings.at(i).outputCount = json.getOutputCount(i);
            this._physicsRig.settings.at(i).baseOutputIndex = outputIndex;
            for (var j = 0; j < this._physicsRig.settings.at(i).outputCount; ++j) {
                this._physicsRig.outputs.at(outputIndex + j).destinationParameterIndex = -1;
                this._physicsRig.outputs.at(outputIndex + j).vertexIndex = json.getOutputVertexIndex(i, j);
                this._physicsRig.outputs.at(outputIndex + j).angleScale = json.getOutputAngleScale(i, j);
                this._physicsRig.outputs.at(outputIndex + j).weight = json.getOutputWeight(i, j);
                this._physicsRig.outputs.at(outputIndex + j).destination.targetType =
                    cubismphysicsinternal_1.CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
                this._physicsRig.outputs.at(outputIndex + j).destination.id = json.getOutputDestinationId(i, j);
                if (json.getOutputType(i, j) == PhysicsTypeTagX) {
                    this._physicsRig.outputs.at(outputIndex + j).type =
                        cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_X;
                    this._physicsRig.outputs.at(outputIndex + j).getValue = getOutputTranslationX;
                    this._physicsRig.outputs.at(outputIndex + j).getScale = getOutputScaleTranslationX;
                }
                else if (json.getOutputType(i, j) == PhysicsTypeTagY) {
                    this._physicsRig.outputs.at(outputIndex + j).type =
                        cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_Y;
                    this._physicsRig.outputs.at(outputIndex + j).getValue = getOutputTranslationY;
                    this._physicsRig.outputs.at(outputIndex + j).getScale = getOutputScaleTranslationY;
                }
                else if (json.getOutputType(i, j) == PhysicsTypeTagAngle) {
                    this._physicsRig.outputs.at(outputIndex + j).type =
                        cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_Angle;
                    this._physicsRig.outputs.at(outputIndex + j).getValue = getOutputAngle;
                    this._physicsRig.outputs.at(outputIndex + j).getScale = getOutputScaleAngle;
                }
                this._physicsRig.outputs.at(outputIndex + j).reflect = json.getOutputReflect(i, j);
            }
            outputIndex += this._physicsRig.settings.at(i).outputCount;
            // Particle
            this._physicsRig.settings.at(i).particleCount = json.getParticleCount(i);
            this._physicsRig.settings.at(i).baseParticleIndex = particleIndex;
            for (var j = 0; j < this._physicsRig.settings.at(i).particleCount; ++j) {
                this._physicsRig.particles.at(particleIndex + j).mobility = json.getParticleMobility(i, j);
                this._physicsRig.particles.at(particleIndex + j).delay = json.getParticleDelay(i, j);
                this._physicsRig.particles.at(particleIndex + j).acceleration = json.getParticleAcceleration(i, j);
                this._physicsRig.particles.at(particleIndex + j).radius = json.getParticleRadius(i, j);
                this._physicsRig.particles.at(particleIndex + j).position = json.getParticlePosition(i, j);
            }
            particleIndex += this._physicsRig.settings.at(i).particleCount;
        }
        this.initialize();
        json.release();
        json = void 0;
        json = null;
    };
    /**
     * 初期化する
     */
    CubismPhysics.prototype.initialize = function () {
        var strand;
        var currentSetting;
        var radius;
        for (var settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            currentSetting = this._physicsRig.settings.at(settingIndex);
            strand = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
            // Initialize the top of particle.
            strand[0].initialPosition = new cubismvector2_1.CubismVector2(0.0, 0.0);
            strand[0].lastPosition = new cubismvector2_1.CubismVector2(strand[0].initialPosition.x, strand[0].initialPosition.y);
            strand[0].lastGravity = new cubismvector2_1.CubismVector2(0.0, -1.0);
            strand[0].lastGravity.y *= -1.0;
            strand[0].velocity = new cubismvector2_1.CubismVector2(0.0, 0.0);
            strand[0].force = new cubismvector2_1.CubismVector2(0.0, 0.0);
            // Initialize paritcles.
            for (var i = 1; i < currentSetting.particleCount; ++i) {
                radius = new cubismvector2_1.CubismVector2(0.0, 0.0);
                radius.y = strand[i].radius;
                strand[i].initialPosition = new cubismvector2_1.CubismVector2(strand[i - 1].initialPosition.x + radius.x, strand[i - 1].initialPosition.y + radius.y);
                strand[i].position = new cubismvector2_1.CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
                strand[i].lastPosition = new cubismvector2_1.CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
                strand[i].lastGravity = new cubismvector2_1.CubismVector2(0.0, -1.0);
                strand[i].lastGravity.y *= -1.0;
                strand[i].velocity = new cubismvector2_1.CubismVector2(0.0, 0.0);
                strand[i].force = new cubismvector2_1.CubismVector2(0.0, 0.0);
            }
        }
    };
    return CubismPhysics;
}());
exports.CubismPhysics = CubismPhysics;
/**
 * 物理演算のオプション
 */
var Options = /** @class */ (function () {
    function Options() {
        this.gravity = new cubismvector2_1.CubismVector2(0, 0);
        this.wind = new cubismvector2_1.CubismVector2(0, 0);
    }
    return Options;
}());
exports.Options = Options;
/**
 * Gets sign.
 *
 * @param value Evaluation target value.
 *
 * @return Sign of value.
 */
function sign(value) {
    var ret = 0;
    if (value > 0.0) {
        ret = 1;
    }
    else if (value < 0.0) {
        ret = -1;
    }
    return ret;
}
function getInputTranslationXFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
    targetTranslation.x +=
        normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition.minimum, normalizationPosition.maximum, normalizationPosition.defalut, isInverted) * weight;
}
function getInputTranslationYFromNormalizedParamterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
    targetTranslation.y +=
        normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition.minimum, normalizationPosition.maximum, normalizationPosition.defalut, isInverted) * weight;
}
function getInputAngleFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizaitionPosition, normalizationAngle, isInverted, weight) {
    targetAngle.angle +=
        normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationAngle.minimum, normalizationAngle.maximum, normalizationAngle.defalut, isInverted) * weight;
}
function getOutputTranslationX(translation, particles, particleIndex, isInverted, parentGravity) {
    var outputValue = translation.x;
    if (isInverted) {
        outputValue *= -1.0;
    }
    return outputValue;
}
function getOutputTranslationY(translation, particles, particleIndex, isInverted, parentGravity) {
    var outputValue = translation.y;
    if (isInverted) {
        outputValue *= -1.0;
    }
    return outputValue;
}
function getOutputAngle(translation, particles, particleIndex, isInverted, parentGravity) {
    var outputValue;
    if (particleIndex >= 2) {
        parentGravity = particles[particleIndex - 1].position.substract(particles[particleIndex - 2].position);
    }
    else {
        parentGravity = parentGravity.multiplyByScaler(-1.0);
    }
    outputValue = cubismmath_1.CubismMath.directionToRadian(parentGravity, translation);
    if (isInverted) {
        outputValue *= -1.0;
    }
    return outputValue;
}
function getRangeValue(min, max) {
    var maxValue = cubismmath_1.CubismMath.max(min, max);
    var minValue = cubismmath_1.CubismMath.min(min, max);
    return cubismmath_1.CubismMath.abs(maxValue - minValue);
}
function getDefaultValue(min, max) {
    var minValue = cubismmath_1.CubismMath.min(min, max);
    return minValue + getRangeValue(min, max) / 2.0;
}
function getOutputScaleTranslationX(translationScale, angleScale) {
    return JSON.parse(JSON.stringify(translationScale.x));
}
function getOutputScaleTranslationY(translationScale, angleScale) {
    return JSON.parse(JSON.stringify(translationScale.y));
}
function getOutputScaleAngle(translationScale, angleScale) {
    return JSON.parse(JSON.stringify(angleScale));
}
/**
 * Updates particles.
 *
 * @param strand                Target array of particle.
 * @param strandCount           Count of particle.
 * @param totalTranslation      Total translation value.
 * @param totalAngle            Total angle.
 * @param windDirection         Direction of Wind.
 * @param thresholdValue        Threshold of movement.
 * @param deltaTimeSeconds      Delta time.
 * @param airResistance         Air resistance.
 */
function updateParticles(strand, strandCount, totalTranslation, totalAngle, windDirection, thresholdValue, deltaTimeSeconds, airResistance) {
    var totalRadian;
    var delay;
    var radian;
    var currentGravity;
    var direction = new cubismvector2_1.CubismVector2(0.0, 0.0);
    var velocity = new cubismvector2_1.CubismVector2(0.0, 0.0);
    var force = new cubismvector2_1.CubismVector2(0.0, 0.0);
    var newDirection = new cubismvector2_1.CubismVector2(0.0, 0.0);
    strand[0].position = new cubismvector2_1.CubismVector2(totalTranslation.x, totalTranslation.y);
    totalRadian = cubismmath_1.CubismMath.degreesToRadian(totalAngle);
    currentGravity = cubismmath_1.CubismMath.radianToDirection(totalRadian);
    currentGravity.normalize();
    for (var i = 1; i < strandCount; ++i) {
        strand[i].force = currentGravity
            .multiplyByScaler(strand[i].acceleration)
            .add(windDirection);
        strand[i].lastPosition = new cubismvector2_1.CubismVector2(strand[i].position.x, strand[i].position.y);
        delay = strand[i].delay * deltaTimeSeconds * 30.0;
        direction = strand[i].position.substract(strand[i - 1].position);
        radian =
            cubismmath_1.CubismMath.directionToRadian(strand[i].lastGravity, currentGravity) /
                airResistance;
        direction.x =
            cubismmath_1.CubismMath.cos(radian) * direction.x -
                direction.y * cubismmath_1.CubismMath.sin(radian);
        direction.y =
            cubismmath_1.CubismMath.sin(radian) * direction.x +
                direction.y * cubismmath_1.CubismMath.cos(radian);
        strand[i].position = strand[i - 1].position.add(direction);
        velocity = strand[i].velocity.multiplyByScaler(delay);
        force = strand[i].force.multiplyByScaler(delay).multiplyByScaler(delay);
        strand[i].position = strand[i].position.add(velocity).add(force);
        newDirection = strand[i].position.substract(strand[i - 1].position);
        newDirection.normalize();
        strand[i].position = strand[i - 1].position.add(newDirection.multiplyByScaler(strand[i].radius));
        if (cubismmath_1.CubismMath.abs(strand[i].position.x) < thresholdValue) {
            strand[i].position.x = 0.0;
        }
        if (delay != 0.0) {
            strand[i].velocity = strand[i].position.substract(strand[i].lastPosition);
            strand[i].velocity = strand[i].velocity.divisionByScalar(delay);
            strand[i].velocity = strand[i].velocity.multiplyByScaler(strand[i].mobility);
        }
        strand[i].force = new cubismvector2_1.CubismVector2(0.0, 0.0);
        strand[i].lastGravity = new cubismvector2_1.CubismVector2(currentGravity.x, currentGravity.y);
    }
}
/**
 * Updates output parameter value.
 * @param parameterValue            Target parameter value.
 * @param parameterValueMinimum     Minimum of parameter value.
 * @param parameterValueMaximum     Maximum of parameter value.
 * @param translation               Translation value.
 */
function updateOutputParameterValue(parameterValue, parameterValueMinimum, parameterValueMaximum, translation, output) {
    var outputScale;
    var value;
    var weight;
    outputScale = output.getScale(output.translationScale, output.angleScale);
    value = translation * outputScale;
    if (value < parameterValueMinimum) {
        if (value < output.valueBelowMinimum) {
            output.valueBelowMinimum = value;
        }
        value = parameterValueMinimum;
    }
    else if (value > parameterValueMaximum) {
        if (value > output.valueExceededMaximum) {
            output.valueExceededMaximum = value;
        }
        value = parameterValueMaximum;
    }
    weight = output.weight / MaximumWeight;
    if (weight >= 1.0) {
        parameterValue[0] = value;
    }
    else {
        value = parameterValue[0] * (1.0 - weight) + value * weight;
        parameterValue[0] = value;
    }
}
function normalizeParameterValue(value, parameterMinimum, parameterMaximum, parameterDefault, normalizedMinimum, normalizedMaximum, normalizedDefault, isInverted) {
    var result = 0.0;
    var maxValue = cubismmath_1.CubismMath.max(parameterMaximum, parameterMinimum);
    if (maxValue < value) {
        value = maxValue;
    }
    var minValue = cubismmath_1.CubismMath.min(parameterMaximum, parameterMinimum);
    if (minValue > value) {
        value = minValue;
    }
    var minNormValue = cubismmath_1.CubismMath.min(normalizedMinimum, normalizedMaximum);
    var maxNormValue = cubismmath_1.CubismMath.max(normalizedMinimum, normalizedMaximum);
    var middleNormValue = normalizedDefault;
    var middleValue = getDefaultValue(minValue, maxValue);
    var paramValue = value - middleValue;
    switch (sign(paramValue)) {
        case 1: {
            var nLength = maxNormValue - middleNormValue;
            var pLength = maxValue - middleValue;
            if (pLength != 0.0) {
                result = paramValue * (nLength / pLength);
                result += middleNormValue;
            }
            break;
        }
        case -1: {
            var nLength = minNormValue - middleNormValue;
            var pLength = minValue - middleValue;
            if (pLength != 0.0) {
                result = paramValue * (nLength / pLength);
                result += middleNormValue;
            }
            break;
        }
        case 0: {
            result = middleNormValue;
            break;
        }
        default: {
            break;
        }
    }
    return isInverted ? result : result * -1.0;
}
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismphysics"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismPhysics = $.CubismPhysics;
    Live2DCubismFramework.Options = $.Options;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismphysics.js.map