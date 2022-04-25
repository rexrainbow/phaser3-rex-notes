# Live2d

## Load assets

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

1. `LAppModel.draw(projection)`
    ```ts
    matrix.multiplyByMatrix(this._modelMatrix);
    this.getRenderer().setMvpMatrix(matrix);
    this.doDraw();
    ```  