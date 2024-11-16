(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlive2dplugin = factory());
})(this, (function () { 'use strict';

    const MinVersion = 60;

    var IsChecked = false;

    var CheckP3Version = function (minVersion) {
        if (IsChecked) {
            return;
        }

        if (minVersion === undefined) {
            minVersion = MinVersion;
        }
        var version = Phaser.VERSION.split('.');
        var mainVersion = parseInt(version[0]);
        if (mainVersion === 3) {
            var currentVersion = parseInt(version[1]);
            if (currentVersion < minVersion) {
                console.error(`Minimum supported version : ${mainVersion}.${currentVersion}`);
            }
        } else {
            console.error(`Can't supported version : ${mainVersion}`);
        }

        IsChecked = true;
    };

    CheckP3Version();

    class Live2dGameObjectBase extends Phaser.GameObjects.GameObject { 

    }

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Live2dGameObjectBase,
        [
            Components.AlphaSingle,
            Components.BlendMode,
            Components.ComputedSize,
            Components.Depth,
            Components.GetBounds,
            Components.Origin,
            Components.ScrollFactor,
            Components.Transform,
            Components.Visible,
        ]
    );

    // const Utils = Phaser.Renderer.WebGL.Utils;
    const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

    var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
        if (renderer.newType) {
            renderer.pipelines.clear();
        }

        camera.addToRenderList(src);

        var calcMatrix = GetCalcMatrix(src, camera, parentMatrix).calc;

        src.model.draw(calcMatrix);

        if (!renderer.nextTypeMatch) {
            renderer.pipelines.rebind();
        }
    };

    var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer

    };

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * ベクター型（可変配列型）
     */
    class csmVector {
        /**
         * 引数付きコンストラクタ
         * @param iniitalCapacity 初期化後のキャパシティ。データサイズは_capacity * sizeof(T)
         * @param zeroClear trueなら初期化時に確保した領域を0で埋める
         */
        constructor(initialCapacity = 0) {
            if (initialCapacity < 1) {
                this._ptr = [];
                this._capacity = 0;
                this._size = 0;
            }
            else {
                this._ptr = new Array(initialCapacity);
                this._capacity = initialCapacity;
                this._size = 0;
            }
        }
        /**
         * インデックスで指定した要素を返す
         */
        at(index) {
            return this._ptr[index];
        }
        /**
         * 要素をセット
         * @param index 要素をセットするインデックス
         * @param value セットする要素
         */
        set(index, value) {
            this._ptr[index] = value;
        }
        /**
         * コンテナを取得する
         */
        get(offset = 0) {
            const ret = new Array();
            for (let i = offset; i < this._size; i++) {
                ret.push(this._ptr[i]);
            }
            return ret;
        }
        /**
         * pushBack処理、コンテナに新たな要素を追加する
         * @param value PushBack処理で追加する値
         */
        pushBack(value) {
            if (this._size >= this._capacity) {
                this.prepareCapacity(this._capacity == 0 ? csmVector.s_defaultSize : this._capacity * 2);
            }
            this._ptr[this._size++] = value;
        }
        /**
         * コンテナの全要素を解放する
         */
        clear() {
            this._ptr.length = 0;
            this._size = 0;
        }
        /**
         * コンテナの要素数を返す
         * @return コンテナの要素数
         */
        getSize() {
            return this._size;
        }
        /**
         * コンテナの全要素に対して代入処理を行う
         * @param newSize 代入処理後のサイズ
         * @param value 要素に代入する値
         */
        assign(newSize, value) {
            const curSize = this._size;
            if (curSize < newSize) {
                this.prepareCapacity(newSize); // capacity更新
            }
            for (let i = 0; i < newSize; i++) {
                this._ptr[i] = value;
            }
            this._size = newSize;
        }
        /**
         * サイズ変更
         */
        resize(newSize, value = null) {
            this.updateSize(newSize, value, true);
        }
        /**
         * サイズ変更
         */
        updateSize(newSize, value = null, callPlacementNew = true) {
            const curSize = this._size;
            if (curSize < newSize) {
                this.prepareCapacity(newSize); // capacity更新
                if (callPlacementNew) {
                    for (let i = this._size; i < newSize; i++) {
                        if (typeof value == 'function') {
                            // new
                            this._ptr[i] = JSON.parse(JSON.stringify(new value()));
                        } // プリミティブ型なので値渡し
                        else {
                            this._ptr[i] = value;
                        }
                    }
                }
                else {
                    for (let i = this._size; i < newSize; i++) {
                        this._ptr[i] = value;
                    }
                }
            }
            else {
                // newSize <= this._size
                //---
                const sub = this._size - newSize;
                this._ptr.splice(this._size - sub, sub); // 不要なので破棄する
            }
            this._size = newSize;
        }
        /**
         * コンテナにコンテナ要素を挿入する
         * @param position 挿入する位置
         * @param begin 挿入するコンテナの開始位置
         * @param end 挿入するコンテナの終端位置
         */
        insert(position, begin, end) {
            let dstSi = position._index;
            const srcSi = begin._index;
            const srcEi = end._index;
            const addCount = srcEi - srcSi;
            this.prepareCapacity(this._size + addCount);
            // 挿入用の既存データをシフトして隙間を作る
            const addSize = this._size - dstSi;
            if (addSize > 0) {
                for (let i = 0; i < addSize; i++) {
                    this._ptr.splice(dstSi + i, 0, null);
                }
            }
            for (let i = srcSi; i < srcEi; i++, dstSi++) {
                this._ptr[dstSi] = begin._vector._ptr[i];
            }
            this._size = this._size + addCount;
        }
        /**
         * コンテナからインデックスで指定した要素を削除する
         * @param index インデックス値
         * @return true 削除実行
         * @return false 削除範囲外
         */
        remove(index) {
            if (index < 0 || this._size <= index) {
                return false; // 削除範囲外
            }
            this._ptr.splice(index, 1);
            --this._size;
            return true;
        }
        /**
         * コンテナから要素を削除して他の要素をシフトする
         * @param ite 削除する要素
         */
        erase(ite) {
            const index = ite._index;
            if (index < 0 || this._size <= index) {
                return ite; // 削除範囲外
            }
            // 削除
            this._ptr.splice(index, 1);
            --this._size;
            const ite2 = new iterator$1(this, index); // 終了
            return ite2;
        }
        /**
         * コンテナのキャパシティを確保する
         * @param newSize 新たなキャパシティ。引数の値が現在のサイズ未満の場合は何もしない.
         */
        prepareCapacity(newSize) {
            if (newSize > this._capacity) {
                if (this._capacity == 0) {
                    this._ptr = new Array(newSize);
                    this._capacity = newSize;
                }
                else {
                    this._ptr.length = newSize;
                    this._capacity = newSize;
                }
            }
        }
        /**
         * コンテナの先頭要素を返す
         */
        begin() {
            const ite = this._size == 0 ? this.end() : new iterator$1(this, 0);
            return ite;
        }
        /**
         * コンテナの終端要素を返す
         */
        end() {
            const ite = new iterator$1(this, this._size);
            return ite;
        }
        getOffset(offset) {
            const newVector = new csmVector();
            newVector._ptr = this.get(offset);
            newVector._size = this.get(offset).length;
            newVector._capacity = this.get(offset).length;
            return newVector;
        }
    }
    csmVector.s_defaultSize = 10; // コンテナ初期化のデフォルトサイズ
    let iterator$1 = class iterator {
        /**
         * コンストラクタ
         */
        constructor(v, index) {
            this._vector = v != undefined ? v : null;
            this._index = index != undefined ? index : 0;
        }
        /**
         * 代入
         */
        set(ite) {
            this._index = ite._index;
            this._vector = ite._vector;
            return this;
        }
        /**
         * 前置き++演算
         */
        preIncrement() {
            ++this._index;
            return this;
        }
        /**
         * 前置き--演算
         */
        preDecrement() {
            --this._index;
            return this;
        }
        /**
         * 後置き++演算子
         */
        increment() {
            const iteold = new iterator(this._vector, this._index++); // 古い値を保存
            return iteold;
        }
        /**
         * 後置き--演算子
         */
        decrement() {
            const iteold = new iterator(this._vector, this._index--); // 古い値を保存
            return iteold;
        }
        /**
         * ptr
         */
        ptr() {
            return this._vector._ptr[this._index];
        }
        /**
         * =演算子のオーバーロード
         */
        substitution(ite) {
            this._index = ite._index;
            this._vector = ite._vector;
            return this;
        }
        /**
         * !=演算子のオーバーロード
         */
        notEqual(ite) {
            return this._index != ite._index || this._vector != ite._vector;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$B;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.csmVector = csmVector;
        Live2DCubismFramework.iterator = iterator$1;
    })(Live2DCubismFramework$B || (Live2DCubismFramework$B = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * 文字列クラス。
     */
    class csmString {
        /**
         * 文字列を後方に追加する
         *
         * @param c 追加する文字列
         * @return 更新された文字列
         */
        append(c, length) {
            this.s += length !== undefined ? c.substr(0, length) : c;
            return this;
        }
        /**
         * 文字サイズを拡張して文字を埋める
         * @param length    拡張する文字数
         * @param v         埋める文字
         * @return 更新された文字列
         */
        expansion(length, v) {
            for (let i = 0; i < length; i++) {
                this.append(v);
            }
            return this;
        }
        /**
         * 文字列の長さをバイト数で取得する
         */
        getBytes() {
            return encodeURIComponent(this.s).replace(/%../g, 'x').length;
        }
        /**
         * 文字列の長さを返す
         */
        getLength() {
            return this.s.length;
        }
        /**
         * 文字列比較 <
         * @param s 比較する文字列
         * @return true:    比較する文字列より小さい
         * @return false:   比較する文字列より大きい
         */
        isLess(s) {
            return this.s < s.s;
        }
        /**
         * 文字列比較 >
         * @param s 比較する文字列
         * @return true:    比較する文字列より大きい
         * @return false:   比較する文字列より小さい
         */
        isGreat(s) {
            return this.s > s.s;
        }
        /**
         * 文字列比較 ==
         * @param s 比較する文字列
         * @return true:    比較する文字列と等しい
         * @return false:   比較する文字列と異なる
         */
        isEqual(s) {
            return this.s == s;
        }
        /**
         * 文字列が空かどうか
         * @return true: 空の文字列
         * @return false: 値が設定されている
         */
        isEmpty() {
            return this.s.length == 0;
        }
        /**
         * 引数付きコンストラクタ
         */
        constructor(s) {
            this.s = s;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$A;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.csmString = csmString;
    })(Live2DCubismFramework$A || (Live2DCubismFramework$A = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * パラメータ名・パーツ名・Drawable名を保持
     *
     * パラメータ名・パーツ名・Drawable名を保持するクラス。
     */
    class CubismId {
        /**
         * ID名を取得する
         */
        getString() {
            return this._id;
        }
        /**
         * コンストラクタ
         */
        constructor(id) {
            if (typeof id === 'string') {
                this._id = new csmString(id);
                return;
            }
            this._id = id;
        }
        /**
         * idを比較
         * @param c 比較するid
         * @return 同じならばtrue,異なっていればfalseを返す
         */
        isEqual(c) {
            if (typeof c === 'string') {
                return this._id.isEqual(c);
            }
            else if (c instanceof csmString) {
                return this._id.isEqual(c.s);
            }
            else if (c instanceof CubismId) {
                return this._id.isEqual(c._id.s);
            }
            return false;
        }
        /**
         * idを比較
         * @param c 比較するid
         * @return 同じならばtrue,異なっていればfalseを返す
         */
        isNotEqual(c) {
            if (typeof c == 'string') {
                return !this._id.isEqual(c);
            }
            else if (c instanceof csmString) {
                return !this._id.isEqual(c.s);
            }
            else if (c instanceof CubismId) {
                return !this._id.isEqual(c._id.s);
            }
            return false;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$z;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismId = CubismId;
    })(Live2DCubismFramework$z || (Live2DCubismFramework$z = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * ID名の管理
     *
     * ID名を管理する。
     */
    class CubismIdManager {
        /**
         * コンストラクタ
         */
        constructor() {
            this._ids = new csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            for (let i = 0; i < this._ids.getSize(); ++i) {
                this._ids.set(i, void 0);
            }
            this._ids = null;
        }
        /**
         * ID名をリストから登録
         *
         * @param ids ID名リスト
         * @param count IDの個数
         */
        registerIds(ids) {
            for (let i = 0; i < ids.length; i++) {
                this.registerId(ids[i]);
            }
        }
        /**
         * ID名を登録
         *
         * @param id ID名
         */
        registerId(id) {
            let result = null;
            if ('string' == typeof id) {
                if ((result = this.findId(id)) != null) {
                    return result;
                }
                result = new CubismId(id);
                this._ids.pushBack(result);
            }
            else {
                return this.registerId(id.s);
            }
            return result;
        }
        /**
         * ID名からIDを取得する
         *
         * @param id ID名
         */
        getId(id) {
            return this.registerId(id);
        }
        /**
         * ID名からIDの確認
         *
         * @return true 存在する
         * @return false 存在しない
         */
        isExist(id) {
            if ('string' == typeof id) {
                return this.findId(id) != null;
            }
            return this.isExist(id.s);
        }
        /**
         * ID名からIDを検索する。
         *
         * @param id ID名
         * @return 登録されているID。なければNULL。
         */
        findId(id) {
            for (let i = 0; i < this._ids.getSize(); ++i) {
                if (this._ids.at(i).getString().isEqual(id)) {
                    return this._ids.at(i);
                }
            }
            return null;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$y;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismIdManager = CubismIdManager;
    })(Live2DCubismFramework$y || (Live2DCubismFramework$y = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * 4x4の行列
     *
     * 4x4行列の便利クラス。
     */
    class CubismMatrix44 {
        /**
         * コンストラクタ
         */
        constructor() {
            this._tr = new Float32Array(16); // 4 * 4のサイズ
            this.loadIdentity();
        }
        /**
         * 受け取った２つの行列の乗算を行う。
         *
         * @param a 行列a
         * @param b 行列b
         * @return 乗算結果の行列
         */
        static multiply(a, b, dst) {
            const c = new Float32Array([
                0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                0.0,
            ]);
            const n = 4;
            for (let i = 0; i < n; ++i) {
                for (let j = 0; j < n; ++j) {
                    for (let k = 0; k < n; ++k) {
                        c[j + i * 4] += a[k + i * 4] * b[j + k * 4];
                    }
                }
            }
            for (let i = 0; i < 16; ++i) {
                dst[i] = c[i];
            }
        }
        /**
         * 単位行列に初期化する
         */
        loadIdentity() {
            const c = new Float32Array([
                1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
                1.0,
            ]);
            this.setMatrix(c);
        }
        /**
         * 行列を設定
         *
         * @param tr 16個の浮動小数点数で表される4x4の行列
         */
        setMatrix(tr) {
            for (let i = 0; i < 16; ++i) {
                this._tr[i] = tr[i];
            }
        }
        /**
         * 行列を浮動小数点数の配列で取得
         *
         * @return 16個の浮動小数点数で表される4x4の行列
         */
        getArray() {
            return this._tr;
        }
        /**
         * X軸の拡大率を取得
         * @return X軸の拡大率
         */
        getScaleX() {
            return this._tr[0];
        }
        /**
         * Y軸の拡大率を取得する
         *
         * @return Y軸の拡大率
         */
        getScaleY() {
            return this._tr[5];
        }
        /**
         * X軸の移動量を取得
         * @return X軸の移動量
         */
        getTranslateX() {
            return this._tr[12];
        }
        /**
         * Y軸の移動量を取得
         * @return Y軸の移動量
         */
        getTranslateY() {
            return this._tr[13];
        }
        /**
         * X軸の値を現在の行列で計算
         *
         * @param src X軸の値
         * @return 現在の行列で計算されたX軸の値
         */
        transformX(src) {
            return this._tr[0] * src + this._tr[12];
        }
        /**
         * Y軸の値を現在の行列で計算
         *
         * @param src Y軸の値
         * @return 現在の行列で計算されたY軸の値
         */
        transformY(src) {
            return this._tr[5] * src + this._tr[13];
        }
        /**
         * X軸の値を現在の行列で逆計算
         */
        invertTransformX(src) {
            return (src - this._tr[12]) / this._tr[0];
        }
        /**
         * Y軸の値を現在の行列で逆計算
         */
        invertTransformY(src) {
            return (src - this._tr[13]) / this._tr[5];
        }
        /**
         * 現在の行列の位置を起点にして移動
         *
         * 現在の行列の位置を起点にして相対的に移動する。
         *
         * @param x X軸の移動量
         * @param y Y軸の移動量
         */
        translateRelative(x, y) {
            const tr1 = new Float32Array([
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                x,
                y,
                0.0,
                1.0,
            ]);
            CubismMatrix44.multiply(tr1, this._tr, this._tr);
        }
        /**
         * 現在の行列の位置を移動
         *
         * 現在の行列の位置を指定した位置へ移動する
         *
         * @param x X軸の移動量
         * @param y y軸の移動量
         */
        translate(x, y) {
            this._tr[12] = x;
            this._tr[13] = y;
        }
        /**
         * 現在の行列のX軸の位置を指定した位置へ移動する
         *
         * @param x X軸の移動量
         */
        translateX(x) {
            this._tr[12] = x;
        }
        /**
         * 現在の行列のY軸の位置を指定した位置へ移動する
         *
         * @param y Y軸の移動量
         */
        translateY(y) {
            this._tr[13] = y;
        }
        /**
         * 現在の行列の拡大率を相対的に設定する
         *
         * @param x X軸の拡大率
         * @param y Y軸の拡大率
         */
        scaleRelative(x, y) {
            const tr1 = new Float32Array([
                x,
                0.0,
                0.0,
                0.0,
                0.0,
                y,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
            ]);
            CubismMatrix44.multiply(tr1, this._tr, this._tr);
        }
        /**
         * 現在の行列の拡大率を指定した倍率に設定する
         *
         * @param x X軸の拡大率
         * @param y Y軸の拡大率
         */
        scale(x, y) {
            this._tr[0] = x;
            this._tr[5] = y;
        }
        /**
         * 現在の行列に行列を乗算
         *
         * @param m 行列
         */
        multiplyByMatrix(m) {
            CubismMatrix44.multiply(m.getArray(), this._tr, this._tr);
        }
        /**
         * オブジェクトのコピーを生成する
         */
        clone() {
            const cloneMatrix = new CubismMatrix44();
            for (let i = 0; i < this._tr.length; i++) {
                cloneMatrix._tr[i] = this._tr[i];
            }
            return cloneMatrix;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$x;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismMatrix44 = CubismMatrix44;
    })(Live2DCubismFramework$x || (Live2DCubismFramework$x = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * モデル描画を処理するレンダラ
     *
     * サブクラスに環境依存の描画命令を記述する。
     */
    class CubismRenderer {
        /**
         * レンダラのインスタンスを生成して取得する
         *
         * @return レンダラのインスタンス
         */
        static create() {
            return null;
        }
        /**
         * レンダラのインスタンスを解放する
         */
        static delete(renderer) {
        }
        /**
         * レンダラの初期化処理を実行する
         * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
         * @param model モデルのインスタンス
         */
        initialize(model) {
            this._model = model;
        }
        /**
         * モデルを描画する
         */
        drawModel() {
            if (this.getModel() == null)
                return;
            this.saveProfile();
            this.doDrawModel();
            this.restoreProfile();
        }
        /**
         * Model-View-Projection 行列をセットする
         * 配列は複製されるので、元の配列は外で破棄して良い
         * @param matrix44 Model-View-Projection 行列
         */
        setMvpMatrix(matrix44) {
            this._mvpMatrix4x4.setMatrix(matrix44.getArray());
        }
        /**
         * Model-View-Projection 行列を取得する
         * @return Model-View-Projection 行列
         */
        getMvpMatrix() {
            return this._mvpMatrix4x4;
        }
        /**
         * モデルの色をセットする
         * 各色0.0~1.0の間で指定する（1.0が標準の状態）
         * @param red 赤チャンネルの値
         * @param green 緑チャンネルの値
         * @param blue 青チャンネルの値
         * @param alpha αチャンネルの値
         */
        setModelColor(red, green, blue, alpha) {
            if (red < 0.0) {
                red = 0.0;
            }
            else if (red > 1.0) {
                red = 1.0;
            }
            if (green < 0.0) {
                green = 0.0;
            }
            else if (green > 1.0) {
                green = 1.0;
            }
            if (blue < 0.0) {
                blue = 0.0;
            }
            else if (blue > 1.0) {
                blue = 1.0;
            }
            if (alpha < 0.0) {
                alpha = 0.0;
            }
            else if (alpha > 1.0) {
                alpha = 1.0;
            }
            this._modelColor.R = red;
            this._modelColor.G = green;
            this._modelColor.B = blue;
            this._modelColor.A = alpha;
        }
        /**
         * モデルの色を取得する
         * 各色0.0~1.0の間で指定する(1.0が標準の状態)
         *
         * @return RGBAのカラー情報
         */
        getModelColor() {
            return JSON.parse(JSON.stringify(this._modelColor));
        }
        /**
         * 乗算済みαの有効・無効をセットする
         * 有効にするならtrue、無効にするならfalseをセットする
         */
        setIsPremultipliedAlpha(enable) {
            this._isPremultipliedAlpha = enable;
        }
        /**
         * 乗算済みαの有効・無効を取得する
         * @return true 乗算済みのα有効
         * @return false 乗算済みのα無効
         */
        isPremultipliedAlpha() {
            return this._isPremultipliedAlpha;
        }
        /**
         * カリング（片面描画）の有効・無効をセットする。
         * 有効にするならtrue、無効にするならfalseをセットする
         */
        setIsCulling(culling) {
            this._isCulling = culling;
        }
        /**
         * カリング（片面描画）の有効・無効を取得する。
         * @return true カリング有効
         * @return false カリング無効
         */
        isCulling() {
            return this._isCulling;
        }
        /**
         * テクスチャの異方性フィルタリングのパラメータをセットする
         * パラメータ値の影響度はレンダラの実装に依存する
         * @param n パラメータの値
         */
        setAnisotropy(n) {
            this._anisotropy = n;
        }
        /**
         * テクスチャの異方性フィルタリングのパラメータをセットする
         * @return 異方性フィルタリングのパラメータ
         */
        getAnisotropy() {
            return this._anisotropy;
        }
        /**
         * レンダリングするモデルを取得する
         * @return レンダリングするモデル
         */
        getModel() {
            return this._model;
        }
        /**
         * マスク描画の方式を変更する。
         * falseの場合、マスクを1枚のテクスチャに分割してレンダリングする（デフォルト）
         * 高速だが、マスク個数の上限が36に限定され、質も荒くなる
         * trueの場合、パーツ描画の前にその都度必要なマスクを描き直す
         * レンダリング品質は高いが描画処理負荷は増す
         * @param high 高精細マスクに切り替えるか？
         */
        useHighPrecisionMask(high) {
            this._useHighPrecisionMask = high;
        }
        /**
         * マスクの描画方式を取得する
         * @return true 高精細方式
         * @return false デフォルト
         */
        isUsingHighPrecisionMask() {
            return this._useHighPrecisionMask;
        }
        /**
         * コンストラクタ
         */
        constructor() {
            this._isCulling = false;
            this._isPremultipliedAlpha = false;
            this._anisotropy = 0.0;
            this._model = null;
            this._modelColor = new CubismTextureColor();
            this._useHighPrecisionMask = false;
            // 単位行列に初期化
            this._mvpMatrix4x4 = new CubismMatrix44();
            this._mvpMatrix4x4.loadIdentity();
        }
    }
    var CubismBlendMode;
    (function (CubismBlendMode) {
        CubismBlendMode[CubismBlendMode["CubismBlendMode_Normal"] = 0] = "CubismBlendMode_Normal";
        CubismBlendMode[CubismBlendMode["CubismBlendMode_Additive"] = 1] = "CubismBlendMode_Additive";
        CubismBlendMode[CubismBlendMode["CubismBlendMode_Multiplicative"] = 2] = "CubismBlendMode_Multiplicative";
    })(CubismBlendMode || (CubismBlendMode = {}));
    /**
     * テクスチャの色をRGBAで扱うためのクラス
     */
    class CubismTextureColor {
        /**
         * コンストラクタ
         */
        constructor(r = 1.0, g = 1.0, b = 1.0, a = 1.0) {
            this.R = r;
            this.G = g;
            this.B = b;
            this.A = a;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$w;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismBlendMode = CubismBlendMode;
        Live2DCubismFramework.CubismRenderer = CubismRenderer;
        Live2DCubismFramework.CubismTextureColor = CubismTextureColor;
    })(Live2DCubismFramework$w || (Live2DCubismFramework$w = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * CubismJsonで実装されているJsonパーサを使用せず、
     * TypeScript標準のJsonパーサなどを使用し出力された結果を
     * Cubism SDKで定義されているJSONエレメントの要素に
     * 置き換える処理をするクラス。
     */
    class CubismJsonExtension {
        static parseJsonObject(obj, map) {
            Object.keys(obj).forEach((key) => {
                if (typeof obj[key] == 'boolean') {
                    const convValue = Boolean(obj[key]);
                    map.put(key, new JsonBoolean(convValue));
                }
                else if (typeof obj[key] == 'string') {
                    const convValue = String(obj[key]);
                    map.put(key, new JsonString(convValue));
                }
                else if (typeof obj[key] == 'number') {
                    const convValue = Number(obj[key]);
                    map.put(key, new JsonFloat(convValue));
                }
                else if (obj[key] instanceof Array) {
                    map.put(key, CubismJsonExtension.parseJsonArray(obj[key]));
                }
                else if (obj[key] instanceof Object) {
                    map.put(key, CubismJsonExtension.parseJsonObject(obj[key], new JsonMap()));
                }
                else if (obj[key] == null) {
                    map.put(key, new JsonNullvalue());
                }
                else {
                    // どれにも当てはまらない場合でも処理する
                    map.put(key, obj[key]);
                }
            });
            return map;
        }
        static parseJsonArray(obj) {
            const arr = new JsonArray();
            Object.keys(obj).forEach((key) => {
                const convKey = Number(key);
                if (typeof convKey == 'number') {
                    if (typeof obj[key] == 'boolean') {
                        const convValue = Boolean(obj[key]);
                        arr.add(new JsonBoolean(convValue));
                    }
                    else if (typeof obj[key] == 'string') {
                        const convValue = String(obj[key]);
                        arr.add(new JsonString(convValue));
                    }
                    else if (typeof obj[key] == 'number') {
                        const convValue = Number(obj[key]);
                        arr.add(new JsonFloat(convValue));
                    }
                    else if (obj[key] instanceof Array) {
                        arr.add(this.parseJsonArray(obj[key]));
                    }
                    else if (obj[key] instanceof Object) {
                        arr.add(this.parseJsonObject(obj[key], new JsonMap()));
                    }
                    else if (obj[key] == null) {
                        arr.add(new JsonNullvalue());
                    }
                    else {
                        // どれにも当てはまらない場合でも処理する
                        arr.add(obj[key]);
                    }
                }
                else if (obj[key] instanceof Array) {
                    arr.add(this.parseJsonArray(obj[key]));
                }
                else if (obj[key] instanceof Object) {
                    arr.add(this.parseJsonObject(obj[key], new JsonMap()));
                }
                else if (obj[key] == null) {
                    arr.add(new JsonNullvalue());
                }
                else {
                    const convValue = Array(obj[key]);
                    // 配列ともObjectとも判定できなかった場合でも処理する
                    for (let i = 0; i < convValue.length; i++) {
                        arr.add(convValue[i]);
                    }
                }
            });
            return arr;
        }
    }

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    // StaticInitializeNotForClientCall()で初期化する
    const CSM_JSON_ERROR_TYPE_MISMATCH = 'Error: type mismatch';
    const CSM_JSON_ERROR_INDEX_OF_BOUNDS = 'Error: index out of bounds';
    /**
     * パースしたJSONエレメントの要素の基底クラス。
     */
    let Value$2 = class Value {
        /**
         * コンストラクタ
         */
        constructor() { }
        /**
         * 要素を文字列型で返す(string)
         */
        getRawString(defaultValue, indent) {
            return this.getString(defaultValue, indent);
        }
        /**
         * 要素を数値型で返す(number)
         */
        toInt(defaultValue = 0) {
            return defaultValue;
        }
        /**
         * 要素を数値型で返す(number)
         */
        toFloat(defaultValue = 0) {
            return defaultValue;
        }
        /**
         * 要素を真偽値で返す(boolean)
         */
        toBoolean(defaultValue = false) {
            return defaultValue;
        }
        /**
         * サイズを返す
         */
        getSize() {
            return 0;
        }
        /**
         * 要素を配列で返す(Value[])
         */
        getArray(defaultValue = null) {
            return defaultValue;
        }
        /**
         * 要素をコンテナで返す(array)
         */
        getVector(defaultValue = new csmVector()) {
            return defaultValue;
        }
        /**
         * 要素をマップで返す(csmMap<csmString, Value>)
         */
        getMap(defaultValue) {
            return defaultValue;
        }
        /**
         * 添字演算子[index]
         */
        getValueByIndex(index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }
        /**
         * 添字演算子[string | csmString]
         */
        getValueByString(s) {
            return Value.nullValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }
        /**
         * マップのキー一覧をコンテナで返す
         *
         * @return マップのキーの一覧
         */
        getKeys() {
            return Value.s_dummyKeys;
        }
        /**
         * Valueの種類がエラー値ならtrue
         */
        isError() {
            return false;
        }
        /**
         * Valueの種類がnullならtrue
         */
        isNull() {
            return false;
        }
        /**
         * Valueの種類が真偽値ならtrue
         */
        isBool() {
            return false;
        }
        /**
         * Valueの種類が数値型ならtrue
         */
        isFloat() {
            return false;
        }
        /**
         * Valueの種類が文字列ならtrue
         */
        isString() {
            return false;
        }
        /**
         * Valueの種類が配列ならtrue
         */
        isArray() {
            return false;
        }
        /**
         * Valueの種類がマップ型ならtrue
         */
        isMap() {
            return false;
        }
        equals(value) {
            return false;
        }
        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        isStatic() {
            return false;
        }
        /**
         * Valueにエラー値をセットする
         */
        setErrorNotForClientCall(errorStr) {
            return JsonError.errorValue;
        }
        /**
         * 初期化用メソッド
         */
        static staticInitializeNotForClientCall() {
            JsonBoolean.trueValue = new JsonBoolean(true);
            JsonBoolean.falseValue = new JsonBoolean(false);
            Value.errorValue = new JsonError('ERROR', true);
            Value.nullValue = new JsonNullvalue();
            Value.s_dummyKeys = new csmVector();
        }
        /**
         * リリース用メソッド
         */
        static staticReleaseNotForClientCall() {
            JsonBoolean.trueValue = null;
            JsonBoolean.falseValue = null;
            Value.errorValue = null;
            Value.nullValue = null;
            Value.s_dummyKeys = null;
        }
    };
    /**
     * Ascii文字のみ対応した最小限の軽量JSONパーサ。
     * 仕様はJSONのサブセットとなる。
     * 設定ファイル(model3.json)などのロード用
     *
     * [未対応項目]
     * ・日本語などの非ASCII文字
     * ・eによる指数表現
     */
    class CubismJson {
        /**
         * コンストラクタ
         */
        constructor(buffer, length) {
            this._parseCallback = CubismJsonExtension.parseJsonObject; // パース時に使う処理のコールバック関数
            this._error = null;
            this._lineCount = 0;
            this._root = null;
            if (buffer != undefined) {
                this.parseBytes(buffer, length, this._parseCallback);
            }
        }
        /**
         * バイトデータから直接ロードしてパースする
         *
         * @param buffer バッファ
         * @param size バッファサイズ
         * @return CubismJsonクラスのインスタンス。失敗したらNULL
         */
        static create(buffer, size) {
            const json = new CubismJson();
            const succeeded = json.parseBytes(buffer, size, json._parseCallback);
            if (!succeeded) {
                CubismJson.delete(json);
                return null;
            }
            else {
                return json;
            }
        }
        /**
         * パースしたJSONオブジェクトの解放処理
         *
         * @param instance CubismJsonクラスのインスタンス
         */
        static delete(instance) {
        }
        /**
         * パースしたJSONのルート要素を返す
         */
        getRoot() {
            return this._root;
        }
        /**
         *  UnicodeのバイナリをStringに変換
         *
         * @param buffer 変換するバイナリデータ
         * @return 変換後の文字列
         */
        static arrayBufferToString(buffer) {
            const uint8Array = new Uint8Array(buffer);
            let str = '';
            for (let i = 0, len = uint8Array.length; i < len; ++i) {
                str += '%' + this.pad(uint8Array[i].toString(16));
            }
            str = decodeURIComponent(str);
            return str;
        }
        /**
         * エンコード、パディング
         */
        static pad(n) {
            return n.length < 2 ? '0' + n : n;
        }
        /**
         * JSONのパースを実行する
         * @param buffer    パース対象のデータバイト
         * @param size      データバイトのサイズ
         * return true : 成功
         * return false: 失敗
         */
        parseBytes(buffer, size, parseCallback) {
            const endPos = new Array(1); // 参照渡しにするため配列
            const decodeBuffer = CubismJson.arrayBufferToString(buffer);
            if (parseCallback == undefined) {
                this._root = this.parseValue(decodeBuffer, size, 0, endPos);
            }
            else {
                // TypeScript標準のJSONパーサを使う
                this._root = parseCallback(JSON.parse(decodeBuffer), new JsonMap());
            }
            if (this._error) {
                let strbuf = '\0';
                strbuf = 'Json parse error : @line ' + (this._lineCount + 1) + '\n';
                this._root = new JsonString(strbuf);
                CubismLogInfo('{0}', this._root.getRawString());
                return false;
            }
            else if (this._root == null) {
                this._root = new JsonError(new csmString(this._error), false); // rootは解放されるのでエラーオブジェクトを別途作成する
                return false;
            }
            return true;
        }
        /**
         * パース時のエラー値を返す
         */
        getParseError() {
            return this._error;
        }
        /**
         * ルート要素の次の要素がファイルの終端だったらtrueを返す
         */
        checkEndOfFile() {
            return this._root.getArray()[1].equals('EOF');
        }
        /**
         * JSONエレメントからValue(float,String,Value*,Array,null,true,false)をパースする
         * エレメントの書式に応じて内部でParseString(), ParseObject(), ParseArray()を呼ぶ
         *
         * @param   buffer      JSONエレメントのバッファ
         * @param   length      パースする長さ
         * @param   begin       パースを開始する位置
         * @param   outEndPos   パース終了時の位置
         * @return      パースから取得したValueオブジェクト
         */
        parseValue(buffer, length, begin, outEndPos) {
            if (this._error)
                return null;
            let o = null;
            let i = begin;
            let f;
            for (; i < length; i++) {
                const c = buffer[i];
                switch (c) {
                    case '-':
                    case '.':
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9': {
                        const afterString = new Array(1); // 参照渡しにするため
                        f = strtod(buffer.slice(i), afterString);
                        outEndPos[0] = buffer.indexOf(afterString[0]);
                        return new JsonFloat(f);
                    }
                    case '"':
                        return new JsonString(this.parseString(buffer, length, i + 1, outEndPos)); // \"の次の文字から
                    case '[':
                        o = this.parseArray(buffer, length, i + 1, outEndPos);
                        return o;
                    case '{':
                        o = this.parseObject(buffer, length, i + 1, outEndPos);
                        return o;
                    case 'n': // null以外にない
                        if (i + 3 < length) {
                            o = new JsonNullvalue(); // 解放できるようにする
                            outEndPos[0] = i + 4;
                        }
                        else {
                            this._error = 'parse null';
                        }
                        return o;
                    case 't': // true以外にない
                        if (i + 3 < length) {
                            o = JsonBoolean.trueValue;
                            outEndPos[0] = i + 4;
                        }
                        else {
                            this._error = 'parse true';
                        }
                        return o;
                    case 'f': // false以外にない
                        if (i + 4 < length) {
                            o = JsonBoolean.falseValue;
                            outEndPos[0] = i + 5;
                        }
                        else {
                            this._error = "illegal ',' position";
                        }
                        return o;
                    case ',': // Array separator
                        this._error = "illegal ',' position";
                        return null;
                    case ']': // 不正な｝だがスキップする。配列の最後に不要な , があると思われる
                        outEndPos[0] = i; // 同じ文字を再処理
                        return null;
                    case '\n':
                        this._lineCount++;
                }
            }
            this._error = 'illegal end of value';
            return null;
        }
        /**
         * 次の「"」までの文字列をパースする。
         *
         * @param   string  ->  パース対象の文字列
         * @param   length  ->  パースする長さ
         * @param   begin   ->  パースを開始する位置
         * @param  outEndPos   ->  パース終了時の位置
         * @return      パースした文F字列要素
         */
        parseString(string, length, begin, outEndPos) {
            if (this._error)
                return null;
            let i = begin;
            let c, c2;
            const ret = new csmString('');
            let bufStart = begin; // sbufに登録されていない文字の開始位置
            for (; i < length; i++) {
                c = string[i];
                switch (c) {
                    case '"': {
                        // 終端の”、エスケープ文字は別に処理されるのでここに来ない
                        outEndPos[0] = i + 1; // ”の次の文字
                        ret.append(string.slice(bufStart), i - bufStart); // 前の文字までを登録する
                        return ret.s;
                    }
                    case '//': {
                        // エスケープの場合
                        i++; // ２文字をセットで扱う
                        if (i - 1 > bufStart) {
                            ret.append(string.slice(bufStart), i - bufStart); // 前の文字までを登録する
                        }
                        bufStart = i + 1; // エスケープ（２文字)の次の文字から
                        if (i < length) {
                            c2 = string[i];
                            switch (c2) {
                                case '\\':
                                    ret.expansion(1, '\\');
                                    break;
                                case '"':
                                    ret.expansion(1, '"');
                                    break;
                                case '/':
                                    ret.expansion(1, '/');
                                    break;
                                case 'b':
                                    ret.expansion(1, '\b');
                                    break;
                                case 'f':
                                    ret.expansion(1, '\f');
                                    break;
                                case 'n':
                                    ret.expansion(1, '\n');
                                    break;
                                case 'r':
                                    ret.expansion(1, '\r');
                                    break;
                                case 't':
                                    ret.expansion(1, '\t');
                                    break;
                                case 'u':
                                    this._error = 'parse string/unicord escape not supported';
                                    break;
                            }
                        }
                        else {
                            this._error = 'parse string/escape error';
                        }
                    }
                }
            }
            this._error = 'parse string/illegal end';
            return null;
        }
        /**
         * JSONのオブジェクトエレメントをパースしてValueオブジェクトを返す
         *
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        parseObject(buffer, length, begin, outEndPos) {
            if (this._error)
                return null;
            const ret = new JsonMap();
            // Key: Value
            let key = '';
            let i = begin;
            let c = '';
            const localRetEndPos2 = Array(1);
            let ok = false;
            // , が続く限りループ
            for (; i < length; i++) {
                FOR_LOOP: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case '"':
                            key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                            if (this._error) {
                                return null;
                            }
                            i = localRetEndPos2[0];
                            ok = true;
                            break FOR_LOOP; //-- loopから出る
                        case '}': // 閉じカッコ
                            outEndPos[0] = i + 1;
                            return ret; // 空
                        case ':':
                            this._error = "illegal ':' position";
                            break;
                        case '\n':
                            this._lineCount++;
                    }
                }
                if (!ok) {
                    this._error = 'key not found';
                    return null;
                }
                ok = false;
                // : をチェック
                FOR_LOOP2: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case ':':
                            ok = true;
                            i++;
                            break FOR_LOOP2;
                        case '}':
                            this._error = "illegal '}' position";
                            break;
                        case '\n':
                            this._lineCount++;
                    }
                }
                if (!ok) {
                    this._error = "':' not found";
                    return null;
                }
                // 値をチェック
                const value = this.parseValue(buffer, length, i, localRetEndPos2);
                if (this._error) {
                    return null;
                }
                i = localRetEndPos2[0];
                // ret.put(key, value);
                ret.put(key, value);
                FOR_LOOP3: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case ',':
                            break FOR_LOOP3;
                        case '}':
                            outEndPos[0] = i + 1;
                            return ret; // 正常終了
                        case '\n':
                            this._lineCount++;
                    }
                }
            }
            this._error = 'illegal end of perseObject';
            return null;
        }
        /**
         * 次の「"」までの文字列をパースする。
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        parseArray(buffer, length, begin, outEndPos) {
            if (this._error)
                return null;
            let ret = new JsonArray();
            // key : value
            let i = begin;
            let c;
            const localRetEndpos2 = new Array(1);
            // , が続く限りループ
            for (; i < length; i++) {
                // : をチェック
                const value = this.parseValue(buffer, length, i, localRetEndpos2);
                if (this._error) {
                    return null;
                }
                i = localRetEndpos2[0];
                if (value) {
                    ret.add(value);
                }
                // FOR_LOOP3:
                // boolean breakflag = false;
                FOR_LOOP: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case ',':
                            // breakflag = true;
                            // break; // 次のKEY, VAlUEへ
                            break FOR_LOOP;
                        case ']':
                            outEndPos[0] = i + 1;
                            return ret; // 終了
                        case '\n':
                            ++this._lineCount;
                    }
                }
            }
            ret = void 0;
            this._error = 'illegal end of parseObject';
            return null;
        }
    }
    /**
     * パースしたJSONの要素をfloat値として扱う
     */
    class JsonFloat extends Value$2 {
        /**
         * コンストラクタ
         */
        constructor(v) {
            super();
            this._value = v;
        }
        /**
         * Valueの種類が数値型ならtrue
         */
        isFloat() {
            return true;
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
            const strbuf = '\0';
            this._value = parseFloat(strbuf);
            this._stringBuffer = strbuf;
            return this._stringBuffer;
        }
        /**
         * 要素を数値型で返す(number)
         */
        toInt(defaultValue = 0) {
            return parseInt(this._value.toString());
        }
        /**
         * 要素を数値型で返す(number)
         */
        toFloat(defaultValue = 0.0) {
            return this._value;
        }
        equals(value) {
            if ('number' === typeof value) {
                // int
                if (Math.round(value)) {
                    return false;
                }
                // float
                else {
                    return value == this._value;
                }
            }
            return false;
        }
    }
    /**
     * パースしたJSONの要素を真偽値として扱う
     */
    class JsonBoolean extends Value$2 {
        /**
         * Valueの種類が真偽値ならtrue
         */
        isBool() {
            return true;
        }
        /**
         * 要素を真偽値で返す(boolean)
         */
        toBoolean(defaultValue = false) {
            return this._boolValue;
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
            this._stringBuffer = this._boolValue ? 'true' : 'false';
            return this._stringBuffer;
        }
        equals(value) {
            if ('boolean' === typeof value) {
                return value == this._boolValue;
            }
            return false;
        }
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        isStatic() {
            return true;
        }
        /**
         * 引数付きコンストラクタ
         */
        constructor(v) {
            super();
            this._boolValue = v;
        }
    }
    /**
     * パースしたJSONの要素を文字列として扱う
     */
    class JsonString extends Value$2 {
        constructor(s) {
            super();
            if ('string' === typeof s) {
                this._stringBuffer = s;
            }
            if (s instanceof csmString) {
                this._stringBuffer = s.s;
            }
        }
        /**
         * Valueの種類が文字列ならtrue
         */
        isString() {
            return true;
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
            return this._stringBuffer;
        }
        equals(value) {
            if ('string' === typeof value) {
                return this._stringBuffer == value;
            }
            if (value instanceof csmString) {
                return this._stringBuffer == value.s;
            }
            return false;
        }
    }
    /**
     * JSONパース時のエラー結果。文字列型のようにふるまう
     */
    class JsonError extends JsonString {
        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        isStatic() {
            return this._isStatic;
        }
        /**
         * エラー情報をセットする
         */
        setErrorNotForClientCall(s) {
            this._stringBuffer = s;
            return this;
        }
        /**
         * 引数付きコンストラクタ
         */
        constructor(s, isStatic) {
            if ('string' === typeof s) {
                super(s);
            }
            else {
                super(s);
            }
            this._isStatic = isStatic;
        }
        /**
         * Valueの種類がエラー値ならtrue
         */
        isError() {
            return true;
        }
    }
    /**
     * パースしたJSONの要素をNULL値として持つ
     */
    class JsonNullvalue extends Value$2 {
        /**
         * Valueの種類がNULL値ならtrue
         */
        isNull() {
            return true;
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
            return this._stringBuffer;
        }
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        isStatic() {
            return true;
        }
        /**
         * Valueにエラー値をセットする
         */
        setErrorNotForClientCall(s) {
            this._stringBuffer = s;
            return JsonError.nullValue;
        }
        /**
         * コンストラクタ
         */
        constructor() {
            super();
            this._stringBuffer = 'NullValue';
        }
    }
    /**
     * パースしたJSONの要素を配列として持つ
     */
    class JsonArray extends Value$2 {
        /**
         * コンストラクタ
         */
        constructor() {
            super();
            this._array = new csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            for (let ite = this._array.begin(); ite.notEqual(this._array.end()); ite.preIncrement()) {
                let v = ite.ptr();
                if (v && !v.isStatic()) {
                    v = void 0;
                    v = null;
                }
            }
        }
        /**
         * Valueの種類が配列ならtrue
         */
        isArray() {
            return true;
        }
        /**
         * 添字演算子[index]
         */
        getValueByIndex(index) {
            if (index < 0 || this._array.getSize() <= index) {
                return Value$2.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_INDEX_OF_BOUNDS);
            }
            const v = this._array.at(index);
            if (v == null) {
                return Value$2.nullValue;
            }
            return v;
        }
        /**
         * 添字演算子[string | csmString]
         */
        getValueByString(s) {
            return Value$2.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
            const stringBuffer = indent + '[\n';
            for (let ite = this._array.begin(); ite.notEqual(this._array.end()); ite.increment()) {
                const v = ite.ptr();
                this._stringBuffer += indent + '' + v.getString(indent + ' ') + '\n';
            }
            this._stringBuffer = stringBuffer + indent + ']\n';
            return this._stringBuffer;
        }
        /**
         * 配列要素を追加する
         * @param v 追加する要素
         */
        add(v) {
            this._array.pushBack(v);
        }
        /**
         * 要素をコンテナで返す(csmVector<Value>)
         */
        getVector(defaultValue = null) {
            return this._array;
        }
        /**
         * 要素の数を返す
         */
        getSize() {
            return this._array.getSize();
        }
    }
    /**
     * パースしたJSONの要素をマップとして持つ
     */
    class JsonMap extends Value$2 {
        /**
         * コンストラクタ
         */
        constructor() {
            super();
            this._map = new csmMap();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            const ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                let v = ite.ptr().second;
                if (v && !v.isStatic()) {
                    v = void 0;
                    v = null;
                }
                ite.preIncrement();
            }
        }
        /**
         * Valueの値がMap型ならtrue
         */
        isMap() {
            return true;
        }
        /**
         * 添字演算子[string | csmString]
         */
        getValueByString(s) {
            if (s instanceof csmString) {
                const ret = this._map.getValue(s.s);
                if (ret == null) {
                    return Value$2.nullValue;
                }
                return ret;
            }
            for (let iter = this._map.begin(); iter.notEqual(this._map.end()); iter.preIncrement()) {
                if (iter.ptr().first == s) {
                    if (iter.ptr().second == null) {
                        return Value$2.nullValue;
                    }
                    return iter.ptr().second;
                }
            }
            return Value$2.nullValue;
        }
        /**
         * 添字演算子[index]
         */
        getValueByIndex(index) {
            return Value$2.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
            this._stringBuffer = indent + '{\n';
            const ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                const key = ite.ptr().first;
                const v = ite.ptr().second;
                this._stringBuffer +=
                    indent + ' ' + key + ' : ' + v.getString(indent + '   ') + ' \n';
                ite.preIncrement();
            }
            this._stringBuffer += indent + '}\n';
            return this._stringBuffer;
        }
        /**
         * 要素をMap型で返す
         */
        getMap(defaultValue) {
            return this._map;
        }
        /**
         * Mapに要素を追加する
         */
        put(key, v) {
            this._map.setValue(key, v);
        }
        /**
         * Mapからキーのリストを取得する
         */
        getKeys() {
            if (!this._keys) {
                this._keys = new csmVector();
                const ite = this._map.begin();
                while (ite.notEqual(this._map.end())) {
                    const key = ite.ptr().first;
                    this._keys.pushBack(key);
                    ite.preIncrement();
                }
            }
            return this._keys;
        }
        /**
         * Mapの要素数を取得する
         */
        getSize() {
            return this._keys.getSize();
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$v;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismJson = CubismJson;
        Live2DCubismFramework.JsonArray = JsonArray;
        Live2DCubismFramework.JsonBoolean = JsonBoolean;
        Live2DCubismFramework.JsonError = JsonError;
        Live2DCubismFramework.JsonFloat = JsonFloat;
        Live2DCubismFramework.JsonMap = JsonMap;
        Live2DCubismFramework.JsonNullvalue = JsonNullvalue;
        Live2DCubismFramework.JsonString = JsonString;
        Live2DCubismFramework.Value = Value$2;
    })(Live2DCubismFramework$v || (Live2DCubismFramework$v = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    function strtod(s, endPtr) {
        let index = 0;
        for (let i = 1;; i++) {
            const testC = s.slice(i - 1, i);
            // 指数・マイナスの可能性があるのでスキップする
            if (testC == 'e' || testC == '-' || testC == 'E') {
                continue;
            } // 文字列の範囲を広げていく
            const test = s.substring(0, i);
            const number = Number(test);
            if (isNaN(number)) {
                // 数値として認識できなくなったので終了
                break;
            } // 最後に数値としてできたindexを格納しておく
            index = i;
        }
        let d = parseFloat(s); // パースした数値
        if (isNaN(d)) {
            // 数値として認識できなくなったので終了
            d = NaN;
        }
        endPtr[0] = s.slice(index); // 後続の文字列
        return d;
    }
    // ファイルスコープの変数を初期化
    let s_isStarted = false;
    let s_isInitialized = false;
    let s_option = null;
    let s_cubismIdManager = null;
    /**
     * Framework内で使う定数の宣言
     */
    const Constant = Object.freeze({
        vertexOffset: 0, // メッシュ頂点のオフセット値
        vertexStep: 2, // メッシュ頂点のステップ値
    });
    function csmDelete(address) {
        if (!address) {
            return;
        }
        address = void 0;
    }
    /**
     * Live2D Cubism SDK Original Workflow SDKのエントリポイント
     * 利用開始時はCubismFramework.initialize()を呼び、CubismFramework.dispose()で終了する。
     */
    class CubismFramework {
        /**
         * Cubism FrameworkのAPIを使用可能にする。
         *  APIを実行する前に必ずこの関数を実行すること。
         *  一度準備が完了して以降は、再び実行しても内部処理がスキップされます。
         *
         * @param    option      Optionクラスのインスタンス
         *
         * @return   準備処理が完了したらtrueが返ります。
         */
        static startUp(option = null) {
            if (s_isStarted) {
                CubismLogInfo('CubismFramework.startUp() is already done.');
                return s_isStarted;
            }
            s_option = option;
            if (s_option != null) {
                Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
            }
            s_isStarted = true;
            // Live2D Cubism Coreバージョン情報を表示
            if (s_isStarted) {
                const version = Live2DCubismCore.Version.csmGetVersion();
                const major = (version & 0xff000000) >> 24;
                const minor = (version & 0x00ff0000) >> 16;
                const patch = version & 0x0000ffff;
                const versionNumber = version;
                CubismLogInfo(`Live2D Cubism Core version: {0}.{1}.{2} ({3})`, ('00' + major).slice(-2), ('00' + minor).slice(-2), ('0000' + patch).slice(-4), versionNumber);
            }
            CubismLogInfo('CubismFramework.startUp() is complete.');
            return s_isStarted;
        }
        /**
         * StartUp()で初期化したCubismFrameworkの各パラメータをクリアします。
         * Dispose()したCubismFrameworkを再利用する際に利用してください。
         */
        static cleanUp() {
            s_isStarted = false;
            s_isInitialized = false;
            s_option = null;
            s_cubismIdManager = null;
        }
        /**
         * Cubism Framework内のリソースを初期化してモデルを表示可能な状態にします。<br>
         *     再度Initialize()するには先にDispose()を実行する必要があります。
         *
         * @param memorySize 初期化時メモリ量 [byte(s)]
         *    複数モデル表示時などにモデルが更新されない際に使用してください。
         *    指定する際は必ず1024*1024*16 byte(16MB)以上の値を指定してください。
         *    それ以外はすべて1024*1024*16 byteに丸めます。
         */
        static initialize(memorySize = 0) {
            CSM_ASSERT(s_isStarted);
            if (!s_isStarted) {
                CubismLogWarning('CubismFramework is not started.');
                return;
            }
            // --- s_isInitializedによる連続初期化ガード ---
            // 連続してリソース確保が行われないようにする。
            // 再度Initialize()するには先にDispose()を実行する必要がある。
            if (s_isInitialized) {
                CubismLogWarning('CubismFramework.initialize() skipped, already initialized.');
                return;
            }
            //---- static 初期化 ----
            Value$2.staticInitializeNotForClientCall();
            s_cubismIdManager = new CubismIdManager();
            // --- HACK: 初期化時メモリ量の拡張(単位byte) ---
            // 複数モデル表示時などにモデルが更新されない際に使用してください。
            // 指定する際は必ず1024*1024*16 byte(16MB)以上の値を指定してください。
            // それ以外はすべて1024*1024*16 byteに丸めます。
            Live2DCubismCore.Memory.initializeAmountOfMemory(memorySize);
            s_isInitialized = true;
            CubismLogInfo('CubismFramework.initialize() is complete.');
        }
        /**
         * Cubism Framework内の全てのリソースを解放します。
         *      ただし、外部で確保されたリソースについては解放しません。
         *      外部で適切に破棄する必要があります。
         */
        static dispose() {
            CSM_ASSERT(s_isStarted);
            if (!s_isStarted) {
                CubismLogWarning('CubismFramework is not started.');
                return;
            }
            // --- s_isInitializedによる未初期化解放ガード ---
            // dispose()するには先にinitialize()を実行する必要がある。
            if (!s_isInitialized) {
                // false...リソース未確保の場合
                CubismLogWarning('CubismFramework.dispose() skipped, not initialized.');
                return;
            }
            Value$2.staticReleaseNotForClientCall();
            s_cubismIdManager.release();
            s_cubismIdManager = null;
            // レンダラの静的リソース（シェーダプログラム他）を解放する
            CubismRenderer.staticRelease();
            s_isInitialized = false;
            CubismLogInfo('CubismFramework.dispose() is complete.');
        }
        /**
         * Cubism FrameworkのAPIを使用する準備が完了したかどうか
         * @return APIを使用する準備が完了していればtrueが返ります。
         */
        static isStarted() {
            return s_isStarted;
        }
        /**
         * Cubism Frameworkのリソース初期化がすでに行われているかどうか
         * @return リソース確保が完了していればtrueが返ります
         */
        static isInitialized() {
            return s_isInitialized;
        }
        /**
         * Core APIにバインドしたログ関数を実行する
         *
         * @praram message ログメッセージ
         */
        static coreLogFunction(message) {
            // Return if logging not possible.
            if (!Live2DCubismCore.Logging.csmGetLogFunction()) {
                return;
            }
            Live2DCubismCore.Logging.csmGetLogFunction()(message);
        }
        /**
         * 現在のログ出力レベル設定の値を返す。
         *
         * @return  現在のログ出力レベル設定の値
         */
        static getLoggingLevel() {
            if (s_option != null) {
                return s_option.loggingLevel;
            }
            return LogLevel.LogLevel_Off;
        }
        /**
         * IDマネージャのインスタンスを取得する
         * @return CubismManagerクラスのインスタンス
         */
        static getIdManager() {
            return s_cubismIdManager;
        }
        /**
         * 静的クラスとして使用する
         * インスタンス化させない
         */
        constructor() { }
    }
    class Option {
    }
    /**
     * ログ出力のレベル
     */
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["LogLevel_Verbose"] = 0] = "LogLevel_Verbose";
        LogLevel[LogLevel["LogLevel_Debug"] = 1] = "LogLevel_Debug";
        LogLevel[LogLevel["LogLevel_Info"] = 2] = "LogLevel_Info";
        LogLevel[LogLevel["LogLevel_Warning"] = 3] = "LogLevel_Warning";
        LogLevel[LogLevel["LogLevel_Error"] = 4] = "LogLevel_Error";
        LogLevel[LogLevel["LogLevel_Off"] = 5] = "LogLevel_Off";
    })(LogLevel || (LogLevel = {}));
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$u;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.Constant = Constant;
        Live2DCubismFramework.csmDelete = csmDelete;
        Live2DCubismFramework.CubismFramework = CubismFramework;
    })(Live2DCubismFramework$u || (Live2DCubismFramework$u = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    const CubismLogPrint = (level, fmt, args) => {
        CubismDebug.print(level, '[CSM]' + fmt, args);
    };
    const CubismLogPrintIn = (level, fmt, args) => {
        CubismLogPrint(level, fmt + '\n', args);
    };
    const CSM_ASSERT = (expr) => {
        console.assert(expr);
    };
    let CubismLogDebug;
    let CubismLogInfo;
    let CubismLogWarning;
    let CubismLogError;
    {
        CubismLogDebug = (fmt, ...args) => {
            CubismLogPrintIn(LogLevel.LogLevel_Debug, '[D]' + fmt, args);
        };
        CubismLogInfo = (fmt, ...args) => {
            CubismLogPrintIn(LogLevel.LogLevel_Info, '[I]' + fmt, args);
        };
        CubismLogWarning = (fmt, ...args) => {
            CubismLogPrintIn(LogLevel.LogLevel_Warning, '[W]' + fmt, args);
        };
        CubismLogError = (fmt, ...args) => {
            CubismLogPrintIn(LogLevel.LogLevel_Error, '[E]' + fmt, args);
        };
    }
    /**
     * デバッグ用のユーティリティクラス。
     * ログの出力、バイトのダンプなど
     */
    class CubismDebug {
        /**
         * ログを出力する。第一引数にログレベルを設定する。
         * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
         *
         * @param logLevel ログレベルの設定
         * @param format 書式付き文字列
         * @param args 可変長引数
         */
        static print(logLevel, format, args) {
            // オプションで設定されたログ出力レベルを下回る場合はログに出さない
            if (logLevel < CubismFramework.getLoggingLevel()) {
                return;
            }
            const logPrint = CubismFramework.coreLogFunction;
            if (!logPrint)
                return;
            const buffer = format.replace(/\{(\d+)\}/g, (m, k) => {
                return args[k];
            });
            logPrint(buffer);
        }
        /**
         * データから指定した長さだけダンプ出力する。
         * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
         *
         * @param logLevel ログレベルの設定
         * @param data ダンプするデータ
         * @param length ダンプする長さ
         */
        static dumpBytes(logLevel, data, length) {
            for (let i = 0; i < length; i++) {
                if (i % 16 == 0 && i > 0)
                    this.print(logLevel, '\n');
                else if (i % 8 == 0 && i > 0)
                    this.print(logLevel, '  ');
                this.print(logLevel, '{0} ', [data[i] & 0xff]);
            }
            this.print(logLevel, '\n');
        }
        /**
         * private コンストラクタ
         */
        constructor() { }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$t;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismDebug = CubismDebug;
    })(Live2DCubismFramework$t || (Live2DCubismFramework$t = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * Key-Valueのペアを定義するクラス
     * csmMapクラスの内部データで使用する。
     */
    class csmPair {
        /**
         * コンストラクタ
         * @param key Keyとしてセットする値
         * @param value Valueとしてセットする値
         */
        constructor(key, value) {
            this.first = key == undefined ? null : key;
            this.second = value == undefined ? null : value;
        }
    }
    /**
     * マップ型
     */
    class csmMap {
        /**
         * 引数付きコンストラクタ
         * @param size 初期化時点で確保するサイズ
         */
        constructor(size) {
            if (size != undefined) {
                if (size < 1) {
                    this._keyValues = [];
                    this._dummyValue = null;
                    this._size = 0;
                }
                else {
                    this._keyValues = new Array(size);
                    this._size = size;
                }
            }
            else {
                this._keyValues = [];
                this._dummyValue = null;
                this._size = 0;
            }
        }
        /**
         * デストラクタ
         */
        release() {
            this.clear();
        }
        /**
         * キーを追加する
         * @param key 新たに追加するキー
         */
        appendKey(key) {
            // 新しくKey/Valueのペアを作る
            this.prepareCapacity(this._size + 1, false); // 1つ以上入る隙間を作る
            // 新しいkey/valueのインデックスは_size
            this._keyValues[this._size] = new csmPair(key);
            this._size += 1;
        }
        /**
         * 添字演算子[key]のオーバーロード(get)
         * @param key 添字から特定されるValue値
         */
        getValue(key) {
            let found = -1;
            for (let i = 0; i < this._size; i++) {
                if (this._keyValues[i].first == key) {
                    found = i;
                    break;
                }
            }
            if (found >= 0) {
                return this._keyValues[found].second;
            }
            else {
                this.appendKey(key); // 新規キーを追加
                return this._keyValues[this._size - 1].second;
            }
        }
        /**
         * 添字演算子[key]のオーバーロード(set)
         * @param key 添字から特定されるValue値
         * @param value 代入するValue値
         */
        setValue(key, value) {
            let found = -1;
            for (let i = 0; i < this._size; i++) {
                if (this._keyValues[i].first == key) {
                    found = i;
                    break;
                }
            }
            if (found >= 0) {
                this._keyValues[found].second = value;
            }
            else {
                this.appendKey(key); // 新規キーを追加
                this._keyValues[this._size - 1].second = value;
            }
        }
        /**
         * 引数で渡したKeyを持つ要素が存在するか
         * @param key 存在を確認するkey
         * @return true 引数で渡したkeyを持つ要素が存在する
         * @return false 引数で渡したkeyを持つ要素が存在しない
         */
        isExist(key) {
            for (let i = 0; i < this._size; i++) {
                if (this._keyValues[i].first == key) {
                    return true;
                }
            }
            return false;
        }
        /**
         * keyValueのポインタを全て解放する
         */
        clear() {
            this._keyValues = void 0;
            this._keyValues = null;
            this._keyValues = [];
            this._size = 0;
        }
        /**
         * コンテナのサイズを取得する
         *
         * @return コンテナのサイズ
         */
        getSize() {
            return this._size;
        }
        /**
         * コンテナのキャパシティを確保する
         * @param newSize 新たなキャパシティ。引数の値が現在のサイズ未満の場合は何もしない。
         * @param fitToSize trueなら指定したサイズに合わせる。falseならサイズを2倍確保しておく。
         */
        prepareCapacity(newSize, fitToSize) {
            if (newSize > this._keyValues.length) {
                if (this._keyValues.length == 0) {
                    if (!fitToSize && newSize < csmMap.DefaultSize)
                        newSize = csmMap.DefaultSize;
                    this._keyValues.length = newSize;
                }
                else {
                    if (!fitToSize && newSize < this._keyValues.length * 2)
                        newSize = this._keyValues.length * 2;
                    this._keyValues.length = newSize;
                }
            }
        }
        /**
         * コンテナの先頭要素を返す
         */
        begin() {
            const ite = new iterator(this, 0);
            return ite;
        }
        /**
         * コンテナの終端要素を返す
         */
        end() {
            const ite = new iterator(this, this._size); // 終了
            return ite;
        }
        /**
         * コンテナから要素を削除する
         *
         * @param ite 削除する要素
         */
        erase(ite) {
            const index = ite._index;
            if (index < 0 || this._size <= index) {
                return ite; // 削除範囲外
            }
            // 削除
            this._keyValues.splice(index, 1);
            --this._size;
            const ite2 = new iterator(this, index); // 終了
            return ite2;
        }
        /**
         * コンテナの値を32ビット符号付き整数型でダンプする
         */
        dumpAsInt() {
            for (let i = 0; i < this._size; i++) {
                CubismLogDebug('{0} ,', this._keyValues[i]);
                CubismLogDebug('\n');
            }
        }
    }
    csmMap.DefaultSize = 10; // コンテナの初期化のデフォルトサイズ
    /**
     * csmMap<T>のイテレータ
     */
    class iterator {
        /**
         * コンストラクタ
         */
        constructor(v, idx) {
            this._map = v != undefined ? v : new csmMap();
            this._index = idx != undefined ? idx : 0;
        }
        /**
         * =演算子のオーバーロード
         */
        set(ite) {
            this._index = ite._index;
            this._map = ite._map;
            return this;
        }
        /**
         * 前置き++演算子のオーバーロード
         */
        preIncrement() {
            ++this._index;
            return this;
        }
        /**
         * 前置き--演算子のオーバーロード
         */
        preDecrement() {
            --this._index;
            return this;
        }
        /**
         * 後置き++演算子のオーバーロード
         */
        increment() {
            const iteold = new iterator(this._map, this._index++); // 古い値を保存
            return iteold;
        }
        /**
         * 後置き--演算子のオーバーロード
         */
        decrement() {
            const iteold = new iterator(this._map, this._index); // 古い値を保存
            this._map = iteold._map;
            this._index = iteold._index;
            return this;
        }
        /**
         * *演算子のオーバーロード
         */
        ptr() {
            return this._map._keyValues[this._index];
        }
        /**
         * !=演算
         */
        notEqual(ite) {
            return this._index != ite._index || this._map != ite._map;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$s;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.csmMap = csmMap;
        Live2DCubismFramework.csmPair = csmPair;
        Live2DCubismFramework.iterator = iterator;
    })(Live2DCubismFramework$s || (Live2DCubismFramework$s = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * 呼吸機能
     *
     * 呼吸機能を提供する。
     */
    class CubismBreath {
        /**
         * インスタンスの作成
         */
        static create() {
            return new CubismBreath();
        }
        /**
         * インスタンスの破棄
         * @param instance 対象のCubismBreath
         */
        static delete(instance) {
        }
        /**
         * 呼吸のパラメータの紐づけ
         * @param breathParameters 呼吸を紐づけたいパラメータのリスト
         */
        setParameters(breathParameters) {
            this._breathParameters = breathParameters;
        }
        /**
         * 呼吸に紐づいているパラメータの取得
         * @return 呼吸に紐づいているパラメータのリスト
         */
        getParameters() {
            return this._breathParameters;
        }
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        updateParameters(model, deltaTimeSeconds) {
            this._currentTime += deltaTimeSeconds;
            const t = this._currentTime * 2.0 * 3.14159;
            for (let i = 0; i < this._breathParameters.getSize(); ++i) {
                const data = this._breathParameters.at(i);
                model.addParameterValueById(data.parameterId, data.offset + data.peak * Math.sin(t / data.cycle), data.weight);
            }
        }
        /**
         * コンストラクタ
         */
        constructor() {
            this._currentTime = 0.0;
        }
    }
    /**
     * 呼吸のパラメータ情報
     */
    class BreathParameterData {
        /**
         * コンストラクタ
         * @param parameterId   呼吸をひもづけるパラメータID
         * @param offset        呼吸を正弦波としたときの、波のオフセット
         * @param peak          呼吸を正弦波としたときの、波の高さ
         * @param cycle         呼吸を正弦波としたときの、波の周期
         * @param weight        パラメータへの重み
         */
        constructor(parameterId, offset, peak, cycle, weight) {
            this.parameterId = parameterId == undefined ? null : parameterId;
            this.offset = offset == undefined ? 0.0 : offset;
            this.peak = peak == undefined ? 0.0 : peak;
            this.cycle = cycle == undefined ? 0.0 : cycle;
            this.weight = weight == undefined ? 0.0 : weight;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$r;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.BreathParameterData = BreathParameterData;
        Live2DCubismFramework.CubismBreath = CubismBreath;
    })(Live2DCubismFramework$r || (Live2DCubismFramework$r = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * 自動まばたき機能
     *
     * 自動まばたき機能を提供する。
     */
    class CubismEyeBlink {
        /**
         * インスタンスを作成する
         * @param modelSetting モデルの設定情報
         * @return 作成されたインスタンス
         * @note 引数がNULLの場合、パラメータIDが設定されていない空のインスタンスを作成する。
         */
        static create(modelSetting = null) {
            return new CubismEyeBlink(modelSetting);
        }
        /**
         * インスタンスの破棄
         * @param eyeBlink 対象のCubismEyeBlink
         */
        static delete(eyeBlink) {
        }
        /**
         * まばたきの間隔の設定
         * @param blinkingInterval まばたきの間隔の時間[秒]
         */
        setBlinkingInterval(blinkingInterval) {
            this._blinkingIntervalSeconds = blinkingInterval;
        }
        /**
         * まばたきのモーションの詳細設定
         * @param closing   まぶたを閉じる動作の所要時間[秒]
         * @param closed    まぶたを閉じている動作の所要時間[秒]
         * @param opening   まぶたを開く動作の所要時間[秒]
         */
        setBlinkingSetting(closing, closed, opening) {
            this._closingSeconds = closing;
            this._closedSeconds = closed;
            this._openingSeconds = opening;
        }
        /**
         * まばたきさせるパラメータIDのリストの設定
         * @param parameterIds パラメータのIDのリスト
         */
        setParameterIds(parameterIds) {
            this._parameterIds = parameterIds;
        }
        /**
         * まばたきさせるパラメータIDのリストの取得
         * @return パラメータIDのリスト
         */
        getParameterIds() {
            return this._parameterIds;
        }
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        updateParameters(model, deltaTimeSeconds) {
            this._userTimeSeconds += deltaTimeSeconds;
            let parameterValue;
            let t = 0.0;
            switch (this._blinkingState) {
                case EyeState.EyeState_Closing:
                    t =
                        (this._userTimeSeconds - this._stateStartTimeSeconds) /
                            this._closingSeconds;
                    if (t >= 1.0) {
                        t = 1.0;
                        this._blinkingState = EyeState.EyeState_Closed;
                        this._stateStartTimeSeconds = this._userTimeSeconds;
                    }
                    parameterValue = 1.0 - t;
                    break;
                case EyeState.EyeState_Closed:
                    t =
                        (this._userTimeSeconds - this._stateStartTimeSeconds) /
                            this._closedSeconds;
                    if (t >= 1.0) {
                        this._blinkingState = EyeState.EyeState_Opening;
                        this._stateStartTimeSeconds = this._userTimeSeconds;
                    }
                    parameterValue = 0.0;
                    break;
                case EyeState.EyeState_Opening:
                    t =
                        (this._userTimeSeconds - this._stateStartTimeSeconds) /
                            this._openingSeconds;
                    if (t >= 1.0) {
                        t = 1.0;
                        this._blinkingState = EyeState.EyeState_Interval;
                        this._nextBlinkingTime = this.determinNextBlinkingTiming();
                    }
                    parameterValue = t;
                    break;
                case EyeState.EyeState_Interval:
                    if (this._nextBlinkingTime < this._userTimeSeconds) {
                        this._blinkingState = EyeState.EyeState_Closing;
                        this._stateStartTimeSeconds = this._userTimeSeconds;
                    }
                    parameterValue = 1.0;
                    break;
                case EyeState.EyeState_First:
                default:
                    this._blinkingState = EyeState.EyeState_Interval;
                    this._nextBlinkingTime = this.determinNextBlinkingTiming();
                    parameterValue = 1.0;
                    break;
            }
            if (!CubismEyeBlink.CloseIfZero) {
                parameterValue = -parameterValue;
            }
            for (let i = 0; i < this._parameterIds.getSize(); ++i) {
                model.setParameterValueById(this._parameterIds.at(i), parameterValue);
            }
        }
        /**
         * コンストラクタ
         * @param modelSetting モデルの設定情報
         */
        constructor(modelSetting) {
            this._blinkingState = EyeState.EyeState_First;
            this._nextBlinkingTime = 0.0;
            this._stateStartTimeSeconds = 0.0;
            this._blinkingIntervalSeconds = 4.0;
            this._closingSeconds = 0.1;
            this._closedSeconds = 0.05;
            this._openingSeconds = 0.15;
            this._userTimeSeconds = 0.0;
            this._parameterIds = new csmVector();
            if (modelSetting == null) {
                return;
            }
            for (let i = 0; i < modelSetting.getEyeBlinkParameterCount(); ++i) {
                this._parameterIds.pushBack(modelSetting.getEyeBlinkParameterId(i));
            }
        }
        /**
         * 次の瞬きのタイミングの決定
         *
         * @return 次のまばたきを行う時刻[秒]
         */
        determinNextBlinkingTiming() {
            const r = Math.random();
            return (this._userTimeSeconds + r * (2.0 * this._blinkingIntervalSeconds - 1.0));
        }
    }
    /**
     * IDで指定された目のパラメータが、0のときに閉じるなら true 、1の時に閉じるなら false 。
     */
    CubismEyeBlink.CloseIfZero = true;
    /**
     * まばたきの状態
     *
     * まばたきの状態を表す列挙型
     */
    var EyeState;
    (function (EyeState) {
        EyeState[EyeState["EyeState_First"] = 0] = "EyeState_First";
        EyeState[EyeState["EyeState_Interval"] = 1] = "EyeState_Interval";
        EyeState[EyeState["EyeState_Closing"] = 2] = "EyeState_Closing";
        EyeState[EyeState["EyeState_Closed"] = 3] = "EyeState_Closed";
        EyeState[EyeState["EyeState_Opening"] = 4] = "EyeState_Opening";
    })(EyeState || (EyeState = {}));
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$q;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismEyeBlink = CubismEyeBlink;
        Live2DCubismFramework.EyeState = EyeState;
    })(Live2DCubismFramework$q || (Live2DCubismFramework$q = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    const Epsilon$1 = 0.001;
    const DefaultFadeInSeconds = 0.5;
    // Pose.jsonのタグ
    const FadeIn = 'FadeInTime';
    const Link = 'Link';
    const Groups$1 = 'Groups';
    const Id$4 = 'Id';
    /**
     * パーツの不透明度の設定
     *
     * パーツの不透明度の管理と設定を行う。
     */
    class CubismPose {
        /**
         * インスタンスの作成
         * @param pose3json pose3.jsonのデータ
         * @param size pose3.jsonのデータのサイズ[byte]
         * @return 作成されたインスタンス
         */
        static create(pose3json, size) {
            const ret = new CubismPose();
            const json = CubismJson.create(pose3json, size);
            const root = json.getRoot();
            // フェード時間の指定
            if (!root.getValueByString(FadeIn).isNull()) {
                ret._fadeTimeSeconds = root
                    .getValueByString(FadeIn)
                    .toFloat(DefaultFadeInSeconds);
                if (ret._fadeTimeSeconds <= 0.0) {
                    ret._fadeTimeSeconds = DefaultFadeInSeconds;
                }
            }
            // パーツグループ
            const poseListInfo = root.getValueByString(Groups$1);
            const poseCount = poseListInfo.getSize();
            for (let poseIndex = 0; poseIndex < poseCount; ++poseIndex) {
                const idListInfo = poseListInfo.getValueByIndex(poseIndex);
                const idCount = idListInfo.getSize();
                let groupCount = 0;
                for (let groupIndex = 0; groupIndex < idCount; ++groupIndex) {
                    const partInfo = idListInfo.getValueByIndex(groupIndex);
                    const partData = new PartData();
                    const parameterId = CubismFramework.getIdManager().getId(partInfo.getValueByString(Id$4).getRawString());
                    partData.partId = parameterId;
                    // リンクするパーツの設定
                    if (!partInfo.getValueByString(Link).isNull()) {
                        const linkListInfo = partInfo.getValueByString(Link);
                        const linkCount = linkListInfo.getSize();
                        for (let linkIndex = 0; linkIndex < linkCount; ++linkIndex) {
                            const linkPart = new PartData();
                            const linkId = CubismFramework.getIdManager().getId(linkListInfo.getValueByIndex(linkIndex).getString());
                            linkPart.partId = linkId;
                            partData.link.pushBack(linkPart);
                        }
                    }
                    ret._partGroups.pushBack(partData.clone());
                    ++groupCount;
                }
                ret._partGroupCounts.pushBack(groupCount);
            }
            CubismJson.delete(json);
            return ret;
        }
        /**
         * インスタンスを破棄する
         * @param pose 対象のCubismPose
         */
        static delete(pose) {
        }
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        updateParameters(model, deltaTimeSeconds) {
            // 前回のモデルと同じでない場合は初期化が必要
            if (model != this._lastModel) {
                // パラメータインデックスの初期化
                this.reset(model);
            }
            this._lastModel = model;
            // 設定から時間を変更すると、経過時間がマイナスになる事があるので、経過時間0として対応
            if (deltaTimeSeconds < 0.0) {
                deltaTimeSeconds = 0.0;
            }
            let beginIndex = 0;
            for (let i = 0; i < this._partGroupCounts.getSize(); i++) {
                const partGroupCount = this._partGroupCounts.at(i);
                this.doFade(model, deltaTimeSeconds, beginIndex, partGroupCount);
                beginIndex += partGroupCount;
            }
            this.copyPartOpacities(model);
        }
        /**
         * 表示を初期化
         * @param model 対象のモデル
         * @note 不透明度の初期値が0でないパラメータは、不透明度を１に設定する
         */
        reset(model) {
            let beginIndex = 0;
            for (let i = 0; i < this._partGroupCounts.getSize(); ++i) {
                const groupCount = this._partGroupCounts.at(i);
                for (let j = beginIndex; j < beginIndex + groupCount; ++j) {
                    this._partGroups.at(j).initialize(model);
                    const partsIndex = this._partGroups.at(j).partIndex;
                    const paramIndex = this._partGroups.at(j).parameterIndex;
                    if (partsIndex < 0) {
                        continue;
                    }
                    model.setPartOpacityByIndex(partsIndex, j == beginIndex ? 1.0 : 0.0);
                    model.setParameterValueByIndex(paramIndex, j == beginIndex ? 1.0 : 0.0);
                    for (let k = 0; k < this._partGroups.at(j).link.getSize(); ++k) {
                        this._partGroups.at(j).link.at(k).initialize(model);
                    }
                }
                beginIndex += groupCount;
            }
        }
        /**
         * パーツの不透明度をコピー
         *
         * @param model 対象のモデル
         */
        copyPartOpacities(model) {
            for (let groupIndex = 0; groupIndex < this._partGroups.getSize(); ++groupIndex) {
                const partData = this._partGroups.at(groupIndex);
                if (partData.link.getSize() == 0) {
                    continue; // 連動するパラメータはない
                }
                const partIndex = this._partGroups.at(groupIndex).partIndex;
                const opacity = model.getPartOpacityByIndex(partIndex);
                for (let linkIndex = 0; linkIndex < partData.link.getSize(); ++linkIndex) {
                    const linkPart = partData.link.at(linkIndex);
                    const linkPartIndex = linkPart.partIndex;
                    if (linkPartIndex < 0) {
                        continue;
                    }
                    model.setPartOpacityByIndex(linkPartIndex, opacity);
                }
            }
        }
        /**
         * パーツのフェード操作を行う。
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         * @param beginIndex フェード操作を行うパーツグループの先頭インデックス
         * @param partGroupCount フェード操作を行うパーツグループの個数
         */
        doFade(model, deltaTimeSeconds, beginIndex, partGroupCount) {
            let visiblePartIndex = -1;
            let newOpacity = 1.0;
            const phi = 0.5;
            const backOpacityThreshold = 0.15;
            // 現在、表示状態になっているパーツを取得
            for (let i = beginIndex; i < beginIndex + partGroupCount; ++i) {
                const partIndex = this._partGroups.at(i).partIndex;
                const paramIndex = this._partGroups.at(i).parameterIndex;
                if (model.getParameterValueByIndex(paramIndex) > Epsilon$1) {
                    if (visiblePartIndex >= 0) {
                        break;
                    }
                    visiblePartIndex = i;
                    newOpacity = model.getPartOpacityByIndex(partIndex);
                    // 新しい不透明度を計算
                    newOpacity += deltaTimeSeconds / this._fadeTimeSeconds;
                    if (newOpacity > 1.0) {
                        newOpacity = 1.0;
                    }
                }
            }
            if (visiblePartIndex < 0) {
                visiblePartIndex = 0;
                newOpacity = 1.0;
            }
            // 表示パーツ、非表示パーツの不透明度を設定する
            for (let i = beginIndex; i < beginIndex + partGroupCount; ++i) {
                const partsIndex = this._partGroups.at(i).partIndex;
                // 表示パーツの設定
                if (visiblePartIndex == i) {
                    model.setPartOpacityByIndex(partsIndex, newOpacity); // 先に設定
                }
                // 非表示パーツの設定
                else {
                    let opacity = model.getPartOpacityByIndex(partsIndex);
                    let a1; // 計算によって求められる不透明度
                    if (newOpacity < phi) {
                        a1 = (newOpacity * (phi - 1)) / phi + 1.0; // (0,1),(phi,phi)を通る直線式
                    }
                    else {
                        a1 = ((1 - newOpacity) * phi) / (1.0 - phi); // (1,0),(phi,phi)を通る直線式
                    }
                    // 背景の見える割合を制限する場合
                    const backOpacity = (1.0 - a1) * (1.0 - newOpacity);
                    if (backOpacity > backOpacityThreshold) {
                        a1 = 1.0 - backOpacityThreshold / (1.0 - newOpacity);
                    }
                    if (opacity > a1) {
                        opacity = a1; // 計算の不透明度よりも大きければ（濃ければ）不透明度を上げる
                    }
                    model.setPartOpacityByIndex(partsIndex, opacity);
                }
            }
        }
        /**
         * コンストラクタ
         */
        constructor() {
            this._fadeTimeSeconds = DefaultFadeInSeconds;
            this._lastModel = null;
            this._partGroups = new csmVector();
            this._partGroupCounts = new csmVector();
        }
    }
    /**
     * パーツにまつわるデータを管理
     */
    class PartData {
        /**
         * コンストラクタ
         */
        constructor(v) {
            this.parameterIndex = 0;
            this.partIndex = 0;
            this.link = new csmVector();
            if (v != undefined) {
                this.partId = v.partId;
                for (const ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
                    this.link.pushBack(ite.ptr().clone());
                }
            }
        }
        /**
         * =演算子のオーバーロード
         */
        assignment(v) {
            this.partId = v.partId;
            for (const ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
                this.link.pushBack(ite.ptr().clone());
            }
            return this;
        }
        /**
         * 初期化
         * @param model 初期化に使用するモデル
         */
        initialize(model) {
            this.parameterIndex = model.getParameterIndex(this.partId);
            this.partIndex = model.getPartIndex(this.partId);
            model.setParameterValueByIndex(this.parameterIndex, 1);
        }
        /**
         * オブジェクトのコピーを生成する
         */
        clone() {
            const clonePartData = new PartData();
            clonePartData.partId = this.partId;
            clonePartData.parameterIndex = this.parameterIndex;
            clonePartData.partIndex = this.partIndex;
            clonePartData.link = new csmVector();
            for (let ite = this.link.begin(); ite.notEqual(this.link.end()); ite.increment()) {
                clonePartData.link.pushBack(ite.ptr().clone());
            }
            return clonePartData;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$p;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismPose = CubismPose;
        Live2DCubismFramework.PartData = PartData;
    })(Live2DCubismFramework$p || (Live2DCubismFramework$p = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * モデル座標設定用の4x4行列
     *
     * モデル座標設定用の4x4行列クラス
     */
    class CubismModelMatrix extends CubismMatrix44 {
        /**
         * コンストラクタ
         *
         * @param w 横幅
         * @param h 縦幅
         */
        constructor(w, h) {
            super();
            this._width = w !== undefined ? w : 0.0;
            this._height = h !== undefined ? h : 0.0;
            this.setHeight(2.0);
        }
        /**
         * 横幅を設定
         *
         * @param w 横幅
         */
        setWidth(w) {
            const scaleX = w / this._width;
            const scaleY = scaleX;
            this.scale(scaleX, scaleY);
        }
        /**
         * 縦幅を設定
         * @param h 縦幅
         */
        setHeight(h) {
            const scaleX = h / this._height;
            const scaleY = scaleX;
            this.scale(scaleX, scaleY);
        }
        /**
         * 位置を設定
         *
         * @param x X軸の位置
         * @param y Y軸の位置
         */
        setPosition(x, y) {
            this.translate(x, y);
        }
        /**
         * 中心位置を設定
         *
         * @param x X軸の中心位置
         * @param y Y軸の中心位置
         *
         * @note widthかheightを設定したあとでないと、拡大率が正しく取得できないためずれる。
         */
        setCenterPosition(x, y) {
            this.centerX(x);
            this.centerY(y);
        }
        /**
         * 上辺の位置を設定する
         *
         * @param y 上辺のY軸位置
         */
        top(y) {
            this.setY(y);
        }
        /**
         * 下辺の位置を設定する
         *
         * @param y 下辺のY軸位置
         */
        bottom(y) {
            const h = this._height * this.getScaleY();
            this.translateY(y - h);
        }
        /**
         * 左辺の位置を設定
         *
         * @param x 左辺のX軸位置
         */
        left(x) {
            this.setX(x);
        }
        /**
         * 右辺の位置を設定
         *
         * @param x 右辺のX軸位置
         */
        right(x) {
            const w = this._width * this.getScaleX();
            this.translateX(x - w);
        }
        /**
         * X軸の中心位置を設定
         *
         * @param x X軸の中心位置
         */
        centerX(x) {
            const w = this._width * this.getScaleX();
            this.translateX(x - w / 2.0);
        }
        /**
         * X軸の位置を設定
         *
         * @param x X軸の位置
         */
        setX(x) {
            this.translateX(x);
        }
        /**
         * Y軸の中心位置を設定
         *
         * @param y Y軸の中心位置
         */
        centerY(y) {
            const h = this._height * this.getScaleY();
            this.translateY(y - h / 2.0);
        }
        /**
         * Y軸の位置を設定する
         *
         * @param y Y軸の位置
         */
        setY(y) {
            this.translateY(y);
        }
        /**
         * レイアウト情報から位置を設定
         *
         * @param layout レイアウト情報
         */
        setupFromLayout(layout) {
            const keyWidth = 'width';
            const keyHeight = 'height';
            const keyX = 'x';
            const keyY = 'y';
            const keyCenterX = 'center_x';
            const keyCenterY = 'center_y';
            const keyTop = 'top';
            const keyBottom = 'bottom';
            const keyLeft = 'left';
            const keyRight = 'right';
            for (const ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
                const key = ite.ptr().first;
                const value = ite.ptr().second;
                if (key == keyWidth) {
                    this.setWidth(value);
                }
                else if (key == keyHeight) {
                    this.setHeight(value);
                }
            }
            for (const ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
                const key = ite.ptr().first;
                const value = ite.ptr().second;
                if (key == keyX) {
                    this.setX(value);
                }
                else if (key == keyY) {
                    this.setY(value);
                }
                else if (key == keyCenterX) {
                    this.centerX(value);
                }
                else if (key == keyCenterY) {
                    this.centerY(value);
                }
                else if (key == keyTop) {
                    this.top(value);
                }
                else if (key == keyBottom) {
                    this.bottom(value);
                }
                else if (key == keyLeft) {
                    this.left(value);
                }
                else if (key == keyRight) {
                    this.right(value);
                }
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$o;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismModelMatrix = CubismModelMatrix;
    })(Live2DCubismFramework$o || (Live2DCubismFramework$o = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * 2次元ベクトル型
     *
     * 2次元ベクトル型の機能を提供する。
     */
    class CubismVector2 {
        /**
         * コンストラクタ
         */
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.x = x == undefined ? 0.0 : x;
            this.y = y == undefined ? 0.0 : y;
        }
        /**
         * ベクトルの加算
         *
         * @param vector2 加算するベクトル値
         * @return 加算結果 ベクトル値
         */
        add(vector2) {
            const ret = new CubismVector2(0.0, 0.0);
            ret.x = this.x + vector2.x;
            ret.y = this.y + vector2.y;
            return ret;
        }
        /**
         * ベクトルの減算
         *
         * @param vector2 減算するベクトル値
         * @return 減算結果 ベクトル値
         */
        substract(vector2) {
            const ret = new CubismVector2(0.0, 0.0);
            ret.x = this.x - vector2.x;
            ret.y = this.y - vector2.y;
            return ret;
        }
        /**
         * ベクトルの乗算
         *
         * @param vector2 乗算するベクトル値
         * @return 乗算結果 ベクトル値
         */
        multiply(vector2) {
            const ret = new CubismVector2(0.0, 0.0);
            ret.x = this.x * vector2.x;
            ret.y = this.y * vector2.y;
            return ret;
        }
        /**
         * ベクトルの乗算(スカラー)
         *
         * @param scalar 乗算するスカラー値
         * @return 乗算結果 ベクトル値
         */
        multiplyByScaler(scalar) {
            return this.multiply(new CubismVector2(scalar, scalar));
        }
        /**
         * ベクトルの除算
         *
         * @param vector2 除算するベクトル値
         * @return 除算結果 ベクトル値
         */
        division(vector2) {
            const ret = new CubismVector2(0.0, 0.0);
            ret.x = this.x / vector2.x;
            ret.y = this.y / vector2.y;
            return ret;
        }
        /**
         * ベクトルの除算(スカラー)
         *
         * @param scalar 除算するスカラー値
         * @return 除算結果 ベクトル値
         */
        divisionByScalar(scalar) {
            return this.division(new CubismVector2(scalar, scalar));
        }
        /**
         * ベクトルの長さを取得する
         *
         * @return ベクトルの長さ
         */
        getLength() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        /**
         * ベクトルの距離の取得
         *
         * @param a 点
         * @return ベクトルの距離
         */
        getDistanceWith(a) {
            return Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y));
        }
        /**
         * ドット積の計算
         *
         * @param a 値
         * @return 結果
         */
        dot(a) {
            return this.x * a.x + this.y * a.y;
        }
        /**
         * 正規化の適用
         */
        normalize() {
            const length = Math.pow(this.x * this.x + this.y * this.y, 0.5);
            this.x = this.x / length;
            this.y = this.y / length;
        }
        /**
         * 等しさの確認（等しいか？）
         *
         * 値が等しいか？
         *
         * @param rhs 確認する値
         * @return true 値は等しい
         * @return false 値は等しくない
         */
        isEqual(rhs) {
            return this.x == rhs.x && this.y == rhs.y;
        }
        /**
         * 等しさの確認（等しくないか？）
         *
         * 値が等しくないか？
         *
         * @param rhs 確認する値
         * @return true 値は等しくない
         * @return false 値は等しい
         */
        isNotEqual(rhs) {
            return !this.isEqual(rhs);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$n;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismVector2 = CubismVector2;
    })(Live2DCubismFramework$n || (Live2DCubismFramework$n = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * 数値計算などに使用するユーティリティクラス
     */
    class CubismMath {
        /**
         * 第一引数の値を最小値と最大値の範囲に収めた値を返す
         *
         * @param value 収められる値
         * @param min   範囲の最小値
         * @param max   範囲の最大値
         * @return 最小値と最大値の範囲に収めた値
         */
        static range(value, min, max) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }
            return value;
        }
        /**
         * サイン関数の値を求める
         *
         * @param x 角度値（ラジアン）
         * @return サイン関数sin(x)の値
         */
        static sin(x) {
            return Math.sin(x);
        }
        /**
         * コサイン関数の値を求める
         *
         * @param x 角度値(ラジアン)
         * @return コサイン関数cos(x)の値
         */
        static cos(x) {
            return Math.cos(x);
        }
        /**
         * 値の絶対値を求める
         *
         * @param x 絶対値を求める値
         * @return 値の絶対値
         */
        static abs(x) {
            return Math.abs(x);
        }
        /**
         * 平方根(ルート)を求める
         * @param x -> 平方根を求める値
         * @return 値の平方根
         */
        static sqrt(x) {
            return Math.sqrt(x);
        }
        /**
         * 立方根を求める
         * @param x -> 立方根を求める値
         * @return 値の立方根
         */
        static cbrt(x) {
            if (x === 0) {
                return x;
            }
            let cx = x;
            const isNegativeNumber = cx < 0;
            if (isNegativeNumber) {
                cx = -cx;
            }
            let ret;
            if (cx === Infinity) {
                ret = Infinity;
            }
            else {
                ret = Math.exp(Math.log(cx) / 3);
                ret = (cx / (ret * ret) + 2 * ret) / 3;
            }
            return isNegativeNumber ? -ret : ret;
        }
        /**
         * イージング処理されたサインを求める
         * フェードイン・アウト時のイージングに利用できる
         *
         * @param value イージングを行う値
         * @return イージング処理されたサイン値
         */
        static getEasingSine(value) {
            if (value < 0.0) {
                return 0.0;
            }
            else if (value > 1.0) {
                return 1.0;
            }
            return 0.5 - 0.5 * this.cos(value * Math.PI);
        }
        /**
         * 大きい方の値を返す
         *
         * @param left 左辺の値
         * @param right 右辺の値
         * @return 大きい方の値
         */
        static max(left, right) {
            return left > right ? left : right;
        }
        /**
         * 小さい方の値を返す
         *
         * @param left  左辺の値
         * @param right 右辺の値
         * @return 小さい方の値
         */
        static min(left, right) {
            return left > right ? right : left;
        }
        /**
         * 角度値をラジアン値に変換する
         *
         * @param degrees   角度値
         * @return 角度値から変換したラジアン値
         */
        static degreesToRadian(degrees) {
            return (degrees / 180.0) * Math.PI;
        }
        /**
         * ラジアン値を角度値に変換する
         *
         * @param radian    ラジアン値
         * @return ラジアン値から変換した角度値
         */
        static radianToDegrees(radian) {
            return (radian * 180.0) / Math.PI;
        }
        /**
         * ２つのベクトルからラジアン値を求める
         *
         * @param from  始点ベクトル
         * @param to    終点ベクトル
         * @return ラジアン値から求めた方向ベクトル
         */
        static directionToRadian(from, to) {
            const q1 = Math.atan2(to.y, to.x);
            const q2 = Math.atan2(from.y, from.x);
            let ret = q1 - q2;
            while (ret < -Math.PI) {
                ret += Math.PI * 2.0;
            }
            while (ret > Math.PI) {
                ret -= Math.PI * 2.0;
            }
            return ret;
        }
        /**
         * ２つのベクトルから角度値を求める
         *
         * @param from  始点ベクトル
         * @param to    終点ベクトル
         * @return 角度値から求めた方向ベクトル
         */
        static directionToDegrees(from, to) {
            const radian = this.directionToRadian(from, to);
            let degree = this.radianToDegrees(radian);
            if (to.x - from.x > 0.0) {
                degree = -degree;
            }
            return degree;
        }
        /**
         * ラジアン値を方向ベクトルに変換する。
         *
         * @param totalAngle    ラジアン値
         * @return ラジアン値から変換した方向ベクトル
         */
        static radianToDirection(totalAngle) {
            const ret = new CubismVector2();
            ret.x = this.sin(totalAngle);
            ret.y = this.cos(totalAngle);
            return ret;
        }
        /**
         * 三次方程式の三次項の係数が0になったときに補欠的に二次方程式の解をもとめる。
         * a * x^2 + b * x + c = 0
         *
         * @param   a -> 二次項の係数値
         * @param   b -> 一次項の係数値
         * @param   c -> 定数項の値
         * @return  二次方程式の解
         */
        static quadraticEquation(a, b, c) {
            if (this.abs(a) < CubismMath.Epsilon) {
                if (this.abs(b) < CubismMath.Epsilon) {
                    return -c;
                }
                return -c / b;
            }
            return -(b + this.sqrt(b * b - 4.0 * a * c)) / (2.0 * a);
        }
        /**
         * カルダノの公式によってベジェのt値に該当する３次方程式の解を求める。
         * 重解になったときには0.0～1.0の値になる解を返す。
         *
         * a * x^3 + b * x^2 + c * x + d = 0
         *
         * @param   a -> 三次項の係数値
         * @param   b -> 二次項の係数値
         * @param   c -> 一次項の係数値
         * @param   d -> 定数項の値
         * @return  0.0～1.0の間にある解
         */
        static cardanoAlgorithmForBezier(a, b, c, d) {
            if (this.sqrt(a) < CubismMath.Epsilon) {
                return this.range(this.quadraticEquation(b, c, d), 0.0, 1.0);
            }
            const ba = b / a;
            const ca = c / a;
            const da = d / a;
            const p = (3.0 * ca - ba * ba) / 3.0;
            const p3 = p / 3.0;
            const q = (2.0 * ba * ba * ba - 9.0 * ba * ca + 27.0 * da) / 27.0;
            const q2 = q / 2.0;
            const discriminant = q2 * q2 + p3 * p3 * p3;
            const center = 0.5;
            const threshold = center + 0.01;
            if (discriminant < 0.0) {
                const mp3 = -p / 3.0;
                const mp33 = mp3 * mp3 * mp3;
                const r = this.sqrt(mp33);
                const t = -q / (2.0 * r);
                const cosphi = this.range(t, -1.0, 1.0);
                const phi = Math.acos(cosphi);
                const crtr = this.cbrt(r);
                const t1 = 2.0 * crtr;
                const root1 = t1 * this.cos(phi / 3.0) - ba / 3.0;
                if (this.abs(root1 - center) < threshold) {
                    return this.range(root1, 0.0, 1.0);
                }
                const root2 = t1 * this.cos((phi + 2.0 * Math.PI) / 3.0) - ba / 3.0;
                if (this.abs(root2 - center) < threshold) {
                    return this.range(root2, 0.0, 1.0);
                }
                const root3 = t1 * this.cos((phi + 4.0 * Math.PI) / 3.0) - ba / 3.0;
                return this.range(root3, 0.0, 1.0);
            }
            if (discriminant == 0.0) {
                let u1;
                if (q2 < 0.0) {
                    u1 = this.cbrt(-q2);
                }
                else {
                    u1 = -this.cbrt(q2);
                }
                const root1 = 2.0 * u1 - ba / 3.0;
                if (this.abs(root1 - center) < threshold) {
                    return this.range(root1, 0.0, 1.0);
                }
                const root2 = -u1 - ba / 3.0;
                return this.range(root2, 0.0, 1.0);
            }
            const sd = this.sqrt(discriminant);
            const u1 = this.cbrt(sd - q2);
            const v1 = this.cbrt(sd + q2);
            const root1 = u1 - v1 - ba / 3.0;
            return this.range(root1, 0.0, 1.0);
        }
        /**
         * コンストラクタ
         */
        constructor() { }
    }
    CubismMath.Epsilon = 0.00001;
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$m;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismMath = CubismMath;
    })(Live2DCubismFramework$m || (Live2DCubismFramework$m = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    const FrameRate = 30;
    const Epsilon = 0.01;
    /**
     * 顔の向きの制御機能
     *
     * 顔の向きの制御機能を提供するクラス。
     */
    class CubismTargetPoint {
        /**
         * コンストラクタ
         */
        constructor() {
            this._faceTargetX = 0.0;
            this._faceTargetY = 0.0;
            this._faceX = 0.0;
            this._faceY = 0.0;
            this._faceVX = 0.0;
            this._faceVY = 0.0;
            this._lastTimeSeconds = 0.0;
            this._userTimeSeconds = 0.0;
        }
        /**
         * 更新処理
         */
        update(deltaTimeSeconds) {
            // デルタ時間を加算する
            this._userTimeSeconds += deltaTimeSeconds;
            // 首を中央から左右に振るときの平均的な速さは 秒速度。加速・減速を考慮して、その２倍を最高速度とする
            // 顔の振り具合を、中央（0.0）から、左右は（+-1.0）とする
            const faceParamMaxV = 40.0 / 10.0; // 7.5秒間に40分移動(5.3/sc)
            const maxV = (faceParamMaxV * 1.0) / FrameRate; // 1frameあたりに変化できる速度の上限
            if (this._lastTimeSeconds == 0.0) {
                this._lastTimeSeconds = this._userTimeSeconds;
                return;
            }
            const deltaTimeWeight = (this._userTimeSeconds - this._lastTimeSeconds) * FrameRate;
            this._lastTimeSeconds = this._userTimeSeconds;
            // 最高速度になるまでの時間を
            const timeToMaxSpeed = 0.15;
            const frameToMaxSpeed = timeToMaxSpeed * FrameRate; // sec * frame/sec
            const maxA = (deltaTimeWeight * maxV) / frameToMaxSpeed; // 1frameあたりの加速度
            // 目指す向きは、（dx, dy）方向のベクトルとなる
            const dx = this._faceTargetX - this._faceX;
            const dy = this._faceTargetY - this._faceY;
            if (CubismMath.abs(dx) <= Epsilon && CubismMath.abs(dy) <= Epsilon) {
                return; // 変化なし
            }
            // 速度の最大よりも大きい場合は、速度を落とす
            const d = CubismMath.sqrt(dx * dx + dy * dy);
            // 進行方向の最大速度ベクトル
            const vx = (maxV * dx) / d;
            const vy = (maxV * dy) / d;
            // 現在の速度から、新規速度への変化（加速度）を求める
            let ax = vx - this._faceVX;
            let ay = vy - this._faceVY;
            const a = CubismMath.sqrt(ax * ax + ay * ay);
            // 加速のとき
            if (a < -maxA || a > maxA) {
                ax *= maxA / a;
                ay *= maxA / a;
            }
            // 加速度を元の速度に足して、新速度とする
            this._faceVX += ax;
            this._faceVY += ay;
            // 目的の方向に近づいたとき、滑らかに減速するための処理
            // 設定された加速度で止まる事の出来る距離と速度の関係から
            // 現在とりうる最高速度を計算し、それ以上の時は速度を落とす
            // ※本来、人間は筋力で力（加速度）を調整できるため、より自由度が高いが、簡単な処理で済ませている
            {
                // 加速度、速度、距離の関係式。
                //            2  6           2               3
                //      sqrt(a  t  + 16 a h t  - 8 a h) - a t
                // v = --------------------------------------
                //                    2
                //                 4 t  - 2
                // (t=1)
                // 	時刻tは、あらかじめ加速度、速度を1/60(フレームレート、単位なし)で
                // 	考えているので、t＝１として消してよい（※未検証）
                const maxV = 0.5 *
                    (CubismMath.sqrt(maxA * maxA + 16.0 * maxA * d - 8.0 * maxA * d) -
                        maxA);
                const curV = CubismMath.sqrt(this._faceVX * this._faceVX + this._faceVY * this._faceVY);
                if (curV > maxV) {
                    // 現在の速度 > 最高速度のとき、最高速度まで減速
                    this._faceVX *= maxV / curV;
                    this._faceVY *= maxV / curV;
                }
            }
            this._faceX += this._faceVX;
            this._faceY += this._faceVY;
        }
        /**
         * X軸の顔の向きの値を取得
         *
         * @return X軸の顔の向きの値（-1.0 ~ 1.0）
         */
        getX() {
            return this._faceX;
        }
        /**
         * Y軸の顔の向きの値を取得
         *
         * @return Y軸の顔の向きの値（-1.0 ~ 1.0）
         */
        getY() {
            return this._faceY;
        }
        /**
         * 顔の向きの目標値を設定
         *
         * @param x X軸の顔の向きの値（-1.0 ~ 1.0）
         * @param y Y軸の顔の向きの値（-1.0 ~ 1.0）
         */
        set(x, y) {
            this._faceTargetX = x;
            this._faceTargetY = y;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$l;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismTargetPoint = CubismTargetPoint;
    })(Live2DCubismFramework$l || (Live2DCubismFramework$l = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * モーションの抽象基底クラス
     *
     * モーションの抽象基底クラス。MotionQueueManagerによってモーションの再生を管理する。
     */
    class ACubismMotion {
        /**
         * インスタンスの破棄
         */
        static delete(motion) {
            motion.release();
            motion = null;
        }
        /**
         * コンストラクタ
         */
        constructor() {
            /**
             * モーション再生終了コールバックの登録
             *
             * モーション再生終了コールバックを登録する。
             * isFinishedフラグを設定するタイミングで呼び出される。
             * 以下の状態の際には呼び出されない:
             *   1. 再生中のモーションが「ループ」として設定されているとき
             *   2. コールバックが登録されていない時
             *
             * @param onFinishedMotionHandler モーション再生終了コールバック関数
             */
            this.setFinishedMotionHandler = (onFinishedMotionHandler) => (this._onFinishedMotion = onFinishedMotionHandler);
            /**
             * モーション再生終了コールバックの取得
             *
             * モーション再生終了コールバックを取得する。
             *
             * @return 登録されているモーション再生終了コールバック関数
             */
            this.getFinishedMotionHandler = () => this._onFinishedMotion;
            this._fadeInSeconds = -1.0;
            this._fadeOutSeconds = -1.0;
            this._weight = 1.0;
            this._offsetSeconds = 0.0; // 再生の開始時刻
            this._firedEventValues = new csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            this._weight = 0.0;
        }
        /**
         * モデルのパラメータ
         * @param model 対象のモデル
         * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
         * @param userTimeSeconds デルタ時間の積算値[秒]
         */
        updateParameters(model, motionQueueEntry, userTimeSeconds) {
            if (!motionQueueEntry.isAvailable() || motionQueueEntry.isFinished()) {
                return;
            }
            if (!motionQueueEntry.isStarted()) {
                motionQueueEntry.setIsStarted(true);
                motionQueueEntry.setStartTime(userTimeSeconds - this._offsetSeconds); // モーションの開始時刻を記録
                motionQueueEntry.setFadeInStartTime(userTimeSeconds); // フェードインの開始時刻
                const duration = this.getDuration();
                if (motionQueueEntry.getEndTime() < 0) {
                    // 開始していないうちに終了設定している場合がある。
                    motionQueueEntry.setEndTime(duration <= 0 ? -1 : motionQueueEntry.getStartTime() + duration);
                    // duration == -1 の場合はループする
                }
            }
            let fadeWeight = this._weight; // 現在の値と掛け合わせる割合
            //---- フェードイン・アウトの処理 ----
            // 単純なサイン関数でイージングする
            const fadeIn = this._fadeInSeconds == 0.0
                ? 1.0
                : CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) /
                    this._fadeInSeconds);
            const fadeOut = this._fadeOutSeconds == 0.0 || motionQueueEntry.getEndTime() < 0.0
                ? 1.0
                : CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) /
                    this._fadeOutSeconds);
            fadeWeight = fadeWeight * fadeIn * fadeOut;
            motionQueueEntry.setState(userTimeSeconds, fadeWeight);
            CSM_ASSERT(0.0 <= fadeWeight && fadeWeight <= 1.0);
            //---- 全てのパラメータIDをループする ----
            this.doUpdateParameters(model, userTimeSeconds, fadeWeight, motionQueueEntry);
            // 後処理
            // 終了時刻を過ぎたら終了フラグを立てる(CubismMotionQueueManager)
            if (motionQueueEntry.getEndTime() > 0 &&
                motionQueueEntry.getEndTime() < userTimeSeconds) {
                motionQueueEntry.setIsFinished(true); // 終了
            }
        }
        /**
         * フェードインの時間を設定する
         * @param fadeInSeconds フェードインにかかる時間[秒]
         */
        setFadeInTime(fadeInSeconds) {
            this._fadeInSeconds = fadeInSeconds;
        }
        /**
         * フェードアウトの時間を設定する
         * @param fadeOutSeconds フェードアウトにかかる時間[秒]
         */
        setFadeOutTime(fadeOutSeconds) {
            this._fadeOutSeconds = fadeOutSeconds;
        }
        /**
         * フェードアウトにかかる時間の取得
         * @return フェードアウトにかかる時間[秒]
         */
        getFadeOutTime() {
            return this._fadeOutSeconds;
        }
        /**
         * フェードインにかかる時間の取得
         * @return フェードインにかかる時間[秒]
         */
        getFadeInTime() {
            return this._fadeInSeconds;
        }
        /**
         * モーション適用の重みの設定
         * @param weight 重み（0.0 - 1.0）
         */
        setWeight(weight) {
            this._weight = weight;
        }
        /**
         * モーション適用の重みの取得
         * @return 重み（0.0 - 1.0）
         */
        getWeight() {
            return this._weight;
        }
        /**
         * モーションの長さの取得
         * @return モーションの長さ[秒]
         *
         * @note ループの時は「-1」。
         *       ループでない場合は、オーバーライドする。
         *       正の値の時は取得される時間で終了する。
         *       「-1」の時は外部から停止命令がない限り終わらない処理となる。
         */
        getDuration() {
            return -1.0;
        }
        /**
         * モーションのループ1回分の長さの取得
         * @return モーションのループ一回分の長さ[秒]
         *
         * @note ループしない場合は、getDuration()と同じ値を返す
         *       ループ一回分の長さが定義できない場合(プログラム的に動き続けるサブクラスなど)の場合は「-1」を返す
         */
        getLoopDuration() {
            return -1.0;
        }
        /**
         * モーション再生の開始時刻の設定
         * @param offsetSeconds モーション再生の開始時刻[秒]
         */
        setOffsetTime(offsetSeconds) {
            this._offsetSeconds = offsetSeconds;
        }
        /**
         * モデルのパラメータ更新
         *
         * イベント発火のチェック。
         * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
         *
         * @param beforeCheckTimeSeconds 前回のイベントチェック時間[秒]
         * @param motionTimeSeconds 今回の再生時間[秒]
         */
        getFiredEvent(beforeCheckTimeSeconds, motionTimeSeconds) {
            return this._firedEventValues;
        }
        /**
         * 透明度のカーブが存在するかどうかを確認する
         *
         * @returns true  -> キーが存在する
         *          false -> キーが存在しない
         */
        isExistModelOpacity() {
            return false;
        }
        /**
         * 透明度のカーブのインデックスを返す
         *
         * @returns success:透明度のカーブのインデックス
         */
        getModelOpacityIndex() {
            return -1;
        }
        /**
         * 透明度のIdを返す
         *
         * @param index モーションカーブのインデックス
         * @returns success:透明度のId
         */
        getModelOpacityId(index) {
            return null;
        }
        /**
         * 指定時間の透明度の値を返す
         *
         * @returns success:モーションの現在時間におけるOpacityの値
         *
         * @note  更新後の値を取るにはUpdateParameters() の後に呼び出す。
         */
        getModelOpacityValue() {
            return 1.0;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$k;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.ACubismMotion = ACubismMotion;
    })(Live2DCubismFramework$k || (Live2DCubismFramework$k = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    // exp3.jsonのキーとデフォルト
    const ExpressionKeyFadeIn = 'FadeInTime';
    const ExpressionKeyFadeOut = 'FadeOutTime';
    const ExpressionKeyParameters = 'Parameters';
    const ExpressionKeyId = 'Id';
    const ExpressionKeyValue = 'Value';
    const ExpressionKeyBlend = 'Blend';
    const BlendValueAdd = 'Add';
    const BlendValueMultiply = 'Multiply';
    const BlendValueOverwrite = 'Overwrite';
    const DefaultFadeTime = 1.0;
    /**
     * 表情のモーション
     *
     * 表情のモーションクラス。
     */
    class CubismExpressionMotion extends ACubismMotion {
        /**
         * インスタンスを作成する。
         * @param buffer expファイルが読み込まれているバッファ
         * @param size バッファのサイズ
         * @return 作成されたインスタンス
         */
        static create(buffer, size) {
            const expression = new CubismExpressionMotion();
            expression.parse(buffer, size);
            return expression;
        }
        /**
         * モデルのパラメータの更新の実行
         * @param model 対象のモデル
         * @param userTimeSeconds デルタ時間の積算値[秒]
         * @param weight モーションの重み
         * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
         */
        doUpdateParameters(model, userTimeSeconds, weight, motionQueueEntry) {
            for (let i = 0; i < this._parameters.getSize(); ++i) {
                const parameter = this._parameters.at(i);
                switch (parameter.blendType) {
                    case ExpressionBlendType.ExpressionBlendType_Add: {
                        model.addParameterValueById(parameter.parameterId, parameter.value, weight);
                        break;
                    }
                    case ExpressionBlendType.ExpressionBlendType_Multiply: {
                        model.multiplyParameterValueById(parameter.parameterId, parameter.value, weight);
                        break;
                    }
                    case ExpressionBlendType.ExpressionBlendType_Overwrite: {
                        model.setParameterValueById(parameter.parameterId, parameter.value, weight);
                        break;
                    }
                }
            }
        }
        parse(buffer, size) {
            const json = CubismJson.create(buffer, size);
            const root = json.getRoot();
            this.setFadeInTime(root.getValueByString(ExpressionKeyFadeIn).toFloat(DefaultFadeTime)); // フェードイン
            this.setFadeOutTime(root.getValueByString(ExpressionKeyFadeOut).toFloat(DefaultFadeTime)); // フェードアウト
            // 各パラメータについて
            const parameterCount = root
                .getValueByString(ExpressionKeyParameters)
                .getSize();
            this._parameters.prepareCapacity(parameterCount);
            for (let i = 0; i < parameterCount; ++i) {
                const param = root
                    .getValueByString(ExpressionKeyParameters)
                    .getValueByIndex(i);
                const parameterId = CubismFramework.getIdManager().getId(param.getValueByString(ExpressionKeyId).getRawString()); // パラメータID
                const value = param
                    .getValueByString(ExpressionKeyValue)
                    .toFloat(); // 値
                // 計算方法の設定
                let blendType;
                if (param.getValueByString(ExpressionKeyBlend).isNull() ||
                    param.getValueByString(ExpressionKeyBlend).getString() == BlendValueAdd) {
                    blendType = ExpressionBlendType.ExpressionBlendType_Add;
                }
                else if (param.getValueByString(ExpressionKeyBlend).getString() ==
                    BlendValueMultiply) {
                    blendType = ExpressionBlendType.ExpressionBlendType_Multiply;
                }
                else if (param.getValueByString(ExpressionKeyBlend).getString() ==
                    BlendValueOverwrite) {
                    blendType = ExpressionBlendType.ExpressionBlendType_Overwrite;
                }
                else {
                    // その他 仕様にない値を設定した時は加算モードにすることで復旧
                    blendType = ExpressionBlendType.ExpressionBlendType_Add;
                }
                // 設定オブジェクトを作成してリストに追加する
                const item = new ExpressionParameter();
                item.parameterId = parameterId;
                item.blendType = blendType;
                item.value = value;
                this._parameters.pushBack(item);
            }
            CubismJson.delete(json); // JSONデータは不要になったら削除する
        }
        /**
         * コンストラクタ
         */
        constructor() {
            super();
            this._parameters = new csmVector();
        }
    }
    /**
     * 表情パラメータ値の計算方式
     */
    var ExpressionBlendType;
    (function (ExpressionBlendType) {
        ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Add"] = 0] = "ExpressionBlendType_Add";
        ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Multiply"] = 1] = "ExpressionBlendType_Multiply";
        ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Overwrite"] = 2] = "ExpressionBlendType_Overwrite";
    })(ExpressionBlendType || (ExpressionBlendType = {}));
    /**
     * 表情のパラメータ情報
     */
    class ExpressionParameter {
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$j;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismExpressionMotion = CubismExpressionMotion;
        Live2DCubismFramework.ExpressionBlendType = ExpressionBlendType;
        Live2DCubismFramework.ExpressionParameter = ExpressionParameter;
    })(Live2DCubismFramework$j || (Live2DCubismFramework$j = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * @brief モーションカーブの種類
     *
     * モーションカーブの種類。
     */
    var CubismMotionCurveTarget;
    (function (CubismMotionCurveTarget) {
        CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_Model"] = 0] = "CubismMotionCurveTarget_Model";
        CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_Parameter"] = 1] = "CubismMotionCurveTarget_Parameter";
        CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_PartOpacity"] = 2] = "CubismMotionCurveTarget_PartOpacity";
    })(CubismMotionCurveTarget || (CubismMotionCurveTarget = {}));
    /**
     * @brief モーションカーブのセグメントの種類
     *
     * モーションカーブのセグメントの種類。
     */
    var CubismMotionSegmentType;
    (function (CubismMotionSegmentType) {
        CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Linear"] = 0] = "CubismMotionSegmentType_Linear";
        CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Bezier"] = 1] = "CubismMotionSegmentType_Bezier";
        CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Stepped"] = 2] = "CubismMotionSegmentType_Stepped";
        CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_InverseStepped"] = 3] = "CubismMotionSegmentType_InverseStepped";
    })(CubismMotionSegmentType || (CubismMotionSegmentType = {}));
    /**
     * @brief モーションカーブの制御点
     *
     * モーションカーブの制御点。
     */
    class CubismMotionPoint {
        constructor() {
            this.time = 0.0; // 時間[秒]
            this.value = 0.0; // 値
        }
    }
    /**
     * @brief モーションカーブのセグメント
     *
     * モーションカーブのセグメント。
     */
    class CubismMotionSegment {
        /**
         * @brief コンストラクタ
         *
         * コンストラクタ。
         */
        constructor() {
            this.evaluate = null;
            this.basePointIndex = 0;
            this.segmentType = 0;
        }
    }
    /**
     * @brief モーションカーブ
     *
     * モーションカーブ。
     */
    class CubismMotionCurve {
        constructor() {
            this.type = CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
            this.segmentCount = 0;
            this.baseSegmentIndex = 0;
            this.fadeInTime = 0.0;
            this.fadeOutTime = 0.0;
        }
    }
    /**
     * イベント。
     */
    class CubismMotionEvent {
        constructor() {
            this.fireTime = 0.0;
        }
    }
    /**
     * @brief モーションデータ
     *
     * モーションデータ。
     */
    class CubismMotionData {
        constructor() {
            this.duration = 0.0;
            this.loop = false;
            this.curveCount = 0;
            this.eventCount = 0;
            this.fps = 0.0;
            this.curves = new csmVector();
            this.segments = new csmVector();
            this.points = new csmVector();
            this.events = new csmVector();
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$i;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismMotionCurve = CubismMotionCurve;
        Live2DCubismFramework.CubismMotionCurveTarget = CubismMotionCurveTarget;
        Live2DCubismFramework.CubismMotionData = CubismMotionData;
        Live2DCubismFramework.CubismMotionEvent = CubismMotionEvent;
        Live2DCubismFramework.CubismMotionPoint = CubismMotionPoint;
        Live2DCubismFramework.CubismMotionSegment = CubismMotionSegment;
        Live2DCubismFramework.CubismMotionSegmentType = CubismMotionSegmentType;
    })(Live2DCubismFramework$i || (Live2DCubismFramework$i = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    // JSON keys
    const Meta$2 = 'Meta';
    const Duration = 'Duration';
    const Loop = 'Loop';
    const AreBeziersRestricted = 'AreBeziersRestricted';
    const CurveCount = 'CurveCount';
    const Fps$1 = 'Fps';
    const TotalSegmentCount = 'TotalSegmentCount';
    const TotalPointCount = 'TotalPointCount';
    const Curves = 'Curves';
    const Target$1 = 'Target';
    const Id$3 = 'Id';
    const FadeInTime$1 = 'FadeInTime';
    const FadeOutTime$1 = 'FadeOutTime';
    const Segments = 'Segments';
    const UserData$2 = 'UserData';
    const UserDataCount$1 = 'UserDataCount';
    const TotalUserDataSize$1 = 'TotalUserDataSize';
    const Time = 'Time';
    const Value$1 = 'Value';
    /**
     * motion3.jsonのコンテナ。
     */
    class CubismMotionJson {
        /**
         * コンストラクタ
         * @param buffer motion3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        constructor(buffer, size) {
            this._json = CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            CubismJson.delete(this._json);
        }
        /**
         * モーションの長さを取得する
         * @return モーションの長さ[秒]
         */
        getMotionDuration() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(Duration)
                .toFloat();
        }
        /**
         * モーションのループ情報の取得
         * @return true ループする
         * @return false ループしない
         */
        isMotionLoop() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(Loop)
                .toBoolean();
        }
        getEvaluationOptionFlag(flagType) {
            if (EvaluationOptionFlag.EvaluationOptionFlag_AreBeziersRistricted == flagType) {
                return this._json
                    .getRoot()
                    .getValueByString(Meta$2)
                    .getValueByString(AreBeziersRestricted)
                    .toBoolean();
            }
            return false;
        }
        /**
         * モーションカーブの個数の取得
         * @return モーションカーブの個数
         */
        getMotionCurveCount() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(CurveCount)
                .toInt();
        }
        /**
         * モーションのフレームレートの取得
         * @return フレームレート[FPS]
         */
        getMotionFps() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(Fps$1)
                .toFloat();
        }
        /**
         * モーションのセグメントの総合計の取得
         * @return モーションのセグメントの取得
         */
        getMotionTotalSegmentCount() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(TotalSegmentCount)
                .toInt();
        }
        /**
         * モーションのカーブの制御店の総合計の取得
         * @return モーションのカーブの制御点の総合計
         */
        getMotionTotalPointCount() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(TotalPointCount)
                .toInt();
        }
        /**
         * モーションのフェードイン時間の存在
         * @return true 存在する
         * @return false 存在しない
         */
        isExistMotionFadeInTime() {
            return !this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(FadeInTime$1)
                .isNull();
        }
        /**
         * モーションのフェードアウト時間の存在
         * @return true 存在する
         * @return false 存在しない
         */
        isExistMotionFadeOutTime() {
            return !this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(FadeOutTime$1)
                .isNull();
        }
        /**
         * モーションのフェードイン時間の取得
         * @return フェードイン時間[秒]
         */
        getMotionFadeInTime() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(FadeInTime$1)
                .toFloat();
        }
        /**
         * モーションのフェードアウト時間の取得
         * @return フェードアウト時間[秒]
         */
        getMotionFadeOutTime() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(FadeOutTime$1)
                .toFloat();
        }
        /**
         * モーションのカーブの種類の取得
         * @param curveIndex カーブのインデックス
         * @return カーブの種類
         */
        getMotionCurveTarget(curveIndex) {
            return this._json
                .getRoot()
                .getValueByString(Curves)
                .getValueByIndex(curveIndex)
                .getValueByString(Target$1)
                .getRawString();
        }
        /**
         * モーションのカーブのIDの取得
         * @param curveIndex カーブのインデックス
         * @return カーブのID
         */
        getMotionCurveId(curveIndex) {
            return CubismFramework.getIdManager().getId(this._json
                .getRoot()
                .getValueByString(Curves)
                .getValueByIndex(curveIndex)
                .getValueByString(Id$3)
                .getRawString());
        }
        /**
         * モーションのカーブのフェードイン時間の存在
         * @param curveIndex カーブのインデックス
         * @return true 存在する
         * @return false 存在しない
         */
        isExistMotionCurveFadeInTime(curveIndex) {
            return !this._json
                .getRoot()
                .getValueByString(Curves)
                .getValueByIndex(curveIndex)
                .getValueByString(FadeInTime$1)
                .isNull();
        }
        /**
         * モーションのカーブのフェードアウト時間の存在
         * @param curveIndex カーブのインデックス
         * @return true 存在する
         * @return false 存在しない
         */
        isExistMotionCurveFadeOutTime(curveIndex) {
            return !this._json
                .getRoot()
                .getValueByString(Curves)
                .getValueByIndex(curveIndex)
                .getValueByString(FadeOutTime$1)
                .isNull();
        }
        /**
         * モーションのカーブのフェードイン時間の取得
         * @param curveIndex カーブのインデックス
         * @return フェードイン時間[秒]
         */
        getMotionCurveFadeInTime(curveIndex) {
            return this._json
                .getRoot()
                .getValueByString(Curves)
                .getValueByIndex(curveIndex)
                .getValueByString(FadeInTime$1)
                .toFloat();
        }
        /**
         * モーションのカーブのフェードアウト時間の取得
         * @param curveIndex カーブのインデックス
         * @return フェードアウト時間[秒]
         */
        getMotionCurveFadeOutTime(curveIndex) {
            return this._json
                .getRoot()
                .getValueByString(Curves)
                .getValueByIndex(curveIndex)
                .getValueByString(FadeOutTime$1)
                .toFloat();
        }
        /**
         * モーションのカーブのセグメントの個数を取得する
         * @param curveIndex カーブのインデックス
         * @return モーションのカーブのセグメントの個数
         */
        getMotionCurveSegmentCount(curveIndex) {
            return this._json
                .getRoot()
                .getValueByString(Curves)
                .getValueByIndex(curveIndex)
                .getValueByString(Segments)
                .getVector()
                .getSize();
        }
        /**
         * モーションのカーブのセグメントの値の取得
         * @param curveIndex カーブのインデックス
         * @param segmentIndex セグメントのインデックス
         * @return セグメントの値
         */
        getMotionCurveSegment(curveIndex, segmentIndex) {
            return this._json
                .getRoot()
                .getValueByString(Curves)
                .getValueByIndex(curveIndex)
                .getValueByString(Segments)
                .getValueByIndex(segmentIndex)
                .toFloat();
        }
        /**
         * イベントの個数の取得
         * @return イベントの個数
         */
        getEventCount() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(UserDataCount$1)
                .toInt();
        }
        /**
         *  イベントの総文字数の取得
         * @return イベントの総文字数
         */
        getTotalEventValueSize() {
            return this._json
                .getRoot()
                .getValueByString(Meta$2)
                .getValueByString(TotalUserDataSize$1)
                .toInt();
        }
        /**
         * イベントの時間の取得
         * @param userDataIndex イベントのインデックス
         * @return イベントの時間[秒]
         */
        getEventTime(userDataIndex) {
            return this._json
                .getRoot()
                .getValueByString(UserData$2)
                .getValueByIndex(userDataIndex)
                .getValueByString(Time)
                .toFloat();
        }
        /**
         * イベントの取得
         * @param userDataIndex イベントのインデックス
         * @return イベントの文字列
         */
        getEventValue(userDataIndex) {
            return new csmString(this._json
                .getRoot()
                .getValueByString(UserData$2)
                .getValueByIndex(userDataIndex)
                .getValueByString(Value$1)
                .getRawString());
        }
    }
    /**
     * @brief ベジェカーブの解釈方法のフラグタイプ
     */
    var EvaluationOptionFlag;
    (function (EvaluationOptionFlag) {
        EvaluationOptionFlag[EvaluationOptionFlag["EvaluationOptionFlag_AreBeziersRistricted"] = 0] = "EvaluationOptionFlag_AreBeziersRistricted";
    })(EvaluationOptionFlag || (EvaluationOptionFlag = {}));
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$h;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismMotionJson = CubismMotionJson;
    })(Live2DCubismFramework$h || (Live2DCubismFramework$h = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    const EffectNameEyeBlink = 'EyeBlink';
    const EffectNameLipSync = 'LipSync';
    const TargetNameModel = 'Model';
    const TargetNameParameter = 'Parameter';
    const TargetNamePartOpacity = 'PartOpacity';
    // Id
    const IdNameOpacity = 'Opacity';
    /**
     * Cubism SDK R2 以前のモーションを再現させるなら true 、アニメータのモーションを正しく再現するなら false 。
     */
    const UseOldBeziersCurveMotion = false;
    function lerpPoints(a, b, t) {
        const result = new CubismMotionPoint();
        result.time = a.time + (b.time - a.time) * t;
        result.value = a.value + (b.value - a.value) * t;
        return result;
    }
    function linearEvaluate(points, time) {
        let t = (time - points[0].time) / (points[1].time - points[0].time);
        if (t < 0.0) {
            t = 0.0;
        }
        return points[0].value + (points[1].value - points[0].value) * t;
    }
    function bezierEvaluate(points, time) {
        let t = (time - points[0].time) / (points[3].time - points[0].time);
        if (t < 0.0) {
            t = 0.0;
        }
        const p01 = lerpPoints(points[0], points[1], t);
        const p12 = lerpPoints(points[1], points[2], t);
        const p23 = lerpPoints(points[2], points[3], t);
        const p012 = lerpPoints(p01, p12, t);
        const p123 = lerpPoints(p12, p23, t);
        return lerpPoints(p012, p123, t).value;
    }
    function bezierEvaluateCardanoInterpretation(points, time) {
        const x = time;
        const x1 = points[0].time;
        const x2 = points[3].time;
        const cx1 = points[1].time;
        const cx2 = points[2].time;
        const a = x2 - 3.0 * cx2 + 3.0 * cx1 - x1;
        const b = 3.0 * cx2 - 6.0 * cx1 + 3.0 * x1;
        const c = 3.0 * cx1 - 3.0 * x1;
        const d = x1 - x;
        const t = CubismMath.cardanoAlgorithmForBezier(a, b, c, d);
        const p01 = lerpPoints(points[0], points[1], t);
        const p12 = lerpPoints(points[1], points[2], t);
        const p23 = lerpPoints(points[2], points[3], t);
        const p012 = lerpPoints(p01, p12, t);
        const p123 = lerpPoints(p12, p23, t);
        return lerpPoints(p012, p123, t).value;
    }
    function steppedEvaluate(points, time) {
        return points[0].value;
    }
    function inverseSteppedEvaluate(points, time) {
        return points[1].value;
    }
    function evaluateCurve(motionData, index, time) {
        // Find segment to evaluate.
        const curve = motionData.curves.at(index);
        let target = -1;
        const totalSegmentCount = curve.baseSegmentIndex + curve.segmentCount;
        let pointPosition = 0;
        for (let i = curve.baseSegmentIndex; i < totalSegmentCount; ++i) {
            // Get first point of next segment.
            pointPosition =
                motionData.segments.at(i).basePointIndex +
                    (motionData.segments.at(i).segmentType ==
                        CubismMotionSegmentType.CubismMotionSegmentType_Bezier
                        ? 3
                        : 1);
            // Break if time lies within current segment.
            if (motionData.points.at(pointPosition).time > time) {
                target = i;
                break;
            }
        }
        if (target == -1) {
            return motionData.points.at(pointPosition).value;
        }
        const segment = motionData.segments.at(target);
        return segment.evaluate(motionData.points.get(segment.basePointIndex), time);
    }
    /**
     * モーションクラス
     *
     * モーションのクラス。
     */
    class CubismMotion extends ACubismMotion {
        /**
         * インスタンスを作成する
         *
         * @param buffer motion3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
         * @return 作成されたインスタンス
         */
        static create(buffer, size, onFinishedMotionHandler) {
            const ret = new CubismMotion();
            ret.parse(buffer, size);
            ret._sourceFrameRate = ret._motionData.fps;
            ret._loopDurationSeconds = ret._motionData.duration;
            ret._onFinishedMotion = onFinishedMotionHandler;
            // NOTE: Editorではループありのモーション書き出しは非対応
            // ret->_loop = (ret->_motionData->Loop > 0);
            return ret;
        }
        /**
         * モデルのパラメータの更新の実行
         * @param model             対象のモデル
         * @param userTimeSeconds   現在の時刻[秒]
         * @param fadeWeight        モーションの重み
         * @param motionQueueEntry  CubismMotionQueueManagerで管理されているモーション
         */
        doUpdateParameters(model, userTimeSeconds, fadeWeight, motionQueueEntry) {
            if (this._modelCurveIdEyeBlink == null) {
                this._modelCurveIdEyeBlink =
                    CubismFramework.getIdManager().getId(EffectNameEyeBlink);
            }
            if (this._modelCurveIdLipSync == null) {
                this._modelCurveIdLipSync =
                    CubismFramework.getIdManager().getId(EffectNameLipSync);
            }
            if (this._modelCurveIdOpacity == null) {
                this._modelCurveIdOpacity =
                    CubismFramework.getIdManager().getId(IdNameOpacity);
            }
            let timeOffsetSeconds = userTimeSeconds - motionQueueEntry.getStartTime();
            if (timeOffsetSeconds < 0.0) {
                timeOffsetSeconds = 0.0; // エラー回避
            }
            let lipSyncValue = Number.MAX_VALUE;
            let eyeBlinkValue = Number.MAX_VALUE;
            //まばたき、リップシンクのうちモーションの適用を検出するためのビット（maxFlagCount個まで
            const MaxTargetSize = 64;
            let lipSyncFlags = 0;
            let eyeBlinkFlags = 0;
            //瞬き、リップシンクのターゲット数が上限を超えている場合
            if (this._eyeBlinkParameterIds.getSize() > MaxTargetSize) {
                CubismLogDebug('too many eye blink targets : {0}', this._eyeBlinkParameterIds.getSize());
            }
            if (this._lipSyncParameterIds.getSize() > MaxTargetSize) {
                CubismLogDebug('too many lip sync targets : {0}', this._lipSyncParameterIds.getSize());
            }
            const tmpFadeIn = this._fadeInSeconds <= 0.0
                ? 1.0
                : CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) /
                    this._fadeInSeconds);
            const tmpFadeOut = this._fadeOutSeconds <= 0.0 || motionQueueEntry.getEndTime() < 0.0
                ? 1.0
                : CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) /
                    this._fadeOutSeconds);
            let value;
            let c, parameterIndex;
            // 'Repeat' time as necessary.
            let time = timeOffsetSeconds;
            if (this._isLoop) {
                while (time > this._motionData.duration) {
                    time -= this._motionData.duration;
                }
            }
            const curves = this._motionData.curves;
            // Evaluate model curves.
            for (c = 0; c < this._motionData.curveCount &&
                curves.at(c).type ==
                    CubismMotionCurveTarget.CubismMotionCurveTarget_Model; ++c) {
                // Evaluate curve and call handler.
                value = evaluateCurve(this._motionData, c, time);
                if (curves.at(c).id == this._modelCurveIdEyeBlink) {
                    eyeBlinkValue = value;
                }
                else if (curves.at(c).id == this._modelCurveIdLipSync) {
                    lipSyncValue = value;
                }
                else if (curves.at(c).id == this._modelCurveIdOpacity) {
                    this._modelOpacity = value;
                    model.setModelOapcity(this.getModelOpacityValue());
                }
            }
            for (; c < this._motionData.curveCount &&
                curves.at(c).type ==
                    CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter; ++c) {
                // Find parameter index.
                parameterIndex = model.getParameterIndex(curves.at(c).id);
                // Skip curve evaluation if no value in sink.
                if (parameterIndex == -1) {
                    continue;
                }
                const sourceValue = model.getParameterValueByIndex(parameterIndex);
                // Evaluate curve and apply value.
                value = evaluateCurve(this._motionData, c, time);
                if (eyeBlinkValue != Number.MAX_VALUE) {
                    for (let i = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i) {
                        if (this._eyeBlinkParameterIds.at(i) == curves.at(c).id) {
                            value *= eyeBlinkValue;
                            eyeBlinkFlags |= 1 << i;
                            break;
                        }
                    }
                }
                if (lipSyncValue != Number.MAX_VALUE) {
                    for (let i = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i) {
                        if (this._lipSyncParameterIds.at(i) == curves.at(c).id) {
                            value += lipSyncValue;
                            lipSyncFlags |= 1 << i;
                            break;
                        }
                    }
                }
                let v;
                // パラメータごとのフェード
                if (curves.at(c).fadeInTime < 0.0 && curves.at(c).fadeOutTime < 0.0) {
                    // モーションのフェードを適用
                    v = sourceValue + (value - sourceValue) * fadeWeight;
                }
                else {
                    // パラメータに対してフェードインかフェードアウトが設定してある場合はそちらを適用
                    let fin;
                    let fout;
                    if (curves.at(c).fadeInTime < 0.0) {
                        fin = tmpFadeIn;
                    }
                    else {
                        fin =
                            curves.at(c).fadeInTime == 0.0
                                ? 1.0
                                : CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) /
                                    curves.at(c).fadeInTime);
                    }
                    if (curves.at(c).fadeOutTime < 0.0) {
                        fout = tmpFadeOut;
                    }
                    else {
                        fout =
                            curves.at(c).fadeOutTime == 0.0 ||
                                motionQueueEntry.getEndTime() < 0.0
                                ? 1.0
                                : CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) /
                                    curves.at(c).fadeOutTime);
                    }
                    const paramWeight = this._weight * fin * fout;
                    // パラメータごとのフェードを適用
                    v = sourceValue + (value - sourceValue) * paramWeight;
                }
                model.setParameterValueByIndex(parameterIndex, v, 1.0);
            }
            {
                if (eyeBlinkValue != Number.MAX_VALUE) {
                    for (let i = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i) {
                        const sourceValue = model.getParameterValueById(this._eyeBlinkParameterIds.at(i));
                        // モーションでの上書きがあった時にはまばたきは適用しない
                        if ((eyeBlinkFlags >> i) & 0x01) {
                            continue;
                        }
                        const v = sourceValue + (eyeBlinkValue - sourceValue) * fadeWeight;
                        model.setParameterValueById(this._eyeBlinkParameterIds.at(i), v);
                    }
                }
                if (lipSyncValue != Number.MAX_VALUE) {
                    for (let i = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i) {
                        const sourceValue = model.getParameterValueById(this._lipSyncParameterIds.at(i));
                        // モーションでの上書きがあった時にはリップシンクは適用しない
                        if ((lipSyncFlags >> i) & 0x01) {
                            continue;
                        }
                        const v = sourceValue + (lipSyncValue - sourceValue) * fadeWeight;
                        model.setParameterValueById(this._lipSyncParameterIds.at(i), v);
                    }
                }
            }
            for (; c < this._motionData.curveCount &&
                curves.at(c).type ==
                    CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity; ++c) {
                // Find parameter index.
                parameterIndex = model.getParameterIndex(curves.at(c).id);
                // Skip curve evaluation if no value in sink.
                if (parameterIndex == -1) {
                    continue;
                }
                // Evaluate curve and apply value.
                value = evaluateCurve(this._motionData, c, time);
                model.setParameterValueByIndex(parameterIndex, value);
            }
            if (timeOffsetSeconds >= this._motionData.duration) {
                if (this._isLoop) {
                    motionQueueEntry.setStartTime(userTimeSeconds); // 最初の状態へ
                    if (this._isLoopFadeIn) {
                        // ループ内でループ用フェードインが有効の時は、フェードイン設定し直し
                        motionQueueEntry.setFadeInStartTime(userTimeSeconds);
                    }
                }
                else {
                    if (this._onFinishedMotion) {
                        this._onFinishedMotion(this);
                    }
                    motionQueueEntry.setIsFinished(true);
                }
            }
            this._lastWeight = fadeWeight;
        }
        /**
         * ループ情報の設定
         * @param loop ループ情報
         */
        setIsLoop(loop) {
            this._isLoop = loop;
        }
        /**
         * ループ情報の取得
         * @return true ループする
         * @return false ループしない
         */
        isLoop() {
            return this._isLoop;
        }
        /**
         * ループ時のフェードイン情報の設定
         * @param loopFadeIn  ループ時のフェードイン情報
         */
        setIsLoopFadeIn(loopFadeIn) {
            this._isLoopFadeIn = loopFadeIn;
        }
        /**
         * ループ時のフェードイン情報の取得
         *
         * @return  true    する
         * @return  false   しない
         */
        isLoopFadeIn() {
            return this._isLoopFadeIn;
        }
        /**
         * モーションの長さを取得する。
         *
         * @return  モーションの長さ[秒]
         */
        getDuration() {
            return this._isLoop ? -1.0 : this._loopDurationSeconds;
        }
        /**
         * モーションのループ時の長さを取得する。
         *
         * @return  モーションのループ時の長さ[秒]
         */
        getLoopDuration() {
            return this._loopDurationSeconds;
        }
        /**
         * パラメータに対するフェードインの時間を設定する。
         *
         * @param parameterId     パラメータID
         * @param value           フェードインにかかる時間[秒]
         */
        setParameterFadeInTime(parameterId, value) {
            const curves = this._motionData.curves;
            for (let i = 0; i < this._motionData.curveCount; ++i) {
                if (parameterId == curves.at(i).id) {
                    curves.at(i).fadeInTime = value;
                    return;
                }
            }
        }
        /**
         * パラメータに対するフェードアウトの時間の設定
         * @param parameterId     パラメータID
         * @param value           フェードアウトにかかる時間[秒]
         */
        setParameterFadeOutTime(parameterId, value) {
            const curves = this._motionData.curves;
            for (let i = 0; i < this._motionData.curveCount; ++i) {
                if (parameterId == curves.at(i).id) {
                    curves.at(i).fadeOutTime = value;
                    return;
                }
            }
        }
        /**
         * パラメータに対するフェードインの時間の取得
         * @param    parameterId     パラメータID
         * @return   フェードインにかかる時間[秒]
         */
        getParameterFadeInTime(parameterId) {
            const curves = this._motionData.curves;
            for (let i = 0; i < this._motionData.curveCount; ++i) {
                if (parameterId == curves.at(i).id) {
                    return curves.at(i).fadeInTime;
                }
            }
            return -1;
        }
        /**
         * パラメータに対するフェードアウトの時間を取得
         *
         * @param   parameterId     パラメータID
         * @return   フェードアウトにかかる時間[秒]
         */
        getParameterFadeOutTime(parameterId) {
            const curves = this._motionData.curves;
            for (let i = 0; i < this._motionData.curveCount; ++i) {
                if (parameterId == curves.at(i).id) {
                    return curves.at(i).fadeOutTime;
                }
            }
            return -1;
        }
        /**
         * 自動エフェクトがかかっているパラメータIDリストの設定
         * @param eyeBlinkParameterIds    自動まばたきがかかっているパラメータIDのリスト
         * @param lipSyncParameterIds     リップシンクがかかっているパラメータIDのリスト
         */
        setEffectIds(eyeBlinkParameterIds, lipSyncParameterIds) {
            this._eyeBlinkParameterIds = eyeBlinkParameterIds;
            this._lipSyncParameterIds = lipSyncParameterIds;
        }
        /**
         * コンストラクタ
         */
        constructor() {
            super();
            this._sourceFrameRate = 30.0;
            this._loopDurationSeconds = -1.0;
            this._isLoop = false; // trueから false へデフォルトを変更
            this._isLoopFadeIn = true; // ループ時にフェードインが有効かどうかのフラグ
            this._lastWeight = 0.0;
            this._motionData = null;
            this._modelCurveIdEyeBlink = null;
            this._modelCurveIdLipSync = null;
            this._modelCurveIdOpacity = null;
            this._eyeBlinkParameterIds = null;
            this._lipSyncParameterIds = null;
            this._modelOpacity = 1.0;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            this._motionData = void 0;
            this._motionData = null;
        }
        /**
         * motion3.jsonをパースする。
         *
         * @param motionJson  motion3.jsonが読み込まれているバッファ
         * @param size        バッファのサイズ
         */
        parse(motionJson, size) {
            this._motionData = new CubismMotionData();
            let json = new CubismMotionJson(motionJson, size);
            this._motionData.duration = json.getMotionDuration();
            this._motionData.loop = json.isMotionLoop();
            this._motionData.curveCount = json.getMotionCurveCount();
            this._motionData.fps = json.getMotionFps();
            this._motionData.eventCount = json.getEventCount();
            const areBeziersRestructed = json.getEvaluationOptionFlag(EvaluationOptionFlag.EvaluationOptionFlag_AreBeziersRistricted);
            if (json.isExistMotionFadeInTime()) {
                this._fadeInSeconds =
                    json.getMotionFadeInTime() < 0.0 ? 1.0 : json.getMotionFadeInTime();
            }
            else {
                this._fadeInSeconds = 1.0;
            }
            if (json.isExistMotionFadeOutTime()) {
                this._fadeOutSeconds =
                    json.getMotionFadeOutTime() < 0.0 ? 1.0 : json.getMotionFadeOutTime();
            }
            else {
                this._fadeOutSeconds = 1.0;
            }
            this._motionData.curves.updateSize(this._motionData.curveCount, CubismMotionCurve, true);
            this._motionData.segments.updateSize(json.getMotionTotalSegmentCount(), CubismMotionSegment, true);
            this._motionData.points.updateSize(json.getMotionTotalPointCount(), CubismMotionPoint, true);
            this._motionData.events.updateSize(this._motionData.eventCount, CubismMotionEvent, true);
            let totalPointCount = 0;
            let totalSegmentCount = 0;
            // Curves
            for (let curveCount = 0; curveCount < this._motionData.curveCount; ++curveCount) {
                if (json.getMotionCurveTarget(curveCount) == TargetNameModel) {
                    this._motionData.curves.at(curveCount).type =
                        CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
                }
                else if (json.getMotionCurveTarget(curveCount) == TargetNameParameter) {
                    this._motionData.curves.at(curveCount).type =
                        CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter;
                }
                else if (json.getMotionCurveTarget(curveCount) == TargetNamePartOpacity) {
                    this._motionData.curves.at(curveCount).type =
                        CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity;
                }
                else {
                    CubismLogWarning('Warning : Unable to get segment type from Curve! The number of "CurveCount" may be incorrect!');
                }
                this._motionData.curves.at(curveCount).id =
                    json.getMotionCurveId(curveCount);
                this._motionData.curves.at(curveCount).baseSegmentIndex =
                    totalSegmentCount;
                this._motionData.curves.at(curveCount).fadeInTime =
                    json.isExistMotionCurveFadeInTime(curveCount)
                        ? json.getMotionCurveFadeInTime(curveCount)
                        : -1.0;
                this._motionData.curves.at(curveCount).fadeOutTime =
                    json.isExistMotionCurveFadeOutTime(curveCount)
                        ? json.getMotionCurveFadeOutTime(curveCount)
                        : -1.0;
                // Segments
                for (let segmentPosition = 0; segmentPosition < json.getMotionCurveSegmentCount(curveCount);) {
                    if (segmentPosition == 0) {
                        this._motionData.segments.at(totalSegmentCount).basePointIndex =
                            totalPointCount;
                        this._motionData.points.at(totalPointCount).time =
                            json.getMotionCurveSegment(curveCount, segmentPosition);
                        this._motionData.points.at(totalPointCount).value =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                        totalPointCount += 1;
                        segmentPosition += 2;
                    }
                    else {
                        this._motionData.segments.at(totalSegmentCount).basePointIndex =
                            totalPointCount - 1;
                    }
                    const segment = json.getMotionCurveSegment(curveCount, segmentPosition);
                    switch (segment) {
                        case CubismMotionSegmentType.CubismMotionSegmentType_Linear: {
                            this._motionData.segments.at(totalSegmentCount).segmentType =
                                CubismMotionSegmentType.CubismMotionSegmentType_Linear;
                            this._motionData.segments.at(totalSegmentCount).evaluate =
                                linearEvaluate;
                            this._motionData.points.at(totalPointCount).time =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                            this._motionData.points.at(totalPointCount).value =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                            totalPointCount += 1;
                            segmentPosition += 3;
                            break;
                        }
                        case CubismMotionSegmentType.CubismMotionSegmentType_Bezier: {
                            this._motionData.segments.at(totalSegmentCount).segmentType =
                                CubismMotionSegmentType.CubismMotionSegmentType_Bezier;
                            if (areBeziersRestructed || UseOldBeziersCurveMotion) {
                                this._motionData.segments.at(totalSegmentCount).evaluate =
                                    bezierEvaluate;
                            }
                            else {
                                this._motionData.segments.at(totalSegmentCount).evaluate =
                                    bezierEvaluateCardanoInterpretation;
                            }
                            this._motionData.points.at(totalPointCount).time =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                            this._motionData.points.at(totalPointCount).value =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                            this._motionData.points.at(totalPointCount + 1).time =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 3);
                            this._motionData.points.at(totalPointCount + 1).value =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 4);
                            this._motionData.points.at(totalPointCount + 2).time =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 5);
                            this._motionData.points.at(totalPointCount + 2).value =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 6);
                            totalPointCount += 3;
                            segmentPosition += 7;
                            break;
                        }
                        case CubismMotionSegmentType.CubismMotionSegmentType_Stepped: {
                            this._motionData.segments.at(totalSegmentCount).segmentType =
                                CubismMotionSegmentType.CubismMotionSegmentType_Stepped;
                            this._motionData.segments.at(totalSegmentCount).evaluate =
                                steppedEvaluate;
                            this._motionData.points.at(totalPointCount).time =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                            this._motionData.points.at(totalPointCount).value =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                            totalPointCount += 1;
                            segmentPosition += 3;
                            break;
                        }
                        case CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped: {
                            this._motionData.segments.at(totalSegmentCount).segmentType =
                                CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped;
                            this._motionData.segments.at(totalSegmentCount).evaluate =
                                inverseSteppedEvaluate;
                            this._motionData.points.at(totalPointCount).time =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                            this._motionData.points.at(totalPointCount).value =
                                json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                            totalPointCount += 1;
                            segmentPosition += 3;
                            break;
                        }
                        default: {
                            CSM_ASSERT(0);
                            break;
                        }
                    }
                    ++this._motionData.curves.at(curveCount).segmentCount;
                    ++totalSegmentCount;
                }
            }
            for (let userdatacount = 0; userdatacount < json.getEventCount(); ++userdatacount) {
                this._motionData.events.at(userdatacount).fireTime =
                    json.getEventTime(userdatacount);
                this._motionData.events.at(userdatacount).value =
                    json.getEventValue(userdatacount);
            }
            json.release();
            json = void 0;
            json = null;
        }
        /**
         * モデルのパラメータ更新
         *
         * イベント発火のチェック。
         * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
         *
         * @param beforeCheckTimeSeconds   前回のイベントチェック時間[秒]
         * @param motionTimeSeconds        今回の再生時間[秒]
         */
        getFiredEvent(beforeCheckTimeSeconds, motionTimeSeconds) {
            this._firedEventValues.updateSize(0);
            // イベントの発火チェック
            for (let u = 0; u < this._motionData.eventCount; ++u) {
                if (this._motionData.events.at(u).fireTime > beforeCheckTimeSeconds &&
                    this._motionData.events.at(u).fireTime <= motionTimeSeconds) {
                    this._firedEventValues.pushBack(new csmString(this._motionData.events.at(u).value.s));
                }
            }
            return this._firedEventValues;
        }
        /**
         * 透明度のカーブが存在するかどうかを確認する
         *
         * @returns true  -> キーが存在する
         *          false -> キーが存在しない
         */
        isExistModelOpacity() {
            for (let i = 0; i < this._motionData.curveCount; i++) {
                const curve = this._motionData.curves.at(i);
                if (curve.type != CubismMotionCurveTarget.CubismMotionCurveTarget_Model) {
                    continue;
                }
                if (curve.id.getString().s.localeCompare(IdNameOpacity) == 0) {
                    return true;
                }
            }
            return false;
        }
        /**
         * 透明度のカーブのインデックスを返す
         *
         * @returns success:透明度のカーブのインデックス
         */
        getModelOpacityIndex() {
            if (this.isExistModelOpacity()) {
                for (let i = 0; i < this._motionData.curveCount; i++) {
                    const curve = this._motionData.curves.at(i);
                    if (curve.type != CubismMotionCurveTarget.CubismMotionCurveTarget_Model) {
                        continue;
                    }
                    if (curve.id.getString().s.localeCompare(IdNameOpacity) == 0) {
                        return i;
                    }
                }
            }
            return -1;
        }
        /**
         * 透明度のIdを返す
         *
         * @param index モーションカーブのインデックス
         * @returns success:透明度のカーブのインデックス
         */
        getModelOpacityId(index) {
            if (index != -1) {
                const curve = this._motionData.curves.at(index);
                if (curve.type == CubismMotionCurveTarget.CubismMotionCurveTarget_Model) {
                    if (curve.id.getString().s.localeCompare(IdNameOpacity) == 0) {
                        return CubismFramework.getIdManager().getId(curve.id.getString().s);
                    }
                }
            }
            return null;
        }
        /**
         * 現在時間の透明度の値を返す
         *
         * @returns success:モーションの当該時間におけるOpacityの値
         */
        getModelOpacityValue() {
            return this._modelOpacity;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$g;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismMotion = CubismMotion;
    })(Live2DCubismFramework$g || (Live2DCubismFramework$g = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * CubismMotionQueueManagerで再生している各モーションの管理クラス。
     */
    class CubismMotionQueueEntry {
        /**
         * コンストラクタ
         */
        constructor() {
            this._autoDelete = false;
            this._motion = null;
            this._available = true;
            this._finished = false;
            this._started = false;
            this._startTimeSeconds = -1.0;
            this._fadeInStartTimeSeconds = 0.0;
            this._endTimeSeconds = -1.0;
            this._stateTimeSeconds = 0.0;
            this._stateWeight = 0.0;
            this._lastEventCheckSeconds = 0.0;
            this._motionQueueEntryHandle = this;
            this._fadeOutSeconds = 0.0;
            this._isTriggeredFadeOut = false;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            if (this._autoDelete && this._motion) {
                ACubismMotion.delete(this._motion); //
            }
        }
        /**
         * フェードアウト時間と開始判定の設定
         * @param fadeOutSeconds フェードアウトにかかる時間[秒]
         */
        setFadeOut(fadeOutSeconds) {
            this._fadeOutSeconds = fadeOutSeconds;
            this._isTriggeredFadeOut = true;
        }
        /**
         * フェードアウトの開始
         * @param fadeOutSeconds フェードアウトにかかる時間[秒]
         * @param userTimeSeconds デルタ時間の積算値[秒]
         */
        startFadeOut(fadeOutSeconds, userTimeSeconds) {
            const newEndTimeSeconds = userTimeSeconds + fadeOutSeconds;
            this._isTriggeredFadeOut = true;
            if (this._endTimeSeconds < 0.0 ||
                newEndTimeSeconds < this._endTimeSeconds) {
                this._endTimeSeconds = newEndTimeSeconds;
            }
        }
        /**
         * モーションの終了の確認
         *
         * @return true モーションが終了した
         * @return false 終了していない
         */
        isFinished() {
            return this._finished;
        }
        /**
         * モーションの開始の確認
         * @return true モーションが開始した
         * @return false 開始していない
         */
        isStarted() {
            return this._started;
        }
        /**
         * モーションの開始時刻の取得
         * @return モーションの開始時刻[秒]
         */
        getStartTime() {
            return this._startTimeSeconds;
        }
        /**
         * フェードインの開始時刻の取得
         * @return フェードインの開始時刻[秒]
         */
        getFadeInStartTime() {
            return this._fadeInStartTimeSeconds;
        }
        /**
         * フェードインの終了時刻の取得
         * @return フェードインの終了時刻の取得
         */
        getEndTime() {
            return this._endTimeSeconds;
        }
        /**
         * モーションの開始時刻の設定
         * @param startTime モーションの開始時刻
         */
        setStartTime(startTime) {
            this._startTimeSeconds = startTime;
        }
        /**
         * フェードインの開始時刻の設定
         * @param startTime フェードインの開始時刻[秒]
         */
        setFadeInStartTime(startTime) {
            this._fadeInStartTimeSeconds = startTime;
        }
        /**
         * フェードインの終了時刻の設定
         * @param endTime フェードインの終了時刻[秒]
         */
        setEndTime(endTime) {
            this._endTimeSeconds = endTime;
        }
        /**
         * モーションの終了の設定
         * @param f trueならモーションの終了
         */
        setIsFinished(f) {
            this._finished = f;
        }
        /**
         * モーション開始の設定
         * @param f trueならモーションの開始
         */
        setIsStarted(f) {
            this._started = f;
        }
        /**
         * モーションの有効性の確認
         * @return true モーションは有効
         * @return false モーションは無効
         */
        isAvailable() {
            return this._available;
        }
        /**
         * モーションの有効性の設定
         * @param v trueならモーションは有効
         */
        setIsAvailable(v) {
            this._available = v;
        }
        /**
         * モーションの状態の設定
         * @param timeSeconds 現在時刻[秒]
         * @param weight モーション尾重み
         */
        setState(timeSeconds, weight) {
            this._stateTimeSeconds = timeSeconds;
            this._stateWeight = weight;
        }
        /**
         * モーションの現在時刻の取得
         * @return モーションの現在時刻[秒]
         */
        getStateTime() {
            return this._stateTimeSeconds;
        }
        /**
         * モーションの重みの取得
         * @return モーションの重み
         */
        getStateWeight() {
            return this._stateWeight;
        }
        /**
         * 最後にイベントの発火をチェックした時間を取得
         *
         * @return 最後にイベントの発火をチェックした時間[秒]
         */
        getLastCheckEventSeconds() {
            return this._lastEventCheckSeconds;
        }
        /**
         * 最後にイベントをチェックした時間を設定
         * @param checkSeconds 最後にイベントをチェックした時間[秒]
         */
        setLastCheckEventSeconds(checkSeconds) {
            this._lastEventCheckSeconds = checkSeconds;
        }
        /**
         * フェードアウト開始判定の取得
         * @return フェードアウト開始するかどうか
         */
        isTriggeredFadeOut() {
            return this._isTriggeredFadeOut;
        }
        /**
         * フェードアウト時間の取得
         * @return フェードアウト時間[秒]
         */
        getFadeOutSeconds() {
            return this._fadeOutSeconds;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$f;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismMotionQueueEntry = CubismMotionQueueEntry;
    })(Live2DCubismFramework$f || (Live2DCubismFramework$f = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * モーション再生の管理
     *
     * モーション再生の管理用クラス。CubismMotionモーションなどACubismMotionのサブクラスを再生するために使用する。
     *
     * @note 再生中に別のモーションが StartMotion()された場合は、新しいモーションに滑らかに変化し旧モーションは中断する。
     *       表情用モーション、体用モーションなどを分けてモーション化した場合など、
     *       複数のモーションを同時に再生させる場合は、複数のCubismMotionQueueManagerインスタンスを使用する。
     */
    class CubismMotionQueueManager {
        /**
         * コンストラクタ
         */
        constructor() {
            this._userTimeSeconds = 0.0;
            this._eventCallBack = null;
            this._eventCustomData = null;
            this._motions = new csmVector();
        }
        /**
         * デストラクタ
         */
        release() {
            for (let i = 0; i < this._motions.getSize(); ++i) {
                if (this._motions.at(i)) {
                    this._motions.at(i).release();
                    this._motions.set(i, null);
                }
            }
            this._motions = null;
        }
        /**
         * 指定したモーションの開始
         *
         * 指定したモーションを開始する。同じタイプのモーションが既にある場合は、既存のモーションに終了フラグを立て、フェードアウトを開始させる。
         *
         * @param   motion          開始するモーション
         * @param   autoDelete      再生が終了したモーションのインスタンスを削除するなら true
         * @param   userTimeSeconds デルタ時間の積算値[秒]
         * @return                      開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
         */
        startMotion(motion, autoDelete, userTimeSeconds) {
            if (motion == null) {
                return InvalidMotionQueueEntryHandleValue;
            }
            let motionQueueEntry = null;
            // 既にモーションがあれば終了フラグを立てる
            for (let i = 0; i < this._motions.getSize(); ++i) {
                motionQueueEntry = this._motions.at(i);
                if (motionQueueEntry == null) {
                    continue;
                }
                motionQueueEntry.setFadeOut(motionQueueEntry._motion.getFadeOutTime()); // フェードアウト設定
            }
            motionQueueEntry = new CubismMotionQueueEntry(); // 終了時に破棄する
            motionQueueEntry._autoDelete = autoDelete;
            motionQueueEntry._motion = motion;
            this._motions.pushBack(motionQueueEntry);
            return motionQueueEntry._motionQueueEntryHandle;
        }
        /**
         * 全てのモーションの終了の確認
         * @return true 全て終了している
         * @return false 終了していない
         */
        isFinished() {
            // ------- 処理を行う -------
            // 既にモーションがあれば終了フラグを立てる
            for (let ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                let motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite); // 削除
                    continue;
                }
                const motion = motionQueueEntry._motion;
                if (motion == null) {
                    motionQueueEntry.release();
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite); // 削除
                    continue;
                }
                // ----- 終了済みの処理があれば削除する ------
                if (!motionQueueEntry.isFinished()) {
                    return false;
                }
                else {
                    ite.preIncrement();
                }
            }
            return true;
        }
        /**
         * 指定したモーションの終了の確認
         * @param motionQueueEntryNumber モーションの識別番号
         * @return true 全て終了している
         * @return false 終了していない
         */
        isFinishedByHandle(motionQueueEntryNumber) {
            for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.increment()) {
                const motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    continue;
                }
                if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber &&
                    !motionQueueEntry.isFinished()) {
                    return false;
                }
            }
            return true;
        }
        /**
         * 全てのモーションを停止する
         */
        stopAllMotions() {
            // ------- 処理を行う -------
            // 既にモーションがあれば終了フラグを立てる
            for (let ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                let motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite);
                    continue;
                }
                // ----- 終了済みの処理があれば削除する ------
                motionQueueEntry.release();
                motionQueueEntry = null;
                ite = this._motions.erase(ite); // 削除
            }
        }
        /**
             * 指定したCubismMotionQueueEntryの取得
      
              * @param   motionQueueEntryNumber  モーションの識別番号
              * @return  指定したCubismMotionQueueEntry
              * @return  null   見つからなかった
              */
        getCubismMotionQueueEntry(motionQueueEntryNumber) {
            //------- 処理を行う -------
            for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.preIncrement()) {
                const motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    continue;
                }
                if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber) {
                    return motionQueueEntry;
                }
            }
            return null;
        }
        /**
         * イベントを受け取るCallbackの登録
         *
         * @param callback コールバック関数
         * @param customData コールバックに返されるデータ
         */
        setEventCallback(callback, customData = null) {
            this._eventCallBack = callback;
            this._eventCustomData = customData;
        }
        /**
         * モーションを更新して、モデルにパラメータ値を反映する。
         *
         * @param   model   対象のモデル
         * @param   userTimeSeconds   デルタ時間の積算値[秒]
         * @return  true    モデルへパラメータ値の反映あり
         * @return  false   モデルへパラメータ値の反映なし(モーションの変化なし)
         */
        doUpdateMotion(model, userTimeSeconds) {
            let updated = false;
            // ------- 処理を行う --------
            // 既にモーションがあれば終了フラグを立てる
            for (let ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                let motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite); // 削除
                    continue;
                }
                const motion = motionQueueEntry._motion;
                if (motion == null) {
                    motionQueueEntry.release();
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite); // 削除
                    continue;
                }
                // ------ 値を反映する ------
                motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
                updated = true;
                // ------ ユーザトリガーイベントを検査する ----
                const firedList = motion.getFiredEvent(motionQueueEntry.getLastCheckEventSeconds() -
                    motionQueueEntry.getStartTime(), userTimeSeconds - motionQueueEntry.getStartTime());
                for (let i = 0; i < firedList.getSize(); ++i) {
                    this._eventCallBack(this, firedList.at(i), this._eventCustomData);
                }
                motionQueueEntry.setLastCheckEventSeconds(userTimeSeconds);
                // ------ 終了済みの処理があれば削除する ------
                if (motionQueueEntry.isFinished()) {
                    motionQueueEntry.release();
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite); // 削除
                }
                else {
                    if (motionQueueEntry.isTriggeredFadeOut()) {
                        motionQueueEntry.startFadeOut(motionQueueEntry.getFadeOutSeconds(), userTimeSeconds);
                    }
                    ite.preIncrement();
                }
            }
            return updated;
        }
    }
    const InvalidMotionQueueEntryHandleValue = -1;
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$e;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismMotionQueueManager = CubismMotionQueueManager;
        Live2DCubismFramework.InvalidMotionQueueEntryHandleValue = InvalidMotionQueueEntryHandleValue;
    })(Live2DCubismFramework$e || (Live2DCubismFramework$e = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * モーションの管理
     *
     * モーションの管理を行うクラス
     */
    class CubismMotionManager extends CubismMotionQueueManager {
        /**
         * コンストラクタ
         */
        constructor() {
            super();
            this._currentPriority = 0;
            this._reservePriority = 0;
        }
        /**
         * 再生中のモーションの優先度の取得
         * @return  モーションの優先度
         */
        getCurrentPriority() {
            return this._currentPriority;
        }
        /**
         * 予約中のモーションの優先度を取得する。
         * @return  モーションの優先度
         */
        getReservePriority() {
            return this._reservePriority;
        }
        /**
         * 予約中のモーションの優先度を設定する。
         * @param   val     優先度
         */
        setReservePriority(val) {
            this._reservePriority = val;
        }
        /**
         * 優先度を設定してモーションを開始する。
         *
         * @param motion          モーション
         * @param autoDelete      再生が狩猟したモーションのインスタンスを削除するならtrue
         * @param priority        優先度
         * @return                開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
         */
        startMotionPriority(motion, autoDelete, priority) {
            if (priority == this._reservePriority) {
                this._reservePriority = 0; // 予約を解除
            }
            this._currentPriority = priority; // 再生中モーションの優先度を設定
            return super.startMotion(motion, autoDelete, this._userTimeSeconds);
        }
        /**
         * モーションを更新して、モデルにパラメータ値を反映する。
         *
         * @param model   対象のモデル
         * @param deltaTimeSeconds    デルタ時間[秒]
         * @return  true    更新されている
         * @return  false   更新されていない
         */
        updateMotion(model, deltaTimeSeconds) {
            this._userTimeSeconds += deltaTimeSeconds;
            const updated = super.doUpdateMotion(model, this._userTimeSeconds);
            if (this.isFinished()) {
                this._currentPriority = 0; // 再生中のモーションの優先度を解除
            }
            return updated;
        }
        /**
         * モーションを予約する。
         *
         * @param   priority    優先度
         * @return  true    予約できた
         * @return  false   予約できなかった
         */
        reserveMotion(priority) {
            if (priority <= this._reservePriority ||
                priority <= this._currentPriority) {
                return false;
            }
            this._reservePriority = priority;
            return true;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$d;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismMotionManager = CubismMotionManager;
    })(Live2DCubismFramework$d || (Live2DCubismFramework$d = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * 物理演算の適用先の種類
     */
    var CubismPhysicsTargetType;
    (function (CubismPhysicsTargetType) {
        CubismPhysicsTargetType[CubismPhysicsTargetType["CubismPhysicsTargetType_Parameter"] = 0] = "CubismPhysicsTargetType_Parameter";
    })(CubismPhysicsTargetType || (CubismPhysicsTargetType = {}));
    /**
     * 物理演算の入力の種類
     */
    var CubismPhysicsSource;
    (function (CubismPhysicsSource) {
        CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_X"] = 0] = "CubismPhysicsSource_X";
        CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_Y"] = 1] = "CubismPhysicsSource_Y";
        CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_Angle"] = 2] = "CubismPhysicsSource_Angle";
    })(CubismPhysicsSource || (CubismPhysicsSource = {}));
    /**
     * @brief 物理演算で使用する外部の力
     *
     * 物理演算で使用する外部の力。
     */
    class PhysicsJsonEffectiveForces {
        constructor() {
            this.gravity = new CubismVector2(0, 0);
            this.wind = new CubismVector2(0, 0);
        }
    }
    /**
     * 物理演算のパラメータ情報
     */
    class CubismPhysicsParameter {
    }
    /**
     * 物理演算の正規化情報
     */
    class CubismPhysicsNormalization {
    }
    /**
     * 物理演算の演算委使用する物理点の情報
     */
    class CubismPhysicsParticle {
        constructor() {
            this.initialPosition = new CubismVector2(0, 0);
            this.position = new CubismVector2(0, 0);
            this.lastPosition = new CubismVector2(0, 0);
            this.lastGravity = new CubismVector2(0, 0);
            this.force = new CubismVector2(0, 0);
            this.velocity = new CubismVector2(0, 0);
        }
    }
    /**
     * 物理演算の物理点の管理
     */
    class CubismPhysicsSubRig {
        constructor() {
            this.normalizationPosition = new CubismPhysicsNormalization();
            this.normalizationAngle = new CubismPhysicsNormalization();
        }
    }
    /**
     * 物理演算の入力情報
     */
    class CubismPhysicsInput {
        constructor() {
            this.source = new CubismPhysicsParameter();
        }
    }
    /**
     * @brief 物理演算の出力情報
     *
     * 物理演算の出力情報。
     */
    class CubismPhysicsOutput {
        constructor() {
            this.destination = new CubismPhysicsParameter();
            this.translationScale = new CubismVector2(0, 0);
        }
    }
    /**
     * @brief 物理演算のデータ
     *
     * 物理演算のデータ。
     */
    class CubismPhysicsRig {
        constructor() {
            this.settings = new csmVector();
            this.inputs = new csmVector();
            this.outputs = new csmVector();
            this.particles = new csmVector();
            this.gravity = new CubismVector2(0, 0);
            this.wind = new CubismVector2(0, 0);
            this.fps = 0.0;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$c;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismPhysicsInput = CubismPhysicsInput;
        Live2DCubismFramework.CubismPhysicsNormalization = CubismPhysicsNormalization;
        Live2DCubismFramework.CubismPhysicsOutput = CubismPhysicsOutput;
        Live2DCubismFramework.CubismPhysicsParameter = CubismPhysicsParameter;
        Live2DCubismFramework.CubismPhysicsParticle = CubismPhysicsParticle;
        Live2DCubismFramework.CubismPhysicsRig = CubismPhysicsRig;
        Live2DCubismFramework.CubismPhysicsSource = CubismPhysicsSource;
        Live2DCubismFramework.CubismPhysicsSubRig = CubismPhysicsSubRig;
        Live2DCubismFramework.CubismPhysicsTargetType = CubismPhysicsTargetType;
        Live2DCubismFramework.PhysicsJsonEffectiveForces = PhysicsJsonEffectiveForces;
    })(Live2DCubismFramework$c || (Live2DCubismFramework$c = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    // JSON keys
    const Position = 'Position';
    const X = 'X';
    const Y = 'Y';
    const Angle = 'Angle';
    const Type = 'Type';
    const Id$2 = 'Id';
    // Meta
    const Meta$1 = 'Meta';
    const EffectiveForces = 'EffectiveForces';
    const TotalInputCount = 'TotalInputCount';
    const TotalOutputCount = 'TotalOutputCount';
    const PhysicsSettingCount = 'PhysicsSettingCount';
    const Gravity = 'Gravity';
    const Wind = 'Wind';
    const VertexCount = 'VertexCount';
    const Fps = 'Fps';
    // PhysicsSettings
    const PhysicsSettings = 'PhysicsSettings';
    const Normalization = 'Normalization';
    const Minimum = 'Minimum';
    const Maximum = 'Maximum';
    const Default = 'Default';
    const Reflect = 'Reflect';
    const Weight = 'Weight';
    // Input
    const Input = 'Input';
    const Source = 'Source';
    // Output
    const Output = 'Output';
    const Scale = 'Scale';
    const VertexIndex = 'VertexIndex';
    const Destination = 'Destination';
    // Particle
    const Vertices = 'Vertices';
    const Mobility = 'Mobility';
    const Delay = 'Delay';
    const Radius = 'Radius';
    const Acceleration = 'Acceleration';
    /**
     * physics3.jsonのコンテナ。
     */
    class CubismPhysicsJson {
        /**
         * コンストラクタ
         * @param buffer physics3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        constructor(buffer, size) {
            this._json = CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            CubismJson.delete(this._json);
        }
        /**
         * 重力の取得
         * @return 重力
         */
        getGravity() {
            const ret = new CubismVector2(0, 0);
            ret.x = this._json
                .getRoot()
                .getValueByString(Meta$1)
                .getValueByString(EffectiveForces)
                .getValueByString(Gravity)
                .getValueByString(X)
                .toFloat();
            ret.y = this._json
                .getRoot()
                .getValueByString(Meta$1)
                .getValueByString(EffectiveForces)
                .getValueByString(Gravity)
                .getValueByString(Y)
                .toFloat();
            return ret;
        }
        /**
         * 風の取得
         * @return 風
         */
        getWind() {
            const ret = new CubismVector2(0, 0);
            ret.x = this._json
                .getRoot()
                .getValueByString(Meta$1)
                .getValueByString(EffectiveForces)
                .getValueByString(Wind)
                .getValueByString(X)
                .toFloat();
            ret.y = this._json
                .getRoot()
                .getValueByString(Meta$1)
                .getValueByString(EffectiveForces)
                .getValueByString(Wind)
                .getValueByString(Y)
                .toFloat();
            return ret;
        }
        /**
         * 物理演算設定FPSの取得
         * @return 物理演算設定FPS
         */
        getFps() {
            return this._json
                .getRoot()
                .getValueByString(Meta$1)
                .getValueByString(Fps)
                .toFloat(0.0);
        }
        /**
         * 物理店の管理の個数の取得
         * @return 物理店の管理の個数
         */
        getSubRigCount() {
            return this._json
                .getRoot()
                .getValueByString(Meta$1)
                .getValueByString(PhysicsSettingCount)
                .toInt();
        }
        /**
         * 入力の総合計の取得
         * @return 入力の総合計
         */
        getTotalInputCount() {
            return this._json
                .getRoot()
                .getValueByString(Meta$1)
                .getValueByString(TotalInputCount)
                .toInt();
        }
        /**
         * 出力の総合計の取得
         * @return 出力の総合計
         */
        getTotalOutputCount() {
            return this._json
                .getRoot()
                .getValueByString(Meta$1)
                .getValueByString(TotalOutputCount)
                .toInt();
        }
        /**
         * 物理点の個数の取得
         * @return 物理点の個数
         */
        getVertexCount() {
            return this._json
                .getRoot()
                .getValueByString(Meta$1)
                .getValueByString(VertexCount)
                .toInt();
        }
        /**
         * 正規化された位置の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最小値
         */
        getNormalizationPositionMinimumValue(physicsSettingIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Normalization)
                .getValueByString(Position)
                .getValueByString(Minimum)
                .toFloat();
        }
        /**
         * 正規化された位置の最大値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最大値
         */
        getNormalizationPositionMaximumValue(physicsSettingIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Normalization)
                .getValueByString(Position)
                .getValueByString(Maximum)
                .toFloat();
        }
        /**
         * 正規化された位置のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置のデフォルト値
         */
        getNormalizationPositionDefaultValue(physicsSettingIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Normalization)
                .getValueByString(Position)
                .getValueByString(Default)
                .toFloat();
        }
        /**
         * 正規化された角度の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度の最小値
         */
        getNormalizationAngleMinimumValue(physicsSettingIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Normalization)
                .getValueByString(Angle)
                .getValueByString(Minimum)
                .toFloat();
        }
        /**
         * 正規化された角度の最大値の取得
         * @param physicsSettingIndex
         * @return 正規化された角度の最大値
         */
        getNormalizationAngleMaximumValue(physicsSettingIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Normalization)
                .getValueByString(Angle)
                .getValueByString(Maximum)
                .toFloat();
        }
        /**
         * 正規化された角度のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度のデフォルト値
         */
        getNormalizationAngleDefaultValue(physicsSettingIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Normalization)
                .getValueByString(Angle)
                .getValueByString(Default)
                .toFloat();
        }
        /**
         * 入力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 入力の個数
         */
        getInputCount(physicsSettingIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Input)
                .getVector()
                .getSize();
        }
        /**
         * 入力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の重み
         */
        getInputWeight(physicsSettingIndex, inputIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Input)
                .getValueByIndex(inputIndex)
                .getValueByString(Weight)
                .toFloat();
        }
        /**
         * 入力の反転の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の反転
         */
        getInputReflect(physicsSettingIndex, inputIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Input)
                .getValueByIndex(inputIndex)
                .getValueByString(Reflect)
                .toBoolean();
        }
        /**
         * 入力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の種類
         */
        getInputType(physicsSettingIndex, inputIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Input)
                .getValueByIndex(inputIndex)
                .getValueByString(Type)
                .getRawString();
        }
        /**
         * 入力元のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力元のID
         */
        getInputSourceId(physicsSettingIndex, inputIndex) {
            return CubismFramework.getIdManager().getId(this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Input)
                .getValueByIndex(inputIndex)
                .getValueByString(Source)
                .getValueByString(Id$2)
                .getRawString());
        }
        /**
         * 出力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 出力の個数
         */
        getOutputCount(physicsSettingIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Output)
                .getVector()
                .getSize();
        }
        /**
         * 出力の物理点のインデックスの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の物理点のインデックス
         */
        getOutputVertexIndex(physicsSettingIndex, outputIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Output)
                .getValueByIndex(outputIndex)
                .getValueByString(VertexIndex)
                .toInt();
        }
        /**
         * 出力の角度のスケールを取得する
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の角度のスケール
         */
        getOutputAngleScale(physicsSettingIndex, outputIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Output)
                .getValueByIndex(outputIndex)
                .getValueByString(Scale)
                .toFloat();
        }
        /**
         * 出力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の重み
         */
        getOutputWeight(physicsSettingIndex, outputIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Output)
                .getValueByIndex(outputIndex)
                .getValueByString(Weight)
                .toFloat();
        }
        /**
         * 出力先のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力先のID
         */
        getOutputDestinationId(physicsSettingIndex, outputIndex) {
            return CubismFramework.getIdManager().getId(this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Output)
                .getValueByIndex(outputIndex)
                .getValueByString(Destination)
                .getValueByString(Id$2)
                .getRawString());
        }
        /**
         * 出力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の種類
         */
        getOutputType(physicsSettingIndex, outputIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Output)
                .getValueByIndex(outputIndex)
                .getValueByString(Type)
                .getRawString();
        }
        /**
         * 出力の反転の取得
         * @param physicsSettingIndex 物理演算のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の反転
         */
        getOutputReflect(physicsSettingIndex, outputIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Output)
                .getValueByIndex(outputIndex)
                .getValueByString(Reflect)
                .toBoolean();
        }
        /**
         * 物理点の個数の取得
         * @param physicsSettingIndex 物理演算男設定のインデックス
         * @return 物理点の個数
         */
        getParticleCount(physicsSettingIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Vertices)
                .getVector()
                .getSize();
        }
        /**
         * 物理点の動きやすさの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の動きやすさ
         */
        getParticleMobility(physicsSettingIndex, vertexIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Vertices)
                .getValueByIndex(vertexIndex)
                .getValueByString(Mobility)
                .toFloat();
        }
        /**
         * 物理点の遅れの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の遅れ
         */
        getParticleDelay(physicsSettingIndex, vertexIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Vertices)
                .getValueByIndex(vertexIndex)
                .getValueByString(Delay)
                .toFloat();
        }
        /**
         * 物理点の加速度の取得
         * @param physicsSettingIndex 物理演算の設定
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の加速度
         */
        getParticleAcceleration(physicsSettingIndex, vertexIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Vertices)
                .getValueByIndex(vertexIndex)
                .getValueByString(Acceleration)
                .toFloat();
        }
        /**
         * 物理点の距離の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の距離
         */
        getParticleRadius(physicsSettingIndex, vertexIndex) {
            return this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Vertices)
                .getValueByIndex(vertexIndex)
                .getValueByString(Radius)
                .toFloat();
        }
        /**
         * 物理点の位置の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexInde 物理点のインデックス
         * @return 物理点の位置
         */
        getParticlePosition(physicsSettingIndex, vertexIndex) {
            const ret = new CubismVector2(0, 0);
            ret.x = this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Vertices)
                .getValueByIndex(vertexIndex)
                .getValueByString(Position)
                .getValueByString(X)
                .toFloat();
            ret.y = this._json
                .getRoot()
                .getValueByString(PhysicsSettings)
                .getValueByIndex(physicsSettingIndex)
                .getValueByString(Vertices)
                .getValueByIndex(vertexIndex)
                .getValueByString(Position)
                .getValueByString(Y)
                .toFloat();
            return ret;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$b;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismPhysicsJson = CubismPhysicsJson;
    })(Live2DCubismFramework$b || (Live2DCubismFramework$b = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    // physics types tags.
    const PhysicsTypeTagX = 'X';
    const PhysicsTypeTagY = 'Y';
    const PhysicsTypeTagAngle = 'Angle';
    // Constant of air resistance.
    const AirResistance = 5.0;
    // Constant of maximum weight of input and output ratio.
    const MaximumWeight = 100.0;
    // Constant of threshold of movement.
    const MovementThreshold = 0.001;
    // Constant of maximum allowed delta time
    const MaxDeltaTime = 5.0;
    /**
     * 物理演算クラス
     */
    class CubismPhysics {
        /**
         * インスタンスの作成
         * @param buffer    physics3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         * @return 作成されたインスタンス
         */
        static create(buffer, size) {
            const ret = new CubismPhysics();
            ret.parse(buffer, size);
            ret._physicsRig.gravity.y = 0;
            return ret;
        }
        /**
         * インスタンスを破棄する
         * @param physics 破棄するインスタンス
         */
        static delete(physics) {
            if (physics != null) {
                physics.release();
                physics = null;
            }
        }
        /**
         * physics3.jsonをパースする。
         * @param physicsJson physics3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        parse(physicsJson, size) {
            this._physicsRig = new CubismPhysicsRig();
            let json = new CubismPhysicsJson(physicsJson, size);
            this._physicsRig.gravity = json.getGravity();
            this._physicsRig.wind = json.getWind();
            this._physicsRig.subRigCount = json.getSubRigCount();
            this._physicsRig.fps = json.getFps();
            this._physicsRig.settings.updateSize(this._physicsRig.subRigCount, CubismPhysicsSubRig, true);
            this._physicsRig.inputs.updateSize(json.getTotalInputCount(), CubismPhysicsInput, true);
            this._physicsRig.outputs.updateSize(json.getTotalOutputCount(), CubismPhysicsOutput, true);
            this._physicsRig.particles.updateSize(json.getVertexCount(), CubismPhysicsParticle, true);
            this._currentRigOutputs.clear();
            this._previousRigOutputs.clear();
            let inputIndex = 0, outputIndex = 0, particleIndex = 0;
            for (let i = 0; i < this._physicsRig.settings.getSize(); ++i) {
                this._physicsRig.settings.at(i).normalizationPosition.minimum =
                    json.getNormalizationPositionMinimumValue(i);
                this._physicsRig.settings.at(i).normalizationPosition.maximum =
                    json.getNormalizationPositionMaximumValue(i);
                this._physicsRig.settings.at(i).normalizationPosition.defalut =
                    json.getNormalizationPositionDefaultValue(i);
                this._physicsRig.settings.at(i).normalizationAngle.minimum =
                    json.getNormalizationAngleMinimumValue(i);
                this._physicsRig.settings.at(i).normalizationAngle.maximum =
                    json.getNormalizationAngleMaximumValue(i);
                this._physicsRig.settings.at(i).normalizationAngle.defalut =
                    json.getNormalizationAngleDefaultValue(i);
                // Input
                this._physicsRig.settings.at(i).inputCount = json.getInputCount(i);
                this._physicsRig.settings.at(i).baseInputIndex = inputIndex;
                for (let j = 0; j < this._physicsRig.settings.at(i).inputCount; ++j) {
                    this._physicsRig.inputs.at(inputIndex + j).sourceParameterIndex = -1;
                    this._physicsRig.inputs.at(inputIndex + j).weight = json.getInputWeight(i, j);
                    this._physicsRig.inputs.at(inputIndex + j).reflect =
                        json.getInputReflect(i, j);
                    if (json.getInputType(i, j) == PhysicsTypeTagX) {
                        this._physicsRig.inputs.at(inputIndex + j).type =
                            CubismPhysicsSource.CubismPhysicsSource_X;
                        this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue =
                            getInputTranslationXFromNormalizedParameterValue;
                    }
                    else if (json.getInputType(i, j) == PhysicsTypeTagY) {
                        this._physicsRig.inputs.at(inputIndex + j).type =
                            CubismPhysicsSource.CubismPhysicsSource_Y;
                        this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue =
                            getInputTranslationYFromNormalizedParamterValue;
                    }
                    else if (json.getInputType(i, j) == PhysicsTypeTagAngle) {
                        this._physicsRig.inputs.at(inputIndex + j).type =
                            CubismPhysicsSource.CubismPhysicsSource_Angle;
                        this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue =
                            getInputAngleFromNormalizedParameterValue;
                    }
                    this._physicsRig.inputs.at(inputIndex + j).source.targetType =
                        CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
                    this._physicsRig.inputs.at(inputIndex + j).source.id =
                        json.getInputSourceId(i, j);
                }
                inputIndex += this._physicsRig.settings.at(i).inputCount;
                // Output
                this._physicsRig.settings.at(i).outputCount = json.getOutputCount(i);
                this._physicsRig.settings.at(i).baseOutputIndex = outputIndex;
                const currentRigOutput = new PhysicsOutput();
                currentRigOutput.outputs.resize(this._physicsRig.settings.at(i).outputCount);
                const previousRigOutput = new PhysicsOutput();
                previousRigOutput.outputs.resize(this._physicsRig.settings.at(i).outputCount);
                for (let j = 0; j < this._physicsRig.settings.at(i).outputCount; ++j) {
                    // initialize
                    currentRigOutput.outputs.set(j, 0.0);
                    previousRigOutput.outputs.set(j, 0.0);
                    this._physicsRig.outputs.at(outputIndex + j).destinationParameterIndex =
                        -1;
                    this._physicsRig.outputs.at(outputIndex + j).vertexIndex =
                        json.getOutputVertexIndex(i, j);
                    this._physicsRig.outputs.at(outputIndex + j).angleScale =
                        json.getOutputAngleScale(i, j);
                    this._physicsRig.outputs.at(outputIndex + j).weight =
                        json.getOutputWeight(i, j);
                    this._physicsRig.outputs.at(outputIndex + j).destination.targetType =
                        CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
                    this._physicsRig.outputs.at(outputIndex + j).destination.id =
                        json.getOutputDestinationId(i, j);
                    if (json.getOutputType(i, j) == PhysicsTypeTagX) {
                        this._physicsRig.outputs.at(outputIndex + j).type =
                            CubismPhysicsSource.CubismPhysicsSource_X;
                        this._physicsRig.outputs.at(outputIndex + j).getValue =
                            getOutputTranslationX;
                        this._physicsRig.outputs.at(outputIndex + j).getScale =
                            getOutputScaleTranslationX;
                    }
                    else if (json.getOutputType(i, j) == PhysicsTypeTagY) {
                        this._physicsRig.outputs.at(outputIndex + j).type =
                            CubismPhysicsSource.CubismPhysicsSource_Y;
                        this._physicsRig.outputs.at(outputIndex + j).getValue =
                            getOutputTranslationY;
                        this._physicsRig.outputs.at(outputIndex + j).getScale =
                            getOutputScaleTranslationY;
                    }
                    else if (json.getOutputType(i, j) == PhysicsTypeTagAngle) {
                        this._physicsRig.outputs.at(outputIndex + j).type =
                            CubismPhysicsSource.CubismPhysicsSource_Angle;
                        this._physicsRig.outputs.at(outputIndex + j).getValue =
                            getOutputAngle;
                        this._physicsRig.outputs.at(outputIndex + j).getScale =
                            getOutputScaleAngle;
                    }
                    this._physicsRig.outputs.at(outputIndex + j).reflect =
                        json.getOutputReflect(i, j);
                }
                this._currentRigOutputs.pushBack(currentRigOutput);
                this._previousRigOutputs.pushBack(previousRigOutput);
                outputIndex += this._physicsRig.settings.at(i).outputCount;
                // Particle
                this._physicsRig.settings.at(i).particleCount = json.getParticleCount(i);
                this._physicsRig.settings.at(i).baseParticleIndex = particleIndex;
                for (let j = 0; j < this._physicsRig.settings.at(i).particleCount; ++j) {
                    this._physicsRig.particles.at(particleIndex + j).mobility =
                        json.getParticleMobility(i, j);
                    this._physicsRig.particles.at(particleIndex + j).delay =
                        json.getParticleDelay(i, j);
                    this._physicsRig.particles.at(particleIndex + j).acceleration =
                        json.getParticleAcceleration(i, j);
                    this._physicsRig.particles.at(particleIndex + j).radius =
                        json.getParticleRadius(i, j);
                    this._physicsRig.particles.at(particleIndex + j).position =
                        json.getParticlePosition(i, j);
                }
                particleIndex += this._physicsRig.settings.at(i).particleCount;
            }
            this.initialize();
            json.release();
            json = void 0;
            json = null;
        }
        /**
         * 現在のパラメータ値で物理演算が安定化する状態を演算する。
         * @param model 物理演算の結果を適用するモデル
         */
        stabilization(model) {
            var _a, _b, _c, _d;
            let totalAngle;
            let weight;
            let radAngle;
            let outputValue;
            const totalTranslation = new CubismVector2();
            let currentSetting;
            let currentInputs;
            let currentOutputs;
            let currentParticles;
            let parameterValues;
            let parameterMaximumValues;
            let parameterMinimumValues;
            let parameterDefaultValues;
            parameterValues = model.getModel().parameters.values;
            parameterMaximumValues = model.getModel().parameters.maximumValues;
            parameterMinimumValues = model.getModel().parameters.minimumValues;
            parameterDefaultValues = model.getModel().parameters.defaultValues;
            if (((_b = (_a = this._parameterCaches) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) < model.getParameterCount()) {
                this._parameterCaches = new Float32Array(model.getParameterCount());
            }
            if (((_d = (_c = this._parameterInputCaches) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) < model.getParameterCount()) {
                this._parameterInputCaches = new Float32Array(model.getParameterCount());
            }
            for (let j = 0; j < model.getParameterCount(); ++j) {
                this._parameterCaches[j] = parameterValues[j];
                this._parameterInputCaches[j] = parameterValues[j];
            }
            for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
                totalAngle = { angle: 0.0 };
                totalTranslation.x = 0.0;
                totalTranslation.y = 0.0;
                currentSetting = this._physicsRig.settings.at(settingIndex);
                currentInputs = this._physicsRig.inputs.get(currentSetting.baseInputIndex);
                currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
                currentParticles = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
                // Load input parameters
                for (let i = 0; i < currentSetting.inputCount; ++i) {
                    weight = currentInputs[i].weight / MaximumWeight;
                    if (currentInputs[i].sourceParameterIndex == -1) {
                        currentInputs[i].sourceParameterIndex = model.getParameterIndex(currentInputs[i].source.id);
                    }
                    currentInputs[i].getNormalizedParameterValue(totalTranslation, totalAngle, parameterValues[currentInputs[i].sourceParameterIndex], parameterMinimumValues[currentInputs[i].sourceParameterIndex], parameterMaximumValues[currentInputs[i].sourceParameterIndex], parameterDefaultValues[currentInputs[i].sourceParameterIndex], currentSetting.normalizationPosition, currentSetting.normalizationAngle, currentInputs[i].reflect, weight);
                    this._parameterCaches[currentInputs[i].sourceParameterIndex] =
                        parameterValues[currentInputs[i].sourceParameterIndex];
                }
                radAngle = CubismMath.degreesToRadian(-totalAngle.angle);
                totalTranslation.x =
                    totalTranslation.x * CubismMath.cos(radAngle) -
                        totalTranslation.y * CubismMath.sin(radAngle);
                totalTranslation.y =
                    totalTranslation.x * CubismMath.sin(radAngle) +
                        totalTranslation.y * CubismMath.cos(radAngle);
                // Calculate particles position.
                updateParticlesForStabilization(currentParticles, currentSetting.particleCount, totalTranslation, totalAngle.angle, this._options.wind, MovementThreshold * currentSetting.normalizationPosition.maximum);
                // Update output parameters.
                for (let i = 0; i < currentSetting.outputCount; ++i) {
                    const particleIndex = currentOutputs[i].vertexIndex;
                    if (currentOutputs[i].destinationParameterIndex == -1) {
                        currentOutputs[i].destinationParameterIndex = model.getParameterIndex(currentOutputs[i].destination.id);
                    }
                    if (particleIndex < 1 ||
                        particleIndex >= currentSetting.particleCount) {
                        continue;
                    }
                    let translation = new CubismVector2();
                    translation = currentParticles[particleIndex].position.substract(currentParticles[particleIndex - 1].position);
                    outputValue = currentOutputs[i].getValue(translation, currentParticles, particleIndex, currentOutputs[i].reflect, this._options.gravity);
                    this._currentRigOutputs.at(settingIndex).outputs.set(i, outputValue);
                    this._previousRigOutputs.at(settingIndex).outputs.set(i, outputValue);
                    const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
                    const outParameterCaches = !Float32Array.prototype.slice && 'subarray' in Float32Array.prototype
                        ? JSON.parse(JSON.stringify(parameterValues.subarray(destinationParameterIndex))) // 値渡しするため、JSON.parse, JSON.stringify
                        : parameterValues.slice(destinationParameterIndex);
                    updateOutputParameterValue(outParameterCaches, parameterMinimumValues[destinationParameterIndex], parameterMaximumValues[destinationParameterIndex], outputValue, currentOutputs[i]);
                    // 値を反映
                    for (let offset = destinationParameterIndex, outParamIndex = 0; offset < this._parameterCaches.length; offset++, outParamIndex++) {
                        parameterValues[offset] = this._parameterCaches[offset] =
                            outParameterCaches[outParamIndex];
                    }
                }
            }
        }
        /**
         * 物理演算の評価
         *
         * Pendulum interpolation weights
         *
         * 振り子の計算結果は保存され、パラメータへの出力は保存された前回の結果で補間されます。
         * The result of the pendulum calculation is saved and
         * the output to the parameters is interpolated with the saved previous result of the pendulum calculation.
         *
         * 図で示すと[1]と[2]で補間されます。
         * The figure shows the interpolation between [1] and [2].
         *
         * 補間の重みは最新の振り子計算タイミングと次回のタイミングの間で見た現在時間で決定する。
         * The weight of the interpolation are determined by the current time seen between
         * the latest pendulum calculation timing and the next timing.
         *
         * 図で示すと[2]と[4]の間でみた(3)の位置の重みになる。
         * Figure shows the weight of position (3) as seen between [2] and [4].
         *
         * 解釈として振り子計算のタイミングと重み計算のタイミングがズレる。
         * As an interpretation, the pendulum calculation and weights are misaligned.
         *
         * physics3.jsonにFPS情報が存在しない場合は常に前の振り子状態で設定される。
         * If there is no FPS information in physics3.json, it is always set in the previous pendulum state.
         *
         * この仕様は補間範囲を逸脱したことが原因の震えたような見た目を回避を目的にしている。
         * The purpose of this specification is to avoid the quivering appearance caused by deviations from the interpolation range.
         *
         * ------------ time -------------->
         *
         *                 |+++++|------| <- weight
         * ==[1]====#=====[2]---(3)----(4)
         *          ^ output contents
         *
         * 1:_previousRigOutputs
         * 2:_currentRigOutputs
         * 3:_currentRemainTime (now rendering)
         * 4:next particles timing
         * @param model 物理演算の結果を適用するモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        evaluate(model, deltaTimeSeconds) {
            var _a, _b, _c, _d;
            let totalAngle;
            let weight;
            let radAngle;
            let outputValue;
            const totalTranslation = new CubismVector2();
            let currentSetting;
            let currentInputs;
            let currentOutputs;
            let currentParticles;
            if (0.0 >= deltaTimeSeconds) {
                return;
            }
            let parameterValues;
            let parameterMaximumValues;
            let parameterMinimumValues;
            let parameterDefaultValues;
            let physicsDeltaTime;
            this._currentRemainTime += deltaTimeSeconds;
            if (this._currentRemainTime > MaxDeltaTime) {
                this._currentRemainTime = 0.0;
            }
            parameterValues = model.getModel().parameters.values;
            parameterMaximumValues = model.getModel().parameters.maximumValues;
            parameterMinimumValues = model.getModel().parameters.minimumValues;
            parameterDefaultValues = model.getModel().parameters.defaultValues;
            if (((_b = (_a = this._parameterCaches) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) < model.getParameterCount()) {
                this._parameterCaches = new Float32Array(model.getParameterCount());
            }
            if (((_d = (_c = this._parameterInputCaches) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) < model.getParameterCount()) {
                this._parameterInputCaches = new Float32Array(model.getParameterCount());
                for (let j = 0; j < model.getParameterCount(); ++j) {
                    this._parameterInputCaches[j] = parameterValues[j];
                }
            }
            if (this._physicsRig.fps > 0.0) {
                physicsDeltaTime = 1.0 / this._physicsRig.fps;
            }
            else {
                physicsDeltaTime = deltaTimeSeconds;
            }
            while (this._currentRemainTime >= physicsDeltaTime) {
                // copyRigOutputs _currentRigOutputs to _previousRigOutputs
                for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
                    currentSetting = this._physicsRig.settings.at(settingIndex);
                    currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
                    for (let i = 0; i < currentSetting.outputCount; ++i) {
                        this._previousRigOutputs
                            .at(settingIndex)
                            .outputs.set(i, this._currentRigOutputs.at(settingIndex).outputs.at(i));
                    }
                }
                // 入力キャッシュとパラメータで線形補間してUpdateParticlesするタイミングでの入力を計算する。
                // Calculate the input at the timing to UpdateParticles by linear interpolation with the _parameterInputCache and parameterValue.
                // _parameterCacheはグループ間での値の伝搬の役割があるので_parameterInputCacheとの分離が必要。
                // _parameterCache needs to be separated from _parameterInputCache because of its role in propagating values between groups.
                const inputWeight = physicsDeltaTime / this._currentRemainTime;
                for (let j = 0; j < model.getParameterCount(); ++j) {
                    this._parameterCaches[j] =
                        this._parameterInputCaches[j] * (1.0 - inputWeight) +
                            parameterValues[j] * inputWeight;
                    this._parameterInputCaches[j] = this._parameterCaches[j];
                }
                for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
                    totalAngle = { angle: 0.0 };
                    totalTranslation.x = 0.0;
                    totalTranslation.y = 0.0;
                    currentSetting = this._physicsRig.settings.at(settingIndex);
                    currentInputs = this._physicsRig.inputs.get(currentSetting.baseInputIndex);
                    currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
                    currentParticles = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
                    // Load input parameters
                    for (let i = 0; i < currentSetting.inputCount; ++i) {
                        weight = currentInputs[i].weight / MaximumWeight;
                        if (currentInputs[i].sourceParameterIndex == -1) {
                            currentInputs[i].sourceParameterIndex = model.getParameterIndex(currentInputs[i].source.id);
                        }
                        currentInputs[i].getNormalizedParameterValue(totalTranslation, totalAngle, this._parameterCaches[currentInputs[i].sourceParameterIndex], parameterMinimumValues[currentInputs[i].sourceParameterIndex], parameterMaximumValues[currentInputs[i].sourceParameterIndex], parameterDefaultValues[currentInputs[i].sourceParameterIndex], currentSetting.normalizationPosition, currentSetting.normalizationAngle, currentInputs[i].reflect, weight);
                    }
                    radAngle = CubismMath.degreesToRadian(-totalAngle.angle);
                    totalTranslation.x =
                        totalTranslation.x * CubismMath.cos(radAngle) -
                            totalTranslation.y * CubismMath.sin(radAngle);
                    totalTranslation.y =
                        totalTranslation.x * CubismMath.sin(radAngle) +
                            totalTranslation.y * CubismMath.cos(radAngle);
                    // Calculate particles position.
                    updateParticles(currentParticles, currentSetting.particleCount, totalTranslation, totalAngle.angle, this._options.wind, MovementThreshold * currentSetting.normalizationPosition.maximum, physicsDeltaTime, AirResistance);
                    // Update output parameters.
                    for (let i = 0; i < currentSetting.outputCount; ++i) {
                        const particleIndex = currentOutputs[i].vertexIndex;
                        if (currentOutputs[i].destinationParameterIndex == -1) {
                            currentOutputs[i].destinationParameterIndex =
                                model.getParameterIndex(currentOutputs[i].destination.id);
                        }
                        if (particleIndex < 1 ||
                            particleIndex >= currentSetting.particleCount) {
                            continue;
                        }
                        const translation = new CubismVector2();
                        translation.x =
                            currentParticles[particleIndex].position.x -
                                currentParticles[particleIndex - 1].position.x;
                        translation.y =
                            currentParticles[particleIndex].position.y -
                                currentParticles[particleIndex - 1].position.y;
                        outputValue = currentOutputs[i].getValue(translation, currentParticles, particleIndex, currentOutputs[i].reflect, this._options.gravity);
                        this._currentRigOutputs.at(settingIndex).outputs.set(i, outputValue);
                        const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
                        const outParameterCaches = !Float32Array.prototype.slice &&
                            'subarray' in Float32Array.prototype
                            ? JSON.parse(JSON.stringify(this._parameterCaches.subarray(destinationParameterIndex))) // 値渡しするため、JSON.parse, JSON.stringify
                            : this._parameterCaches.slice(destinationParameterIndex);
                        updateOutputParameterValue(outParameterCaches, parameterMinimumValues[destinationParameterIndex], parameterMaximumValues[destinationParameterIndex], outputValue, currentOutputs[i]);
                        // 値を反映
                        for (let offset = destinationParameterIndex, outParamIndex = 0; offset < this._parameterCaches.length; offset++, outParamIndex++) {
                            this._parameterCaches[offset] = outParameterCaches[outParamIndex];
                        }
                    }
                }
                this._currentRemainTime -= physicsDeltaTime;
            }
            const alpha = this._currentRemainTime / physicsDeltaTime;
            this.interpolate(model, alpha);
        }
        /**
         * 物理演算結果の適用
         * 振り子演算の最新の結果と一つ前の結果から指定した重みで適用する。
         * @param model 物理演算の結果を適用するモデル
         * @param weight 最新結果の重み
         */
        interpolate(model, weight) {
            let currentOutputs;
            let currentSetting;
            let parameterValues;
            let parameterMaximumValues;
            let parameterMinimumValues;
            parameterValues = model.getModel().parameters.values;
            parameterMaximumValues = model.getModel().parameters.maximumValues;
            parameterMinimumValues = model.getModel().parameters.minimumValues;
            for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
                currentSetting = this._physicsRig.settings.at(settingIndex);
                currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
                // Load input parameters.
                for (let i = 0; i < currentSetting.outputCount; ++i) {
                    if (currentOutputs[i].destinationParameterIndex == -1) {
                        continue;
                    }
                    const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
                    const outParameterValues = !Float32Array.prototype.slice && 'subarray' in Float32Array.prototype
                        ? JSON.parse(JSON.stringify(parameterValues.subarray(destinationParameterIndex))) // 値渡しするため、JSON.parse, JSON.stringify
                        : parameterValues.slice(destinationParameterIndex);
                    updateOutputParameterValue(outParameterValues, parameterMinimumValues[destinationParameterIndex], parameterMaximumValues[destinationParameterIndex], this._previousRigOutputs.at(settingIndex).outputs.at(i) *
                        (1 - weight) +
                        this._currentRigOutputs.at(settingIndex).outputs.at(i) * weight, currentOutputs[i]);
                    // 値を反映
                    for (let offset = destinationParameterIndex, outParamIndex = 0; offset < parameterValues.length; offset++, outParamIndex++) {
                        parameterValues[offset] = outParameterValues[outParamIndex];
                    }
                }
            }
        }
        /**
         * オプションの設定
         * @param options オプション
         */
        setOptions(options) {
            this._options = options;
        }
        /**
         * オプションの取得
         * @return オプション
         */
        getOption() {
            return this._options;
        }
        /**
         * コンストラクタ
         */
        constructor() {
            this._physicsRig = null;
            // set default options
            this._options = new Options();
            this._options.gravity.y = -1.0;
            this._options.gravity.x = 0.0;
            this._options.wind.x = 0.0;
            this._options.wind.y = 0.0;
            this._currentRigOutputs = new csmVector();
            this._previousRigOutputs = new csmVector();
            this._currentRemainTime = 0.0;
            this._parameterCaches = null;
            this._parameterInputCaches = null;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            this._physicsRig = void 0;
            this._physicsRig = null;
        }
        /**
         * 初期化する
         */
        initialize() {
            let strand;
            let currentSetting;
            let radius;
            for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
                currentSetting = this._physicsRig.settings.at(settingIndex);
                strand = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
                // Initialize the top of particle.
                strand[0].initialPosition = new CubismVector2(0.0, 0.0);
                strand[0].lastPosition = new CubismVector2(strand[0].initialPosition.x, strand[0].initialPosition.y);
                strand[0].lastGravity = new CubismVector2(0.0, -1.0);
                strand[0].lastGravity.y *= -1.0;
                strand[0].velocity = new CubismVector2(0.0, 0.0);
                strand[0].force = new CubismVector2(0.0, 0.0);
                // Initialize particles.
                for (let i = 1; i < currentSetting.particleCount; ++i) {
                    radius = new CubismVector2(0.0, 0.0);
                    radius.y = strand[i].radius;
                    strand[i].initialPosition = new CubismVector2(strand[i - 1].initialPosition.x + radius.x, strand[i - 1].initialPosition.y + radius.y);
                    strand[i].position = new CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
                    strand[i].lastPosition = new CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
                    strand[i].lastGravity = new CubismVector2(0.0, -1.0);
                    strand[i].lastGravity.y *= -1.0;
                    strand[i].velocity = new CubismVector2(0.0, 0.0);
                    strand[i].force = new CubismVector2(0.0, 0.0);
                }
            }
        }
    }
    /**
     * 物理演算のオプション
     */
    class Options {
        constructor() {
            this.gravity = new CubismVector2(0, 0);
            this.wind = new CubismVector2(0, 0);
        }
    }
    /**
     * パラメータに適用する前の物理演算の出力結果
     */
    class PhysicsOutput {
        constructor() {
            this.outputs = new csmVector(0);
        }
    }
    /**
     * Gets sign.
     *
     * @param value Evaluation target value.
     *
     * @return Sign of value.
     */
    function sign(value) {
        let ret = 0;
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
        let outputValue = translation.x;
        if (isInverted) {
            outputValue *= -1.0;
        }
        return outputValue;
    }
    function getOutputTranslationY(translation, particles, particleIndex, isInverted, parentGravity) {
        let outputValue = translation.y;
        if (isInverted) {
            outputValue *= -1.0;
        }
        return outputValue;
    }
    function getOutputAngle(translation, particles, particleIndex, isInverted, parentGravity) {
        let outputValue;
        if (particleIndex >= 2) {
            parentGravity = particles[particleIndex - 1].position.substract(particles[particleIndex - 2].position);
        }
        else {
            parentGravity = parentGravity.multiplyByScaler(-1.0);
        }
        outputValue = CubismMath.directionToRadian(parentGravity, translation);
        if (isInverted) {
            outputValue *= -1.0;
        }
        return outputValue;
    }
    function getRangeValue(min, max) {
        const maxValue = CubismMath.max(min, max);
        const minValue = CubismMath.min(min, max);
        return CubismMath.abs(maxValue - minValue);
    }
    function getDefaultValue(min, max) {
        const minValue = CubismMath.min(min, max);
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
        let totalRadian;
        let delay;
        let radian;
        let currentGravity;
        let direction = new CubismVector2(0.0, 0.0);
        let velocity = new CubismVector2(0.0, 0.0);
        let force = new CubismVector2(0.0, 0.0);
        let newDirection = new CubismVector2(0.0, 0.0);
        strand[0].position = new CubismVector2(totalTranslation.x, totalTranslation.y);
        totalRadian = CubismMath.degreesToRadian(totalAngle);
        currentGravity = CubismMath.radianToDirection(totalRadian);
        currentGravity.normalize();
        for (let i = 1; i < strandCount; ++i) {
            strand[i].force = currentGravity
                .multiplyByScaler(strand[i].acceleration)
                .add(windDirection);
            strand[i].lastPosition = new CubismVector2(strand[i].position.x, strand[i].position.y);
            delay = strand[i].delay * deltaTimeSeconds * 30.0;
            direction = strand[i].position.substract(strand[i - 1].position);
            radian =
                CubismMath.directionToRadian(strand[i].lastGravity, currentGravity) /
                    airResistance;
            direction.x =
                CubismMath.cos(radian) * direction.x -
                    direction.y * CubismMath.sin(radian);
            direction.y =
                CubismMath.sin(radian) * direction.x +
                    direction.y * CubismMath.cos(radian);
            strand[i].position = strand[i - 1].position.add(direction);
            velocity = strand[i].velocity.multiplyByScaler(delay);
            force = strand[i].force.multiplyByScaler(delay).multiplyByScaler(delay);
            strand[i].position = strand[i].position.add(velocity).add(force);
            newDirection = strand[i].position.substract(strand[i - 1].position);
            newDirection.normalize();
            strand[i].position = strand[i - 1].position.add(newDirection.multiplyByScaler(strand[i].radius));
            if (CubismMath.abs(strand[i].position.x) < thresholdValue) {
                strand[i].position.x = 0.0;
            }
            if (delay != 0.0) {
                strand[i].velocity = strand[i].position.substract(strand[i].lastPosition);
                strand[i].velocity = strand[i].velocity.divisionByScalar(delay);
                strand[i].velocity = strand[i].velocity.multiplyByScaler(strand[i].mobility);
            }
            strand[i].force = new CubismVector2(0.0, 0.0);
            strand[i].lastGravity = new CubismVector2(currentGravity.x, currentGravity.y);
        }
    }
    /**
     * Updates particles for stabilization.
     *
     * @param strand                Target array of particle.
     * @param strandCount           Count of particle.
     * @param totalTranslation      Total translation value.
     * @param totalAngle            Total angle.
     * @param windDirection         Direction of Wind.
     * @param thresholdValue        Threshold of movement.
     */
    function updateParticlesForStabilization(strand, strandCount, totalTranslation, totalAngle, windDirection, thresholdValue) {
        let totalRadian;
        let currentGravity;
        let force = new CubismVector2(0.0, 0.0);
        strand[0].position = new CubismVector2(totalTranslation.x, totalTranslation.y);
        totalRadian = CubismMath.degreesToRadian(totalAngle);
        currentGravity = CubismMath.radianToDirection(totalRadian);
        currentGravity.normalize();
        for (let i = 1; i < strandCount; ++i) {
            strand[i].force = currentGravity
                .multiplyByScaler(strand[i].acceleration)
                .add(windDirection);
            strand[i].lastPosition = new CubismVector2(strand[i].position.x, strand[i].position.y);
            strand[i].velocity = new CubismVector2(0.0, 0.0);
            force = strand[i].force;
            force.normalize();
            force = force.multiplyByScaler(strand[i].radius);
            strand[i].position = strand[i - 1].position.add(force);
            if (CubismMath.abs(strand[i].position.x) < thresholdValue) {
                strand[i].position.x = 0.0;
            }
            strand[i].force = new CubismVector2(0.0, 0.0);
            strand[i].lastGravity = new CubismVector2(currentGravity.x, currentGravity.y);
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
        let outputScale;
        let value;
        let weight;
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
        let result = 0.0;
        const maxValue = CubismMath.max(parameterMaximum, parameterMinimum);
        if (maxValue < value) {
            value = maxValue;
        }
        const minValue = CubismMath.min(parameterMaximum, parameterMinimum);
        if (minValue > value) {
            value = minValue;
        }
        const minNormValue = CubismMath.min(normalizedMinimum, normalizedMaximum);
        const maxNormValue = CubismMath.max(normalizedMinimum, normalizedMaximum);
        const middleNormValue = normalizedDefault;
        const middleValue = getDefaultValue(minValue, maxValue);
        const paramValue = value - middleValue;
        switch (sign(paramValue)) {
            case 1: {
                const nLength = maxNormValue - middleNormValue;
                const pLength = maxValue - middleValue;
                if (pLength != 0.0) {
                    result = paramValue * (nLength / pLength);
                    result += middleNormValue;
                }
                break;
            }
            case -1: {
                const nLength = minNormValue - middleNormValue;
                const pLength = minValue - middleValue;
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
        }
        return isInverted ? result : result * -1.0;
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$a;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismPhysics = CubismPhysics;
        Live2DCubismFramework.Options = Options;
    })(Live2DCubismFramework$a || (Live2DCubismFramework$a = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * 矩形形状（座標・長さはfloat値）を定義するクラス
     */
    class csmRect {
        /**
         * コンストラクタ
         * @param x 左端X座標
         * @param y 上端Y座標
         * @param w 幅
         * @param h 高さ
         */
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        }
        /**
         * 矩形中央のX座標を取得する
         */
        getCenterX() {
            return this.x + 0.5 * this.width;
        }
        /**
         * 矩形中央のY座標を取得する
         */
        getCenterY() {
            return this.y + 0.5 * this.height;
        }
        /**
         * 右側のX座標を取得する
         */
        getRight() {
            return this.x + this.width;
        }
        /**
         * 下端のY座標を取得する
         */
        getBottom() {
            return this.y + this.height;
        }
        /**
         * 矩形に値をセットする
         * @param r 矩形のインスタンス
         */
        setRect(r) {
            this.x = r.x;
            this.y = r.y;
            this.width = r.width;
            this.height = r.height;
        }
        /**
         * 矩形中央を軸にして縦横を拡縮する
         * @param w 幅方向に拡縮する量
         * @param h 高さ方向に拡縮する量
         */
        expand(w, h) {
            this.x -= w;
            this.y -= h;
            this.width += w * 2.0;
            this.height += h * 2.0;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$9;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.csmRect = csmRect;
    })(Live2DCubismFramework$9 || (Live2DCubismFramework$9 = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    const ColorChannelCount = 4; // 実験時に1チャンネルの場合は1、RGBだけの場合は3、アルファも含める場合は4
    const ClippingMaskMaxCountOnDefault = 36; // 通常のフレームバッファ一枚あたりのマスク最大数
    const ClippingMaskMaxCountOnMultiRenderTexture = 32; // フレームバッファが2枚以上ある場合のフレームバッファ一枚あたりのマスク最大数
    const ShaderCount = 10; // シェーダーの数 = マスク生成用 + (通常用 + 加算 + 乗算) * (マスク無の乗算済アルファ対応版 + マスク有の乗算済アルファ対応版 + マスク有反転の乗算済アルファ対応版)
    let s_instance;
    let s_viewport;
    let s_fbo;
    /**
     * クリッピングマスクの処理を実行するクラス
     */
    class CubismClippingManager_WebGL {
        /**
         * カラーチャンネル（RGBA）のフラグを取得する
         * @param channelNo カラーチャンネル（RGBA）の番号（0:R, 1:G, 2:B, 3:A）
         */
        getChannelFlagAsColor(channelNo) {
            return this._channelColors.at(channelNo);
        }
        /**
         * テンポラリのレンダーテクスチャのアドレスを取得する
         * FrameBufferObjectが存在しない場合、新しく生成する
         *
         * @return レンダーテクスチャの配列
         */
        getMaskRenderTexture() {
            // テンポラリのRenderTextureを取得する
            if (this._maskTexture && this._maskTexture.textures != null) {
                // 前回使ったものを返す
                this._maskTexture.frameNo = this._currentFrameNo;
            }
            else {
                // FrameBufferObjectが存在しない場合、新しく生成する
                if (this._maskRenderTextures != null) {
                    this._maskRenderTextures.clear();
                }
                this._maskRenderTextures = new csmVector();
                // ColorBufferObjectが存在しない場合、新しく生成する
                if (this._maskColorBuffers != null) {
                    this._maskColorBuffers.clear();
                }
                this._maskColorBuffers = new csmVector();
                // クリッピングバッファサイズを取得
                const size = this._clippingMaskBufferSize;
                for (let index = 0; index < this._renderTextureCount; index++) {
                    this._maskColorBuffers.pushBack(this.gl.createTexture()); // 直接代入
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this._maskColorBuffers.at(index));
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, size, size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
                    this._maskRenderTextures.pushBack(this.gl.createFramebuffer());
                    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._maskRenderTextures.at(index));
                    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this._maskColorBuffers.at(index), 0);
                }
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
                this._maskTexture = new CubismRenderTextureResource(this._currentFrameNo, this._maskRenderTextures);
            }
            return this._maskTexture.textures;
        }
        /**
         * WebGLレンダリングコンテキストを設定する
         * @param gl WebGLレンダリングコンテキスト
         */
        setGL(gl) {
            this.gl = gl;
        }
        /**
         * マスクされる描画オブジェクト群全体を囲む矩形（モデル座標系）を計算する
         * @param model モデルのインスタンス
         * @param clippingContext クリッピングマスクのコンテキスト
         */
        calcClippedDrawTotalBounds(model, clippingContext) {
            // 被クリッピングマスク（マスクされる描画オブジェクト）の全体の矩形
            let clippedDrawTotalMinX = Number.MAX_VALUE;
            let clippedDrawTotalMinY = Number.MAX_VALUE;
            let clippedDrawTotalMaxX = Number.MIN_VALUE;
            let clippedDrawTotalMaxY = Number.MIN_VALUE;
            // このマスクが実際に必要か判定する
            // このクリッピングを利用する「描画オブジェクト」がひとつでも使用可能であればマスクを生成する必要がある
            const clippedDrawCount = clippingContext._clippedDrawableIndexList.length;
            for (let clippedDrawableIndex = 0; clippedDrawableIndex < clippedDrawCount; clippedDrawableIndex++) {
                // マスクを使用する描画オブジェクトの描画される矩形を求める
                const drawableIndex = clippingContext._clippedDrawableIndexList[clippedDrawableIndex];
                const drawableVertexCount = model.getDrawableVertexCount(drawableIndex);
                const drawableVertexes = model.getDrawableVertices(drawableIndex);
                let minX = Number.MAX_VALUE;
                let minY = Number.MAX_VALUE;
                let maxX = -Number.MAX_VALUE;
                let maxY = -Number.MAX_VALUE;
                const loop = drawableVertexCount * Constant.vertexStep;
                for (let pi = Constant.vertexOffset; pi < loop; pi += Constant.vertexStep) {
                    const x = drawableVertexes[pi];
                    const y = drawableVertexes[pi + 1];
                    if (x < minX) {
                        minX = x;
                    }
                    if (x > maxX) {
                        maxX = x;
                    }
                    if (y < minY) {
                        minY = y;
                    }
                    if (y > maxY) {
                        maxY = y;
                    }
                }
                // 有効な点が一つも取れなかったのでスキップ
                if (minX == Number.MAX_VALUE) {
                    continue;
                }
                // 全体の矩形に反映
                if (minX < clippedDrawTotalMinX) {
                    clippedDrawTotalMinX = minX;
                }
                if (minY < clippedDrawTotalMinY) {
                    clippedDrawTotalMinY = minY;
                }
                if (maxX > clippedDrawTotalMaxX) {
                    clippedDrawTotalMaxX = maxX;
                }
                if (maxY > clippedDrawTotalMaxY) {
                    clippedDrawTotalMaxY = maxY;
                }
                if (clippedDrawTotalMinX == Number.MAX_VALUE) {
                    clippingContext._allClippedDrawRect.x = 0.0;
                    clippingContext._allClippedDrawRect.y = 0.0;
                    clippingContext._allClippedDrawRect.width = 0.0;
                    clippingContext._allClippedDrawRect.height = 0.0;
                    clippingContext._isUsing = false;
                }
                else {
                    clippingContext._isUsing = true;
                    const w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
                    const h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
                    clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
                    clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
                    clippingContext._allClippedDrawRect.width = w;
                    clippingContext._allClippedDrawRect.height = h;
                }
            }
        }
        /**
         * コンストラクタ
         */
        constructor() {
            this._currentMaskRenderTexture = null;
            this._maskColorBuffers = null;
            this._currentFrameNo = 0;
            this._renderTextureCount = 0;
            this._clippingMaskBufferSize = 256;
            this._clippingContextListForMask = new csmVector();
            this._clippingContextListForDraw = new csmVector();
            this._channelColors = new csmVector();
            this._tmpBoundsOnModel = new csmRect();
            this._tmpMatrix = new CubismMatrix44();
            this._tmpMatrixForMask = new CubismMatrix44();
            this._tmpMatrixForDraw = new CubismMatrix44();
            this._maskTexture = null;
            let tmp = new CubismTextureColor();
            tmp.R = 1.0;
            tmp.G = 0.0;
            tmp.B = 0.0;
            tmp.A = 0.0;
            this._channelColors.pushBack(tmp);
            tmp = new CubismTextureColor();
            tmp.R = 0.0;
            tmp.G = 1.0;
            tmp.B = 0.0;
            tmp.A = 0.0;
            this._channelColors.pushBack(tmp);
            tmp = new CubismTextureColor();
            tmp.R = 0.0;
            tmp.G = 0.0;
            tmp.B = 1.0;
            tmp.A = 0.0;
            this._channelColors.pushBack(tmp);
            tmp = new CubismTextureColor();
            tmp.R = 0.0;
            tmp.G = 0.0;
            tmp.B = 0.0;
            tmp.A = 1.0;
            this._channelColors.pushBack(tmp);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
                if (this._clippingContextListForMask.at(i)) {
                    this._clippingContextListForMask.at(i).release();
                    this._clippingContextListForMask.set(i, void 0);
                }
                this._clippingContextListForMask.set(i, null);
            }
            this._clippingContextListForMask = null;
            // _clippingContextListForDrawは_clippingContextListForMaskにあるインスタンスを指している。上記の処理により要素ごとのDELETEは不要。
            for (let i = 0; i < this._clippingContextListForDraw.getSize(); i++) {
                this._clippingContextListForDraw.set(i, null);
            }
            this._clippingContextListForDraw = null;
            if (this._maskTexture) {
                for (let i = 0; i < this._maskTexture.textures.getSize(); i++) {
                    this.gl.deleteFramebuffer(this._maskTexture.textures.at(i));
                }
                this._maskTexture.textures.clear();
                this._maskTexture.textures = null;
                this._maskTexture = null;
            }
            for (let i = 0; i < this._channelColors.getSize(); i++) {
                this._channelColors.set(i, null);
            }
            this._channelColors = null;
            // テクスチャ解放
            if (this._maskColorBuffers != null) {
                for (let index = 0; index < this._maskColorBuffers.getSize(); index++) {
                    this.gl.deleteTexture(this._maskColorBuffers.at(index));
                }
                this._maskColorBuffers.clear();
            }
            this._maskColorBuffers = null;
            if (this._maskRenderTextures != null) {
                this._maskRenderTextures.clear();
            }
            this._maskRenderTextures = null;
            if (this._clearedFrameBufferflags != null) {
                this._clearedFrameBufferflags.clear();
            }
            this._clearedFrameBufferflags = null;
        }
        /**
         * マネージャの初期化処理
         * クリッピングマスクを使う描画オブジェクトの登録を行う
         * @param model モデルのインスタンス
         * @param drawableCount 描画オブジェクトの数
         * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのインデックスのリスト
         * @param drawableMaskCounts 描画オブジェクトをマスクする描画オブジェクトの数
         * @param renderTextureCount バッファの生成数
         */
        initialize(model, drawableCount, drawableMasks, drawableMaskCounts, renderTextureCount) {
            // レンダーテクスチャの合計枚数の設定
            // 1以上の整数でない場合はそれぞれ警告を出す
            if (renderTextureCount % 1 != 0) {
                CubismLogWarning('The number of render textures must be specified as an integer. The decimal point is rounded down and corrected to an integer.');
                // 小数点以下を除去
                renderTextureCount = ~~renderTextureCount;
            }
            if (renderTextureCount < 1) {
                CubismLogWarning('The number of render textures must be an integer greater than or equal to 1. Set the number of render textures to 1.');
            }
            // 負の値が使われている場合は強制的に1枚と設定する
            this._renderTextureCount = renderTextureCount < 1 ? 1 : renderTextureCount;
            this._clearedFrameBufferflags = new csmVector(this._renderTextureCount);
            // クリッピングマスクを使う描画オブジェクトをすべて登録する
            // クリッピングマスクは、通常数個程度に限定して使うものとする
            for (let i = 0; i < drawableCount; i++) {
                if (drawableMaskCounts[i] <= 0) {
                    // クリッピングマスクが使用されていないアートメッシュ（多くの場合使用しない）
                    this._clippingContextListForDraw.pushBack(null);
                    continue;
                }
                // 既にあるClipContextと同じかチェックする
                let clippingContext = this.findSameClip(drawableMasks[i], drawableMaskCounts[i]);
                if (clippingContext == null) {
                    // 同一のマスクが存在していない場合は生成する
                    clippingContext = new CubismClippingContext(this, drawableMasks[i], drawableMaskCounts[i]);
                    this._clippingContextListForMask.pushBack(clippingContext);
                }
                clippingContext.addClippedDrawable(i);
                this._clippingContextListForDraw.pushBack(clippingContext);
            }
        }
        /**
         * クリッピングコンテキストを作成する。モデル描画時に実行する。
         * @param model モデルのインスタンス
         * @param renderer レンダラのインスタンス
         */
        setupClippingContext(model, renderer) {
            this._currentFrameNo++;
            // 全てのクリッピングを用意する
            // 同じクリップ（複数の場合はまとめて一つのクリップ）を使う場合は1度だけ設定する
            let usingClipCount = 0;
            for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
                // 1つのクリッピングマスクに関して
                const cc = this._clippingContextListForMask.at(clipIndex);
                // このクリップを利用する描画オブジェクト群全体を囲む矩形を計算
                this.calcClippedDrawTotalBounds(model, cc);
                if (cc._isUsing) {
                    usingClipCount++; // 使用中としてカウント
                }
            }
            // マスク作成処理
            if (usingClipCount > 0) {
                // 各マスクのレイアウトを決定していく
                this.setupLayoutBounds(renderer.isUsingHighPrecisionMask() ? 0 : usingClipCount);
                if (!renderer.isUsingHighPrecisionMask()) {
                    // 生成したFrameBufferと同じサイズでビューポートを設定
                    this.gl.viewport(0, 0, this._clippingMaskBufferSize, this._clippingMaskBufferSize);
                    // 後の計算のためにインデックスの最初をセット
                    this._currentMaskRenderTexture = this.getMaskRenderTexture().at(0);
                    renderer.preDraw(); // バッファをクリアする
                    // ---------- マスク描画処理 ----------
                    // マスク用RenderTextureをactiveにセット
                    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentMaskRenderTexture);
                }
                // サイズがレンダーテクスチャの枚数と合わない場合は合わせる
                if (this._clearedFrameBufferflags.getSize() != this._renderTextureCount) {
                    this._clearedFrameBufferflags.clear();
                    this._clearedFrameBufferflags = new csmVector(this._renderTextureCount);
                }
                // マスクのクリアフラグを毎フレーム開始時に初期化
                for (let index = 0; index < this._clearedFrameBufferflags.getSize(); index++) {
                    this._clearedFrameBufferflags.set(index, false);
                }
                // 実際にマスクを生成する
                // 全てのマスクをどのようにレイアウトして描くかを決定し、ClipContext, ClippedDrawContextに記憶する
                for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
                    // --- 実際に1つのマスクを描く ---
                    const clipContext = this._clippingContextListForMask.at(clipIndex);
                    const allClipedDrawRect = clipContext._allClippedDrawRect; // このマスクを使う、すべての描画オブジェクトの論理座標上の囲み矩形
                    const layoutBoundsOnTex01 = clipContext._layoutBounds; // この中にマスクを収める
                    const MARGIN = 0.05; // モデル座標上の矩形を、適宜マージンを付けて使う
                    let scaleX = 0;
                    let scaleY = 0;
                    // clipContextに設定したレンダーテクスチャをインデックスで取得
                    const clipContextRenderTexture = this.getMaskRenderTexture().at(clipContext._bufferIndex);
                    // 現在のレンダーテクスチャがclipContextのものと異なる場合
                    if (this._currentMaskRenderTexture != clipContextRenderTexture &&
                        !renderer.isUsingHighPrecisionMask()) {
                        this._currentMaskRenderTexture = clipContextRenderTexture;
                        renderer.preDraw(); // バッファをクリアする
                        // マスク用RenderTextureをactiveにセット
                        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentMaskRenderTexture);
                    }
                    if (renderer.isUsingHighPrecisionMask()) {
                        const ppu = model.getPixelsPerUnit();
                        const maskPixelSize = clipContext.getClippingManager()._clippingMaskBufferSize;
                        const physicalMaskWidth = layoutBoundsOnTex01.width * maskPixelSize;
                        const physicalMaskHeight = layoutBoundsOnTex01.height * maskPixelSize;
                        this._tmpBoundsOnModel.setRect(allClipedDrawRect);
                        if (this._tmpBoundsOnModel.width * ppu > physicalMaskWidth) {
                            this._tmpBoundsOnModel.expand(allClipedDrawRect.width * MARGIN, 0.0);
                            scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
                        }
                        else {
                            scaleX = ppu / physicalMaskWidth;
                        }
                        if (this._tmpBoundsOnModel.height * ppu > physicalMaskHeight) {
                            this._tmpBoundsOnModel.expand(0.0, allClipedDrawRect.height * MARGIN);
                            scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
                        }
                        else {
                            scaleY = ppu / physicalMaskHeight;
                        }
                    }
                    else {
                        this._tmpBoundsOnModel.setRect(allClipedDrawRect);
                        this._tmpBoundsOnModel.expand(allClipedDrawRect.width * MARGIN, allClipedDrawRect.height * MARGIN);
                        //########## 本来は割り当てられた領域の全体を使わず必要最低限のサイズがよい
                        // シェーダ用の計算式を求める。回転を考慮しない場合は以下のとおり
                        // movePeriod' = movePeriod * scaleX + offX		  [[ movePeriod' = (movePeriod - tmpBoundsOnModel.movePeriod)*scale + layoutBoundsOnTex01.movePeriod ]]
                        scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
                        scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
                    }
                    // マスク生成時に使う行列を求める
                    {
                        // シェーダに渡す行列を求める <<<<<<<<<<<<<<<<<<<<<<<< 要最適化（逆順に計算すればシンプルにできる）
                        this._tmpMatrix.loadIdentity();
                        {
                            // layout0..1 を -1..1に変換
                            this._tmpMatrix.translateRelative(-1.0, -1.0);
                            this._tmpMatrix.scaleRelative(2.0, 2.0);
                        }
                        {
                            // view to layout0..1
                            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                            this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
                            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                            // new = [translate][scale][translate]
                        }
                        // tmpMatrixForMaskが計算結果
                        this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
                    }
                    //--------- draw時の mask 参照用行列を計算
                    {
                        // シェーダに渡す行列を求める <<<<<<<<<<<<<<<<<<<<<<<< 要最適化（逆順に計算すればシンプルにできる）
                        this._tmpMatrix.loadIdentity();
                        {
                            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                            this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
                            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                            // new = [translate][scale][translate]
                        }
                        this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
                    }
                    clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
                    clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
                    if (!renderer.isUsingHighPrecisionMask()) {
                        const clipDrawCount = clipContext._clippingIdCount;
                        for (let i = 0; i < clipDrawCount; i++) {
                            const clipDrawIndex = clipContext._clippingIdList[i];
                            // 頂点情報が更新されておらず、信頼性がない場合は描画をパスする
                            if (!model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                                continue;
                            }
                            renderer.setIsCulling(model.getDrawableCulling(clipDrawIndex) != false);
                            // マスクがクリアされていないなら処理する
                            if (!this._clearedFrameBufferflags.at(clipContext._bufferIndex)) {
                                // マスクをクリアする
                                // (仮仕様) 1が無効（描かれない）領域、0が有効（描かれる）領域。（シェーダーCd*Csで0に近い値をかけてマスクを作る。1をかけると何も起こらない）
                                this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
                                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                                this._clearedFrameBufferflags.set(clipContext._bufferIndex, true);
                            }
                            // 今回専用の変換を適用して描く
                            // チャンネルも切り替える必要がある(A,R,G,B)
                            renderer.setClippingContextBufferForMask(clipContext);
                            renderer.drawMesh(model.getDrawableTextureIndex(clipDrawIndex), model.getDrawableVertexIndexCount(clipDrawIndex), model.getDrawableVertexCount(clipDrawIndex), model.getDrawableVertexIndices(clipDrawIndex), model.getDrawableVertices(clipDrawIndex), model.getDrawableVertexUvs(clipDrawIndex), model.getMultiplyColor(clipDrawIndex), model.getScreenColor(clipDrawIndex), model.getDrawableOpacity(clipDrawIndex), CubismBlendMode.CubismBlendMode_Normal, // クリッピングは通常描画を強制
                            false // マスク生成時はクリッピングの反転使用は全く関係がない
                            );
                        }
                    }
                }
                if (!renderer.isUsingHighPrecisionMask()) {
                    // --- 後処理 ---
                    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo); // 描画対象を戻す
                    renderer.setClippingContextBufferForMask(null);
                    this.gl.viewport(s_viewport[0], s_viewport[1], s_viewport[2], s_viewport[3]);
                }
            }
        }
        /**
         * 既にマスクを作っているかを確認
         * 作っている様であれば該当するクリッピングマスクのインスタンスを返す
         * 作っていなければNULLを返す
         * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのリスト
         * @param drawableMaskCounts 描画オブジェクトをマスクする描画オブジェクトの数
         * @return 該当するクリッピングマスクが存在すればインスタンスを返し、なければNULLを返す
         */
        findSameClip(drawableMasks, drawableMaskCounts) {
            // 作成済みClippingContextと一致するか確認
            for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
                const clippingContext = this._clippingContextListForMask.at(i);
                const count = clippingContext._clippingIdCount;
                // 個数が違う場合は別物
                if (count != drawableMaskCounts) {
                    continue;
                }
                let sameCount = 0;
                // 同じIDを持つか確認。配列の数が同じなので、一致した個数が同じなら同じ物を持つとする
                for (let j = 0; j < count; j++) {
                    const clipId = clippingContext._clippingIdList[j];
                    for (let k = 0; k < count; k++) {
                        if (drawableMasks[k] == clipId) {
                            sameCount++;
                            break;
                        }
                    }
                }
                if (sameCount == count) {
                    return clippingContext;
                }
            }
            return null; // 見つからなかった
        }
        /**
         * クリッピングコンテキストを配置するレイアウト
         * 指定された数のレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする
         * マスクグループの数が4以下ならRGBA各チャンネルに一つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する。
         *
         * @param usingClipCount 配置するクリッピングコンテキストの数
         */
        setupLayoutBounds(usingClipCount) {
            const useClippingMaskMaxCount = this._renderTextureCount <= 1
                ? ClippingMaskMaxCountOnDefault
                : ClippingMaskMaxCountOnMultiRenderTexture * this._renderTextureCount;
            if (usingClipCount <= 0 || usingClipCount > useClippingMaskMaxCount) {
                if (usingClipCount > useClippingMaskMaxCount) {
                    // マスクの制限数の警告を出す
                    CubismLogError('not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}', usingClipCount - useClippingMaskMaxCount, this._renderTextureCount, usingClipCount);
                }
                // この場合は一つのマスクターゲットを毎回クリアして使用する
                for (let index = 0; index < this._clippingContextListForMask.getSize(); index++) {
                    const clipContext = this._clippingContextListForMask.at(index);
                    clipContext._layoutChannelNo = 0; // どうせ毎回消すので固定
                    clipContext._layoutBounds.x = 0.0;
                    clipContext._layoutBounds.y = 0.0;
                    clipContext._layoutBounds.width = 1.0;
                    clipContext._layoutBounds.height = 1.0;
                    clipContext._bufferIndex = 0;
                }
                return;
            }
            // レンダーテクスチャが1枚なら9分割する（最大36枚）
            const layoutCountMaxValue = this._renderTextureCount <= 1 ? 9 : 8;
            // 指定された数のレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする（デフォルトなら1）
            // マスクグループの数が4以下ならRGBA各チャンネルに1つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する
            let countPerSheetDiv = usingClipCount / this._renderTextureCount; // レンダーテクスチャ1枚あたり何枚割り当てるか
            let countPerSheetMod = usingClipCount % this._renderTextureCount; // この番号のレンダーテクスチャまでに一つずつ配分する
            // 小数点は切り捨てる
            countPerSheetDiv = ~~countPerSheetDiv;
            countPerSheetMod = ~~countPerSheetMod;
            // RGBAを順番に使っていく
            let div = countPerSheetDiv / ColorChannelCount; // 1チャンネルに配置する基本のマスク
            let mod = countPerSheetDiv % ColorChannelCount; // 余り、この番号のチャンネルまでに一つずつ配分する
            // 小数点は切り捨てる
            div = ~~div;
            mod = ~~mod;
            // RGBAそれぞれのチャンネルを用意していく（0:R, 1:G, 2:B, 3:A）
            let curClipIndex = 0; // 順番に設定していく
            for (let renderTextureNo = 0; renderTextureNo < this._renderTextureCount; renderTextureNo++) {
                for (let channelNo = 0; channelNo < ColorChannelCount; channelNo++) {
                    // このチャンネルにレイアウトする数
                    let layoutCount = div + (channelNo < mod ? 1 : 0);
                    // このレンダーテクスチャにまだ割り当てられていなければ追加する
                    const checkChannelNo = mod + 1 >= ColorChannelCount ? 0 : mod + 1;
                    if (layoutCount < layoutCountMaxValue && channelNo == checkChannelNo) {
                        layoutCount += renderTextureNo < countPerSheetMod ? 1 : 0;
                    }
                    // 分割方法を決定する
                    if (layoutCount == 0) ;
                    else if (layoutCount == 1) {
                        // 全てをそのまま使う
                        const clipContext = this._clippingContextListForMask.at(curClipIndex++);
                        clipContext._layoutChannelNo = channelNo;
                        clipContext._layoutBounds.x = 0.0;
                        clipContext._layoutBounds.y = 0.0;
                        clipContext._layoutBounds.width = 1.0;
                        clipContext._layoutBounds.height = 1.0;
                        clipContext._bufferIndex = renderTextureNo;
                    }
                    else if (layoutCount == 2) {
                        for (let i = 0; i < layoutCount; i++) {
                            let xpos = i % 2;
                            // 小数点は切り捨てる
                            xpos = ~~xpos;
                            const cc = this._clippingContextListForMask.at(curClipIndex++);
                            cc._layoutChannelNo = channelNo;
                            // UVを2つに分解して使う
                            cc._layoutBounds.x = xpos * 0.5;
                            cc._layoutBounds.y = 0.0;
                            cc._layoutBounds.width = 0.5;
                            cc._layoutBounds.height = 1.0;
                            cc._bufferIndex = renderTextureNo;
                        }
                    }
                    else if (layoutCount <= 4) {
                        // 4分割して使う
                        for (let i = 0; i < layoutCount; i++) {
                            let xpos = i % 2;
                            let ypos = i / 2;
                            // 小数点は切り捨てる
                            xpos = ~~xpos;
                            ypos = ~~ypos;
                            const cc = this._clippingContextListForMask.at(curClipIndex++);
                            cc._layoutChannelNo = channelNo;
                            cc._layoutBounds.x = xpos * 0.5;
                            cc._layoutBounds.y = ypos * 0.5;
                            cc._layoutBounds.width = 0.5;
                            cc._layoutBounds.height = 0.5;
                            cc._bufferIndex = renderTextureNo;
                        }
                    }
                    else if (layoutCount <= layoutCountMaxValue) {
                        // 9分割して使う
                        for (let i = 0; i < layoutCount; i++) {
                            let xpos = i % 3;
                            let ypos = i / 3;
                            // 小数点は切り捨てる
                            xpos = ~~xpos;
                            ypos = ~~ypos;
                            const cc = this._clippingContextListForMask.at(curClipIndex++);
                            cc._layoutChannelNo = channelNo;
                            cc._layoutBounds.x = xpos / 3.0;
                            cc._layoutBounds.y = ypos / 3.0;
                            cc._layoutBounds.width = 1.0 / 3.0;
                            cc._layoutBounds.height = 1.0 / 3.0;
                            cc._bufferIndex = renderTextureNo;
                        }
                    }
                    else {
                        // マスクの制限枚数を超えた場合の処理
                        CubismLogError('not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}', usingClipCount - useClippingMaskMaxCount, this._renderTextureCount, usingClipCount);
                        // SetupShaderProgramでオーバーアクセスが発生するので仮で数値を入れる
                        // もちろん描画結果は正しいものではなくなる
                        for (let index = 0; index < layoutCount; index++) {
                            const cc = this._clippingContextListForMask.at(curClipIndex++);
                            cc._layoutChannelNo = 0;
                            cc._layoutBounds.x = 0.0;
                            cc._layoutBounds.y = 0.0;
                            cc._layoutBounds.width = 1.0;
                            cc._layoutBounds.height = 1.0;
                            cc._bufferIndex = 0;
                        }
                    }
                }
            }
        }
        /**
         * カラーバッファを取得する
         * @return カラーバッファ
         */
        getColorBuffer() {
            return this._maskColorBuffers;
        }
        /**
         * 画面描画に使用するクリッピングマスクのリストを取得する
         * @return 画面描画に使用するクリッピングマスクのリスト
         */
        getClippingContextListForDraw() {
            return this._clippingContextListForDraw;
        }
        /**
         * マスクの合計数をカウント
         * @returns
         */
        getClippingMaskCount() {
            return this._clippingContextListForMask.getSize();
        }
        /**
         * クリッピングマスクバッファのサイズを設定する
         * @param size クリッピングマスクバッファのサイズ
         */
        setClippingMaskBufferSize(size) {
            this._clippingMaskBufferSize = size;
        }
        /**
         * クリッピングマスクバッファのサイズを取得する
         * @return クリッピングマスクバッファのサイズ
         */
        getClippingMaskBufferSize() {
            return this._clippingMaskBufferSize;
        }
        /**
         * このバッファのレンダーテクスチャの枚数を取得する
         * @return このバッファのレンダーテクスチャの枚数
         */
        getRenderTextureCount() {
            return this._renderTextureCount;
        }
    }
    /**
     * レンダーテクスチャのリソースを定義する構造体
     * クリッピングマスクで使用する
     */
    class CubismRenderTextureResource {
        /**
         * 引数付きコンストラクタ
         * @param frameNo レンダラーのフレーム番号
         * @param texture テクスチャのアドレス
         */
        constructor(frameNo, texture) {
            this.frameNo = frameNo;
            this.textures = texture;
        }
    }
    /**
     * クリッピングマスクのコンテキスト
     */
    class CubismClippingContext {
        /**
         * 引数付きコンストラクタ
         */
        constructor(manager, clippingDrawableIndices, clipCount) {
            this._owner = manager;
            // クリップしている（＝マスク用の）Drawableのインデックスリスト
            this._clippingIdList = clippingDrawableIndices;
            // マスクの数
            this._clippingIdCount = clipCount;
            this._allClippedDrawRect = new csmRect();
            this._layoutBounds = new csmRect();
            this._clippedDrawableIndexList = [];
            this._matrixForMask = new CubismMatrix44();
            this._matrixForDraw = new CubismMatrix44();
            this._bufferIndex = 0;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            if (this._layoutBounds != null) {
                this._layoutBounds = null;
            }
            if (this._allClippedDrawRect != null) {
                this._allClippedDrawRect = null;
            }
            if (this._clippedDrawableIndexList != null) {
                this._clippedDrawableIndexList = null;
            }
        }
        /**
         * このマスクにクリップされる描画オブジェクトを追加する
         *
         * @param drawableIndex クリッピング対象に追加する描画オブジェクトのインデックス
         */
        addClippedDrawable(drawableIndex) {
            this._clippedDrawableIndexList.push(drawableIndex);
        }
        /**
         * このマスクを管理するマネージャのインスタンスを取得する
         * @return クリッピングマネージャのインスタンス
         */
        getClippingManager() {
            return this._owner;
        }
        setGl(gl) {
            this._owner.setGL(gl);
        }
    }
    class CubismRendererProfile_WebGL {
        setGlEnable(index, enabled) {
            if (enabled)
                this.gl.enable(index);
            else
                this.gl.disable(index);
        }
        setGlEnableVertexAttribArray(index, enabled) {
            if (enabled)
                this.gl.enableVertexAttribArray(index);
            else
                this.gl.disableVertexAttribArray(index);
        }
        save() {
            if (this.gl == null) {
                CubismLogError("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
                return;
            }
            //-- push state --
            this._lastArrayBufferBinding = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
            this._lastArrayBufferBinding = this.gl.getParameter(this.gl.ELEMENT_ARRAY_BUFFER_BINDING);
            this._lastProgram = this.gl.getParameter(this.gl.CURRENT_PROGRAM);
            this._lastActiveTexture = this.gl.getParameter(this.gl.ACTIVE_TEXTURE);
            this.gl.activeTexture(this.gl.TEXTURE1); //テクスチャユニット1をアクティブに（以後の設定対象とする）
            this._lastTexture1Binding2D = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
            this.gl.activeTexture(this.gl.TEXTURE0); //テクスチャユニット0をアクティブに（以後の設定対象とする）
            this._lastTexture0Binding2D = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
            this._lastVertexAttribArrayEnabled[0] = this.gl.getVertexAttrib(0, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
            this._lastVertexAttribArrayEnabled[1] = this.gl.getVertexAttrib(1, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
            this._lastVertexAttribArrayEnabled[2] = this.gl.getVertexAttrib(2, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
            this._lastVertexAttribArrayEnabled[3] = this.gl.getVertexAttrib(3, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
            this._lastScissorTest = this.gl.isEnabled(this.gl.SCISSOR_TEST);
            this._lastStencilTest = this.gl.isEnabled(this.gl.STENCIL_TEST);
            this._lastDepthTest = this.gl.isEnabled(this.gl.DEPTH_TEST);
            this._lastCullFace = this.gl.isEnabled(this.gl.CULL_FACE);
            this._lastBlend = this.gl.isEnabled(this.gl.BLEND);
            this._lastFrontFace = this.gl.getParameter(this.gl.FRONT_FACE);
            this._lastColorMask = this.gl.getParameter(this.gl.COLOR_WRITEMASK);
            // backup blending
            this._lastBlending[0] = this.gl.getParameter(this.gl.BLEND_SRC_RGB);
            this._lastBlending[1] = this.gl.getParameter(this.gl.BLEND_DST_RGB);
            this._lastBlending[2] = this.gl.getParameter(this.gl.BLEND_SRC_ALPHA);
            this._lastBlending[3] = this.gl.getParameter(this.gl.BLEND_DST_ALPHA);
            // モデル描画直前のFBOとビューポートを保存
            this._lastFBO = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING);
            this._lastViewport = this.gl.getParameter(this.gl.VIEWPORT);
        }
        restore() {
            if (this.gl == null) {
                CubismLogError("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
                return;
            }
            this.gl.useProgram(this._lastProgram);
            this.setGlEnableVertexAttribArray(0, this._lastVertexAttribArrayEnabled[0]);
            this.setGlEnableVertexAttribArray(1, this._lastVertexAttribArrayEnabled[1]);
            this.setGlEnableVertexAttribArray(2, this._lastVertexAttribArrayEnabled[2]);
            this.setGlEnableVertexAttribArray(3, this._lastVertexAttribArrayEnabled[3]);
            this.setGlEnable(this.gl.SCISSOR_TEST, this._lastScissorTest);
            this.setGlEnable(this.gl.STENCIL_TEST, this._lastStencilTest);
            this.setGlEnable(this.gl.DEPTH_TEST, this._lastDepthTest);
            this.setGlEnable(this.gl.CULL_FACE, this._lastCullFace);
            this.setGlEnable(this.gl.BLEND, this._lastBlend);
            this.gl.frontFace(this._lastFrontFace);
            this.gl.colorMask(this._lastColorMask[0], this._lastColorMask[1], this._lastColorMask[2], this._lastColorMask[3]);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._lastArrayBufferBinding); //前にバッファがバインドされていたら破棄する必要がある
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this._lastElementArrayBufferBinding);
            this.gl.activeTexture(this.gl.TEXTURE1); //テクスチャユニット1を復元
            this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture1Binding2D);
            this.gl.activeTexture(this.gl.TEXTURE0); //テクスチャユニット0を復元
            this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture0Binding2D);
            this.gl.activeTexture(this._lastActiveTexture);
            this.gl.blendFuncSeparate(this._lastBlending[0], this._lastBlending[1], this._lastBlending[2], this._lastBlending[3]);
        }
        setGl(gl) {
            this.gl = gl;
        }
        constructor() {
            this._lastVertexAttribArrayEnabled = new Array(4);
            this._lastColorMask = new Array(4);
            this._lastBlending = new Array(4);
            this._lastViewport = new Array(4);
        }
    }
    /**
     * WebGL用のシェーダープログラムを生成・破棄するクラス
     * シングルトンなクラスであり、CubismShader_WebGL.getInstanceからアクセスする。
     */
    class CubismShader_WebGL {
        /**
         * インスタンスを取得する（シングルトン）
         * @return インスタンス
         */
        static getInstance() {
            if (s_instance == null) {
                s_instance = new CubismShader_WebGL();
                return s_instance;
            }
            return s_instance;
        }
        /**
         * インスタンスを開放する（シングルトン）
         */
        static deleteInstance() {
            if (s_instance) {
                s_instance.release();
                s_instance = null;
            }
        }
        /**
         * privateなコンストラクタ
         */
        constructor() {
            this._shaderSets = new csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            this.releaseShaderProgram();
        }
        /**
         * シェーダープログラムの一連のセットアップを実行する
         * @param renderer レンダラのインスタンス
         * @param textureId GPUのテクスチャID
         * @param vertexCount ポリゴンメッシュの頂点数
         * @param vertexArray ポリゴンメッシュの頂点配列
         * @param indexArray インデックスバッファの頂点配列
         * @param uvArray uv配列
         * @param opacity 不透明度
         * @param colorBlendMode カラーブレンディングのタイプ
         * @param baseColor ベースカラー
         * @param isPremultipliedAlpha 乗算済みアルファかどうか
         * @param matrix4x4 Model-View-Projection行列
         * @param invertedMask マスクを反転して使用するフラグ
         */
        setupShaderProgram(renderer, textureId, vertexCount, vertexArray, indexArray, uvArray, bufferData, opacity, colorBlendMode, baseColor, multiplyColor, screenColor, isPremultipliedAlpha, matrix4x4, invertedMask) {
            if (!isPremultipliedAlpha) {
                CubismLogError('NoPremultipliedAlpha is not allowed');
            }
            if (this._shaderSets.getSize() == 0) {
                this.generateShaders();
            }
            // Blending
            let SRC_COLOR;
            let DST_COLOR;
            let SRC_ALPHA;
            let DST_ALPHA;
            if (renderer.getClippingContextBufferForMask() != null) {
                // マスク生成時
                const shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_SetupMask);
                this.gl.useProgram(shaderSet.shaderProgram);
                // テクスチャ設定
                this.gl.activeTexture(this.gl.TEXTURE0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
                this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
                // 頂点配列の設定(VBO)
                if (bufferData.vertex == null) {
                    bufferData.vertex = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
                this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
                // テクスチャ頂点の設定
                if (bufferData.uv == null) {
                    bufferData.uv = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
                this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
                // チャンネル
                const channelNo = renderer.getClippingContextBufferForMask()._layoutChannelNo;
                const colorChannel = renderer
                    .getClippingContextBufferForMask()
                    .getClippingManager()
                    .getChannelFlagAsColor(channelNo);
                this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
                this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForMask()._matrixForMask.getArray());
                const rect = renderer.getClippingContextBufferForMask()._layoutBounds;
                this.gl.uniform4f(shaderSet.uniformBaseColorLocation, rect.x * 2.0 - 1.0, rect.y * 2.0 - 1.0, rect.getRight() * 2.0 - 1.0, rect.getBottom() * 2.0 - 1.0);
                this.gl.uniform4f(shaderSet.uniformMultiplyColorLocation, multiplyColor.R, multiplyColor.G, multiplyColor.B, multiplyColor.A);
                this.gl.uniform4f(shaderSet.uniformScreenColorLocation, screenColor.R, screenColor.G, screenColor.B, screenColor.A);
                SRC_COLOR = this.gl.ZERO;
                DST_COLOR = this.gl.ONE_MINUS_SRC_COLOR;
                SRC_ALPHA = this.gl.ZERO;
                DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
            } // マスク生成以外の場合
            else {
                const masked = renderer.getClippingContextBufferForDraw() != null; // この描画オブジェクトはマスク対象か
                const offset = masked ? (invertedMask ? 2 : 1) : 0;
                let shaderSet = new CubismShaderSet();
                switch (colorBlendMode) {
                    case CubismBlendMode.CubismBlendMode_Normal:
                    default:
                        shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset);
                        SRC_COLOR = this.gl.ONE;
                        DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                        SRC_ALPHA = this.gl.ONE;
                        DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
                        break;
                    case CubismBlendMode.CubismBlendMode_Additive:
                        shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_AddPremultipliedAlpha + offset);
                        SRC_COLOR = this.gl.ONE;
                        DST_COLOR = this.gl.ONE;
                        SRC_ALPHA = this.gl.ZERO;
                        DST_ALPHA = this.gl.ONE;
                        break;
                    case CubismBlendMode.CubismBlendMode_Multiplicative:
                        shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_MultPremultipliedAlpha + offset);
                        SRC_COLOR = this.gl.DST_COLOR;
                        DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                        SRC_ALPHA = this.gl.ZERO;
                        DST_ALPHA = this.gl.ONE;
                        break;
                }
                this.gl.useProgram(shaderSet.shaderProgram);
                // 頂点配列の設定
                if (bufferData.vertex == null) {
                    bufferData.vertex = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
                this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
                // テクスチャ頂点の設定
                if (bufferData.uv == null) {
                    bufferData.uv = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
                this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
                if (masked) {
                    this.gl.activeTexture(this.gl.TEXTURE1);
                    const tex = renderer
                        .getClippingContextBufferForDraw()
                        .getClippingManager()
                        .getColorBuffer()
                        .at(renderer.getClippingContextBufferForDraw()._bufferIndex);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
                    this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
                    // view座標をClippingContextの座標に変換するための行列を設定
                    this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForDraw()._matrixForDraw.getArray());
                    // 使用するカラーチャンネルを設定
                    const channelNo = renderer.getClippingContextBufferForDraw()._layoutChannelNo;
                    const colorChannel = renderer
                        .getClippingContextBufferForDraw()
                        .getClippingManager()
                        .getChannelFlagAsColor(channelNo);
                    this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
                }
                // テクスチャ設定
                this.gl.activeTexture(this.gl.TEXTURE0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
                this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
                // 座標変換
                this.gl.uniformMatrix4fv(shaderSet.uniformMatrixLocation, false, matrix4x4.getArray());
                this.gl.uniform4f(shaderSet.uniformBaseColorLocation, baseColor.R, baseColor.G, baseColor.B, baseColor.A);
                this.gl.uniform4f(shaderSet.uniformMultiplyColorLocation, multiplyColor.R, multiplyColor.G, multiplyColor.B, multiplyColor.A);
                this.gl.uniform4f(shaderSet.uniformScreenColorLocation, screenColor.R, screenColor.G, screenColor.B, screenColor.A);
            }
            // IBOを作成し、データを転送
            if (bufferData.index == null) {
                bufferData.index = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, bufferData.index);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.DYNAMIC_DRAW);
            this.gl.blendFuncSeparate(SRC_COLOR, DST_COLOR, SRC_ALPHA, DST_ALPHA);
        }
        /**
         * シェーダープログラムを解放する
         */
        releaseShaderProgram() {
            for (let i = 0; i < this._shaderSets.getSize(); i++) {
                this.gl.deleteProgram(this._shaderSets.at(i).shaderProgram);
                this._shaderSets.at(i).shaderProgram = 0;
                this._shaderSets.set(i, void 0);
                this._shaderSets.set(i, null);
            }
        }
        /**
         * シェーダープログラムを初期化する
         * @param vertShaderSrc 頂点シェーダのソース
         * @param fragShaderSrc フラグメントシェーダのソース
         */
        generateShaders() {
            for (let i = 0; i < ShaderCount; i++) {
                this._shaderSets.pushBack(new CubismShaderSet());
            }
            this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(vertexShaderSrcSetupMask, fragmentShaderSrcsetupMask);
            this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(vertexShaderSrc, fragmentShaderSrcPremultipliedAlpha);
            this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(vertexShaderSrcMasked, fragmentShaderSrcMaskPremultipliedAlpha);
            this._shaderSets.at(3).shaderProgram = this.loadShaderProgram(vertexShaderSrcMasked, fragmentShaderSrcMaskInvertedPremultipliedAlpha);
            // 加算も通常と同じシェーダーを利用する
            this._shaderSets.at(4).shaderProgram = this._shaderSets.at(1).shaderProgram;
            this._shaderSets.at(5).shaderProgram = this._shaderSets.at(2).shaderProgram;
            this._shaderSets.at(6).shaderProgram = this._shaderSets.at(3).shaderProgram;
            // 乗算も通常と同じシェーダーを利用する
            this._shaderSets.at(7).shaderProgram = this._shaderSets.at(1).shaderProgram;
            this._shaderSets.at(8).shaderProgram = this._shaderSets.at(2).shaderProgram;
            this._shaderSets.at(9).shaderProgram = this._shaderSets.at(3).shaderProgram;
            // SetupMask
            this._shaderSets.at(0).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, 'a_position');
            this._shaderSets.at(0).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, 'a_texCoord');
            this._shaderSets.at(0).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 's_texture0');
            this._shaderSets.at(0).uniformClipMatrixLocation =
                this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(0).uniformChannelFlagLocation =
                this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(0).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_baseColor');
            this._shaderSets.at(0).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(0).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_screenColor');
            // 通常（PremultipliedAlpha）
            this._shaderSets.at(1).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, 'a_position');
            this._shaderSets.at(1).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, 'a_texCoord');
            this._shaderSets.at(1).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 's_texture0');
            this._shaderSets.at(1).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_matrix');
            this._shaderSets.at(1).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_baseColor');
            this._shaderSets.at(1).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(1).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_screenColor');
            // 通常（クリッピング、PremultipliedAlpha）
            this._shaderSets.at(2).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, 'a_position');
            this._shaderSets.at(2).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, 'a_texCoord');
            this._shaderSets.at(2).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 's_texture0');
            this._shaderSets.at(2).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 's_texture1');
            this._shaderSets.at(2).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_matrix');
            this._shaderSets.at(2).uniformClipMatrixLocation =
                this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(2).uniformChannelFlagLocation =
                this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(2).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_baseColor');
            this._shaderSets.at(2).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(2).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_screenColor');
            // 通常（クリッピング・反転, PremultipliedAlpha）
            this._shaderSets.at(3).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, 'a_position');
            this._shaderSets.at(3).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, 'a_texCoord');
            this._shaderSets.at(3).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 's_texture0');
            this._shaderSets.at(3).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 's_texture1');
            this._shaderSets.at(3).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_matrix');
            this._shaderSets.at(3).uniformClipMatrixLocation =
                this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(3).uniformChannelFlagLocation =
                this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(3).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_baseColor');
            this._shaderSets.at(3).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(3).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_screenColor');
            // 加算（PremultipliedAlpha）
            this._shaderSets.at(4).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, 'a_position');
            this._shaderSets.at(4).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, 'a_texCoord');
            this._shaderSets.at(4).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 's_texture0');
            this._shaderSets.at(4).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_matrix');
            this._shaderSets.at(4).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_baseColor');
            this._shaderSets.at(4).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(4).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_screenColor');
            // 加算（クリッピング、PremultipliedAlpha）
            this._shaderSets.at(5).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, 'a_position');
            this._shaderSets.at(5).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, 'a_texCoord');
            this._shaderSets.at(5).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 's_texture0');
            this._shaderSets.at(5).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 's_texture1');
            this._shaderSets.at(5).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_matrix');
            this._shaderSets.at(5).uniformClipMatrixLocation =
                this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(5).uniformChannelFlagLocation =
                this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(5).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_baseColor');
            this._shaderSets.at(5).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(5).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_screenColor');
            // 加算（クリッピング・反転、PremultipliedAlpha）
            this._shaderSets.at(6).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, 'a_position');
            this._shaderSets.at(6).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, 'a_texCoord');
            this._shaderSets.at(6).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 's_texture0');
            this._shaderSets.at(6).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 's_texture1');
            this._shaderSets.at(6).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_matrix');
            this._shaderSets.at(6).uniformClipMatrixLocation =
                this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(6).uniformChannelFlagLocation =
                this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(6).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_baseColor');
            this._shaderSets.at(6).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(6).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_screenColor');
            // 乗算（PremultipliedAlpha）
            this._shaderSets.at(7).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, 'a_position');
            this._shaderSets.at(7).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, 'a_texCoord');
            this._shaderSets.at(7).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 's_texture0');
            this._shaderSets.at(7).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_matrix');
            this._shaderSets.at(7).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_baseColor');
            this._shaderSets.at(7).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(7).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_screenColor');
            // 乗算（クリッピング、PremultipliedAlpha）
            this._shaderSets.at(8).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, 'a_position');
            this._shaderSets.at(8).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, 'a_texCoord');
            this._shaderSets.at(8).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 's_texture0');
            this._shaderSets.at(8).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 's_texture1');
            this._shaderSets.at(8).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_matrix');
            this._shaderSets.at(8).uniformClipMatrixLocation =
                this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(8).uniformChannelFlagLocation =
                this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(8).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_baseColor');
            this._shaderSets.at(8).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(8).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_screenColor');
            // 乗算（クリッピング・反転、PremultipliedAlpha）
            this._shaderSets.at(9).attributePositionLocation =
                this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, 'a_position');
            this._shaderSets.at(9).attributeTexCoordLocation =
                this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, 'a_texCoord');
            this._shaderSets.at(9).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 's_texture0');
            this._shaderSets.at(9).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 's_texture1');
            this._shaderSets.at(9).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_matrix');
            this._shaderSets.at(9).uniformClipMatrixLocation =
                this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_clipMatrix');
            this._shaderSets.at(9).uniformChannelFlagLocation =
                this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_channelFlag');
            this._shaderSets.at(9).uniformBaseColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_baseColor');
            this._shaderSets.at(9).uniformMultiplyColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_multiplyColor');
            this._shaderSets.at(9).uniformScreenColorLocation =
                this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_screenColor');
        }
        /**
         * シェーダプログラムをロードしてアドレスを返す
         * @param vertexShaderSource    頂点シェーダのソース
         * @param fragmentShaderSource  フラグメントシェーダのソース
         * @return シェーダプログラムのアドレス
         */
        loadShaderProgram(vertexShaderSource, fragmentShaderSource) {
            // Create Shader Program
            let shaderProgram = this.gl.createProgram();
            let vertShader = this.compileShaderSource(this.gl.VERTEX_SHADER, vertexShaderSource);
            if (!vertShader) {
                CubismLogError('Vertex shader compile error!');
                return 0;
            }
            let fragShader = this.compileShaderSource(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
            if (!fragShader) {
                CubismLogError('Vertex shader compile error!');
                return 0;
            }
            // Attach vertex shader to program
            this.gl.attachShader(shaderProgram, vertShader);
            // Attach fragment shader to program
            this.gl.attachShader(shaderProgram, fragShader);
            // link program
            this.gl.linkProgram(shaderProgram);
            const linkStatus = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
            // リンクに失敗したらシェーダーを削除
            if (!linkStatus) {
                CubismLogError('Failed to link program: {0}', shaderProgram);
                this.gl.deleteShader(vertShader);
                vertShader = 0;
                this.gl.deleteShader(fragShader);
                fragShader = 0;
                if (shaderProgram) {
                    this.gl.deleteProgram(shaderProgram);
                    shaderProgram = 0;
                }
                return 0;
            }
            // Release vertex and fragment shaders.
            this.gl.deleteShader(vertShader);
            this.gl.deleteShader(fragShader);
            return shaderProgram;
        }
        /**
         * シェーダープログラムをコンパイルする
         * @param shaderType シェーダタイプ(Vertex/Fragment)
         * @param shaderSource シェーダソースコード
         *
         * @return コンパイルされたシェーダープログラム
         */
        compileShaderSource(shaderType, shaderSource) {
            const source = shaderSource;
            const shader = this.gl.createShader(shaderType);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);
            if (!shader) {
                const log = this.gl.getShaderInfoLog(shader);
                CubismLogError('Shader compile log: {0} ', log);
            }
            const status = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
            if (!status) {
                this.gl.deleteShader(shader);
                return null;
            }
            return shader;
        }
        setGl(gl) {
            this.gl = gl;
        }
    }
    /**
     * CubismShader_WebGLのインナークラス
     */
    class CubismShaderSet {
    }
    var ShaderNames;
    (function (ShaderNames) {
        // SetupMask
        ShaderNames[ShaderNames["ShaderNames_SetupMask"] = 0] = "ShaderNames_SetupMask";
        // Normal
        ShaderNames[ShaderNames["ShaderNames_NormalPremultipliedAlpha"] = 1] = "ShaderNames_NormalPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_NormalMaskedPremultipliedAlpha"] = 2] = "ShaderNames_NormalMaskedPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_NomralMaskedInvertedPremultipliedAlpha"] = 3] = "ShaderNames_NomralMaskedInvertedPremultipliedAlpha";
        // Add
        ShaderNames[ShaderNames["ShaderNames_AddPremultipliedAlpha"] = 4] = "ShaderNames_AddPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlpha"] = 5] = "ShaderNames_AddMaskedPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlphaInverted"] = 6] = "ShaderNames_AddMaskedPremultipliedAlphaInverted";
        // Mult
        ShaderNames[ShaderNames["ShaderNames_MultPremultipliedAlpha"] = 7] = "ShaderNames_MultPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlpha"] = 8] = "ShaderNames_MultMaskedPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlphaInverted"] = 9] = "ShaderNames_MultMaskedPremultipliedAlphaInverted";
    })(ShaderNames || (ShaderNames = {}));
    const vertexShaderSrcSetupMask = 'attribute vec4     a_position;' +
        'attribute vec2     a_texCoord;' +
        'varying vec2       v_texCoord;' +
        'varying vec4       v_myPos;' +
        'uniform mat4       u_clipMatrix;' +
        'void main()' +
        '{' +
        '   gl_Position = u_clipMatrix * a_position;' +
        '   v_myPos = u_clipMatrix * a_position;' +
        '   v_texCoord = a_texCoord;' +
        '   v_texCoord.y = 1.0 - v_texCoord.y;' +
        '}';
    const fragmentShaderSrcsetupMask = 'precision mediump float;' +
        'varying vec2       v_texCoord;' +
        'varying vec4       v_myPos;' +
        'uniform vec4       u_baseColor;' +
        'uniform vec4       u_channelFlag;' +
        'uniform sampler2D  s_texture0;' +
        'void main()' +
        '{' +
        '   float isInside = ' +
        '       step(u_baseColor.x, v_myPos.x/v_myPos.w)' +
        '       * step(u_baseColor.y, v_myPos.y/v_myPos.w)' +
        '       * step(v_myPos.x/v_myPos.w, u_baseColor.z)' +
        '       * step(v_myPos.y/v_myPos.w, u_baseColor.w);' +
        '   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;' +
        '}';
    //----- バーテックスシェーダプログラム -----
    // Normal & Add & Mult 共通
    const vertexShaderSrc = 'attribute vec4     a_position;' + //v.vertex
        'attribute vec2     a_texCoord;' + //v.texcoord
        'varying vec2       v_texCoord;' + //v2f.texcoord
        'uniform mat4       u_matrix;' +
        'void main()' +
        '{' +
        '   gl_Position = u_matrix * a_position;' +
        '   v_texCoord = a_texCoord;' +
        '   v_texCoord.y = 1.0 - v_texCoord.y;' +
        '}';
    // Normal & Add & Mult 共通（クリッピングされたものの描画用）
    const vertexShaderSrcMasked = 'attribute vec4     a_position;' +
        'attribute vec2     a_texCoord;' +
        'varying vec2       v_texCoord;' +
        'varying vec4       v_clipPos;' +
        'uniform mat4       u_matrix;' +
        'uniform mat4       u_clipMatrix;' +
        'void main()' +
        '{' +
        '   gl_Position = u_matrix * a_position;' +
        '   v_clipPos = u_clipMatrix * a_position;' +
        '   v_texCoord = a_texCoord;' +
        '   v_texCoord.y = 1.0 - v_texCoord.y;' +
        '}';
    //----- フラグメントシェーダプログラム -----
    // Normal & Add & Mult 共通 （PremultipliedAlpha）
    const fragmentShaderSrcPremultipliedAlpha = 'precision mediump float;' +
        'varying vec2       v_texCoord;' + //v2f.texcoord
        'uniform vec4       u_baseColor;' +
        'uniform sampler2D  s_texture0;' + //_MainTex
        'uniform vec4       u_multiplyColor;' +
        'uniform vec4       u_screenColor;' +
        'void main()' +
        '{' +
        '   vec4 texColor = texture2D(s_texture0, v_texCoord);' +
        '   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;' +
        '   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);' +
        '   vec4 color = texColor * u_baseColor;' +
        '   gl_FragColor = vec4(color.rgb, color.a);' +
        '}';
    // Normal （クリッピングされたものの描画用、PremultipliedAlpha兼用）
    const fragmentShaderSrcMaskPremultipliedAlpha = 'precision mediump float;' +
        'varying vec2       v_texCoord;' +
        'varying vec4       v_clipPos;' +
        'uniform vec4       u_baseColor;' +
        'uniform vec4       u_channelFlag;' +
        'uniform sampler2D  s_texture0;' +
        'uniform sampler2D  s_texture1;' +
        'uniform vec4       u_multiplyColor;' +
        'uniform vec4       u_screenColor;' +
        'void main()' +
        '{' +
        '   vec4 texColor = texture2D(s_texture0, v_texCoord);' +
        '   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;' +
        '   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);' +
        '   vec4 col_formask = texColor * u_baseColor;' +
        '   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;' +
        '   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;' +
        '   col_formask = col_formask * maskVal;' +
        '   gl_FragColor = col_formask;' +
        '}';
    // Normal & Add & Mult 共通（クリッピングされて反転使用の描画用、PremultipliedAlphaの場合）
    const fragmentShaderSrcMaskInvertedPremultipliedAlpha = 'precision mediump float;' +
        'varying vec2      v_texCoord;' +
        'varying vec4      v_clipPos;' +
        'uniform sampler2D s_texture0;' +
        'uniform sampler2D s_texture1;' +
        'uniform vec4      u_channelFlag;' +
        'uniform vec4      u_baseColor;' +
        'uniform vec4      u_multiplyColor;' +
        'uniform vec4      u_screenColor;' +
        'void main()' +
        '{' +
        '   vec4 texColor = texture2D(s_texture0, v_texCoord);' +
        '   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;' +
        '   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);' +
        '   vec4 col_formask = texColor * u_baseColor;' +
        '   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;' +
        '   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;' +
        '   col_formask = col_formask * (1.0 - maskVal);' +
        '   gl_FragColor = col_formask;' +
        '}';
    /**
     * WebGL用の描画命令を実装したクラス
     */
    class CubismRenderer_WebGL extends CubismRenderer {
        /**
         * レンダラの初期化処理を実行する
         * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
         *
         * @param model モデルのインスタンス
         * @param maskBufferCount バッファの生成数
         */
        initialize(model, maskBufferCount = 1) {
            if (model.isUsingMasking()) {
                this._clippingManager = new CubismClippingManager_WebGL(); // クリッピングマスク・バッファ前処理方式を初期化
                this._clippingManager.initialize(model, model.getDrawableCount(), model.getDrawableMasks(), model.getDrawableMaskCounts(), maskBufferCount);
            }
            this._sortedDrawableIndexList.resize(model.getDrawableCount(), 0);
            super.initialize(model); // 親クラスの処理を呼ぶ
        }
        /**
         * WebGLテクスチャのバインド処理
         * CubismRendererにテクスチャを設定し、CubismRenderer内でその画像を参照するためのIndex値を戻り値とする
         * @param modelTextureNo セットするモデルテクスチャの番号
         * @param glTextureNo WebGLテクスチャの番号
         */
        bindTexture(modelTextureNo, glTexture) {
            this._textures.setValue(modelTextureNo, glTexture);
        }
        /**
         * WebGLにバインドされたテクスチャのリストを取得する
         * @return テクスチャのリスト
         */
        getBindedTextures() {
            return this._textures;
        }
        /**
         * クリッピングマスクバッファのサイズを設定する
         * マスク用のFrameBufferを破棄、再作成する為処理コストは高い
         * @param size クリッピングマスクバッファのサイズ
         */
        setClippingMaskBufferSize(size) {
            // クリッピングマスクを利用しない場合は早期リターン
            if (!this._model.isUsingMasking()) {
                return;
            }
            // インスタンス破棄前にレンダーテクスチャの数を保存
            const renderTextureCount = this._clippingManager.getRenderTextureCount();
            // FrameBufferのサイズを変更するためにインスタンスを破棄・再作成する
            this._clippingManager.release();
            this._clippingManager = void 0;
            this._clippingManager = null;
            this._clippingManager = new CubismClippingManager_WebGL();
            this._clippingManager.setClippingMaskBufferSize(size);
            this._clippingManager.initialize(this.getModel(), this.getModel().getDrawableCount(), this.getModel().getDrawableMasks(), this.getModel().getDrawableMaskCounts(), renderTextureCount // インスタンス破棄前に保存したレンダーテクスチャの数
            );
        }
        /**
         * クリッピングマスクバッファのサイズを取得する
         * @return クリッピングマスクバッファのサイズ
         */
        getClippingMaskBufferSize() {
            return this._model.isUsingMasking()
                ? this._clippingManager.getClippingMaskBufferSize()
                : -1;
        }
        /**
         * レンダーテクスチャの枚数を取得する
         * @return レンダーテクスチャの枚数
         */
        getRenderTextureCount() {
            return this._model.isUsingMasking()
                ? this._clippingManager.getRenderTextureCount()
                : -1;
        }
        /**
         * コンストラクタ
         */
        constructor() {
            super();
            this._clippingContextBufferForMask = null;
            this._clippingContextBufferForDraw = null;
            this._rendererProfile = new CubismRendererProfile_WebGL();
            this.firstDraw = true;
            this._textures = new csmMap();
            this._sortedDrawableIndexList = new csmVector();
            this._bufferData = {
                vertex: (WebGLBuffer = null),
                uv: (WebGLBuffer = null),
                index: (WebGLBuffer = null),
            };
            // テクスチャ対応マップの容量を確保しておく
            this._textures.prepareCapacity(32, true);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            if (this._clippingManager) {
                this._clippingManager.release();
                this._clippingManager = void 0;
                this._clippingManager = null;
            }
            if (this.gl == null) {
                return;
            }
            this.gl.deleteBuffer(this._bufferData.vertex);
            this._bufferData.vertex = null;
            this.gl.deleteBuffer(this._bufferData.uv);
            this._bufferData.uv = null;
            this.gl.deleteBuffer(this._bufferData.index);
            this._bufferData.index = null;
            this._bufferData = null;
            this._textures = null;
        }
        /**
         * モデルを描画する実際の処理
         */
        doDrawModel() {
            if (this.gl == null) {
                CubismLogError("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
                return;
            }
            //------------ クリッピングマスク・バッファ前処理方式の場合 ------------
            if (this._clippingManager != null) {
                this.preDraw();
                this._clippingManager.setupClippingContext(this.getModel(), this);
            }
            // 上記クリッピング処理内でも一度PreDrawを呼ぶので注意!!
            this.preDraw();
            const drawableCount = this.getModel().getDrawableCount();
            const renderOrder = this.getModel().getDrawableRenderOrders();
            // インデックスを描画順でソート
            for (let i = 0; i < drawableCount; ++i) {
                const order = renderOrder[i];
                this._sortedDrawableIndexList.set(order, i);
            }
            // 描画
            for (let i = 0; i < drawableCount; ++i) {
                const drawableIndex = this._sortedDrawableIndexList.at(i);
                // Drawableが表示状態でなければ処理をパスする
                if (!this.getModel().getDrawableDynamicFlagIsVisible(drawableIndex)) {
                    continue;
                }
                const clipContext = this._clippingManager != null
                    ? this._clippingManager
                        .getClippingContextListForDraw()
                        .at(drawableIndex)
                    : null;
                if (clipContext != null && this.isUsingHighPrecisionMask()) {
                    // 描くことになっていた
                    if (clipContext._isUsing) {
                        // 生成したFrameBufferと同じサイズでビューポートを設定
                        this.gl.viewport(0, 0, this._clippingManager.getClippingMaskBufferSize(), this._clippingManager.getClippingMaskBufferSize());
                        this.preDraw(); // バッファをクリアする
                        // ---------- マスク描画処理 ----------
                        // マスク用RenderTextureをactiveにセット
                        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, clipContext
                            .getClippingManager()
                            .getMaskRenderTexture()
                            .at(clipContext._bufferIndex));
                        // マスクをクリアする
                        // (仮仕様) 1が無効（描かれない）領域、0が有効（描かれる）領域。（シェーダーCd*Csで0に近い値をかけてマスクを作る。1をかけると何も起こらない）
                        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
                        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                    }
                    {
                        const clipDrawCount = clipContext._clippingIdCount;
                        for (let index = 0; index < clipDrawCount; index++) {
                            const clipDrawIndex = clipContext._clippingIdList[index];
                            // 頂点情報が更新されておらず、信頼性がない場合は描画をパスする
                            if (!this._model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                                continue;
                            }
                            this.setIsCulling(this._model.getDrawableCulling(clipDrawIndex) != false);
                            // 今回専用の変換を適用して描く
                            // チャンネルも切り替える必要がある(A,R,G,B)
                            this.setClippingContextBufferForMask(clipContext);
                            this.drawMesh(this.getModel().getDrawableTextureIndex(clipDrawIndex), this.getModel().getDrawableVertexIndexCount(clipDrawIndex), this.getModel().getDrawableVertexCount(clipDrawIndex), this.getModel().getDrawableVertexIndices(clipDrawIndex), this.getModel().getDrawableVertices(clipDrawIndex), this.getModel().getDrawableVertexUvs(clipDrawIndex), this.getModel().getMultiplyColor(clipDrawIndex), this.getModel().getScreenColor(clipDrawIndex), this.getModel().getDrawableOpacity(clipDrawIndex), CubismBlendMode.CubismBlendMode_Normal, // クリッピングは通常描画を強制
                            false // マスク生成時はクリッピングの反転使用は全く関係がない
                            );
                        }
                    }
                    {
                        // --- 後処理 ---
                        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo); // 描画対象を戻す
                        this.setClippingContextBufferForMask(null);
                        this.gl.viewport(s_viewport[0], s_viewport[1], s_viewport[2], s_viewport[3]);
                        this.preDraw(); // バッファをクリアする
                    }
                }
                // クリッピングマスクをセットする
                this.setClippingContextBufferForDraw(clipContext);
                this.setIsCulling(this.getModel().getDrawableCulling(drawableIndex));
                this.drawMesh(this.getModel().getDrawableTextureIndex(drawableIndex), this.getModel().getDrawableVertexIndexCount(drawableIndex), this.getModel().getDrawableVertexCount(drawableIndex), this.getModel().getDrawableVertexIndices(drawableIndex), this.getModel().getDrawableVertices(drawableIndex), this.getModel().getDrawableVertexUvs(drawableIndex), this.getModel().getMultiplyColor(drawableIndex), this.getModel().getScreenColor(drawableIndex), this.getModel().getDrawableOpacity(drawableIndex), this.getModel().getDrawableBlendMode(drawableIndex), this.getModel().getDrawableInvertedMaskBit(drawableIndex));
            }
        }
        /**
         * [オーバーライド]
         * 描画オブジェクト（アートメッシュ）を描画する。
         * ポリゴンメッシュとテクスチャ番号をセットで渡す。
         * @param textureNo 描画するテクスチャ番号
         * @param indexCount 描画オブジェクトのインデックス値
         * @param vertexCount ポリゴンメッシュの頂点数
         * @param indexArray ポリゴンメッシュのインデックス配列
         * @param vertexArray ポリゴンメッシュの頂点配列
         * @param uvArray uv配列
         * @param opacity 不透明度
         * @param colorBlendMode カラー合成タイプ
         * @param invertedMask マスク使用時のマスクの反転使用
         */
        drawMesh(textureNo, indexCount, vertexCount, indexArray, vertexArray, uvArray, multiplyColor, screenColor, opacity, colorBlendMode, invertedMask) {
            // 裏面描画の有効・無効
            if (this.isCulling()) {
                this.gl.enable(this.gl.CULL_FACE);
            }
            else {
                this.gl.disable(this.gl.CULL_FACE);
            }
            this.gl.frontFace(this.gl.CCW); // Cubism SDK OpenGLはマスク・アートメッシュ共にCCWが表面
            const modelColorRGBA = this.getModelColor();
            if (this.getClippingContextBufferForMask() == null) {
                // マスク生成時以外
                modelColorRGBA.A *= opacity;
                if (this.isPremultipliedAlpha()) {
                    modelColorRGBA.R *= modelColorRGBA.A;
                    modelColorRGBA.G *= modelColorRGBA.A;
                    modelColorRGBA.B *= modelColorRGBA.A;
                }
            }
            let drawtexture; // シェーダに渡すテクスチャ
            // テクスチャマップからバインド済みテクスチャＩＤを取得
            // バインドされていなければダミーのテクスチャIDをセットする
            if (this._textures.getValue(textureNo) != null) {
                drawtexture = this._textures.getValue(textureNo);
            }
            else {
                drawtexture = null;
            }
            CubismShader_WebGL.getInstance().setupShaderProgram(this, drawtexture, vertexCount, vertexArray, indexArray, uvArray, this._bufferData, opacity, colorBlendMode, modelColorRGBA, multiplyColor, screenColor, this.isPremultipliedAlpha(), this.getMvpMatrix(), invertedMask);
            // ポリゴンメッシュを描画する
            this.gl.drawElements(this.gl.TRIANGLES, indexCount, this.gl.UNSIGNED_SHORT, 0);
            // 後処理
            this.gl.useProgram(null);
            this.setClippingContextBufferForDraw(null);
            this.setClippingContextBufferForMask(null);
        }
        saveProfile() {
            this._rendererProfile.save();
        }
        restoreProfile() {
            this._rendererProfile.restore();
        }
        /**
         * レンダラが保持する静的なリソースを解放する
         * WebGLの静的なシェーダープログラムを解放する
         */
        static doStaticRelease() {
            CubismShader_WebGL.deleteInstance();
        }
        /**
         * レンダーステートを設定する
         * @param fbo アプリケーション側で指定しているフレームバッファ
         * @param viewport ビューポート
         */
        setRenderState(fbo, viewport) {
            s_fbo = fbo;
            s_viewport = viewport;
        }
        /**
         * 描画開始時の追加処理
         * モデルを描画する前にクリッピングマスクに必要な処理を実装している
         */
        preDraw() {
            if (this.firstDraw) {
                this.firstDraw = false;
            }
            this.gl.disable(this.gl.SCISSOR_TEST);
            this.gl.disable(this.gl.STENCIL_TEST);
            this.gl.disable(this.gl.DEPTH_TEST);
            // カリング（1.0beta3）
            this.gl.frontFace(this.gl.CW);
            this.gl.enable(this.gl.BLEND);
            this.gl.colorMask(true, true, true, true);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); // 前にバッファがバインドされていたら破棄する必要がある
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
            // 異方性フィルタリングを適用する
            if (this.getAnisotropy() > 0.0 && this._extension) {
                for (let i = 0; i < this._textures.getSize(); ++i) {
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures.getValue(i));
                    this.gl.texParameterf(this.gl.TEXTURE_2D, this._extension.TEXTURE_MAX_ANISOTROPY_EXT, this.getAnisotropy());
                }
            }
        }
        /**
         * マスクテクスチャに描画するクリッピングコンテキストをセットする
         */
        setClippingContextBufferForMask(clip) {
            this._clippingContextBufferForMask = clip;
        }
        /**
         * マスクテクスチャに描画するクリッピングコンテキストを取得する
         * @return マスクテクスチャに描画するクリッピングコンテキスト
         */
        getClippingContextBufferForMask() {
            return this._clippingContextBufferForMask;
        }
        /**
         * 画面上に描画するクリッピングコンテキストをセットする
         */
        setClippingContextBufferForDraw(clip) {
            this._clippingContextBufferForDraw = clip;
        }
        /**
         * 画面上に描画するクリッピングコンテキストを取得する
         * @return 画面上に描画するクリッピングコンテキスト
         */
        getClippingContextBufferForDraw() {
            return this._clippingContextBufferForDraw;
        }
        /**
         * glの設定
         */
        startUp(gl) {
            this.gl = gl;
            if (this._clippingManager) {
                this._clippingManager.setGL(gl);
            }
            CubismShader_WebGL.getInstance().setGl(gl);
            this._rendererProfile.setGl(gl);
            // 異方性フィルタリングが使用できるかチェック
            this._extension =
                this.gl.getExtension('EXT_texture_filter_anisotropic') ||
                    this.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
                    this.gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
        }
    }
    /**
     * レンダラが保持する静的なリソースを開放する
     */
    CubismRenderer.staticRelease = () => {
        CubismRenderer_WebGL.doStaticRelease();
    };
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$8;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismClippingContext = CubismClippingContext;
        Live2DCubismFramework.CubismClippingManager_WebGL = CubismClippingManager_WebGL;
        Live2DCubismFramework.CubismRenderTextureResource = CubismRenderTextureResource;
        Live2DCubismFramework.CubismRenderer_WebGL = CubismRenderer_WebGL;
        Live2DCubismFramework.CubismShaderSet = CubismShaderSet;
        Live2DCubismFramework.CubismShader_WebGL = CubismShader_WebGL;
        Live2DCubismFramework.ShaderNames = ShaderNames;
    })(Live2DCubismFramework$8 || (Live2DCubismFramework$8 = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * SDK側から与えられたDrawableの乗算色・スクリーン色上書きフラグと
     * その色を保持する構造体
     */
    class DrawableColorData {
        constructor(isOverwritten = false, color = new CubismTextureColor()) {
            this.isOverwritten = isOverwritten;
            this.Color = color;
        }
    }
    /**
     * @brief テクスチャの色をRGBAで扱うための構造体
     */
    class PartColorData {
        constructor(isOverwritten = false, color = new CubismTextureColor()) {
            this.isOverwritten = isOverwritten;
            this.Color = color;
        }
    }
    /**
     * テクスチャのカリング設定を管理するための構造体
     */
    class DrawableCullingData {
        /**
         * コンストラクタ
         *
         * @param isOverwritten
         * @param isCulling
         */
        constructor(isOverwritten = false, isCulling = false) {
            this.isOverwritten = isOverwritten;
            this.isCulling = isCulling;
        }
    }
    /**
     * モデル
     *
     * Mocデータから生成されるモデルのクラス。
     */
    class CubismModel {
        /**
         * モデルのパラメータの更新
         */
        update() {
            // Update model
            this._model.update();
            this._model.drawables.resetDynamicFlags();
        }
        /**
         * PixelsPerUnitを取得する
         * @returns PixelsPerUnit
         */
        getPixelsPerUnit() {
            if (this._model == null) {
                return 0.0;
            }
            return this._model.canvasinfo.PixelsPerUnit;
        }
        /**
         * キャンバスの幅を取得する
         */
        getCanvasWidth() {
            if (this._model == null) {
                return 0.0;
            }
            return (this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit);
        }
        /**
         * キャンバスの高さを取得する
         */
        getCanvasHeight() {
            if (this._model == null) {
                return 0.0;
            }
            return (this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit);
        }
        /**
         * パラメータを保存する
         */
        saveParameters() {
            const parameterCount = this._model.parameters.count;
            const savedParameterCount = this._savedParameters.getSize();
            for (let i = 0; i < parameterCount; ++i) {
                if (i < savedParameterCount) {
                    this._savedParameters.set(i, this._parameterValues[i]);
                }
                else {
                    this._savedParameters.pushBack(this._parameterValues[i]);
                }
            }
        }
        /**
         * 乗算色を取得する
         * @param index Drawablesのインデックス
         * @returns 指定したdrawableの乗算色(RGBA)
         */
        getMultiplyColor(index) {
            // Drawableとモデル全体の乗算色上書きフラグがどちらもtrueな場合、モデル全体の上書きフラグが優先される
            if (this.getOverwriteFlagForModelMultiplyColors() ||
                this.getOverwriteFlagForDrawableMultiplyColors(index)) {
                return this._userMultiplyColors.at(index).Color;
            }
            const color = this.getDrawableMultiplyColor(index);
            return color;
        }
        /**
         * スクリーン色を取得する
         * @param index Drawablesのインデックス
         * @returns 指定したdrawableのスクリーン色(RGBA)
         */
        getScreenColor(index) {
            // Drawableとモデル全体のスクリーン色上書きフラグがどちらもtrueな場合、モデル全体の上書きフラグが優先される
            if (this.getOverwriteFlagForModelScreenColors() ||
                this.getOverwriteFlagForDrawableScreenColors(index)) {
                return this._userScreenColors.at(index).Color;
            }
            const color = this.getDrawableScreenColor(index);
            return color;
        }
        /**
         * 乗算色をセットする
         * @param index Drawablesのインデックス
         * @param color 設定する乗算色(CubismTextureColor)
         */
        setMultiplyColorByTextureColor(index, color) {
            this.setMultiplyColorByRGBA(index, color.R, color.G, color.B, color.A);
        }
        /**
         * 乗算色をセットする
         * @param index Drawablesのインデックス
         * @param r 設定する乗算色のR値
         * @param g 設定する乗算色のG値
         * @param b 設定する乗算色のB値
         * @param a 設定する乗算色のA値
         */
        setMultiplyColorByRGBA(index, r, g, b, a = 1.0) {
            this._userMultiplyColors.at(index).Color.R = r;
            this._userMultiplyColors.at(index).Color.G = g;
            this._userMultiplyColors.at(index).Color.B = b;
            this._userMultiplyColors.at(index).Color.A = a;
        }
        /**
         * スクリーン色をセットする
         * @param index Drawablesのインデックス
         * @param color 設定するスクリーン色(CubismTextureColor)
         */
        setScreenColorByTextureColor(index, color) {
            this.setScreenColorByRGBA(index, color.R, color.G, color.B, color.A);
        }
        /**
         * スクリーン色をセットする
         * @param index Drawablesのインデックス
         * @param r 設定するスクリーン色のR値
         * @param g 設定するスクリーン色のG値
         * @param b 設定するスクリーン色のB値
         * @param a 設定するスクリーン色のA値
         */
        setScreenColorByRGBA(index, r, g, b, a = 1.0) {
            this._userScreenColors.at(index).Color.R = r;
            this._userScreenColors.at(index).Color.G = g;
            this._userScreenColors.at(index).Color.B = b;
            this._userScreenColors.at(index).Color.A = a;
        }
        /**
         * partの乗算色を取得する
         * @param partIndex partのインデックス
         * @returns 指定したpartの乗算色
         */
        getPartMultiplyColor(partIndex) {
            return this._userPartMultiplyColors.at(partIndex).Color;
        }
        /**
         * partのスクリーン色を取得する
         * @param partIndex partのインデックス
         * @returns 指定したpartのスクリーン色
         */
        getPartScreenColor(partIndex) {
            return this._userPartScreenColors.at(partIndex).Color;
        }
        /**
         * partのOverwriteColor setter関数
         * @param partIndex partのインデックス
         * @param r 設定する色のR値
         * @param g 設定する色のG値
         * @param b 設定する色のB値
         * @param a 設定する色のA値
         * @param partColors 設定するpartのカラーデータ配列
         * @param drawableColors partに関連するDrawableのカラーデータ配列
         */
        setPartColor(partIndex, r, g, b, a, partColors, drawableColors) {
            partColors.at(partIndex).Color.R = r;
            partColors.at(partIndex).Color.G = g;
            partColors.at(partIndex).Color.B = b;
            partColors.at(partIndex).Color.A = a;
            if (partColors.at(partIndex).isOverwritten) {
                for (let i = 0; i < this._partChildDrawables.at(partIndex).getSize(); ++i) {
                    const drawableIndex = this._partChildDrawables.at(partIndex).at(i);
                    drawableColors.at(drawableIndex).Color.R = r;
                    drawableColors.at(drawableIndex).Color.G = g;
                    drawableColors.at(drawableIndex).Color.B = b;
                    drawableColors.at(drawableIndex).Color.A = a;
                }
            }
        }
        /**
         * 乗算色をセットする
         * @param partIndex partのインデックス
         * @param color 設定する乗算色(CubismTextureColor)
         */
        setPartMultiplyColorByTextureColor(partIndex, color) {
            this.setPartMultiplyColorByRGBA(partIndex, color.R, color.G, color.B, color.A);
        }
        /**
         * 乗算色をセットする
         * @param partIndex partのインデックス
         * @param r 設定する乗算色のR値
         * @param g 設定する乗算色のG値
         * @param b 設定する乗算色のB値
         * @param a 設定する乗算色のA値
         */
        setPartMultiplyColorByRGBA(partIndex, r, g, b, a) {
            this.setPartColor(partIndex, r, g, b, a, this._userPartMultiplyColors, this._userMultiplyColors);
        }
        /**
         * スクリーン色をセットする
         * @param partIndex partのインデックス
         * @param color 設定するスクリーン色(CubismTextureColor)
         */
        setPartScreenColorByTextureColor(partIndex, color) {
            this.setPartScreenColorByRGBA(partIndex, color.R, color.G, color.B, color.A);
        }
        /**
         * スクリーン色をセットする
         * @param partIndex partのインデックス
         * @param r 設定するスクリーン色のR値
         * @param g 設定するスクリーン色のG値
         * @param b 設定するスクリーン色のB値
         * @param a 設定するスクリーン色のA値
         */
        setPartScreenColorByRGBA(partIndex, r, g, b, a) {
            this.setPartColor(partIndex, r, g, b, a, this._userPartScreenColors, this._userScreenColors);
        }
        /**
         * SDKから指定したモデルの乗算色を上書きするか
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverwriteFlagForModelMultiplyColors() {
            return this._isOverwrittenModelMultiplyColors;
        }
        /**
         * SDKから指定したモデルのスクリーン色を上書きするか
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverwriteFlagForModelScreenColors() {
            return this._isOverwrittenModelScreenColors;
        }
        /**
         * SDKから指定したモデルの乗算色を上書きするかセットする
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteFlagForModelMultiplyColors(value) {
            this._isOverwrittenModelMultiplyColors = value;
        }
        /**
         * SDKから指定したモデルのスクリーン色を上書きするかセットする
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteFlagForModelScreenColors(value) {
            this._isOverwrittenModelScreenColors = value;
        }
        /**
         * SDKから指定したDrawableIndexの乗算色を上書きするか
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverwriteFlagForDrawableMultiplyColors(drawableindex) {
            return this._userMultiplyColors.at(drawableindex).isOverwritten;
        }
        /**
         * SDKから指定したDrawableIndexのスクリーン色を上書きするか
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverwriteFlagForDrawableScreenColors(drawableindex) {
            return this._userScreenColors.at(drawableindex).isOverwritten;
        }
        /**
         * SDKから指定したDrawableIndexの乗算色を上書きするかセットする
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteFlagForDrawableMultiplyColors(drawableindex, value) {
            this._userMultiplyColors.at(drawableindex).isOverwritten = value;
        }
        /**
         * SDKから指定したDrawableIndexのスクリーン色を上書きするかセットする
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteFlagForDrawableScreenColors(drawableindex, value) {
            this._userScreenColors.at(drawableindex).isOverwritten = value;
        }
        /**
         * SDKからpartの乗算色を上書きするか
         * @param partIndex partのインデックス
         * @returns true    ->  SDKからの情報を優先する
         *          false   ->  モデルに設定されている色情報を使用
         */
        getOverwriteColorForPartMultiplyColors(partIndex) {
            return this._userPartMultiplyColors.at(partIndex).isOverwritten;
        }
        /**
         * SDKからpartのスクリーン色を上書きするか
         * @param partIndex partのインデックス
         * @returns true    ->  SDKからの情報を優先する
         *          false   ->  モデルに設定されている色情報を使用
         */
        getOverwriteColorForPartScreenColors(partIndex) {
            return this._userPartScreenColors.at(partIndex).isOverwritten;
        }
        /**
         * partのOverwriteFlag setter関数
         * @param partIndex partのインデックス
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         * @param partColors 設定するpartのカラーデータ配列
         * @param drawableColors partに関連するDrawableのカラーデータ配列
         */
        setOverwriteColorForPartColors(partIndex, value, partColors, drawableColors) {
            partColors.at(partIndex).isOverwritten = value;
            for (let i = 0; i < this._partChildDrawables.at(partIndex).getSize(); ++i) {
                const drawableIndex = this._partChildDrawables.at(partIndex).at(i);
                drawableColors.at(drawableIndex).isOverwritten = value;
                if (value) {
                    drawableColors.at(drawableIndex).Color.R =
                        partColors.at(partIndex).Color.R;
                    drawableColors.at(drawableIndex).Color.G =
                        partColors.at(partIndex).Color.G;
                    drawableColors.at(drawableIndex).Color.B =
                        partColors.at(partIndex).Color.B;
                    drawableColors.at(drawableIndex).Color.A =
                        partColors.at(partIndex).Color.A;
                }
            }
        }
        /**
         * SDKからpartのスクリーン色を上書きするかをセットする
         * @param partIndex partのインデックス
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteColorForPartMultiplyColors(partIndex, value) {
            this._userPartMultiplyColors.at(partIndex).isOverwritten = value;
            this.setOverwriteColorForPartColors(partIndex, value, this._userPartMultiplyColors, this._userMultiplyColors);
        }
        /**
         * SDKからpartのスクリーン色を上書きするかをセットする
         * @param partIndex partのインデックス
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteColorForPartScreenColors(partIndex, value) {
            this._userPartScreenColors.at(partIndex).isOverwritten = value;
            this.setOverwriteColorForPartColors(partIndex, value, this._userPartScreenColors, this._userScreenColors);
        }
        /**
         * Drawableのカリング情報を取得する。
         *
         * @param   drawableIndex   Drawableのインデックス
         * @return  Drawableのカリング情報
         */
        getDrawableCulling(drawableIndex) {
            if (this.getOverwriteFlagForModelCullings() ||
                this.getOverwriteFlagForDrawableCullings(drawableIndex)) {
                return this._userCullings.at(drawableIndex).isCulling;
            }
            const constantFlags = this._model.drawables.constantFlags;
            return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(constantFlags[drawableIndex]);
        }
        /**
         * Drawableのカリング情報を設定する。
         *
         * @param drawableIndex Drawableのインデックス
         * @param isCulling カリング情報
         */
        setDrawableCulling(drawableIndex, isCulling) {
            this._userCullings.at(drawableIndex).isCulling = isCulling;
        }
        /**
         * SDKからモデル全体のカリング設定を上書きするか。
         *
         * @retval  true    ->  SDK上のカリング設定を使用
         * @retval  false   ->  モデルのカリング設定を使用
         */
        getOverwriteFlagForModelCullings() {
            return this._isOverwrittenCullings;
        }
        /**
         * SDKからモデル全体のカリング設定を上書きするかを設定する。
         *
         * @param isOverwrittenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
         */
        setOverwriteFlagForModelCullings(isOverwrittenCullings) {
            this._isOverwrittenCullings = isOverwrittenCullings;
        }
        /**
         *
         * @param drawableIndex Drawableのインデックス
         * @retval  true    ->  SDK上のカリング設定を使用
         * @retval  false   ->  モデルのカリング設定を使用
         */
        getOverwriteFlagForDrawableCullings(drawableIndex) {
            return this._userCullings.at(drawableIndex).isOverwritten;
        }
        /**
         *
         * @param drawableIndex Drawableのインデックス
         * @param isOverwrittenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
         */
        setOverwriteFlagForDrawableCullings(drawableIndex, isOverwrittenCullings) {
            this._userCullings.at(drawableIndex).isOverwritten = isOverwrittenCullings;
        }
        /**
         * モデルの不透明度を取得する
         *
         * @returns 不透明度の値
         */
        getModelOapcity() {
            return this._modelOpacity;
        }
        /**
         * モデルの不透明度を設定する
         *
         * @param value 不透明度の値
         */
        setModelOapcity(value) {
            this._modelOpacity = value;
        }
        /**
         * モデルを取得
         */
        getModel() {
            return this._model;
        }
        /**
         * パーツのインデックスを取得
         * @param partId パーツのID
         * @return パーツのインデックス
         */
        getPartIndex(partId) {
            let partIndex;
            const partCount = this._model.parts.count;
            for (partIndex = 0; partIndex < partCount; ++partIndex) {
                if (partId == this._partIds.at(partIndex)) {
                    return partIndex;
                }
            }
            // モデルに存在していない場合、非存在パーツIDリスト内にあるかを検索し、そのインデックスを返す
            if (this._notExistPartId.isExist(partId)) {
                return this._notExistPartId.getValue(partId);
            }
            // 非存在パーツIDリストにない場合、新しく要素を追加する
            partIndex = partCount + this._notExistPartId.getSize();
            this._notExistPartId.setValue(partId, partIndex);
            this._notExistPartOpacities.appendKey(partIndex);
            return partIndex;
        }
        /**
         * パーツのIDを取得する。
         *
         * @param partIndex 取得するパーツのインデックス
         * @return パーツのID
         */
        getPartId(partIndex) {
            const partId = this._model.parts.ids[partIndex];
            return CubismFramework.getIdManager().getId(partId);
        }
        /**
         * パーツの個数の取得
         * @return パーツの個数
         */
        getPartCount() {
            const partCount = this._model.parts.count;
            return partCount;
        }
        /**
         * パーツの不透明度の設定(Index)
         * @param partIndex パーツのインデックス
         * @param opacity 不透明度
         */
        setPartOpacityByIndex(partIndex, opacity) {
            if (this._notExistPartOpacities.isExist(partIndex)) {
                this._notExistPartOpacities.setValue(partIndex, opacity);
                return;
            }
            // インデックスの範囲内検知
            CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
            this._partOpacities[partIndex] = opacity;
        }
        /**
         * パーツの不透明度の設定(Id)
         * @param partId パーツのID
         * @param opacity パーツの不透明度
         */
        setPartOpacityById(partId, opacity) {
            // 高速化のためにPartIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
            const index = this.getPartIndex(partId);
            if (index < 0) {
                return; // パーツがないのでスキップ
            }
            this.setPartOpacityByIndex(index, opacity);
        }
        /**
         * パーツの不透明度の取得(index)
         * @param partIndex パーツのインデックス
         * @return パーツの不透明度
         */
        getPartOpacityByIndex(partIndex) {
            if (this._notExistPartOpacities.isExist(partIndex)) {
                // モデルに存在しないパーツIDの場合、非存在パーツリストから不透明度を返す。
                return this._notExistPartOpacities.getValue(partIndex);
            }
            // インデックスの範囲内検知
            CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
            return this._partOpacities[partIndex];
        }
        /**
         * パーツの不透明度の取得(id)
         * @param partId パーツのＩｄ
         * @return パーツの不透明度
         */
        getPartOpacityById(partId) {
            // 高速化のためにPartIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
            const index = this.getPartIndex(partId);
            if (index < 0) {
                return 0; // パーツが無いのでスキップ
            }
            return this.getPartOpacityByIndex(index);
        }
        /**
         * パラメータのインデックスの取得
         * @param パラメータID
         * @return パラメータのインデックス
         */
        getParameterIndex(parameterId) {
            let parameterIndex;
            const idCount = this._model.parameters.count;
            for (parameterIndex = 0; parameterIndex < idCount; ++parameterIndex) {
                if (parameterId != this._parameterIds.at(parameterIndex)) {
                    continue;
                }
                return parameterIndex;
            }
            // モデルに存在していない場合、非存在パラメータIDリスト内を検索し、そのインデックスを返す
            if (this._notExistParameterId.isExist(parameterId)) {
                return this._notExistParameterId.getValue(parameterId);
            }
            // 非存在パラメータIDリストにない場合新しく要素を追加する
            parameterIndex =
                this._model.parameters.count + this._notExistParameterId.getSize();
            this._notExistParameterId.setValue(parameterId, parameterIndex);
            this._notExistParameterValues.appendKey(parameterIndex);
            return parameterIndex;
        }
        /**
         * パラメータの個数の取得
         * @return パラメータの個数
         */
        getParameterCount() {
            return this._model.parameters.count;
        }
        /**
         * パラメータの種類の取得
         * @param parameterIndex パラメータのインデックス
         * @return csmParameterType_Normal -> 通常のパラメータ
         *          csmParameterType_BlendShape -> ブレンドシェイプパラメータ
         */
        getParameterType(parameterIndex) {
            return this._model.parameters.types[parameterIndex];
        }
        /**
         * パラメータの最大値の取得
         * @param parameterIndex パラメータのインデックス
         * @return パラメータの最大値
         */
        getParameterMaximumValue(parameterIndex) {
            return this._model.parameters.maximumValues[parameterIndex];
        }
        /**
         * パラメータの最小値の取得
         * @param parameterIndex パラメータのインデックス
         * @return パラメータの最小値
         */
        getParameterMinimumValue(parameterIndex) {
            return this._model.parameters.minimumValues[parameterIndex];
        }
        /**
         * パラメータのデフォルト値の取得
         * @param parameterIndex パラメータのインデックス
         * @return パラメータのデフォルト値
         */
        getParameterDefaultValue(parameterIndex) {
            return this._model.parameters.defaultValues[parameterIndex];
        }
        /**
         * パラメータの値の取得
         * @param parameterIndex    パラメータのインデックス
         * @return パラメータの値
         */
        getParameterValueByIndex(parameterIndex) {
            if (this._notExistParameterValues.isExist(parameterIndex)) {
                return this._notExistParameterValues.getValue(parameterIndex);
            }
            // インデックスの範囲内検知
            CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
            return this._parameterValues[parameterIndex];
        }
        /**
         * パラメータの値の取得
         * @param parameterId    パラメータのID
         * @return パラメータの値
         */
        getParameterValueById(parameterId) {
            // 高速化のためにparameterIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
            const parameterIndex = this.getParameterIndex(parameterId);
            return this.getParameterValueByIndex(parameterIndex);
        }
        /**
         * パラメータの値の設定
         * @param parameterIndex パラメータのインデックス
         * @param value パラメータの値
         * @param weight 重み
         */
        setParameterValueByIndex(parameterIndex, value, weight = 1.0) {
            if (this._notExistParameterValues.isExist(parameterIndex)) {
                this._notExistParameterValues.setValue(parameterIndex, weight == 1
                    ? value
                    : this._notExistParameterValues.getValue(parameterIndex) *
                        (1 - weight) +
                        value * weight);
                return;
            }
            // インデックスの範囲内検知
            CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
            if (this._model.parameters.maximumValues[parameterIndex] < value) {
                value = this._model.parameters.maximumValues[parameterIndex];
            }
            if (this._model.parameters.minimumValues[parameterIndex] > value) {
                value = this._model.parameters.minimumValues[parameterIndex];
            }
            this._parameterValues[parameterIndex] =
                weight == 1
                    ? value
                    : (this._parameterValues[parameterIndex] =
                        this._parameterValues[parameterIndex] * (1 - weight) +
                            value * weight);
        }
        /**
         * パラメータの値の設定
         * @param parameterId パラメータのID
         * @param value パラメータの値
         * @param weight 重み
         */
        setParameterValueById(parameterId, value, weight = 1.0) {
            const index = this.getParameterIndex(parameterId);
            this.setParameterValueByIndex(index, value, weight);
        }
        /**
         * パラメータの値の加算(index)
         * @param parameterIndex パラメータインデックス
         * @param value 加算する値
         * @param weight 重み
         */
        addParameterValueByIndex(parameterIndex, value, weight = 1.0) {
            this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) + value * weight);
        }
        /**
         * パラメータの値の加算(id)
         * @param parameterId パラメータＩＤ
         * @param value 加算する値
         * @param weight 重み
         */
        addParameterValueById(parameterId, value, weight = 1.0) {
            const index = this.getParameterIndex(parameterId);
            this.addParameterValueByIndex(index, value, weight);
        }
        /**
         * パラメータの値の乗算
         * @param parameterId パラメータのID
         * @param value 乗算する値
         * @param weight 重み
         */
        multiplyParameterValueById(parameterId, value, weight = 1.0) {
            const index = this.getParameterIndex(parameterId);
            this.multiplyParameterValueByIndex(index, value, weight);
        }
        /**
         * パラメータの値の乗算
         * @param parameterIndex パラメータのインデックス
         * @param value 乗算する値
         * @param weight 重み
         */
        multiplyParameterValueByIndex(parameterIndex, value, weight = 1.0) {
            this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) *
                (1.0 + (value - 1.0) * weight));
        }
        /**
         * Drawableのインデックスの取得
         * @param drawableId DrawableのID
         * @return Drawableのインデックス
         */
        getDrawableIndex(drawableId) {
            const drawableCount = this._model.drawables.count;
            for (let drawableIndex = 0; drawableIndex < drawableCount; ++drawableIndex) {
                if (this._drawableIds.at(drawableIndex) == drawableId) {
                    return drawableIndex;
                }
            }
            return -1;
        }
        /**
         * Drawableの個数の取得
         * @return drawableの個数
         */
        getDrawableCount() {
            const drawableCount = this._model.drawables.count;
            return drawableCount;
        }
        /**
         * DrawableのIDを取得する
         * @param drawableIndex Drawableのインデックス
         * @return drawableのID
         */
        getDrawableId(drawableIndex) {
            const parameterIds = this._model.drawables.ids;
            return CubismFramework.getIdManager().getId(parameterIds[drawableIndex]);
        }
        /**
         * Drawableの描画順リストの取得
         * @return Drawableの描画順リスト
         */
        getDrawableRenderOrders() {
            const renderOrders = this._model.drawables.renderOrders;
            return renderOrders;
        }
        /**
         * @deprecated
         * 関数名が誤っていたため、代替となる getDrawableTextureIndex を追加し、この関数は非推奨となりました。
         *
         * Drawableのテクスチャインデックスリストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのテクスチャインデックスリスト
         */
        getDrawableTextureIndices(drawableIndex) {
            return this.getDrawableTextureIndex(drawableIndex);
        }
        /**
         * Drawableのテクスチャインデックスの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのテクスチャインデックス
         */
        getDrawableTextureIndex(drawableIndex) {
            const textureIndices = this._model.drawables.textureIndices;
            return textureIndices[drawableIndex];
        }
        /**
         * DrawableのVertexPositionsの変化情報の取得
         *
         * 直近のCubismModel.update関数でDrawableの頂点情報が変化したかを取得する。
         *
         * @param   drawableIndex   Drawableのインデックス
         * @retval  true    Drawableの頂点情報が直近のCubismModel.update関数で変化した
         * @retval  false   Drawableの頂点情報が直近のCubismModel.update関数で変化していない
         */
        getDrawableDynamicFlagVertexPositionsDidChange(drawableIndex) {
            const dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * Drawableの頂点インデックスの個数の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点インデックスの個数
         */
        getDrawableVertexIndexCount(drawableIndex) {
            const indexCounts = this._model.drawables.indexCounts;
            return indexCounts[drawableIndex];
        }
        /**
         * Drawableの頂点の個数の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点の個数
         */
        getDrawableVertexCount(drawableIndex) {
            const vertexCounts = this._model.drawables.vertexCounts;
            return vertexCounts[drawableIndex];
        }
        /**
         * Drawableの頂点リストの取得
         * @param drawableIndex drawableのインデックス
         * @return drawableの頂点リスト
         */
        getDrawableVertices(drawableIndex) {
            return this.getDrawableVertexPositions(drawableIndex);
        }
        /**
         * Drawableの頂点インデックスリストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点インデックスリスト
         */
        getDrawableVertexIndices(drawableIndex) {
            const indicesArray = this._model.drawables.indices;
            return indicesArray[drawableIndex];
        }
        /**
         * Drawableの頂点リストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点リスト
         */
        getDrawableVertexPositions(drawableIndex) {
            const verticesArray = this._model.drawables.vertexPositions;
            return verticesArray[drawableIndex];
        }
        /**
         * Drawableの頂点のUVリストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点UVリスト
         */
        getDrawableVertexUvs(drawableIndex) {
            const uvsArray = this._model.drawables.vertexUvs;
            return uvsArray[drawableIndex];
        }
        /**
         * Drawableの不透明度の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの不透明度
         */
        getDrawableOpacity(drawableIndex) {
            const opacities = this._model.drawables.opacities;
            return opacities[drawableIndex];
        }
        /**
         * Drawableの乗算色の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの乗算色(RGBA)
         * スクリーン色はRGBAで取得されるが、Aは必ず0
         */
        getDrawableMultiplyColor(drawableIndex) {
            const multiplyColors = this._model.drawables.multiplyColors;
            const index = drawableIndex * 4;
            const multiplyColor = new CubismTextureColor();
            multiplyColor.R = multiplyColors[index];
            multiplyColor.G = multiplyColors[index + 1];
            multiplyColor.B = multiplyColors[index + 2];
            multiplyColor.A = multiplyColors[index + 3];
            return multiplyColor;
        }
        /**
         * Drawableのスクリーン色の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのスクリーン色(RGBA)
         * スクリーン色はRGBAで取得されるが、Aは必ず0
         */
        getDrawableScreenColor(drawableIndex) {
            const screenColors = this._model.drawables.screenColors;
            const index = drawableIndex * 4;
            const screenColor = new CubismTextureColor();
            screenColor.R = screenColors[index];
            screenColor.G = screenColors[index + 1];
            screenColor.B = screenColors[index + 2];
            screenColor.A = screenColors[index + 3];
            return screenColor;
        }
        /**
         * Drawableの親パーツのインデックスの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの親パーツのインデックス
         */
        getDrawableParentPartIndex(drawableIndex) {
            return this._model.drawables.parentPartIndices[drawableIndex];
        }
        /**
         * Drawableのブレンドモードを取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのブレンドモード
         */
        getDrawableBlendMode(drawableIndex) {
            const constantFlags = this._model.drawables.constantFlags;
            return Live2DCubismCore.Utils.hasBlendAdditiveBit(constantFlags[drawableIndex])
                ? CubismBlendMode.CubismBlendMode_Additive
                : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(constantFlags[drawableIndex])
                    ? CubismBlendMode.CubismBlendMode_Multiplicative
                    : CubismBlendMode.CubismBlendMode_Normal;
        }
        /**
         * Drawableのマスクの反転使用の取得
         *
         * Drawableのマスク使用時の反転設定を取得する。
         * マスクを使用しない場合は無視される。
         *
         * @param drawableIndex Drawableのインデックス
         * @return Drawableの反転設定
         */
        getDrawableInvertedMaskBit(drawableIndex) {
            const constantFlags = this._model.drawables.constantFlags;
            return Live2DCubismCore.Utils.hasIsInvertedMaskBit(constantFlags[drawableIndex]);
        }
        /**
         * Drawableのクリッピングマスクリストの取得
         * @return Drawableのクリッピングマスクリスト
         */
        getDrawableMasks() {
            const masks = this._model.drawables.masks;
            return masks;
        }
        /**
         * Drawableのクリッピングマスクの個数リストの取得
         * @return Drawableのクリッピングマスクの個数リスト
         */
        getDrawableMaskCounts() {
            const maskCounts = this._model.drawables.maskCounts;
            return maskCounts;
        }
        /**
         * クリッピングマスクの使用状態
         *
         * @return true クリッピングマスクを使用している
         * @return false クリッピングマスクを使用していない
         */
        isUsingMasking() {
            for (let d = 0; d < this._model.drawables.count; ++d) {
                if (this._model.drawables.maskCounts[d] <= 0) {
                    continue;
                }
                return true;
            }
            return false;
        }
        /**
         * Drawableの表示情報を取得する
         *
         * @param drawableIndex Drawableのインデックス
         * @return true Drawableが表示
         * @return false Drawableが非表示
         */
        getDrawableDynamicFlagIsVisible(drawableIndex) {
            const dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasIsVisibleBit(dynamicFlags[drawableIndex]);
        }
        /**
         * DrawableのDrawOrderの変化情報の取得
         *
         * 直近のCubismModel.update関数でdrawableのdrawOrderが変化したかを取得する。
         * drawOrderはartMesh上で指定する0から1000の情報
         * @param drawableIndex drawableのインデックス
         * @return true drawableの不透明度が直近のCubismModel.update関数で変化した
         * @return false drawableの不透明度が直近のCubismModel.update関数で変化している
         */
        getDrawableDynamicFlagVisibilityDidChange(drawableIndex) {
            const dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * Drawableの不透明度の変化情報の取得
         *
         * 直近のCubismModel.update関数でdrawableの不透明度が変化したかを取得する。
         *
         * @param drawableIndex drawableのインデックス
         * @return true Drawableの不透明度が直近のCubismModel.update関数で変化した
         * @return false Drawableの不透明度が直近のCubismModel.update関数で変化してない
         */
        getDrawableDynamicFlagOpacityDidChange(drawableIndex) {
            const dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasOpacityDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * Drawableの描画順序の変化情報の取得
         *
         * 直近のCubismModel.update関数でDrawableの描画の順序が変化したかを取得する。
         *
         * @param drawableIndex Drawableのインデックス
         * @return true Drawableの描画の順序が直近のCubismModel.update関数で変化した
         * @return false Drawableの描画の順序が直近のCubismModel.update関数で変化してない
         */
        getDrawableDynamicFlagRenderOrderDidChange(drawableIndex) {
            const dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * Drawableの乗算色・スクリーン色の変化情報の取得
         *
         * 直近のCubismModel.update関数でDrawableの乗算色・スクリーン色が変化したかを取得する。
         *
         * @param drawableIndex Drawableのインデックス
         * @return true Drawableの乗算色・スクリーン色が直近のCubismModel.update関数で変化した
         * @return false Drawableの乗算色・スクリーン色が直近のCubismModel.update関数で変化してない
         */
        getDrawableDynamicFlagBlendColorDidChange(drawableIndex) {
            const dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasBlendColorDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * 保存されたパラメータの読み込み
         */
        loadParameters() {
            let parameterCount = this._model.parameters.count;
            const savedParameterCount = this._savedParameters.getSize();
            if (parameterCount > savedParameterCount) {
                parameterCount = savedParameterCount;
            }
            for (let i = 0; i < parameterCount; ++i) {
                this._parameterValues[i] = this._savedParameters.at(i);
            }
        }
        /**
         * 初期化する
         */
        initialize() {
            CSM_ASSERT(this._model);
            this._parameterValues = this._model.parameters.values;
            this._partOpacities = this._model.parts.opacities;
            this._parameterMaximumValues = this._model.parameters.maximumValues;
            this._parameterMinimumValues = this._model.parameters.minimumValues;
            {
                const parameterIds = this._model.parameters.ids;
                const parameterCount = this._model.parameters.count;
                this._parameterIds.prepareCapacity(parameterCount);
                for (let i = 0; i < parameterCount; ++i) {
                    this._parameterIds.pushBack(CubismFramework.getIdManager().getId(parameterIds[i]));
                }
            }
            const partCount = this._model.parts.count;
            {
                const partIds = this._model.parts.ids;
                this._partIds.prepareCapacity(partCount);
                for (let i = 0; i < partCount; ++i) {
                    this._partIds.pushBack(CubismFramework.getIdManager().getId(partIds[i]));
                }
                this._userPartMultiplyColors.prepareCapacity(partCount);
                this._userPartScreenColors.prepareCapacity(partCount);
                this._partChildDrawables.prepareCapacity(partCount);
            }
            {
                const drawableIds = this._model.drawables.ids;
                const drawableCount = this._model.drawables.count;
                this._userMultiplyColors.prepareCapacity(drawableCount);
                this._userScreenColors.prepareCapacity(drawableCount);
                // カリング設定
                this._userCullings.prepareCapacity(drawableCount);
                const userCulling = new DrawableCullingData(false, false);
                // Part
                {
                    for (let i = 0; i < partCount; ++i) {
                        const multiplyColor = new CubismTextureColor(1.0, 1.0, 1.0, 1.0);
                        const screenColor = new CubismTextureColor(0.0, 0.0, 0.0, 1.0);
                        const userMultiplyColor = new PartColorData(false, multiplyColor);
                        const userScreenColor = new PartColorData(false, screenColor);
                        this._userPartMultiplyColors.pushBack(userMultiplyColor);
                        this._userPartScreenColors.pushBack(userScreenColor);
                        this._partChildDrawables.pushBack(new csmVector());
                        this._partChildDrawables.at(i).prepareCapacity(drawableCount);
                    }
                }
                // Drawables
                {
                    for (let i = 0; i < drawableCount; ++i) {
                        const multiplyColor = new CubismTextureColor(1.0, 1.0, 1.0, 1.0);
                        const screenColor = new CubismTextureColor(0.0, 0.0, 0.0, 1.0);
                        const userMultiplyColor = new DrawableColorData(false, multiplyColor);
                        const userScreenColor = new DrawableColorData(false, screenColor);
                        this._drawableIds.pushBack(CubismFramework.getIdManager().getId(drawableIds[i]));
                        this._userMultiplyColors.pushBack(userMultiplyColor);
                        this._userScreenColors.pushBack(userScreenColor);
                        this._userCullings.pushBack(userCulling);
                        const parentIndex = this.getDrawableParentPartIndex(i);
                        if (parentIndex >= 0) {
                            this._partChildDrawables.at(parentIndex).pushBack(i);
                        }
                    }
                }
            }
        }
        /**
         * コンストラクタ
         * @param model モデル
         */
        constructor(model) {
            this._model = model;
            this._parameterValues = null;
            this._parameterMaximumValues = null;
            this._parameterMinimumValues = null;
            this._partOpacities = null;
            this._savedParameters = new csmVector();
            this._parameterIds = new csmVector();
            this._drawableIds = new csmVector();
            this._partIds = new csmVector();
            this._isOverwrittenModelMultiplyColors = false;
            this._isOverwrittenModelScreenColors = false;
            this._isOverwrittenCullings = false;
            this._modelOpacity = 1.0;
            this._userMultiplyColors = new csmVector();
            this._userScreenColors = new csmVector();
            this._userCullings = new csmVector();
            this._userPartMultiplyColors = new csmVector();
            this._userPartScreenColors = new csmVector();
            this._partChildDrawables = new csmVector();
            this._notExistPartId = new csmMap();
            this._notExistParameterId = new csmMap();
            this._notExistParameterValues = new csmMap();
            this._notExistPartOpacities = new csmMap();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            this._model.release();
            this._model = null;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$7;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismModel = CubismModel;
    })(Live2DCubismFramework$7 || (Live2DCubismFramework$7 = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * Mocデータの管理
     *
     * Mocデータの管理を行うクラス。
     */
    class CubismMoc {
        /**
         * Mocデータの作成
         */
        static create(mocBytes, shouldCheckMocConsistency) {
            let cubismMoc = null;
            if (shouldCheckMocConsistency) {
                // .moc3の整合性を確認
                const consistency = this.hasMocConsistency(mocBytes);
                if (!consistency) {
                    // 整合性が確認できなければ処理しない
                    CubismLogError(`Inconsistent MOC3.`);
                    return cubismMoc;
                }
            }
            const moc = Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
            if (moc) {
                cubismMoc = new CubismMoc(moc);
                cubismMoc._mocVersion = Live2DCubismCore.Version.csmGetMocVersion(moc, mocBytes);
            }
            return cubismMoc;
        }
        /**
         * Mocデータを削除
         *
         * Mocデータを削除する
         */
        static delete(moc) {
            moc._moc._release();
            moc._moc = null;
            moc = null;
        }
        /**
         * モデルを作成する
         *
         * @return Mocデータから作成されたモデル
         */
        createModel() {
            let cubismModel = null;
            const model = Live2DCubismCore.Model.fromMoc(this._moc);
            if (model) {
                cubismModel = new CubismModel(model);
                cubismModel.initialize();
                ++this._modelCount;
            }
            return cubismModel;
        }
        /**
         * モデルを削除する
         */
        deleteModel(model) {
            if (model != null) {
                model.release();
                model = null;
                --this._modelCount;
            }
        }
        /**
         * コンストラクタ
         */
        constructor(moc) {
            this._moc = moc;
            this._modelCount = 0;
            this._mocVersion = 0;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            CSM_ASSERT(this._modelCount == 0);
            this._moc._release();
            this._moc = null;
        }
        /**
         * 最新の.moc3 Versionを取得
         */
        getLatestMocVersion() {
            return Live2DCubismCore.Version.csmGetLatestMocVersion();
        }
        /**
         * 読み込んだモデルの.moc3 Versionを取得
         */
        getMocVersion() {
            return this._mocVersion;
        }
        /**
         * .moc3 の整合性を検証する
         */
        static hasMocConsistency(mocBytes) {
            const isConsistent = Live2DCubismCore.Moc.prototype.hasMocConsistency(mocBytes);
            return isConsistent === 1 ? true : false;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$6;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismMoc = CubismMoc;
    })(Live2DCubismFramework$6 || (Live2DCubismFramework$6 = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    const Meta = 'Meta';
    const UserDataCount = 'UserDataCount';
    const TotalUserDataSize = 'TotalUserDataSize';
    const UserData$1 = 'UserData';
    const Target = 'Target';
    const Id$1 = 'Id';
    const Value = 'Value';
    class CubismModelUserDataJson {
        /**
         * コンストラクタ
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         */
        constructor(buffer, size) {
            this._json = CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            CubismJson.delete(this._json);
        }
        /**
         * ユーザーデータ個数の取得
         * @return ユーザーデータの個数
         */
        getUserDataCount() {
            return this._json
                .getRoot()
                .getValueByString(Meta)
                .getValueByString(UserDataCount)
                .toInt();
        }
        /**
         * ユーザーデータ総文字列数の取得
         *
         * @return ユーザーデータ総文字列数
         */
        getTotalUserDataSize() {
            return this._json
                .getRoot()
                .getValueByString(Meta)
                .getValueByString(TotalUserDataSize)
                .toInt();
        }
        /**
         * ユーザーデータのタイプの取得
         *
         * @return ユーザーデータのタイプ
         */
        getUserDataTargetType(i) {
            return this._json
                .getRoot()
                .getValueByString(UserData$1)
                .getValueByIndex(i)
                .getValueByString(Target)
                .getRawString();
        }
        /**
         * ユーザーデータのターゲットIDの取得
         *
         * @param i インデックス
         * @return ユーザーデータターゲットID
         */
        getUserDataId(i) {
            return CubismFramework.getIdManager().getId(this._json
                .getRoot()
                .getValueByString(UserData$1)
                .getValueByIndex(i)
                .getValueByString(Id$1)
                .getRawString());
        }
        /**
         * ユーザーデータの文字列の取得
         *
         * @param i インデックス
         * @return ユーザーデータ
         */
        getUserDataValue(i) {
            return this._json
                .getRoot()
                .getValueByString(UserData$1)
                .getValueByIndex(i)
                .getValueByString(Value)
                .getRawString();
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$5;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismModelUserDataJson = CubismModelUserDataJson;
    })(Live2DCubismFramework$5 || (Live2DCubismFramework$5 = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    const ArtMesh = 'ArtMesh';
    /**
     * ユーザーデータインターフェース
     *
     * Jsonから読み込んだユーザーデータを記録しておくための構造体
     */
    class CubismModelUserDataNode {
    }
    /**
     * ユーザデータの管理クラス
     *
     * ユーザデータをロード、管理、検索インターフェイス、解放までを行う。
     */
    class CubismModelUserData {
        /**
         * インスタンスの作成
         *
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         * @return 作成されたインスタンス
         */
        static create(buffer, size) {
            const ret = new CubismModelUserData();
            ret.parseUserData(buffer, size);
            return ret;
        }
        /**
         * インスタンスを破棄する
         *
         * @param modelUserData 破棄するインスタンス
         */
        static delete(modelUserData) {
            if (modelUserData != null) {
                modelUserData.release();
                modelUserData = null;
            }
        }
        /**
         * ArtMeshのユーザーデータのリストの取得
         *
         * @return ユーザーデータリスト
         */
        getArtMeshUserDatas() {
            return this._artMeshUserDataNode;
        }
        /**
         * userdata3.jsonのパース
         *
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         */
        parseUserData(buffer, size) {
            let json = new CubismModelUserDataJson(buffer, size);
            const typeOfArtMesh = CubismFramework.getIdManager().getId(ArtMesh);
            const nodeCount = json.getUserDataCount();
            for (let i = 0; i < nodeCount; i++) {
                const addNode = new CubismModelUserDataNode();
                addNode.targetId = json.getUserDataId(i);
                addNode.targetType = CubismFramework.getIdManager().getId(json.getUserDataTargetType(i));
                addNode.value = new csmString(json.getUserDataValue(i));
                this._userDataNodes.pushBack(addNode);
                if (addNode.targetType == typeOfArtMesh) {
                    this._artMeshUserDataNode.pushBack(addNode);
                }
            }
            json.release();
            json = void 0;
        }
        /**
         * コンストラクタ
         */
        constructor() {
            this._userDataNodes = new csmVector();
            this._artMeshUserDataNode = new csmVector();
        }
        /**
         * デストラクタ相当の処理
         *
         * ユーザーデータ構造体配列を解放する
         */
        release() {
            for (let i = 0; i < this._userDataNodes.getSize(); ++i) {
                this._userDataNodes.set(i, null);
            }
            this._userDataNodes = null;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$4;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismModelUserData = CubismModelUserData;
        Live2DCubismFramework.CubismModelUserDataNode = CubismModelUserDataNode;
    })(Live2DCubismFramework$4 || (Live2DCubismFramework$4 = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * ユーザーが実際に使用するモデル
     *
     * ユーザーが実際に使用するモデルの基底クラス。これを継承してユーザーが実装する。
     */
    class CubismUserModel {
        /**
         * 初期化状態の取得
         *
         * 初期化されている状態か？
         *
         * @return true     初期化されている
         * @return false    初期化されていない
         */
        isInitialized() {
            return this._initialized;
        }
        /**
         * 初期化状態の設定
         *
         * 初期化状態を設定する。
         *
         * @param v 初期化状態
         */
        setInitialized(v) {
            this._initialized = v;
        }
        /**
         * 更新状態の取得
         *
         * 更新されている状態か？
         *
         * @return true     更新されている
         * @return false    更新されていない
         */
        isUpdating() {
            return this._updating;
        }
        /**
         * 更新状態の設定
         *
         * 更新状態を設定する
         *
         * @param v 更新状態
         */
        setUpdating(v) {
            this._updating = v;
        }
        /**
         * マウスドラッグ情報の設定
         * @param ドラッグしているカーソルのX位置
         * @param ドラッグしているカーソルのY位置
         */
        setDragging(x, y) {
            this._dragManager.set(x, y);
        }
        /**
         * 加速度の情報を設定する
         * @param x X軸方向の加速度
         * @param y Y軸方向の加速度
         * @param z Z軸方向の加速度
         */
        setAcceleration(x, y, z) {
            this._accelerationX = x;
            this._accelerationY = y;
            this._accelerationZ = z;
        }
        /**
         * モデル行列を取得する
         * @return モデル行列
         */
        getModelMatrix() {
            return this._modelMatrix;
        }
        /**
         * 不透明度の設定
         * @param a 不透明度
         */
        setOpacity(a) {
            this._opacity = a;
        }
        /**
         * 不透明度の取得
         * @return 不透明度
         */
        getOpacity() {
            return this._opacity;
        }
        /**
         * モデルデータを読み込む
         *
         * @param buffer    moc3ファイルが読み込まれているバッファ
         */
        loadModel(buffer, shouldCheckMocConsistency = false) {
            this._moc = CubismMoc.create(buffer, shouldCheckMocConsistency);
            if (this._moc == null) {
                CubismLogError('Failed to CubismMoc.create().');
                return;
            }
            this._model = this._moc.createModel();
            if (this._model == null) {
                CubismLogError('Failed to CreateModel().');
                return;
            }
            this._model.saveParameters();
            this._modelMatrix = new CubismModelMatrix(this._model.getCanvasWidth(), this._model.getCanvasHeight());
        }
        /**
         * 表情データの読み込み
         * @param buffer expファイルが読み込まれているバッファ
         * @param size バッファのサイズ
         * @param name 表情の名前
         */
        loadExpression(buffer, size, name) {
            return CubismExpressionMotion.create(buffer, size);
        }
        /**
         * ポーズデータの読み込み
         * @param buffer pose3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        loadPose(buffer, size) {
            this._pose = CubismPose.create(buffer, size);
        }
        /**
         * モデルに付属するユーザーデータを読み込む
         * @param buffer userdata3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        loadUserData(buffer, size) {
            this._modelUserData = CubismModelUserData.create(buffer, size);
        }
        /**
         * 物理演算データの読み込み
         * @param buffer  physics3.jsonが読み込まれているバッファ
         * @param size    バッファのサイズ
         */
        loadPhysics(buffer, size) {
            this._physics = CubismPhysics.create(buffer, size);
        }
        /**
         * 当たり判定の取得
         * @param drawableId 検証したいDrawableのID
         * @param pointX X位置
         * @param pointY Y位置
         * @return true ヒットしている
         * @return false ヒットしていない
         */
        isHit(drawableId, pointX, pointY) {
            const drawIndex = this._model.getDrawableIndex(drawableId);
            if (drawIndex < 0) {
                return false; // 存在しない場合はfalse
            }
            const count = this._model.getDrawableVertexCount(drawIndex);
            const vertices = this._model.getDrawableVertices(drawIndex);
            let left = vertices[0];
            let right = vertices[0];
            let top = vertices[1];
            let bottom = vertices[1];
            for (let j = 1; j < count; ++j) {
                const x = vertices[Constant.vertexOffset + j * Constant.vertexStep];
                const y = vertices[Constant.vertexOffset + j * Constant.vertexStep + 1];
                if (x < left) {
                    left = x; // Min x
                }
                if (x > right) {
                    right = x; // Max x
                }
                if (y < top) {
                    top = y; // Min y
                }
                if (y > bottom) {
                    bottom = y; // Max y
                }
            }
            const tx = this._modelMatrix.invertTransformX(pointX);
            const ty = this._modelMatrix.invertTransformY(pointY);
            return left <= tx && tx <= right && top <= ty && ty <= bottom;
        }
        /**
         * モデルの取得
         * @return モデル
         */
        getModel() {
            return this._model;
        }
        /**
         * レンダラの取得
         * @return レンダラ
         */
        getRenderer() {
            return this._renderer;
        }
        /**
         * レンダラを作成して初期化を実行する
         * @param maskBufferCount バッファの生成数
         */
        createRenderer(maskBufferCount = 1) {
            if (this._renderer) {
                this.deleteRenderer();
            }
            this._renderer = new CubismRenderer_WebGL();
            this._renderer.initialize(this._model, maskBufferCount);
        }
        /**
         * レンダラの解放
         */
        deleteRenderer() {
            if (this._renderer != null) {
                this._renderer.release();
                this._renderer = null;
            }
        }
        /**
         * イベント発火時の標準処理
         *
         * Eventが再生処理時にあった場合の処理をする。
         * 継承で上書きすることを想定している。
         * 上書きしない場合はログ出力をする。
         *
         * @param eventValue 発火したイベントの文字列データ
         */
        motionEventFired(eventValue) {
            CubismLogInfo('{0}', eventValue.s);
        }
        /**
         * イベント用のコールバック
         *
         * CubismMotionQueueManagerにイベント用に登録するためのCallback。
         * CubismUserModelの継承先のEventFiredを呼ぶ。
         *
         * @param caller 発火したイベントを管理していたモーションマネージャー、比較用
         * @param eventValue 発火したイベントの文字列データ
         * @param customData CubismUserModelを継承したインスタンスを想定
         */
        static cubismDefaultMotionEventCallback(caller, eventValue, customData) {
            const model = customData;
            if (model != null) {
                model.motionEventFired(eventValue);
            }
        }
        /**
         * コンストラクタ
         */
        constructor() {
            /**
             * モーションデータを読み込む
             * @param buffer motion3.jsonファイルが読み込まれているバッファ
             * @param size バッファのサイズ
             * @param name モーションの名前
             * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
             * @return モーションクラス
             */
            this.loadMotion = (buffer, size, name, onFinishedMotionHandler) => CubismMotion.create(buffer, size, onFinishedMotionHandler);
            // 各変数初期化
            this._moc = null;
            this._model = null;
            this._motionManager = null;
            this._expressionManager = null;
            this._eyeBlink = null;
            this._breath = null;
            this._modelMatrix = null;
            this._pose = null;
            this._dragManager = null;
            this._physics = null;
            this._modelUserData = null;
            this._initialized = false;
            this._updating = false;
            this._opacity = 1.0;
            this._lipsync = true;
            this._lastLipSyncValue = 0.0;
            this._dragX = 0.0;
            this._dragY = 0.0;
            this._accelerationX = 0.0;
            this._accelerationY = 0.0;
            this._accelerationZ = 0.0;
            this._mocConsistency = false;
            this._debugMode = false;
            this._renderer = null;
            // モーションマネージャーを作成
            this._motionManager = new CubismMotionManager();
            this._motionManager.setEventCallback(CubismUserModel.cubismDefaultMotionEventCallback, this);
            // 表情マネージャーを作成
            this._expressionManager = new CubismMotionManager();
            // ドラッグによるアニメーション
            this._dragManager = new CubismTargetPoint();
        }
        /**
         * デストラクタに相当する処理
         */
        release() {
            if (this._motionManager != null) {
                this._motionManager.release();
                this._motionManager = null;
            }
            if (this._expressionManager != null) {
                this._expressionManager.release();
                this._expressionManager = null;
            }
            if (this._moc != null) {
                this._moc.deleteModel(this._model);
                this._moc.release();
                this._moc = null;
            }
            this._modelMatrix = null;
            CubismPose.delete(this._pose);
            CubismEyeBlink.delete(this._eyeBlink);
            CubismBreath.delete(this._breath);
            this._dragManager = null;
            CubismPhysics.delete(this._physics);
            CubismModelUserData.delete(this._modelUserData);
            this.deleteRenderer();
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$3;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismUserModel = CubismUserModel;
    })(Live2DCubismFramework$3 || (Live2DCubismFramework$3 = {}));

    class ViewMatrix extends CubismMatrix44 {
        copyFrom(matrix) {
            this.setMatrix(matrix.getArray());
            return this;
        }

        rotate(angle) {
            // Do nothing if angle = 0
            if (angle === 0) {
                return;
            }

            var sin = Math.sin(angle);
            var cos = Math.cos(angle);

            var matrix = this._tr;

            var a = matrix[0];
            var b = matrix[1];
            var c = matrix[4];
            var d = matrix[5];

            matrix[0] = a * cos + c * sin;
            matrix[1] = b * cos + d * sin;
            matrix[4] = a * -sin + c * cos;
            matrix[5] = b * -sin + d * cos;
        }
    }

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetGame = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsGame(object)) {
            return object;
        } else if (IsGame(object.game)) {
            return object.game;
        } else if (IsSceneObject(object)) { // object = scene object
            return object.sys.game;
        } else if (IsSceneObject(object.scene)) { // object = game object
            return object.scene.sys.game;
        }
    };

    class CanvasMatrix extends CubismMatrix44 {
        constructor() {
            super();

            this.setSize(0, 0);
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;

            if (width > height) {
                this.scale(1.0, width / height);
            } else {
                this.scale(height / width, 1.0);
            }

            return this;
        }

        toLocalX(x) {
            var t = (this.width === 0) ? 0 : (x / this.width);
            return (2 * t) - 1;
        }

        toLocalY(y) {
            var t = (this.height === 0) ? 0 : (y / this.height);
            return 1 - (2 * t);
        }
    }

    var GlobalDataInstance = undefined;

    // Global data shared for all Live2dGameObjects
    class GlobalData {
        static getInstance(gameObject) {
            if (!GlobalDataInstance) {
                GlobalDataInstance = new GlobalData(gameObject);
            }
            return GlobalDataInstance;
        }

        constructor(gameObject) {
            var game = GetGame(gameObject);
            var gl = game.renderer.gl;
            var scale = game.scale;

            this.game = game;
            this.gl = gl;
            this.scale = scale;

            // A frame buffer for all live2d game object
            this.frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);

            this.viewportRect = [0, 0, 0, 0];
            this.projectionMatrix = new CanvasMatrix();
            this.onResize();

            scale.on('resize', this.onResize, this);
            game.events.once('destroy', this.destroy, this);
        }

        destroy() {
            this.scale.off('resize', this.onResize, this);

            this.game = undefined;
            this.gl = undefined;
            this.scale = undefined;

            this.frameBuffer = undefined;
            this.viewportRect = undefined;
            this.projectionMatrix = undefined;

            GlobalDataInstance = undefined;
        }

        get canvasWidth() {
            return this.scale.width;
        }

        get canvasHeight() {
            return this.scale.height;
        }

        onResize() {
            var width = this.canvasWidth;
            var height = this.canvasHeight;

            // Set view port
            this.viewportRect[2] = width;
            this.viewportRect[3] = height;

            // Set projectionMatrix
            this.projectionMatrix.setSize(width, height);
        }
    }

    var Setup = function (data) {
        // Load setting
        var setting = data.setting;
        this._modelSetting = setting;

        // Load CubismModel
        var arrayBuffer = data.model;
        // - Create this._model
        this.loadModel(arrayBuffer, arrayBuffer.byteLength);
        // - Re-create render for current this._model
        this.createRenderer();
        // - Set gl to current renderer
        this.getRenderer().startUp(this._globalData.gl);

        // Load CubismExpression
        var expressions = data.expressions;
        for (var expressionName in expressions) {
            var arrayBuffer = expressions[expressionName];
            var motion = this.loadExpression(arrayBuffer, arrayBuffer.byteLength, expressionName);

            if (this._expressions.getValue(expressionName) != null) {
                ACubismMotion.delete(this._expressions.getValue(expressionName));
                this._expressions.setValue(expressionName, null);
            }

            this._expressions.setValue(expressionName, motion);
        }

        // Load CubismPhysics
        var arrayBuffer = data.physics;
        if (arrayBuffer) {
            this.loadPhysics(arrayBuffer, arrayBuffer.byteLength);
        }

        // Load CubismPose
        var arrayBuffer = data.pose;
        if (arrayBuffer) {
            this.loadPose(arrayBuffer, arrayBuffer.byteLength);
        }

        // Setup EyeBlink
        if (setting.getEyeBlinkParameterCount() > 0) {
            this._eyeBlink = CubismEyeBlink.create(setting);
        }

        // Setup Breath
        this._breath = CubismBreath.create();

        this.registerParameter('angleX');
        this.registerParameter('angleY');
        this.registerParameter('angleZ');
        this.registerParameter('bodyAngleX');
        this.registerParameter('breath');

        var breathParameters = new csmVector();
        breathParameters.pushBack(
            new BreathParameterData(this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5)
        );
        breathParameters.pushBack(
            new BreathParameterData(this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5)
        );
        breathParameters.pushBack(
            new BreathParameterData(this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5)
        );
        breathParameters.pushBack(
            new BreathParameterData(this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5)
        );
        breathParameters.pushBack(
            new BreathParameterData(this._idParamBreath, 0.5, 0.5, 3.2345, 1)
        );

        this._breath.setParameters(breathParameters);

        // Load UserData
        var arrayBuffer = data.userData;
        if (arrayBuffer) {
            this.loadUserData(arrayBuffer, arrayBuffer.byteLength);
        }

        // Setup EyeBlinkIds
        var eyeBlinkIdCount = setting.getEyeBlinkParameterCount();
        for (var i = 0; i < eyeBlinkIdCount; i++) {
            this._eyeBlinkIds.pushBack(setting.getEyeBlinkParameterId(i));
        }

        // Setup LipSyncIds
        var lipSyncIdCount = setting.getLipSyncParameterCount();
        for (let i = 0; i < lipSyncIdCount; i++) {
            this._lipSyncIds.pushBack(setting.getLipSyncParameterId(i));
        }

        // Load CubismMotion
        this._model.saveParameters();
        var motionGroups = data.motions;
        for (var groupName in motionGroups) {
            var motionGroup = motionGroups[groupName];
            for (var i in motionGroup) {
                var arrayBuffer = motionGroup[i];
                var motionName = `${groupName}_${i}`;
                var motion = this.loadMotion(arrayBuffer, arrayBuffer.byteLength, motionName);

                i = parseInt(i);
                var fadeTime = setting.getMotionFadeInTimeValue(groupName, i);
                if (fadeTime >= 0.0) {
                    motion.setFadeInTime(fadeTime);
                }

                var fadeTime = setting.getMotionFadeOutTimeValue(groupName, i);
                if (fadeTime >= 0.0) {
                    motion.setFadeOutTime(fadeTime);
                }

                motion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);

                if (this._motions.getValue(motionName) != null) {
                    ACubismMotion.delete(this._motions.getValue(motionName));
                }

                this._motions.setValue(motionName, motion);
            }

        }

        // Load texture
        var textures = data.textures;
        for (var i in textures) {
            this.getRenderer().bindTexture(parseInt(i), textures[i].webGLTexture);
        }

        // Stop all motions
        this._motionManager.stopAllMotions();

        // Setup canvas size
        var canvasinfo = this._model._model.canvasinfo;
        this._pixelWidth = canvasinfo.CanvasWidth;
        this._pixelHeight = canvasinfo.CanvasHeight;
        this._pixelsPerUnit = canvasinfo.PixelsPerUnit;

        // Setup ModelMatrix
        var layout = new csmMap();
        setting.getLayoutMap(layout);
        this._modelMatrix.setupFromLayout(layout);


        // Hit test result
        var count = this._modelSetting.getHitAreasCount();
        for (var i = 0; i < count; i++) {
            var hitAreaName = this._modelSetting.getHitAreaName(i);
            this._hitTestResult[hitAreaName] = false;
        }

        return this;
    };

    var OnIdle = function (gameObject) {
        gameObject.emit('idle');
    };

    const Capitalize$3 = Phaser.Utils.String.UppercaseFirst;

    var Update = function (time, delta) {
        var deltaTimeSeconds = delta / 1000;

        var motionUpdated = false;
        this._model.loadParameters();
        if (!this._motionManager.isFinished()) {
            motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds);
        } else {
            OnIdle(this.parent);
        }
        this._model.saveParameters();

        // Add parameter values
        for (var name in this._addParamValues) {
            var addValue = this._addParamValues[name];
            if (addValue === 0) {
                continue;
            }

            var propertyName = `_idParam${Capitalize$3(name)}`;
            if (!this.hasOwnProperty(propertyName)) {
                this.registerParameter(name);

                // Can't register this parameter
                if (!this.hasOwnProperty(propertyName)) {
                    // Error
                    return this;
                }
            }

            this._model.addParameterValueById(this[propertyName], addValue);
        }

        if (!motionUpdated && this._eyeBlink) {
            this._eyeBlink.updateParameters(this._model, deltaTimeSeconds);
        }

        if (this._expressionManager) {
            this._expressionManager.updateMotion(this._model, deltaTimeSeconds);
        }

        if (this._breath != null) {
            this._breath.updateParameters(this._model, deltaTimeSeconds);
        }

        if (this._physics != null) {
            this._physics.evaluate(this._model, deltaTimeSeconds);
        }

        if (this._lipsync && (this._lipSyncValue !== 0)) {
            var count = this._lipSyncIds.getSize();
            for (var i = 0; i < count; ++i) {
                this._model.addParameterValueById(this._lipSyncIds.at(i), this._lipSyncValue);
            }
        }

        if (this._pose != null) {
            this._pose.updateParameters(this._model, deltaTimeSeconds);
        }

        this._model.update();

        return this;
    };

    var UpdateViewMatrix = function (model, calcMatrix) {
        var gameObject = model.parent;
        var projectionMatrix = model._globalData.projectionMatrix;

        var matrix = model.viewMatrix;
        // Reset to identity matrix
        matrix.loadIdentity();

        // Apply scale
        var modelWidth = gameObject.width;
        var modelHeight = gameObject.height;
        var canvasWidth = projectionMatrix.width;
        var canvasHeight = projectionMatrix.height;

        var scaleX = (calcMatrix.scaleX * modelWidth) / canvasWidth;
        var scaleY = (calcMatrix.scaleY * modelHeight) / canvasHeight;

        if (modelWidth > modelHeight) {
            scaleY *= modelWidth / modelHeight;
        } else {
            scaleX *= modelHeight / modelWidth;
        }

        matrix.scale(scaleX, scaleY);

        // Apply rotate
        matrix.rotate(-calcMatrix.rotationNormalized);

        // Apply translate
        matrix.translate(
            projectionMatrix.toLocalX(calcMatrix.getX(0, 0)),
            projectionMatrix.toLocalY(calcMatrix.getY(0, 0))
        );

        var modelMatrix = model._modelMatrix;
        // Offset for origin
        // modelMatrix.translate(
        //     modelMatrix._width * (0.5 - gameObject.originX),
        //     modelMatrix._height * (gameObject.originY - 0.5)
        // );
        // Apply model matrix
        matrix.multiplyByMatrix(modelMatrix);

        return matrix;
    };

    var Draw = function (calcMatrix) {
        if (!this._model) {
            return;
        }

        var globalData = this._globalData;

        var matrix = UpdateViewMatrix(this, calcMatrix);

        var renderer = this.getRenderer();
        renderer.setMvpMatrix(matrix);
        renderer.setRenderState(globalData.frameBuffer, globalData.viewportRect);
        renderer.drawModel();

        return this;
    };

    var GetExpressionNames$1 = function () {
        var names = [];
        var count = this._expressions.getSize();
        var keyValuse = this._expressions._keyValues;
        for (var i = 0; i < count; i++) {
            names.push(keyValuse[i].first);
        }
        return names;
    };

    const PriorityNone = 0;
    const PriorityIdle = 1;
    const PriorityNormal = 2;
    const PriorityForce = 3;

    var OnExpressionStart = function (gameObject, name) {
        gameObject.emit(`expression.start-${name}`);
        gameObject.emit('expression.start', name);
    };

    var SetExpression$1 = function (name) {
        if (name === undefined) {
            name = 0;
        }

        var motion;
        var nameType = typeof (name);
        if (nameType === 'string') {
            motion = this._expressions.getValue(name);
        } else if (nameType === 'number') {
            var keyValue = this._expressions._keyValues[name];
            motion = (keyValue) ? keyValue.second : null;
            name = (keyValue) ? keyValue.first : undefined;
        }

        if (!motion) {
            // Error
            return this;
        }

        motion._name = name;

        this._expressionManager.startMotionPriority(
            motion,
            false,
            PriorityForce
        );
        this._currentExpressionName = name;

        OnExpressionStart(this.parent, name);

        return this;
    };

    var SetRandomExpression$1 = function () {
        var count = this._expressions.getSize();
        if (count === 0) {
            return this;
        }

        var index = Math.floor(Math.random() * count);
        this.setExpression(index);
        return this;
    };

    var GetMotionNames$1 = function (groupName) {
        var names = [];
        var count = this._motions.getSize();
        var keyValuse = this._motions._keyValues;
        for (var i = 0; i < count; i++) {
            var name = keyValuse[i].first;
            if (groupName & !name.startsWith(groupName)) {
                continue;
            }
            names.push(name);
        }
        return names;
    };

    var GetMotionGroupNames$1 = function () {
        var names = [];
        var count = this._motions.getSize();
        var keyValuse = this._motions._keyValues;
        for (var i = 0; i < count; i++) {
            var name = keyValuse[i].first;
            var groupName = name.split('_')[0];
            if (names.indexOf(groupName) !== -1) {
                continue;
            }

            names.push(groupName);
        }
        return names;
    };

    var OnMotionStart = function (gameObject, group, no) {
        gameObject.emit(`motion.start-${group}`, no);
        gameObject.emit('motion.start', group, no);
    };

    var OnMotionComplete = function (gameObject, group, no) {
        gameObject.emit(`motion.complete-${group}`, no);
        gameObject.emit('motion.complete', group, no);
    };

    var StartMotion$1 = function (group, no, priority) {
        if (priority === undefined) {
            priority = PriorityNormal;
        }

        if (priority === PriorityForce) {
            this._motionManager.setReservePriority(priority);
        } else if (!this._motionManager.reserveMotion(priority)) {
            // Error
            return this;
        }

        if (no === undefined) {
            no = Math.floor(Math.random() * this._modelSetting.getMotionCount(group));
        }

        var name = `${group}_${no}`;
        var motion = this._motions.getValue(name);
        if (!motion) {
            // Error
            return this;
        }

        motion._name = name;

        var gameObject = this.parent;
        motion.setFinishedMotionHandler(function () {
            OnMotionComplete(gameObject, group, no);
        });

        this._motionManager.startMotionPriority(
            motion,
            false,
            priority
        );

        OnMotionStart(gameObject, group, no);

        return this;
    };

    var StopAllMotions$1 = function () {
        this._motionManager.stopAllMotions();
        return this;
    };

    var IsAnyMotionPlaying$1 = function() {
        return !this._motionManager.isFinished();
    };

    var GetPlayinigMotionNames$1 = function () {
        var names = [];
        var motionManager = this._motionManager;
        var motions = motionManager._motions;
        for (var i = 0, cnt = motions.getSize(); i < cnt; i++) {
            var motionQueueEntry = motions.at(i);
            if (motionQueueEntry._finished) {
                continue;
            }
            names.push(motionQueueEntry._motion._name);
        }

        return names;
    };

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * @brief パラメータIDのデフォルト値を保持する定数<br>
     *         デフォルト値の仕様は以下のマニュアルに基づく<br>
     *         https://docs.live2d.com/cubism-editor-manual/standard-parametor-list/
     */
    const CubismDefaultParameterId = Object.freeze({
        // パーツID
        HitAreaPrefix: 'HitArea',
        HitAreaHead: 'Head',
        HitAreaBody: 'Body',
        PartsIdCore: 'Parts01Core',
        PartsArmPrefix: 'Parts01Arm_',
        PartsArmLPrefix: 'Parts01ArmL_',
        PartsArmRPrefix: 'Parts01ArmR_',
        // パラメータID
        ParamAngleX: 'ParamAngleX',
        ParamAngleY: 'ParamAngleY',
        ParamAngleZ: 'ParamAngleZ',
        ParamEyeLOpen: 'ParamEyeLOpen',
        ParamEyeLSmile: 'ParamEyeLSmile',
        ParamEyeROpen: 'ParamEyeROpen',
        ParamEyeRSmile: 'ParamEyeRSmile',
        ParamEyeBallX: 'ParamEyeBallX',
        ParamEyeBallY: 'ParamEyeBallY',
        ParamEyeBallForm: 'ParamEyeBallForm',
        ParamBrowLY: 'ParamBrowLY',
        ParamBrowRY: 'ParamBrowRY',
        ParamBrowLX: 'ParamBrowLX',
        ParamBrowRX: 'ParamBrowRX',
        ParamBrowLAngle: 'ParamBrowLAngle',
        ParamBrowRAngle: 'ParamBrowRAngle',
        ParamBrowLForm: 'ParamBrowLForm',
        ParamBrowRForm: 'ParamBrowRForm',
        ParamMouthForm: 'ParamMouthForm',
        ParamMouthOpenY: 'ParamMouthOpenY',
        ParamCheek: 'ParamCheek',
        ParamBodyAngleX: 'ParamBodyAngleX',
        ParamBodyAngleY: 'ParamBodyAngleY',
        ParamBodyAngleZ: 'ParamBodyAngleZ',
        ParamBreath: 'ParamBreath',
        ParamArmLA: 'ParamArmLA',
        ParamArmRA: 'ParamArmRA',
        ParamArmLB: 'ParamArmLB',
        ParamArmRB: 'ParamArmRB',
        ParamHandL: 'ParamHandL',
        ParamHandR: 'ParamHandR',
        ParamHairFront: 'ParamHairFront',
        ParamHairSide: 'ParamHairSide',
        ParamHairBack: 'ParamHairBack',
        ParamHairFluffy: 'ParamHairFluffy',
        ParamShoulderY: 'ParamShoulderY',
        ParamBustX: 'ParamBustX',
        ParamBustY: 'ParamBustY',
        ParamBaseX: 'ParamBaseX',
        ParamBaseY: 'ParamBaseY',
        ParamNONE: 'NONE:',
    });
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$2;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.HitAreaBody = CubismDefaultParameterId.HitAreaBody;
        Live2DCubismFramework.HitAreaHead = CubismDefaultParameterId.HitAreaHead;
        Live2DCubismFramework.HitAreaPrefix = CubismDefaultParameterId.HitAreaPrefix;
        Live2DCubismFramework.ParamAngleX = CubismDefaultParameterId.ParamAngleX;
        Live2DCubismFramework.ParamAngleY = CubismDefaultParameterId.ParamAngleY;
        Live2DCubismFramework.ParamAngleZ = CubismDefaultParameterId.ParamAngleZ;
        Live2DCubismFramework.ParamArmLA = CubismDefaultParameterId.ParamArmLA;
        Live2DCubismFramework.ParamArmLB = CubismDefaultParameterId.ParamArmLB;
        Live2DCubismFramework.ParamArmRA = CubismDefaultParameterId.ParamArmRA;
        Live2DCubismFramework.ParamArmRB = CubismDefaultParameterId.ParamArmRB;
        Live2DCubismFramework.ParamBaseX = CubismDefaultParameterId.ParamBaseX;
        Live2DCubismFramework.ParamBaseY = CubismDefaultParameterId.ParamBaseY;
        Live2DCubismFramework.ParamBodyAngleX = CubismDefaultParameterId.ParamBodyAngleX;
        Live2DCubismFramework.ParamBodyAngleY = CubismDefaultParameterId.ParamBodyAngleY;
        Live2DCubismFramework.ParamBodyAngleZ = CubismDefaultParameterId.ParamBodyAngleZ;
        Live2DCubismFramework.ParamBreath = CubismDefaultParameterId.ParamBreath;
        Live2DCubismFramework.ParamBrowLAngle = CubismDefaultParameterId.ParamBrowLAngle;
        Live2DCubismFramework.ParamBrowLForm = CubismDefaultParameterId.ParamBrowLForm;
        Live2DCubismFramework.ParamBrowLX = CubismDefaultParameterId.ParamBrowLX;
        Live2DCubismFramework.ParamBrowLY = CubismDefaultParameterId.ParamBrowLY;
        Live2DCubismFramework.ParamBrowRAngle = CubismDefaultParameterId.ParamBrowRAngle;
        Live2DCubismFramework.ParamBrowRForm = CubismDefaultParameterId.ParamBrowRForm;
        Live2DCubismFramework.ParamBrowRX = CubismDefaultParameterId.ParamBrowRX;
        Live2DCubismFramework.ParamBrowRY = CubismDefaultParameterId.ParamBrowRY;
        Live2DCubismFramework.ParamBustX = CubismDefaultParameterId.ParamBustX;
        Live2DCubismFramework.ParamBustY = CubismDefaultParameterId.ParamBustY;
        Live2DCubismFramework.ParamCheek = CubismDefaultParameterId.ParamCheek;
        Live2DCubismFramework.ParamEyeBallForm = CubismDefaultParameterId.ParamEyeBallForm;
        Live2DCubismFramework.ParamEyeBallX = CubismDefaultParameterId.ParamEyeBallX;
        Live2DCubismFramework.ParamEyeBallY = CubismDefaultParameterId.ParamEyeBallY;
        Live2DCubismFramework.ParamEyeLOpen = CubismDefaultParameterId.ParamEyeLOpen;
        Live2DCubismFramework.ParamEyeLSmile = CubismDefaultParameterId.ParamEyeLSmile;
        Live2DCubismFramework.ParamEyeROpen = CubismDefaultParameterId.ParamEyeROpen;
        Live2DCubismFramework.ParamEyeRSmile = CubismDefaultParameterId.ParamEyeRSmile;
        Live2DCubismFramework.ParamHairBack = CubismDefaultParameterId.ParamHairBack;
        Live2DCubismFramework.ParamHairFluffy = CubismDefaultParameterId.ParamHairFluffy;
        Live2DCubismFramework.ParamHairFront = CubismDefaultParameterId.ParamHairFront;
        Live2DCubismFramework.ParamHairSide = CubismDefaultParameterId.ParamHairSide;
        Live2DCubismFramework.ParamHandL = CubismDefaultParameterId.ParamHandL;
        Live2DCubismFramework.ParamHandR = CubismDefaultParameterId.ParamHandR;
        Live2DCubismFramework.ParamMouthForm = CubismDefaultParameterId.ParamMouthForm;
        Live2DCubismFramework.ParamMouthOpenY = CubismDefaultParameterId.ParamMouthOpenY;
        Live2DCubismFramework.ParamNONE = CubismDefaultParameterId.ParamNONE;
        Live2DCubismFramework.ParamShoulderY = CubismDefaultParameterId.ParamShoulderY;
        Live2DCubismFramework.PartsArmLPrefix = CubismDefaultParameterId.PartsArmLPrefix;
        Live2DCubismFramework.PartsArmPrefix = CubismDefaultParameterId.PartsArmPrefix;
        Live2DCubismFramework.PartsArmRPrefix = CubismDefaultParameterId.PartsArmRPrefix;
        Live2DCubismFramework.PartsIdCore = CubismDefaultParameterId.PartsIdCore;
    })(Live2DCubismFramework$2 || (Live2DCubismFramework$2 = {}));

    const Capitalize$2 = Phaser.Utils.String.UppercaseFirst;

    var RegisterParameter$1 = function (name) {
        var capName = `Param${Capitalize$2(name)}`;
        var propertyName = `_id${capName}`;
        if (this.hasOwnProperty(propertyName)) {
            return this;
        }
        if (!CubismDefaultParameterId.hasOwnProperty(capName)) {
            // Error;
            return this;
        }

        var parameterId = CubismDefaultParameterId[capName];
        this[propertyName] = CubismFramework.getIdManager().getId(parameterId);

        this._addParamValues[name] = 0;

        return this;
    };

    const Capitalize$1 = Phaser.Utils.String.UppercaseFirst;

    var AddParameterValue$1 = function (name, value) {
        var propertyName = `_idParam${Capitalize$1(name)}`;
        if (!this.hasOwnProperty(propertyName)) {
            this.registerParameter(name);

            // Can't register this parameter
            if (!this.hasOwnProperty(propertyName)) {
                // Error
                return this;
            }
        }

        this._addParamValues[name] += value;

        return this;
    };

    const Capitalize = Phaser.Utils.String.UppercaseFirst;

    var ResetParameterValue$1 = function (name) {
        var propertyName = `_idParam${Capitalize(name)}`;
        if (!this.hasOwnProperty(propertyName)) {
            this.registerParameter(name);

            // Can't register this parameter
            if (!this.hasOwnProperty(propertyName)) {
                return this;
            }
        }

        this._addParamValues[name] = 0;

        return this;
    };

    var LocalXYToModelMatrixXY = function (localX, localY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = GlobMatrixXY;
        }

        out.x = (localX - (this._pixelWidth / 2)) / this._pixelsPerUnit;
        out.y = ((this._pixelHeight / 2) - localY) / this._pixelsPerUnit;

        return out;
    };

    var GlobMatrixXY = {};

    var HitAreaNameToDrawIndex = function (hitAreaName) {
        var count = this._modelSetting.getHitAreasCount();
        for (var i = 0; i < count; i++) {
            if (this._modelSetting.getHitAreaName(i) === hitAreaName) {
                var drawId = this._modelSetting.getHitAreaId(i);
                var drawIndex = this._model.getDrawableIndex(drawId);
                return drawIndex;
            }
        }
        return undefined;
    };

    const Rectangle = Phaser.Geom.Rectangle;

    var GetDrawableBounds = function (index, bounds) {
        if (bounds === undefined) {
            bounds = new Rectangle();
        } else if (bounds === true) {
            if (GlobRect === undefined) {
                GlobRect = new Rectangle;
            }
            bounds = GlobRect;
        }

        if (typeof (index) === 'string') {
            index = HitAreaNameToDrawIndex.call(this, index);
            if (index === undefined) {
                return null;
            }
        }

        var count = this._model.getDrawableVertexCount(index) * 2;
        var vertices = this._model.getDrawableVertices(index);

        var left = Infinity,
            right = -Infinity,
            top = Infinity,
            bottom = -Infinity;

        for (var i = 0; i < count; i += 2) {
            var x = vertices[i];
            var y = vertices[i + 1];

            left = Math.min(left, x);
            right = Math.max(right, x);
            top = Math.min(top, y);
            bottom = Math.max(bottom, y);
        }

        bounds.setTo(left, top, (right - left), (bottom - top));

        return bounds;
    };

    var GlobRect;

    var HitTest$1 = function (hitAreaName, x, y) {
        var bounds = this.getDrawableBounds(hitAreaName, true);
        if (!bounds) {
            return false;
        }
        if (typeof (x) === 'object') {
            var xy = x;
            x = xy.x;
            y = xy.y;
        }

        return bounds.contains(x, y);
    };

    var Methods$1 = {
        setup: Setup,
        update: Update,
        draw: Draw,

        getExpressionNames: GetExpressionNames$1,
        setExpression: SetExpression$1,
        setRandomExpression: SetRandomExpression$1,

        getMotionNames: GetMotionNames$1,
        getMotionGroupNames: GetMotionGroupNames$1,
        startMotion: StartMotion$1,
        stopAllMotions: StopAllMotions$1,
        isAnyMotionPlaying: IsAnyMotionPlaying$1,
        getPlayinigMotionNames: GetPlayinigMotionNames$1,

        registerParameter: RegisterParameter$1,
        addParameterValue: AddParameterValue$1,
        resetParameterValue: ResetParameterValue$1,

        localXYToModelMatrixXY: LocalXYToModelMatrixXY,
        getDrawableBounds: GetDrawableBounds,
        hitTest: HitTest$1,
    };

    class Model extends CubismUserModel {
        constructor(parent) {
            super();

            // Initialize Live2d framework, and get shared resources
            this._globalData = GlobalData.getInstance(parent);

            this.parent = parent;  // Live2dGameObject
            this.viewMatrix = new ViewMatrix();

            this._eyeBlinkIds = new csmVector();

            this._lipSyncIds = new csmVector();
            this._lipSyncValue = 0;

            this._motions = new csmMap();

            this._expressions = new csmMap();
            this._currentExpressionName = undefined;

            this._addParamValues = {};

            this._pixelWidth = 0;
            this._pixelHeight = 0;

            this._hitTestResult = {};

            // this._wavFileHandler = new LAppWavFileHandler();
        }

        release() {
            super.release();

            this.parent = undefined;
            this._globalData = undefined;
        }
    }

    Object.assign(
        Model.prototype,
        Methods$1
    );

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    var SetModel = function (key, config) {
        if (this.key === key) {
            return this;
        }

        var data = this.scene.cache.custom.live2d.get(key);
        if (!data || !data.model) {
            console.error(`Live2d: can't load ${key}'s assets`);
            return;
        }

        if (this.key !== undefined) {      // Change model
            this.model.release();          // Release old model        
            this.model = new Model(this);  // Create new model
        }

        this.key = key;
        this.model.setup(data);
        this.setSize(this.model._pixelWidth, this.model._pixelHeight);

        var autoPlayIdleMotion = GetValue$1(config, 'autoPlayIdleMotion', undefined);
        if (autoPlayIdleMotion !== undefined) {
            this.autoPlayIdleMotion(autoPlayIdleMotion);
        }

        return this;
    };

    var GetExpressionNames = function () {
        return this.model.getExpressionNames();
    };

    var SetExpression = function (expressionName) {
        this.model.setExpression(expressionName);
        return this;
    };

    var SetRandomExpression = function () {
        this.model.setRandomExpression();
        return this;
    };

    var GetMotionNames = function (groupName) {
        return this.model.getMotionNames(groupName);
    };

    var GetMotionGroupNames = function () {
        return this.model.getMotionGroupNames();
    };

    var StartMotion = function (group, no, priority) {
        if (typeof (priority) === 'string') {
            priority = PriorityModes[priority];
        }
        this.model.startMotion(group, no, priority);
        return this;
    };

    const PriorityModes = {
        none: PriorityNone,
        idle: PriorityIdle,
        normal: PriorityNormal,
        force: PriorityForce
    };

    var StopAllMotions = function () {
        this.model.stopAllMotions();
        return this;
    };

    var GetPlayinigMotionNames = function () {
        return this.model.getPlayinigMotionNames();
    };

    var IsAnyMotionPlaying = function () {
        return this.model.isAnyMotionPlaying();
    };

    var AutoPlayIdleMotion = function (motionName) {
        // Not regiester 'idle' event, but also disable auto-play-idle-motion
        if (!this.autoPlayIdleMotionCallback && !motionName) {
            return this;
        }

        // Register 'idle' event one time
        if (!this.autoPlayIdleMotionCallback) {
            this.autoPlayIdleMotionCallback = function () {
                if (!this.idleMotionName) {
                    return;
                }
                this.startMotion(this.idleMotionName, undefined, PriorityIdle);
            };
            this.on('idle', this.autoPlayIdleMotionCallback, this);
        }
        this.idleMotionName = motionName;

        return this;
    };

    var RegisterParameter = function (name) {
        this.model.registerParameter(name);
        return this;
    };

    var AddParameterValue = function (name, value) {
        this.model.addParameterValue(name, value);
        return this;
    };

    var ResetParameterValue = function (name) {
        this.model.resetParameterValue(name);
        return this;
    };

    var GetParameters = function () {
        return this.model._addParamValues;
    };

    const IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    var LookAt = function (x, y, config) {
        if (IsPlainObject$3(x)) {
            config = x;
            x = undefined;
            y = undefined;
        }

        var modelX, modelY;
        if (x === undefined) {
            modelX = 0;
            modelY = 0;
        } else {
            var camera = GetValue(config, 'camera', undefined);
            var modelXY = this.getModelXY(x, y, camera, true);
            modelX = modelXY.x;
            modelY = modelXY.y;
        }

        var params = this.getParameters();

        // Eyes
        var eyeBallXWeight = GetValue(config, 'eyeBallX', 1);
        var eyeBallYWeight = GetValue(config, 'eyeBallY', 1);
        params.EyeBallX = modelX * eyeBallXWeight;
        params.EyeBallY = modelY * eyeBallYWeight;

        // Head
        var angleXWeight = GetValue(config, 'angleX', 30);
        var angleYWeight = GetValue(config, 'angleY', 30);
        var angleZWeight = GetValue(config, 'angleZ', 30);
        params.AngleX = modelX * angleXWeight;
        params.AngleY = modelY * angleYWeight;
        params.AngleZ = (-1) * modelX * modelY * angleZWeight;

        // Body
        var bodyAngleXWeight = GetValue(config, 'bodyAngleX', 10);
        params.BodyAngleX = modelX * bodyAngleXWeight;

        return this;
    };

    var LookForward = function(config) {
        this.lookAt(config);
        return this;
    };

    var SetLipSyncValue = function (value) {
        this.model._lipSyncValue = value;
        return this;
    };

    var HitAreaCallback = function (shape, localX, localY, gameObject) {
        var model = gameObject.model;
        if (!model) {
            return false;
        }

        var matrixXY = model.localXYToModelMatrixXY(localX, localY, true);
        var x = matrixXY.x;
        var y = matrixXY.y;
        var modelSetting = model._modelSetting;
        var count = modelSetting.getHitAreasCount();
        var anyHit = false;
        var hitTestResult = model._hitTestResult;
        for (var i = 0; i < count; i++) {
            var hitAreaName = modelSetting.getHitAreaName(i);
            var isHit = model.hitTest(hitAreaName, x, y);
            hitTestResult[hitAreaName] = isHit;
            anyHit = anyHit || isHit;
        }

        return anyHit;
    };

    const IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
    const GameObject = Phaser.GameObjects.GameObject;

    var SetInteractive = function (hitArea, hitAreaCallback, dropZone) {
        var isInit = !this.input;

        if (IsPlainObject$2(hitArea)) {
            hitArea.hitArea = HitAreaCallback;
            hitArea.hitAreaCallback = HitAreaCallback;
        } else {
            hitArea = HitAreaCallback;
            hitAreaCallback = HitAreaCallback;
        }

        GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

        if (isInit) {
            this
                .on('pointerdown', function (pointer, localX, localY, event) {
                    FireEvent(this, 'pointerdown', pointer, localX, localY, event);
                })
                .on('pointerup', function (pointer, localX, localY, event) {
                    FireEvent(this, 'pointerup', pointer, localX, localY, event);
                })
                .on('pointermove', function (pointer, localX, localY, event) {
                    FireEvent(this, 'pointermove', pointer, localX, localY, event);
                });
        }

        return this;
    };

    var FireEvent = function (gameObject, eventPrefix, pointer, localX, localY, event) {
        var hitTestResult = gameObject.hitTestResult;
        for (var name in hitTestResult) {
            if (hitTestResult[name]) {
                gameObject.emit(`${eventPrefix}-${name}`, pointer, localX, localY, event);
            }
        }
    };

    var GetHitTestResult = function () {
        return this.model._hitTestResult;
    };

    var HitTest = function (hitAreaName, worldX, worldY, camera) {
        var modelXY = this.getModelXY(worldX, worldY, camera, true);
        return this.model.hitTest(hitAreaName, modelXY);
    };

    const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
    const TransformXY = Phaser.Math.TransformXY;

    var WorldXYToGameObjectLocalXY = function (gameObject, worldX, worldY, camera, out) {
        if (camera === undefined) {
            camera = gameObject.scene.cameras.main;
        }

        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut$1;
        }

        var csx = camera.scrollX;
        var csy = camera.scrollY;
        var px = worldX + (csx * gameObject.scrollFactorX) - csx;
        var py = worldY + (csy * gameObject.scrollFactorY) - csy;
        if (gameObject.parentContainer) {
            if (tempMatrix === undefined) {
                tempMatrix = new TransformMatrix();
                parentMatrix = new TransformMatrix();
            }

            gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
            tempMatrix.applyInverse(px, py, out);
        }
        else {
            TransformXY(px, py, gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY, out);
        }

        out.x += gameObject.displayOriginX;
        out.y += gameObject.displayOriginY;

        return out;
    };

    var tempMatrix, parentMatrix;
    var globOut$1 = {};

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;

    var WorldXYToModelXY = function (worldX, worldY, camera, out) {
        if ((camera === undefined) || (camera === true) || IsPlainObject$1(camera)) {
            out = camera;
            camera = this.scene.cameras.main;
        }
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut;
        }

        out = WorldXYToGameObjectLocalXY(this, worldX, worldY, camera, out);

        return this.model.localXYToModelMatrixXY(out.x, out.y, out);
    };

    var globOut = {};

    var SetTimeScale = function (timeScale) {
        this.timeScale = timeScale;
        return this;
    };

    var Methods = {
        setModel: SetModel,

        getExpressionNames: GetExpressionNames,
        setExpression: SetExpression,
        setRandomExpression: SetRandomExpression,

        getMotionNames: GetMotionNames,
        getMotionGroupNames: GetMotionGroupNames,
        startMotion: StartMotion,
        stopAllMotions: StopAllMotions,
        getPlayinigMotionNames: GetPlayinigMotionNames,
        isAnyMotionPlaying: IsAnyMotionPlaying,
        autoPlayIdleMotion: AutoPlayIdleMotion,

        registerParameter: RegisterParameter,
        addParameterValue: AddParameterValue,
        resetParameterValue: ResetParameterValue,
        getParameters: GetParameters,
        lookAt: LookAt,
        lookForward: LookForward,

        setLipSyncValue: SetLipSyncValue,

        setInteractive: SetInteractive,
        getHitTestResult: GetHitTestResult,
        hitTest: HitTest,

        getModelXY: WorldXYToModelXY,

        setTimeScale: SetTimeScale,
    };

    class Live2dGameObject extends Live2dGameObjectBase {
        constructor(scene, x, y, key, config) {
            super(scene, 'rexLive2d');

            this.model = new Model(this);

            this.setModel(key, config);
            this.setOrigin(0.5);
            this.setPosition(x, y);
            this.setTimeScale(1);
        }

        preUpdate(time, delta) {
            delta *= this.timeScale;
            this.model.update(time, delta);
        }

        preDestroy() {
            this.model.release();
            this.model = undefined;
        }

        get expressionName() {
            return this.model._currentExpressionName;
        }

        set expressionName(expressionName) {
            this.setExpression(expressionName);
        }

        get params() {
            return this.getParameters();
        }

        get lipSyncValue() {
            return this.model._lipSyncValue;
        }

        set lipSyncValue(value) {
            this.setLipSyncValue(value);
        }

        get hitTestResult() {
            return this.getHitTestResult();
        }

    }

    Object.assign(
        Live2dGameObject.prototype,
        Render,
        Methods,
    );

    function Factory (x, y, key, config) {
        var gameObject = new Live2dGameObject(this.scene, x, y, key, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var key = GetAdvancedValue(config, 'key');
        var gameObject = new Live2dGameObject(this.scene, 0, 0, key);
        BuildGameObject(this.scene, gameObject, config);
        return gameObject;
    }

    const FILE_POPULATED = Phaser.Loader.FILE_POPULATED;
    const UUID = Phaser.Utils.String.UUID;

    class AwaitFile extends Phaser.Loader.File {
        constructor(loader, fileConfig) {
            if (!fileConfig.hasOwnProperty('type')) {
                fileConfig.type = 'await';
            }
            if (!fileConfig.hasOwnProperty('url')) {
                fileConfig.url = '';
            }
            if (!fileConfig.hasOwnProperty('key')) {
                fileConfig.key = UUID();
            }
            super(loader, fileConfig);
        }

        load() {
            if (this.state === FILE_POPULATED) {
                //  Can happen for example in a JSONFile if they've provided a JSON object instead of a URL
                this.loader.nextFile(this, true);
            } else {
                // start loading task
                var config = this.config;
                var callback = config.callback;
                var scope = config.scope;
                if (callback) {

                    var self = this;
                    var runOnce = false;
                    var successCallback = function () {
                        if (runOnce) {
                            return;
                        }

                        self.onLoad();
                        runOnce = true;
                    };
                    var failureCallback = function () {
                        if (runOnce) {
                            return;
                        }

                        self.onError();
                        runOnce = true;
                    };

                    if (scope) {
                        callback.call(scope, successCallback, failureCallback);
                    } else {
                        callback(successCallback, failureCallback);
                    }
                } else {
                    this.onLoad();
                }
            }
        }

        onLoad() {
            this.loader.nextFile(this, true);
        }

        onError() {
            this.loader.nextFile(this, false);
        }
    }

    var LoadScript = function (url, onload) {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0, cnt = scripts.length; i < cnt; i++) {
            if (scripts[i].src.indexOf(url) != -1) {
                if (onload) {
                    onload();
                }
                return;
            }
        }

        var newScriptTag = document.createElement('script');
        newScriptTag.setAttribute('src', url);

        if (onload) {
            newScriptTag.onload = onload;
        }

        document.head.appendChild(newScriptTag);
    };

    var LoadScriptPromise = function (url) {
        return new Promise(function (resolve, reject) {
            LoadScript(url, resolve);
        });
    };

    // Invoke this method after loading live2dcubismcore.js, and before loading any model asset.
    var Initialize = function (config) {
        if (!window.Live2DCubismCore) {
            console.error('live2dcubismcore.js does not load');
        }

        // Setup cubism
        var option = new Option();
        // TODO: option.logFunction, option.loggingLevel
        CubismFramework.startUp(option);

        // Initialize cubism
        CubismFramework.initialize();

        // TODO: More...
    };

    const IDLE = 0;
    const LOADING = 1;
    const LOADED = 2;

    var Live2dCoreScriptState = IDLE;

    var SetState = function (state) {
        Live2dCoreScriptState = state;
    };

    var IsIdle = function () {
        return (Live2dCoreScriptState === IDLE);
    };

    var IsLoaded = function () {
        return (Live2dCoreScriptState === LOADED);
    };

    class Live2dCoreScriptFile extends AwaitFile {
        constructor(loader, url) {
            if (url === undefined) {
                url = 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js';
            }

            var callback = function (successCallback, failureCallback) {
                LoadScriptPromise(url)
                    .then(function () {
                        Initialize();

                        SetState(LOADED);

                        successCallback();
                    });
            };

            if (IsIdle) {
                SetState(LOADING);
            }

            super(loader, {
                type: 'live2dcore',
                key: 'live2dcore',
                config: { callback: callback }
            });
        }
    }

    var CoreScriptFileCallback = function (url) {
        this.addFile(new Live2dCoreScriptFile(this, url));
        return this;
    };

    const BinaryFile = Phaser.Loader.FileTypes.BinaryFile;

    var CreateBinaryFile = function (loader, key, url, xhrSettings, dataKey) {
        var file = new BinaryFile(loader, key, url, xhrSettings);
        file.dataKey = dataKey;  // Store data by dataKey into live2d cache later
        file.cache = false;      // Don't store data into binary cache
        return file;
    };

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    /**
     * モデル設定情報を取り扱う関数を宣言した純粋仮想クラス。
     *
     * このクラスを継承することで、モデル設定情報を取り扱うクラスになる。
     */
    class ICubismModelSetting {
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework$1;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.ICubismModelSetting = ICubismModelSetting;
    })(Live2DCubismFramework$1 || (Live2DCubismFramework$1 = {}));

    /**
     * Copyright(c) Live2D Inc. All rights reserved.
     *
     * Use of this source code is governed by the Live2D Open Software license
     * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
     */
    const FileReferences = 'FileReferences';
    const Groups = 'Groups';
    const Layout = 'Layout';
    const HitAreas = 'HitAreas';
    const Moc = 'Moc';
    const Textures = 'Textures';
    const Physics = 'Physics';
    const Pose = 'Pose';
    const Expressions = 'Expressions';
    const Motions = 'Motions';
    const UserData = 'UserData';
    const Name = 'Name';
    const FilePath = 'File';
    const Id = 'Id';
    const Ids = 'Ids';
    const SoundPath = 'Sound';
    const FadeInTime = 'FadeInTime';
    const FadeOutTime = 'FadeOutTime';
    const LipSync = 'LipSync';
    const EyeBlink = 'EyeBlink';
    var FrequestNode;
    (function (FrequestNode) {
        FrequestNode[FrequestNode["FrequestNode_Groups"] = 0] = "FrequestNode_Groups";
        FrequestNode[FrequestNode["FrequestNode_Moc"] = 1] = "FrequestNode_Moc";
        FrequestNode[FrequestNode["FrequestNode_Motions"] = 2] = "FrequestNode_Motions";
        FrequestNode[FrequestNode["FrequestNode_Expressions"] = 3] = "FrequestNode_Expressions";
        FrequestNode[FrequestNode["FrequestNode_Textures"] = 4] = "FrequestNode_Textures";
        FrequestNode[FrequestNode["FrequestNode_Physics"] = 5] = "FrequestNode_Physics";
        FrequestNode[FrequestNode["FrequestNode_Pose"] = 6] = "FrequestNode_Pose";
        FrequestNode[FrequestNode["FrequestNode_HitAreas"] = 7] = "FrequestNode_HitAreas";
    })(FrequestNode || (FrequestNode = {}));
    /**
     * Model3Jsonパーサー
     *
     * model3.jsonファイルをパースして値を取得する
     */
    class CubismModelSettingJson extends ICubismModelSetting {
        /**
         * 引数付きコンストラクタ
         *
         * @param buffer    Model3Jsonをバイト配列として読み込んだデータバッファ
         * @param size      Model3Jsonのデータサイズ
         */
        constructor(buffer, size) {
            super();
            this._json = CubismJson.create(buffer, size);
            if (this._json) {
                this._jsonValue = new csmVector();
                // 順番はenum FrequestNodeと一致させる
                this._jsonValue.pushBack(this._json.getRoot().getValueByString(Groups));
                this._jsonValue.pushBack(this._json
                    .getRoot()
                    .getValueByString(FileReferences)
                    .getValueByString(Moc));
                this._jsonValue.pushBack(this._json
                    .getRoot()
                    .getValueByString(FileReferences)
                    .getValueByString(Motions));
                this._jsonValue.pushBack(this._json
                    .getRoot()
                    .getValueByString(FileReferences)
                    .getValueByString(Expressions));
                this._jsonValue.pushBack(this._json
                    .getRoot()
                    .getValueByString(FileReferences)
                    .getValueByString(Textures));
                this._jsonValue.pushBack(this._json
                    .getRoot()
                    .getValueByString(FileReferences)
                    .getValueByString(Physics));
                this._jsonValue.pushBack(this._json
                    .getRoot()
                    .getValueByString(FileReferences)
                    .getValueByString(Pose));
                this._jsonValue.pushBack(this._json.getRoot().getValueByString(HitAreas));
            }
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
            CubismJson.delete(this._json);
            this._jsonValue = null;
        }
        /**
         * CubismJsonオブジェクトを取得する
         *
         * @return CubismJson
         */
        GetJson() {
            return this._json;
        }
        /**
         * Mocファイルの名前を取得する
         * @return Mocファイルの名前
         */
        getModelFileName() {
            if (!this.isExistModelFile()) {
                return '';
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Moc).getRawString();
        }
        /**
         * モデルが使用するテクスチャの数を取得する
         * テクスチャの数
         */
        getTextureCount() {
            if (!this.isExistTextureFiles()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getSize();
        }
        /**
         * テクスチャが配置されたディレクトリの名前を取得する
         * @return テクスチャが配置されたディレクトリの名前
         */
        getTextureDirectory() {
            const texturePath = this._jsonValue
                .at(FrequestNode.FrequestNode_Textures)
                .getValueByIndex(0)
                .getRawString();
            const pathArray = texturePath.split('/');
            // 最後の要素はテクスチャ名なので不要
            const arrayLength = pathArray.length - 1;
            let textureDirectoryStr = '';
            // 分割したパスを結合
            for (let i = 0; i < arrayLength; i++) {
                textureDirectoryStr += pathArray[i];
                if (i < arrayLength - 1) {
                    textureDirectoryStr += '/';
                }
            }
            return textureDirectoryStr;
        }
        /**
         * モデルが使用するテクスチャの名前を取得する
         * @param index 配列のインデックス値
         * @return テクスチャの名前
         */
        getTextureFileName(index) {
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Textures)
                .getValueByIndex(index)
                .getRawString();
        }
        /**
         * モデルに設定された当たり判定の数を取得する
         * @return モデルに設定された当たり判定の数
         */
        getHitAreasCount() {
            if (!this.isExistHitAreas()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getSize();
        }
        /**
         * 当たり判定に設定されたIDを取得する
         *
         * @param index 配列のindex
         * @return 当たり判定に設定されたID
         */
        getHitAreaId(index) {
            return CubismFramework.getIdManager().getId(this._jsonValue
                .at(FrequestNode.FrequestNode_HitAreas)
                .getValueByIndex(index)
                .getValueByString(Id)
                .getRawString());
        }
        /**
         * 当たり判定に設定された名前を取得する
         * @param index 配列のインデックス値
         * @return 当たり判定に設定された名前
         */
        getHitAreaName(index) {
            return this._jsonValue
                .at(FrequestNode.FrequestNode_HitAreas)
                .getValueByIndex(index)
                .getValueByString(Name)
                .getRawString();
        }
        /**
         * 物理演算設定ファイルの名前を取得する
         * @return 物理演算設定ファイルの名前
         */
        getPhysicsFileName() {
            if (!this.isExistPhysicsFile()) {
                return '';
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Physics).getRawString();
        }
        /**
         * パーツ切り替え設定ファイルの名前を取得する
         * @return パーツ切り替え設定ファイルの名前
         */
        getPoseFileName() {
            if (!this.isExistPoseFile()) {
                return '';
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Pose).getRawString();
        }
        /**
         * 表情設定ファイルの数を取得する
         * @return 表情設定ファイルの数
         */
        getExpressionCount() {
            if (!this.isExistExpressionFile()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getSize();
        }
        /**
         * 表情設定ファイルを識別する名前（別名）を取得する
         * @param index 配列のインデックス値
         * @return 表情の名前
         */
        getExpressionName(index) {
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Expressions)
                .getValueByIndex(index)
                .getValueByString(Name)
                .getRawString();
        }
        /**
         * 表情設定ファイルの名前を取得する
         * @param index 配列のインデックス値
         * @return 表情設定ファイルの名前
         */
        getExpressionFileName(index) {
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Expressions)
                .getValueByIndex(index)
                .getValueByString(FilePath)
                .getRawString();
        }
        /**
         * モーショングループの数を取得する
         * @return モーショングループの数
         */
        getMotionGroupCount() {
            if (!this.isExistMotionGroups()) {
                return 0;
            }
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getKeys()
                .getSize();
        }
        /**
         * モーショングループの名前を取得する
         * @param index 配列のインデックス値
         * @return モーショングループの名前
         */
        getMotionGroupName(index) {
            if (!this.isExistMotionGroups()) {
                return null;
            }
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getKeys()
                .at(index);
        }
        /**
         * モーショングループに含まれるモーションの数を取得する
         * @param groupName モーショングループの名前
         * @return モーショングループの数
         */
        getMotionCount(groupName) {
            if (!this.isExistMotionGroupName(groupName)) {
                return 0;
            }
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getValueByString(groupName)
                .getSize();
        }
        /**
         * グループ名とインデックス値からモーションファイル名を取得する
         * @param groupName モーショングループの名前
         * @param index     配列のインデックス値
         * @return モーションファイルの名前
         */
        getMotionFileName(groupName, index) {
            if (!this.isExistMotionGroupName(groupName)) {
                return '';
            }
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getValueByString(groupName)
                .getValueByIndex(index)
                .getValueByString(FilePath)
                .getRawString();
        }
        /**
         * モーションに対応するサウンドファイルの名前を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return サウンドファイルの名前
         */
        getMotionSoundFileName(groupName, index) {
            if (!this.isExistMotionSoundFile(groupName, index)) {
                return '';
            }
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getValueByString(groupName)
                .getValueByIndex(index)
                .getValueByString(SoundPath)
                .getRawString();
        }
        /**
         * モーション開始時のフェードイン処理時間を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return フェードイン処理時間[秒]
         */
        getMotionFadeInTimeValue(groupName, index) {
            if (!this.isExistMotionFadeIn(groupName, index)) {
                return -1.0;
            }
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getValueByString(groupName)
                .getValueByIndex(index)
                .getValueByString(FadeInTime)
                .toFloat();
        }
        /**
         * モーション終了時のフェードアウト処理時間を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return フェードアウト処理時間[秒]
         */
        getMotionFadeOutTimeValue(groupName, index) {
            if (!this.isExistMotionFadeOut(groupName, index)) {
                return -1.0;
            }
            return this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getValueByString(groupName)
                .getValueByIndex(index)
                .getValueByString(FadeOutTime)
                .toFloat();
        }
        /**
         * ユーザーデータのファイル名を取得する
         * @return ユーザーデータのファイル名
         */
        getUserDataFile() {
            if (!this.isExistUserDataFile()) {
                return '';
            }
            return this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(UserData)
                .getRawString();
        }
        /**
         * レイアウト情報を取得する
         * @param outLayoutMap csmMapクラスのインスタンス
         * @return true レイアウト情報が存在する
         * @return false レイアウト情報が存在しない
         */
        getLayoutMap(outLayoutMap) {
            // 存在しない要素にアクセスするとエラーになるためValueがnullの場合はnullを代入する
            const map = this._json
                .getRoot()
                .getValueByString(Layout)
                .getMap();
            if (map == null) {
                return false;
            }
            let ret = false;
            for (const ite = map.begin(); ite.notEqual(map.end()); ite.preIncrement()) {
                outLayoutMap.setValue(ite.ptr().first, ite.ptr().second.toFloat());
                ret = true;
            }
            return ret;
        }
        /**
         * 目パチに関連付けられたパラメータの数を取得する
         * @return 目パチに関連付けられたパラメータの数
         */
        getEyeBlinkParameterCount() {
            if (!this.isExistEyeBlinkParameters()) {
                return 0;
            }
            let num = 0;
            for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                const refI = this._jsonValue
                    .at(FrequestNode.FrequestNode_Groups)
                    .getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                    num = refI.getValueByString(Ids).getVector().getSize();
                    break;
                }
            }
            return num;
        }
        /**
         * 目パチに関連付けられたパラメータのIDを取得する
         * @param index 配列のインデックス値
         * @return パラメータID
         */
        getEyeBlinkParameterId(index) {
            if (!this.isExistEyeBlinkParameters()) {
                return null;
            }
            for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                const refI = this._jsonValue
                    .at(FrequestNode.FrequestNode_Groups)
                    .getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                    return CubismFramework.getIdManager().getId(refI.getValueByString(Ids).getValueByIndex(index).getRawString());
                }
            }
            return null;
        }
        /**
         * リップシンクに関連付けられたパラメータの数を取得する
         * @return リップシンクに関連付けられたパラメータの数
         */
        getLipSyncParameterCount() {
            if (!this.isExistLipSyncParameters()) {
                return 0;
            }
            let num = 0;
            for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                const refI = this._jsonValue
                    .at(FrequestNode.FrequestNode_Groups)
                    .getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == LipSync) {
                    num = refI.getValueByString(Ids).getVector().getSize();
                    break;
                }
            }
            return num;
        }
        /**
         * リップシンクに関連付けられたパラメータの数を取得する
         * @param index 配列のインデックス値
         * @return パラメータID
         */
        getLipSyncParameterId(index) {
            if (!this.isExistLipSyncParameters()) {
                return null;
            }
            for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                const refI = this._jsonValue
                    .at(FrequestNode.FrequestNode_Groups)
                    .getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == LipSync) {
                    return CubismFramework.getIdManager().getId(refI.getValueByString(Ids).getValueByIndex(index).getRawString());
                }
            }
            return null;
        }
        /**
         * モデルファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistModelFile() {
            const node = this._jsonValue.at(FrequestNode.FrequestNode_Moc);
            return !node.isNull() && !node.isError();
        }
        /**
         * テクスチャファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistTextureFiles() {
            const node = this._jsonValue.at(FrequestNode.FrequestNode_Textures);
            return !node.isNull() && !node.isError();
        }
        /**
         * 当たり判定のキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistHitAreas() {
            const node = this._jsonValue.at(FrequestNode.FrequestNode_HitAreas);
            return !node.isNull() && !node.isError();
        }
        /**
         * 物理演算ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistPhysicsFile() {
            const node = this._jsonValue.at(FrequestNode.FrequestNode_Physics);
            return !node.isNull() && !node.isError();
        }
        /**
         * ポーズ設定ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistPoseFile() {
            const node = this._jsonValue.at(FrequestNode.FrequestNode_Pose);
            return !node.isNull() && !node.isError();
        }
        /**
         * 表情設定ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistExpressionFile() {
            const node = this._jsonValue.at(FrequestNode.FrequestNode_Expressions);
            return !node.isNull() && !node.isError();
        }
        /**
         * モーショングループのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionGroups() {
            const node = this._jsonValue.at(FrequestNode.FrequestNode_Motions);
            return !node.isNull() && !node.isError();
        }
        /**
         * 引数で指定したモーショングループのキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionGroupName(groupName) {
            const node = this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getValueByString(groupName);
            return !node.isNull() && !node.isError();
        }
        /**
         * 引数で指定したモーションに対応するサウンドファイルのキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionSoundFile(groupName, index) {
            const node = this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getValueByString(groupName)
                .getValueByIndex(index)
                .getValueByString(SoundPath);
            return !node.isNull() && !node.isError();
        }
        /**
         * 引数で指定したモーションに対応するフェードイン時間のキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionFadeIn(groupName, index) {
            const node = this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getValueByString(groupName)
                .getValueByIndex(index)
                .getValueByString(FadeInTime);
            return !node.isNull() && !node.isError();
        }
        /**
         * 引数で指定したモーションに対応するフェードアウト時間のキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionFadeOut(groupName, index) {
            const node = this._jsonValue
                .at(FrequestNode.FrequestNode_Motions)
                .getValueByString(groupName)
                .getValueByIndex(index)
                .getValueByString(FadeOutTime);
            return !node.isNull() && !node.isError();
        }
        /**
         * UserDataのファイル名が存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistUserDataFile() {
            const node = this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(UserData);
            return !node.isNull() && !node.isError();
        }
        /**
         * 目ぱちに対応付けられたパラメータが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistEyeBlinkParameters() {
            if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() ||
                this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
                return false;
            }
            for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
                if (this._jsonValue
                    .at(FrequestNode.FrequestNode_Groups)
                    .getValueByIndex(i)
                    .getValueByString(Name)
                    .getRawString() == EyeBlink) {
                    return true;
                }
            }
            return false;
        }
        /**
         * リップシンクに対応付けられたパラメータが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistLipSyncParameters() {
            if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() ||
                this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
                return false;
            }
            for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
                if (this._jsonValue
                    .at(FrequestNode.FrequestNode_Groups)
                    .getValueByIndex(i)
                    .getValueByString(Name)
                    .getRawString() == LipSync) {
                    return true;
                }
            }
            return false;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Live2DCubismFramework;
    (function (Live2DCubismFramework) {
        Live2DCubismFramework.CubismModelSettingJson = CubismModelSettingJson;
    })(Live2DCubismFramework || (Live2DCubismFramework = {}));

    const GetFastValue$1 = Phaser.Utils.Objects.GetFastValue;
    const ImageFile = Phaser.Loader.FileTypes.ImageFile;

    var LoadChildrenFiles = function (parent, setting) {
        var loader = parent.loader;
        var xhrSettings = GetFastValue$1(parent.config, 'xhrSettings');
        var key = parent.key;
        var homeDir = parent.homeDir;
        var requestUrls = [];  // Load a file one time

        // Load CubismModel
        var modelFileName = setting.getModelFileName();
        if (modelFileName !== '') {
            var requestUrl = `${homeDir}${modelFileName}`;
            if (requestUrls.indexOf(requestUrl) === -1) {
                var modelFile = CreateBinaryFile(
                    loader,
                    `${key}!${modelFileName}`,
                    requestUrl,
                    xhrSettings,
                    'model'
                );

                parent.addToMultiFile(modelFile);
                loader.addFile(modelFile);

                requestUrls.push(requestUrl);
            }

        } else {
            // Error
            console.error(`Live2d: can't load model ${key}`);
            return;
        }

        // Load CubismExpression
        var cnt = setting.getExpressionCount();
        for (var i = 0; i < cnt; i++) {
            var expressionFileName = setting.getExpressionFileName(i);
            var expressionName = setting.getExpressionName(i);

            var requestUrl = `${homeDir}${expressionFileName}`;
            if (requestUrls.indexOf(requestUrl) === -1) {
                var expressionFile = CreateBinaryFile(
                    loader,
                    `${key}!${expressionFileName}`,
                    requestUrl,
                    xhrSettings,
                    `expressions!!!${expressionName}`
                );

                parent.addToMultiFile(expressionFile);
                loader.addFile(expressionFile);

                requestUrls.push(requestUrl);
            }

        }

        // Load CubismPhysics
        var physicsFileName = setting.getPhysicsFileName();
        if (physicsFileName !== '') {
            var requestUrl = `${homeDir}${physicsFileName}`;
            if (requestUrls.indexOf(requestUrl) === -1) {
                var physicsFile = CreateBinaryFile(
                    loader,
                    `${key}!${physicsFileName}`,
                    requestUrl,
                    xhrSettings,
                    'physics'
                );

                parent.addToMultiFile(physicsFile);
                loader.addFile(physicsFile);

                requestUrls.push(requestUrl);
            }

        }

        // Load CubismPose
        var poseFileName = setting.getPoseFileName();
        if (poseFileName !== '') {
            var requestUrl = `${homeDir}${poseFileName}`;
            if (requestUrls.indexOf(requestUrl) === -1) {
                var poseFile = CreateBinaryFile(
                    loader,
                    `${key}!${poseFileName}`,
                    requestUrl,
                    xhrSettings,
                    'pose'
                );

                parent.addToMultiFile(poseFile);
                loader.addFile(poseFile);

                requestUrls.push(requestUrl);
            }

        }

        // Load UserData
        var userDataFileName = setting.getUserDataFile();
        if (userDataFileName !== '') {
            var requestUrl = `${homeDir}${userDataFileName}`;
            if (requestUrls.indexOf(requestUrl) === -1) {
                var userDataFile = CreateBinaryFile(
                    loader,
                    `${key}!${userDataFileName}`,
                    requestUrl,
                    xhrSettings,
                    'userData'
                );

                parent.addToMultiFile(userDataFile);
                loader.addFile(userDataFile);

                requestUrls.push(requestUrl);
            }

        }

        // Load CubismMotion
        var groupCnt = setting.getMotionGroupCount();
        for (var gi = 0; gi < groupCnt; gi++) {
            var groupName = setting.getMotionGroupName(gi);
            var cnt = setting.getMotionCount(groupName);
            for (var i = 0; i < cnt; i++) {
                var motionFileName = setting.getMotionFileName(groupName, i);
                var requestUrl = `${homeDir}${motionFileName}`;
                if (requestUrls.indexOf(requestUrl) === -1) {
                    var motionFile = CreateBinaryFile(
                        loader,
                        `${key}!${motionFileName}`,
                        requestUrl,
                        xhrSettings,
                        `motions!!!${groupName}!!!${i}`
                    );

                    parent.addToMultiFile(motionFile);
                    loader.addFile(motionFile);

                    requestUrls.push(requestUrl);
                }

            }

        }

        // Load texture
        var textureCnt = setting.getTextureCount();
        for (var i = 0; i < textureCnt; i++) {
            var textureFileName = setting.getTextureFileName(i);
            if (textureFileName === '') {
                // Error
                continue;
            }

            // TODO: store texture into live2d cache?
            var requestUrl = `${homeDir}${textureFileName}`;
            if (requestUrls.indexOf(requestUrl) === -1) {
                var imageFile = new ImageFile(
                    loader,
                    `${key}!${textureFileName}`,
                    requestUrl,
                    xhrSettings
                );
                imageFile.dataKey = `textures!!!${i}`;

                parent.addToMultiFile(imageFile);
                loader.addFile(imageFile);

                requestUrls.push(requestUrl);
            }

        }

    };

    var IsInValidKey = function (keys) {
        return (keys == null) || (keys === '') || (keys.length === 0);
    };

    var GetEntry = function (target, keys, defaultEntry) {
        var entry = target;
        if (IsInValidKey(keys)) ; else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var key;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                key = keys[i];
                if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                    var newEntry;
                    if (i === cnt - 1) {
                        if (defaultEntry === undefined) {
                            newEntry = {};
                        } else {
                            newEntry = defaultEntry;
                        }
                    } else {
                        newEntry = {};
                    }

                    entry[key] = newEntry;
                }

                entry = entry[key];
            }
        }

        return entry;
    };

    var SetValue = function (target, keys, value, delimiter) {
        if (delimiter === undefined) {
            delimiter = '.';
        }

        // no object
        if (typeof (target) !== 'object') {
            return;
        }

        // invalid key
        else if (IsInValidKey(keys)) {
            // don't erase target
            if (value == null) {
                return;
            }
            // set target to another object
            else if (typeof (value) === 'object') {
                target = value;
            }
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split(delimiter);
            }

            var lastKey = keys.pop();
            var entry = GetEntry(target, keys);
            entry[lastKey] = value;
        }

        return target;
    };

    const GetFastValue = Phaser.Utils.Objects.GetFastValue;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

    class Live2dFile extends Phaser.Loader.MultiFile {
        constructor(loader, key, url, xhrSettings) {
            if (IsPlainObject(key)) {
                var config = key;

                key = GetFastValue(config, 'key');
                url = GetFastValue(config, 'url');
                xhrSettings = GetFastValue(config, 'xhrSettings');
            }

            var cache = loader.cacheManager.custom.live2d;

            // Load setting
            var settingFile = CreateBinaryFile(loader, key, url, xhrSettings, 'setting');
            super(loader, 'live2d', key, [settingFile]);

            this.cache = cache;
            this.homeDir = url.substring(0, url.lastIndexOf('/') + 1);
        }

        onFileComplete(file) {        
            var index = this.files.indexOf(file);
            if (index === -1) {
                return;
            }

            // console.log(`Load file '${file.key}' at '${file.url}'`)

            this.pending--;

            if (index === 0) {
                var arrayBuffer = file.data;
                var setting = new CubismModelSettingJson(arrayBuffer, arrayBuffer.byteLength);
                file.data = setting;

                // Load remainder files by setting
                LoadChildrenFiles(this, setting);
            }
        }

        addToCache() {
            if (this.isReadyToProcess()) {
                var textureManager = this.loader.textureManager;
                var data = { key: this.key };
                for (var i = 0, cnt = this.files.length; i < cnt; i++) {
                    var file = this.files[i];

                    var fileData = file.data;
                    // Process textures
                    if (file.dataKey.startsWith('textures')) {
                        var key = file.key.replace(`${this.key}!`, '');
                        var texture;
                        // Add image to textureManager manually
                        if (!textureManager.exists(key)) {
                            texture = textureManager.addImage(key, file.data);
                        } else {
                            texture = textureManager.get(key);
                        }

                        // Store glTexture to live2d data cache
                        fileData = texture.source[0].glTexture;
                    }

                    SetValue(data, file.dataKey, fileData, '!!!');

                    file.pendingDestroy();
                }

                this.cache.add(this.key, data);

                this.complete = true;
            }
        }
    }

    var Live2dFileCallback = function (key, url) {
        var loader = this;

        loader.cacheManager.addCustom('live2d');

        if (IsIdle()) {
            if (window.Live2DCubismCore) {
                // Core script is loaded before
                Initialize();
                SetState(LOADED);

            } else {
                // Core script is not loaded
                // Load core script from default path
                loader.addFile(new Live2dCoreScriptFile(loader));

            }
        }

        if (IsLoaded()) {
            // Core script is loaded
            // Can load model assets directly
            LoadFiles(loader, key, url);
        } else {
            // Core script is loading
            loader.once('filecomplete-live2dcore-live2dcore', function () {
                // Load model assets
                LoadFiles(loader, key, url);
            });
        }

        return this;
    };

    var LoadFiles = function (loader, key, url) {
        if (Array.isArray(key)) {
            for (var i = 0; i < key.length; i++) {
                var multifile = new Live2dFile(loader, key[i]);
                loader.addFile(multifile.files);
            }
        } else {
            var multifile = new Live2dFile(loader, key, url);
            loader.addFile(multifile.files);
        }
    };

    class Live2dPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            var game = pluginManager.game;

            var isWebGL = (game.config.renderType === 2);

            if (!isWebGL) {
                console.error('Live2d can\'t run in CANVAS render mode.');
            }

            // Register new file type to loader, to load live2d core script file (live2dcubismcore.min.js)
            pluginManager.registerFileType('rexLive2dCoreScript', CoreScriptFileCallback);

            // Register new file type to loader, to load live2d model assets
            pluginManager.registerFileType('rexLive2d', Live2dFileCallback);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexLive2d', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.Live2d', Live2dGameObject);

    return Live2dPlugin;

}));
