1.  game.events `prestep` event. Global Managers like Input and Sound update.
    1.  trigger `game.sound.update()`
1.  game.events `step` event. User-land code and plugins
    - Register event
        ```javascript
        scene.game.events.on('step', function(time, delta){
            //
        }, scope);
        ```
1.  Update the Scene Manager and all active Scenes
    1.  scene.events `preupdate` event
        - Register event
            ```javascript
            scene.events.on('preupdate', function(time, delta){
                //
            }, scope);
            ```
        - TweenManager.preUpdate() to arrange active targets
        - UpdateList.preUpdate(), to arrange game objects in UpdateList
    1.  scene.events `update` event
        - Register event
            ```javascript
            scene.events.on('update', function(time, delta){
                //
            }, scope);
            ```
        - TweenManager.update(), to run active tweens
        - UpdateList.update
            - gameObject.preUpdate
    1. scene.update()
    1. scene.events `postupdate` event
        - Register event
            ```javascript
            scene.events.on('postupdate', function(time, delta){
                //
            }, scope);
            ```
1. game.events `poststep` event. Final event before rendering starts.
    - Register event
        ```javascript
        scene.game.events.on('poststep', function(time, delta){
            //
        }, scope);
        ```
1. game.renderer.preRender()
1. game.events `prerender` event
    - Register event
        ```javascript
        scene.game.events.on('prerender', function(renderer, time, delta){
            //
        }, scope);
        ```
1. SceneManager.render()
    1. Sort display list
    1. Render cameras
    1. scene.events `render` event
        - Register event
            ```javascript
            scene.game.events.on('render', function(renderer){
                //
            }, scope);
            ```
1. game.renderer.postRender()
1. game.events `postrender` event. Final event before the step repeats.
    - Register event
        ```javascript
        scene.game.events.on('postrender', function(renderer, time, delta){
            //
        }, scope);
        ```

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
GameEventPreStep>"game.events: prestep<br><br>sound.update()"]
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
SceneEventRender>"scene.events: render"]
end

subgraph Update
SceneEventPreUpdate>"scene.events: preupdate<br><br>TweenManager.preUpdate()<br>UpdateList.preUpdate()"]
SceneEventUpdate>"scene.events: update<br><br>TweenManager.update()<br>UpdateList.update()<br>gameObject.preUpdate()"]
SceneUpdate["scene.update()"]
SceneEventPostUpdate>"scene.events: postupdate"]
end


SceneEventPreUpdate --> SceneEventUpdate
SceneEventUpdate --> SceneUpdate
SceneUpdate --> SceneEventPostUpdate

SceneEventPostUpdate -.-> SceneEventRender
```
