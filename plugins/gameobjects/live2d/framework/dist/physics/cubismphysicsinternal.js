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
var cubismvector2_1 = require("../math/cubismvector2");
var csmvector_1 = require("../type/csmvector");
/**
 * 物理演算の適用先の種類
 */
var CubismPhysicsTargetType;
(function (CubismPhysicsTargetType) {
    CubismPhysicsTargetType[CubismPhysicsTargetType["CubismPhysicsTargetType_Parameter"] = 0] = "CubismPhysicsTargetType_Parameter"; // パラメータに対して適用
})(CubismPhysicsTargetType = exports.CubismPhysicsTargetType || (exports.CubismPhysicsTargetType = {}));
/**
 * 物理演算の入力の種類
 */
var CubismPhysicsSource;
(function (CubismPhysicsSource) {
    CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_X"] = 0] = "CubismPhysicsSource_X";
    CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_Y"] = 1] = "CubismPhysicsSource_Y";
    CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_Angle"] = 2] = "CubismPhysicsSource_Angle"; // 角度から
})(CubismPhysicsSource = exports.CubismPhysicsSource || (exports.CubismPhysicsSource = {}));
/**
 * @brief 物理演算で使用する外部の力
 *
 * 物理演算で使用する外部の力。
 */
var PhysicsJsonEffectiveForces = /** @class */ (function () {
    function PhysicsJsonEffectiveForces() {
        this.gravity = new cubismvector2_1.CubismVector2(0, 0);
        this.wind = new cubismvector2_1.CubismVector2(0, 0);
    }
    return PhysicsJsonEffectiveForces;
}());
exports.PhysicsJsonEffectiveForces = PhysicsJsonEffectiveForces;
/**
 * 物理演算のパラメータ情報
 */
var CubismPhysicsParameter = /** @class */ (function () {
    function CubismPhysicsParameter() {
    }
    return CubismPhysicsParameter;
}());
exports.CubismPhysicsParameter = CubismPhysicsParameter;
/**
 * 物理演算の正規化情報
 */
var CubismPhysicsNormalization = /** @class */ (function () {
    function CubismPhysicsNormalization() {
    }
    return CubismPhysicsNormalization;
}());
exports.CubismPhysicsNormalization = CubismPhysicsNormalization;
/**
 * 物理演算の演算委使用する物理点の情報
 */
var CubismPhysicsParticle = /** @class */ (function () {
    function CubismPhysicsParticle() {
        this.initialPosition = new cubismvector2_1.CubismVector2(0, 0);
        this.position = new cubismvector2_1.CubismVector2(0, 0);
        this.lastPosition = new cubismvector2_1.CubismVector2(0, 0);
        this.lastGravity = new cubismvector2_1.CubismVector2(0, 0);
        this.force = new cubismvector2_1.CubismVector2(0, 0);
        this.velocity = new cubismvector2_1.CubismVector2(0, 0);
    }
    return CubismPhysicsParticle;
}());
exports.CubismPhysicsParticle = CubismPhysicsParticle;
/**
 * 物理演算の物理点の管理
 */
var CubismPhysicsSubRig = /** @class */ (function () {
    function CubismPhysicsSubRig() {
        this.normalizationPosition = new CubismPhysicsNormalization();
        this.normalizationAngle = new CubismPhysicsNormalization();
    }
    return CubismPhysicsSubRig;
}());
exports.CubismPhysicsSubRig = CubismPhysicsSubRig;
/**
 * 物理演算の入力情報
 */
var CubismPhysicsInput = /** @class */ (function () {
    function CubismPhysicsInput() {
        this.source = new CubismPhysicsParameter();
    }
    return CubismPhysicsInput;
}());
exports.CubismPhysicsInput = CubismPhysicsInput;
/**
 * @brief 物理演算の出力情報
 *
 * 物理演算の出力情報。
 */
var CubismPhysicsOutput = /** @class */ (function () {
    function CubismPhysicsOutput() {
        this.destination = new CubismPhysicsParameter();
        this.translationScale = new cubismvector2_1.CubismVector2(0, 0);
    }
    return CubismPhysicsOutput;
}());
exports.CubismPhysicsOutput = CubismPhysicsOutput;
/**
 * @brief 物理演算のデータ
 *
 * 物理演算のデータ。
 */
var CubismPhysicsRig = /** @class */ (function () {
    function CubismPhysicsRig() {
        this.settings = new csmvector_1.csmVector();
        this.inputs = new csmvector_1.csmVector();
        this.outputs = new csmvector_1.csmVector();
        this.particles = new csmvector_1.csmVector();
        this.gravity = new cubismvector2_1.CubismVector2(0, 0);
        this.wind = new cubismvector2_1.CubismVector2(0, 0);
    }
    return CubismPhysicsRig;
}());
exports.CubismPhysicsRig = CubismPhysicsRig;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismphysicsinternal"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismPhysicsInput = $.CubismPhysicsInput;
    Live2DCubismFramework.CubismPhysicsNormalization = $.CubismPhysicsNormalization;
    Live2DCubismFramework.CubismPhysicsOutput = $.CubismPhysicsOutput;
    Live2DCubismFramework.CubismPhysicsParameter = $.CubismPhysicsParameter;
    Live2DCubismFramework.CubismPhysicsParticle = $.CubismPhysicsParticle;
    Live2DCubismFramework.CubismPhysicsRig = $.CubismPhysicsRig;
    Live2DCubismFramework.CubismPhysicsSource = $.CubismPhysicsSource;
    Live2DCubismFramework.CubismPhysicsSubRig = $.CubismPhysicsSubRig;
    Live2DCubismFramework.CubismPhysicsTargetType = $.CubismPhysicsTargetType;
    Live2DCubismFramework.PhysicsJsonEffectiveForces = $.PhysicsJsonEffectiveForces;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismphysicsinternal.js.map