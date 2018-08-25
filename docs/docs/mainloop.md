1.  game.events `prestep` event
    1.  trigger `game.input.update()`
    1.  trigger `game.sound.update()`
1.  game.events `step` event
1.  SceneManager.update, for each active scene
    1.  scene.sys.events `preupdate` event
        -  TweenManager.preUpdate() to arrange active targets
        -  UpdateList.preUpdate(), to arrange game objects in UpdateList
    1.  scene.sys.events `update` event
        -  TweenManager.update(), to run active tweens
        -  UpdateList.update
            - gameObject.preUpdate
    1.  scene.update()
    1.  scene.sys.events `postupdate` event
1.  game.events `poststep` event
1.  game.renderer.preRender()
1.  game.events `prerender` event
1.  SceneManager.render()
    1. Sort display list
    1. Render cameras
    1. scene.sys.events `render` event
1.  game.renderer.postRender()
1.  game.events `postrender` event

!!! note
    Each scene is a standalone system.

## Flow chart

### Game loop

```mermaid
graph TB

subgraph Render
GameRenderPreRender["game.renderer.preRender()"]
GameEventPreRender>"game.events: prerender"]
SceneManagerRender["SceneManager.render()<br>...See 'Scene steps'..."]
GameRenderPostRender["game.renderer.postRender()"]
GameEventPostRender>"game.events: postrender"]
end

subgraph Step
GameEventPreStep>"game.events: prestep<br><br>input.update()<br>sound.update()"]
GameEventStep>"game.events: step"]
SceneManagerUpdate["SceneManager.update()<br>...See 'Scene steps'..."]
GameEventPostStep>"game.events: poststep"]
end


GameEventPreStep --> GameEventStep
GameEventStep --> SceneManagerUpdate
SceneManagerUpdate --> GameEventPostStep
GameEventPostStep --> GameRenderPreRender
GameRenderPreRender --> GameEventPreRender
GameEventPreRender --> SceneManagerRender
SceneManagerRender --> GameRenderPostRender
GameRenderPostRender --> GameEventPostRender
GameEventPostRender --> GameEventPreStep
```

### Scene steps

```mermaid
graph TB

subgraph Render
SceneEventRender>"scene.sys.events: render"]
end

subgraph Update
SceneEventPreUpdate>"scene.sys.events: preupdate<br><br>TweenManager.preUpdate()<br>UpdateList.preUpdate()"]
SceneEventUpdate>"scene.sys.events: update<br><br>TweenManager.update()<br>UpdateList.update()<br>gameObject.preUpdate()"]
SceneUpdate["scene.update()"]
SceneEventPostUpdate>"scene.sys.events: postupdate"]
end


SceneEventPreUpdate --> SceneEventUpdate
SceneEventUpdate --> SceneUpdate
SceneUpdate --> SceneEventPostUpdate

SceneEventPostUpdate -.-> SceneEventRender
```
