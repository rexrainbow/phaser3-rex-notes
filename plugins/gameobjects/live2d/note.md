# Live2d

## Load assets

1. Load setting (index) file. In `LAppModel.loadAssets`
    ```ts
    fetch(`${modelHomePath}${jsonFileName}`)
    ```
    - `modelHomePath` : `\Samples\Resources\Haru\`
    - `jsonFileName` : `Haru.model3.json`
1. Load CubismModel
    ```ts
    fetch(`${modelHomePath}${modelFileName}`);
    ```
    - `modelFileName` : `modelSetting.getModelFileName()`
    - Result : 
        ```ts
        CubismUserModel.loadModel(arrayBuffer)
        ```
1. Load CubismExpression
    ```ts
    const count: number = modelSetting.getExpressionCount();
    for (let i = 0; i < count; i++) {
        const expressionFileName = modelSetting.getExpressionFileName(i);
        fetch(`${modelHomePath}${expressionFileName}`);
    }
    ```
    - Result : 
        ```ts
        const motion: ACubismMotion = this.loadExpression(
            arrayBuffer,
            arrayBuffer.byteLength,
            expressionName
        );
        // More : update expressions
        ```
1. Load CubismPhysics
    ```ts
    fetch(`${modelHomePath}${physicsFileName}`);
    ```
    - `physicsFileName` : `modelSetting.getPhysicsFileName()`
    - Result : 
        ```ts
        CubismUserModel.loadPhysics(arrayBuffer)
        ```
1. Load CubismPose
    ```ts
    fetch(`${modelHomePath}${poseFileName}`);
    ```
    - `poseFileName` : `modelSetting.getPoseFileName()`
    - Result : 
        ```ts
        CubismUserModel.loadPose(arrayBuffer)
        ```
1. Setup EyeBlink
1. Setup Breath
1. Load UserData
    ```ts
    fetch(`${modelHomePath}${userDataFileName}`);
    ```
    - `userDataFileName` : `modelSetting.getUserDataFile()`
    - Result : 
        ```ts
        CubismUserModel.loadUserData(arrayBuffer)
        ```
1. Setup EyeBlinkIds
1. Setup LipSyncIds
1. Setup Layout
1. Load CubismMotion
    ```ts    
    const motionGroupCount: number = this._modelSetting.getMotionGroupCount();
    const group: string[] = [];
    for (let i = 0; i < motionGroupCount; i++) {
         group[i] = modelSetting.getMotionGroupName(i);
        fetch(`${modelHomePath}${expressionFileName}`);
    }
    ```
    - Result : 
        ```ts
        const motion: ACubismMotion = this.loadExpression(
            arrayBuffer,
            arrayBuffer.byteLength,
            expressionName
        );
        // More : update expressions
        ```
1. Load texture
    ```ts
    const textureCount: number = this._modelSetting.getTextureCount();
    for (
        let modelTextureNumber = 0;
        modelTextureNumber < textureCount;
        modelTextureNumber++
      ) {
        if (this._modelSetting.getTextureFileName(modelTextureNumber) == '') {
          console.log('getTextureFileName null');
          continue;
        }

        let texturePath =
          this._modelSetting.getTextureFileName(modelTextureNumber);
        texturePath = this._modelHomeDir + texturePath;
        
    }
    ```

## Update

1. `LAppDelegate.run()`
1. `LAppPal.updateTime()`
1. `LAppView.render()`
1. `LAppLive2DManager.onUpdate()`
1. `LAppModel.update()`
    ```ts
    this._model.loadParameters(); // 前回セーブされた状態をロード
    if (this._motionManager.isFinished()) {
      // モーションの再生がない場合、待機モーションの中からランダムで再生する
      this.startRandomMotion(
        LAppDefine.MotionGroupIdle,
        LAppDefine.PriorityIdle
      );
    } else {
      motionUpdated = this._motionManager.updateMotion(
        this._model,
        deltaTimeSeconds
      ); // モーションを更新
    }
    this._model.saveParameters(); // 状態を保存
    ```    

## Render

1. `LAppLive2DManager.onUpdate()`
    - `projection` matrix :
        ```ts
        const projection: CubismMatrix44 = new CubismMatrix44();
        if(width < height) {
            projection.scale(1.0, width / height);
        } else {
            projection.scale(height / width, 1.0);
        }

        if (this._viewMatrix != null) {
          projection.multiplyByMatrix(this._viewMatrix);
        }
        ```
    - `_viewMatrix` matrix :
        - In LAppView
        - Copy to LAppLive2DManager
            ```ts
            live2DManager.setViewMatrix(this._viewMatrix)
            ```
            ```ts
            this._viewMatrix = new CubismMatrix44();
            
            public setViewMatrix(m: CubismMatrix44) {
                for (let i = 0; i < 16; i++) {
                    this._viewMatrix.getArray()[i] = m.getArray()[i];
                }
            }
            ```
1. `LAppModel.draw(projection)`
    ```ts
    projection.multiplyByMatrix(this._modelMatrix);
    this.getRenderer().setMvpMatrix(projection);
    this.doDraw();
    ```
    - `_modelMatrix` : Member of LAppModel/CubismUserModel

### CubismMatrix44

- `matrix.loadIdentity()` : Reset
- `matrix.setMatrix(tr)` : Copy from
- `var arr = matrix.getArray()` : 1d array of 16 units
- Translate
    - `var translateX = matrix.getTranslateX()` : TranslateX, `tr[12]`
    - `var translateY = matrix.getTranslateY()` : TranslateX, `tr[13]`
    - `matrix.translate(x, y)`
    - `matrix.translateX(x)`
    - `matrix.translateY(y)`
    - `matrix.translateRelative(x, y)`
- Scale
    - `var scaleX = matrix.getScaleX()` : ScaleX, `tr[0]`
    - `var scaleY = matrix.getScaleY()` : ScaleY, `tr[5]`
    - `matrix.scale(scaleX, scaleY)`
    - `matrix.scaleRelative(scaleX, scaleY)`
- Transform
    - `var positionX = matrix.transformX(localX)`
    - `var positionY = matrix.transformY(localY)`
    - `var localX = matrix.invertTransformX(positionX)`
    - `var localY = matrix.invertTransformY(positionY)`
- Multiply
    - `matrix.multiply(a, b, dst)`
    - `matrix.multiplyByMatrix(m)`
- `matrix.clone()`

### Model display matrix

- Get model display matrix
    ```ts
    var modelMatrix = model.getModelMatrix()
    ```
- Change size = set scale
    ```ts
    modelMatrix.setWidth(width);
    modelMatrix.setHeight(width);
    ```
- Set position
    ```ts
    modelMatrix.setPosition(x, y);
    modelMatrix.setX(x);
    modelMatrix.setY(y);
    modelMatrix.setCenterPosition(x, y);
    modelMatrix.top(y);     // = setY
    modelMatrix.bottom(y);
    modelMatrix.left(y);    // = setX
    modelMatrix.right(y);
    modelMatrix.centerX(y);
    modelMatrix.centerY(y);
    ```

## TODO

- Fix viewport matrix for camera zoom/scroll
- Compile framework/*.ts files. So that rollup does not need add typescript compile plugin.

