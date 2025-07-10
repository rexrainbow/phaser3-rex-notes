## List of my plugins

!!! note "Version of phaser3"
    Please upgrade your phaser3 to version >= **3.80.0**.

1. [Achievements](achievements.md): Achievements in a csv table.
2. [Alpha mask image](alphamaskimage.md): Load a texture, then apply an alpha mask from another texture.
3. [Anchor](anchor.md): Set size and position based on visible window.
4. [Arcade-TCRP/Player](arcade-tcrp-player.md): Run commands on step of Arcade.
5. [Arcade-TCRP/Recorder](arcade-tcrp-recorder.md): Store commands with step of Arcade.
6. [AwaitLoader](awaitloader.md): Await custom task in preload stage.
6. [AwaitComlinkLoader](awaitcomlinkloader.md): Running web worker by using [Comlink](https://github.com/GoogleChromeLabs/comlink) in preload stage.
7. [Away time](awaytime.md): Get time from previous closing application to now.
8. [BBCode-text](bbcodetext.md): Drawing text with [BBCode](https://en.wikipedia.org/wiki/BBCode) protocol.
9.  [Board](board.md): Core object of Board system.
9.  [Board/Image](board-image.md): [Image](image.md) chess object.
10. [Board/Field of view](board-fieldofview.md): Visible testing, to find field of view.
11. [Board/Hexagon map](board-hexagonmap.md): Create tile positions in hexagon/triangle/parallelogram geometry in hexagon grid.
12. [Board/Match](board-match.md): Get matched chess.
13. [Board/Mini board](board-miniboard.md): Chess Container, to rotate/mirror/drag chess together.
14. [Board/Monopoly](board-monopoly.md): Move through path tiles.
15. [Board/Move To](board-moveto.md): Move chess towards target position with a steady speed.
16. [Board/Path finder](board-pathfinder.md): Find moveable area or moving path.
17. [Board/Shape](board-shape.md): [Grid (polygon) shape](shape-polygon.md) chess object.
17. [Board/Sprite](board-sprite.md): [Sprite](sprite.md) chess object.
18. [Board/Tilemap](board-tilemap.md): Create board from [tilemap](tilemap.md).
19. [Board/Tile texture](board-texture.md): Create [canvas-texture](canvas-texture.md) of tile.
20. [Bounds](bounds.md): Clamp or wrap position of game object inside target bounds.
21. [Bracket parser](bracketparser.md): A lite-weight bracket parser.
22. [Bracket parser2](bracketparser2.md): A lite-weight bracket parser.
23. [Buff data](buffdata.md): Data manager with buffs.
24. [Build arcade object](buildarcadeobject.md): Create arcade body, and inject arcade object methods.
25. [Bullet](bullet.md): Move game object toward current angle of game object, with a constant speed.
26. [Button](button.md): Fires 'click' event when touch releasd after pressed.
26. [Camera controller](input-to-camera.md): Control camera's scroll by [pan](gesture-pan.md)/[cursor-at-bounds(scroll)](cursoratbounds.md), and zoom by [pinch](gesture-pinch.md)/mouse-wheel.
27. [Canvas](canvas.md): Drawing on [canvas](https://www.w3schools.com/html/html5_canvas.asp).
28. [CanvasInput](canvasinput.md): An invisible Input DOM element to receive character input and display on DynamicText.
29. [Canvas/Circular progress](canvas-circularprogress.md): Circular progress bar on canvas.
30. [Canvas/Line progress](canvas-lineprogress.md): Horizontal line progress bar filled with gradient color on canvas.
31. [Canvas/Round rectangle](canvas-roundrectangle.md): Round rectangle on canvas.
32. [Canvas image data](canvas-data.md): Get image data from texture, or text object.
33. [Circle mask image](circlemaskimage.md): Load a texture, then apply a circle mask.
33. [Clickboard-to-Texture](clickboardtotexture.md): Store the image pasted from the clipboard into the texture manager.
34. [Click outside](clickoutside.md): Fires 'clickoutside' event when pointer-down or pointer-up outside of game object.
35. [Clock](clock.md): A clock to count elapsed time.
36. [Character cache](charactercache.md): Generate bitmapfont from [text game object](text.md), or [bbcode text game object](bbcodetext.md).
37. [Color/TintRGB](tintrgb.md): Attach `tintR`, `tintG`, `tintB`, and `tintGray` properties to a game object.
38. [Conditions table](conditionstable.md): Check conditions to find passed tests listed in a csv table.
39. [ContainerLite](containerlite.md): Control the position and angle of children game objects.
40. [Containerlite-perspective](containerlite-perspective.md): Snapshot children of containerlite, to a perspective render texture.
41. [Containerlite-skew](containerlite-skew.md): Snapshot children of containerlite, to a skew render texture.
42. [CSV-scenario](csvscenario.md): Run script in csv format.
43. [CSV-to-hash-table](csvtohashtable.md): Hash table indexed by (col-key, row-key) from csv string.
44. [Cursor at bound](cursoratbounds.md): Map position pf cursor to cursor key state.
45. [Curve/Spiral](curve-spiral.md): Spiral curve.
46. [Cut Jigsaw Image](cutjigsawimage.md): Cut image into pieces for jigsaw application.
47. [Drag](drag.md): Drag game object.
48. [Drag-rotate](dragrotate.md): Get dragging angle around a specific point.
49. [Drop down](dropdown.md): Drop down game object below another target game object.
50. [Dynamic text](dynamictext.md): Control position, angle of each character drawn on a canvas.
51. [Ease-data](easedata.md): Easing data value of game object's data-manager.
52. [Ease-move](easemove.md): Ease-move game object.
53. [Effect properties](effect-properties.md): Attach properties to a game object or camera, to add/remove/control builtin preFX or postFX effects.
54. [Eight direction](eightdirection.md): Move game object by cursor keys, with a constant speed.
55. [Event promise](eventpromise.md): Return a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of an event.
56. [Expression parser](expression-parser.md): Parse expression string into function.
57. [Fade-out-destroy](fadeoutdestroy.md): Fade out game object then destroy it.
58. [Fade-volume](fadevolume.md): Fade-in/fade-out volume of sound.
60. [File chooser](filechooser.md): Create a transparent file chooser button.
61. [File drop zone](filedropzone.md): Create a div element for dropping file(s).
62. [Firebase/Broadcast](firebase-broadcast.md): Broadcast real-time messages, using firebase-database.
63. [Firebase/Files](firebase-files.md): Save JSON data, using firebase-firestore.
64. [Firebase/ID-alias](firebase-idalias.md): Map an unique ID to another unique ID, using firebase-firestore.
65. [Firebase/Item-table](firebase-itemtable.md): 1d/2d/3d table, using firebase-database.
66. [Firebase/Leaderboard](firebase-leaderboard.md): Descending sort scores, using firebase-firestore.
67. [Firebase/Messages](firebase-messages.md): Store messages in firebase-firestore.
68. [Firebase/Online-user-list](firebase-onlineuserlist.md): Online user list, using firebase-database.
69. [Firebase/Single-room](firebase-singleroom.md): Chat room, using firebase-database.
70. [Flash](flash.md): Flashing (set invisible then visible) game object.
71. [Flip](flip.md): Flipping game object to another face by scaling width/height.
72. [Frame manager](framemanager.md): Draw frames on canvas texture, or dynamic texture.
72. [Frame manager pool](framemanagerpool.md): Draw frames on canvas texture, or dynamic texture. It maintains a list of [frame manager](framemanager.md), to support unlimited frames.
73. [FSM](fsm.md): Finite state machine.
74. [Fuzzy](fuzzy.md): A wrap of fuzzy logic.
75. [Gashapon](gashapon.md): Pick random item from box.
76. [Geom/Hexagon](geom-hexagon.md): Hexagon geometry object.
77. [Geom/Rhombus](geom-rhombus.md): Rhombus shape and methods.
78. [Gesture/Pan](gesture-pan.md): Get pan events of a game object.
79. [Gesture/Pinch](gesture-pinch.md): Get scale factor from 2 dragging touch pointers.
80. [Gesture/Press](gesture-press.md): Get press events of a game object.
81. [Gesture/Rotate](gesture-rotate.md): Get spin angle from 2 dragging touch pointers.
82. [Gesture/Swipe](gesture-swipe.md): Get swipe events of a game object.
83. [Gesture/Tap](gesture-tap.md): Get tap/multi-taps events of a game object.
84. [Grid align](gridalign.md): Align objects on quadrilateral or hexagon grid.
85. [Grid cut image](gridcutimage.md): Grid cut image texture to frames, then create image game objects from these frames.
86. [Grid table](gridtable.md): Viewer of grid table, to manipulate game object of each visible cell.
86. [Group navigator](groupnavigator.md): Navigate between existing game objects, focus on next/previous/next-row/previous row game object.
87. [Hidden input text](hiddeninputtext.md): An invisible Input DOM element to receive character input and display on text game object.
88. [Image box](imagebox.md): Keep aspect ratio of image game object after scale-down resizing.
89. [Input text](inputtext.md): Input DOM element.
90. [Interception](interception.md): Predict the intersection position of two game objects with constant moving speed.
91. [In touching](intouching.md): Fires 'intouch' event every tick when pressing on a game object.
91. [Keys hub](keyshub.md): Key object interface mapping from multiple source of key objects.
92. [Layer manager](layermanager.md): A container of Layer game objects.
93. [Level counter](levelcounter.md): Map level value from experience value, by callback or a number array.
94. [Life time](lifetime.md): Destroy game object when time-out.
95. [Line](line.md): Draw a line with start/end/body textures.
96. [Live2d](live2d.md): Display [live2d](https://www.live2d.com/en/) model.
97. [Loading animation scene](loading-animation-scene.md): Start loading animation scene, stop this scene when loading complete.
98. [Loading-progress](loadingprogress.md): Pop-up dialog for loading-progress, then scale-down this dialog.
99. [LocalForage/Files](localforage-files.md): Save JSON data, using localforage.
100. [LocalStorage/Data](localstorage-data.md): Sync data from data manager to local-storage.
101. [LZ-string](lzstring.md): Compress string using LZ-based compression algorithm.
102. [Markdown event sheets](markedeventsheet.md): Event sheets contains main condition(s) and actions, in simple markdown format (headings, code block).
102. [Mesh](mesh.md): Render a group of textured vertices.
103. [Modal promise](modal-promise.md): Modal behavior wrapped into promise.
104. [Mouse-wheel to up/down](mousewheeltoupdown.md): Map mouse-wheeling to (up/down) cursor key state.
105. [Mouse-wheel scroller](mousewheelscroller.md): Emit scroll event when mouse-wheeling.
106. [Move to](moveto.md): Move game object towards target position with a steady speed.
107. [Nine patch](ninepatch.md): Stretchable image.
108. [Nine patch2](ninepatch2.md): Stretchable image. Has better performance than [nine-patch](ninepatch.md).
109. [Particles-along-bounds](particles-along-bounds.md): Emit particles along bounds of game object.
110. [Particles/Bitmap-zone](bitmapzone.md): Particles' emitter zone from canvas bitmap of text/canvas game object.
111. [Path follower](pathfollower.md): Set position of game object on a path.
112. [Perlin](perlin.md): Perlin2/Perlin3 noise and simplex2/simplex3 noise.
113. [Perspective/Card](perspective-card.md): A container with two perspective-images.
115. [Perspective/Image](perspective-image.md): Image with perspective rotation.
117. [Perspective/Render texture](perspective-rendertexture.md): Render texture with perspective rotation.
118. [PNG appender](png-appender.md): Append user data below tail of PNG data, or extract this user data from PNG data.
119. [polar-coordinate](polar-coordinate.md): Attach `polarOX`, `polarOY`, `polarRotation`, `polarAngle`, and `polarRadius` properties to a game object.
120. [Pop up](popup.md): Scale up game object.
121. [Quad/Image](quad-image.md): Image with 4 or 9 vertex control points.
122. [Quad/Render texture](quad-rendertexture.md): Render texture with 4 or 9 vertex control points.
123. [Quest](quest.md): Question manager.
124. [Raycaster](raycaster.md): Raycaster between obstacles.
125. [Random place](randomplace.md): Place objects randomly inside an area without overlapping.
126. [Real-time timers](realtimetimers.md): Start and counting timer by real-time timestamp.
127. [Repeat Image](repeatimage.md): Stamp image repeatly on canvas.
128. [Restorable data](restorabledata.md): Restorable data manager.
129. [RotateTo](rotateto.md): Rotate game object towards target position with a steady speed.
130. [Rotate](rotate.md): Rotate game object continually with a steady speed.
131. [Run-commands](runcommands.md): Run commands in array.
132. [Scale-down-destroy](scaledowndestroy.md): Scale down game object then destroy it.
133. [Scale outer](scaleouter.md): Scroll and zoom camera to make default game window fit the display area, in RESIZE scale mode.
134. [Script-tag loader](scripttagloader.md): Load script tag in preload stage.
135. [Scroller](scroller.md): Drag content. Slow down when dragging released, pull back when out of bounds.
136. [Sequence](sequence.md): Run sequence commands in array.
137. [Shader/Barrel](shader-barrel.md): Barrel post processing filter.
138. [Shader/Color-replace](shader-colorreplace.md): Replace color post processing filter.
139. [Shader/Cross-stitching](shader-crossstitching.md): Cross-stitching post processing filter.
140. [Shader/CRT](shader-crt.md): CRT post processing filter.
141. [Shader/Dissolve](shader-dissolve.md): Dissolve transition post processing filter.
142. [Shader/Fish-eye](shader-fisheye.md): Fish-eye post processing filter.
143. [Shader/Horri-fi](shader-horrifi.md): 6-in-1 post processing filter.
144. [Shader/Hsl-adjust](shader-hsladjust.md): Adjust color in HSL domain, post processing filter.
145. [Shader/Outline](shader-outline.md): Outline post processing filter, ported from pixi.
145. [Shader/p3-fx](shader-p3fx.md): Reintroduce unsupported fx effects from phaser3.
146. [Shader/Shockwave](shader-shockwave.md): Shockwave post processing filter.
147. [Shader/Split](shader-split.md): Split image into 4 parts.
148. [Shader/Swirl](shader-swirl.md): Swirl post processing filter.
149. [Shader/Toonify](shader-toonify.md): Draw outlines and quantize color in HSV domain, post processing filter.
150. [Shader/Warp](shader-warp.md): Warp post processing filter. 
151. [Shake-position](shake-position.md): Shake position of game object.
152. [Shape/Checkbox](shape-checkbox.md): Checkbox input with drawing checker path animation.
153. [Shape/Circular progress](shape-circularprogress.md): Circular progress bar shape.
154. [Shape/Cover](shape-cover.md): Rectangle shape covered full window, and block all touch events.
155. [Shape/Custom progress](shape-custom-progress.md): Custom progress bar shape.
156. [Shape/Custom shapes](shape-custom-shapes.md): Custom shapes on shape.
157. [Shape/Full window rectangle](shape-fullwindowrectangle.md): Rectangle shape covered full window.
158. [Shape/Line progress](shape-lineprogress.md): Horizontal line progress bar shape.
159. [Shape/Quad](shape-quad.md): Quad shape, offsets can be given on four vertices, and additional points can be added on the four sides.
160. [Shape/Round-Rectangle](shape-roundrectangle.md): Round rectangle shape.
161. [Shape/Round-Rectangle progress](shape-roundrectangleprogress.md): Horizontal or vertical round rectangle progress bar shape.
162. [Shape/Spinner](shape-spinner.md): Loading animations on shape.
163. [Shape/Toggle-switch](shape-toggleswitch.md): Toggle-switch input.
164. [Shape/Triangle](shape-triangle2.md): Trangle shape inside a rectangle bounds.
165. [Shatter/Image](shatter-image.md): Shatter image to triangle faces.
166. [Shatter/Render texture](shatter-rendertexture.md): Shatter render texture to triangle faces.
167. [Ship](ship.md): Move game object as a space ship by cursor keys.
168. [Skew/Image](skew-image.md): Skewable Image.
169. [Skew/RenderTexture](skew-rendertexture.md): Skewable render texture.
170. [Slider](slider.md): Drag thumb on a slider bar.
171. [State manager](statemanager.md): Another version of Finite state machine.
172. [Step](step.md): Interpolate points between previous position and current position with fixed step length.
173. [Tag-player](tagplayer.md): Text commands to control sprites, texts, sound effect or backgroun music.
174. [Tag-text](tagtext.md): Displays text with multi-color, font face, or font size with tags.
175. [TCRP/Player](tcrp-player.md): Run commands on time.
176. [TCRP/Recorder](tcrp-recoder.md): Store commands with time.
182. [Text/Edit](textedit.md): Create an input text object above a text object to edit string content.
183. [Text/Typing](texttyping.md): Typing text on text object.
184. [Text/Page](textpage.md): Display text page by page on text object.
185. [Text/Translation](texttranslation.md): Apply translated string ([i18next](https://www.i18next.com/)) to text object.
186. [Text/Truncator](texttruncator.md): Constraints text game object size by truncating text with padding symbol on text object.
187. [Text player](textplayer.md): Typing characters on dynamic text, waiting click or key enter, play sound effect or backgroun music.
188. [Touch event stop](toucheventstop.md): Stop touch events propagation.
189. [Touch state](touchstate.md): Store current touch input properties.
190. [Transition image](transitionimage.md): Transit texture to another one.
191. [Transition image pack](transitionimagepack.md): Transit texture to another one, with some pre-build effects.
192. [UI/Badge label](ui-badgelabel.md): A container with badges above a main item.
193. [UI/Buttons](ui-buttons.md): A container with a group of buttons.
194. [UI/Chart](ui-chart.md): Draw chart on canvas.
195. [UI/Color components](ui-colorcomponents.md): Edit color value by RGB, or HSV input fields.
196. [UI/Color input](ui-colorinput.md): Color value input field.
197. [UI/Color picker](ui-colorpicker.md): Pick color value from H and SV palettes.
198. [UI/Confirm action](ui-confirmaction.md): Create a [modal confirm dialog](ui-confirmdialog.md) temporary, invoke callback after clicking button.
199. [UI/Confirm action button](ui-confirmactionbutton.md): Create a [modal confirm dialog](ui-confirmdialog.md) temporary, invoke callback after clicking button.
200. [UI/Confrim dialog](ui-confirmdialog.md): Using json style to create confirm dialog.
201. [UI/Dialog](ui-dialog.md): A container with a title, content, buttons and backgrounds.
202. [UI/Drop down list](ui-dropdownlist.md): A label can open a drop-down list panel.
203. [UI/Exp bar](ui-expbar.md): Disply experience bar on NameValueLabel.
204. [UI/File selector button](ui-fileselectorbutton.md): A transparent file chooser button above a Label.
205. [UI/Fixwidthbuttons](ui-fixwidthbuttons.md): A container with a group of fix-width buttons.
206. [UI/Fixwidthsizer](ui-fixwidthsizer.md): Layout children game objects into lines.
207. [UI/Folder](ui-folder.md): A container with a title, foldable child, and background.
206. [UI/Fullscreen button](ui-fullscreenbutton.md): A behavior attached to a game object that toggles fullscreen mode when the object is clicked.
208. [UI/Grid buttons](ui-gridbuttons.md): A container with a group of buttons in grids.
209. [UI/Grid sizer](ui-gridsizer.md): Layout children game objects in grids.
210. [UI/Gird table](ui-gridtable.md): A container with a grid table, slider, and scroller.
211. [UI/Holy grail](ui-holygrail.md): Layout elements in [Holy grail](https://en.wikipedia.org/wiki/Holy_grail_(web_design)) style.
212. [UI/Image input label](ui-imageinputlabel.md): A container with a canvas icon, text, and background. Click icon to popup a (image) file chooser dialog, display selected image on canvas.
213. [UI/Knob](ui-knob.md): A knob button based on circular progress.
214. [UI/Label](ui-label.md): A game object container with an icon, text, and background.
215. [UI/Menu](ui-menu.md): A container with buttons and sub-menu.
216. [UI/Name-input dialog](ui-nameinputdialog.md): Enter first name and last name via a [dialog](ui-dialog.md).
217. [UI/Name-value label](ui-namevaluelabel.md): A container with name text, value text in a row, with a horizontal line progress bar, 1d an icon, background.
218. [UI/Number bar](ui-numberbar.md): A container with an icon, slider, text, and background.
219. [UI/Overlap sizer](ui-overlapsizer.md): Layout children game objects overlapped.
220. [UI/Pages](ui-pages.md): A container with pages, only current page is visible.
221. [UI/Perspective card](ui-perspectivecard.md): A container with front and back faces.
222. [UI/Scroll-able panel](ui-scrollablepanel.md): A container with a panel, slider, and scroller.
223. [UI/Scroll bar](ui-scrollbar.md): A container with slider, two buttons, and background.
224. [UI/Simple drop down list](ui-simpledropdownlist.md): Using plain object to create drop down list.
225. [UI/Simple label](ui-simplelabel.md): Using json style to create label.
226. [UI/Simple title label](ui-simpletitlelabel.md): Using json style to create title label.
227. [UI/Simple text box](ui-simpletextbox.md): Using json style to create text box.
228. [UI/Sizer](ui-sizer.md): Layout children game objects.
229. [UI/Slider](ui-slider.md): A container with a track, indicator, thumb and background.
230. [UI/Split panels](ui-splitpanels.md): A container with left(top) panel, right(bottom) panel, splitter, and background. Drag splitter to resize with left(top) panel, right(bottom) panel. 
231. [UI/Tab-pages](ui-tabpages.md): A container with tabs and pages, only current page is visible.
232. [UI/Tabs](ui-tabs.md): A container with 4 groups of buttons around a center panel.
233. [UI/Text area](ui-textarea.md): A container with a text, slider, and scroller.
234. [UI/Text area input](ui-textareainput.md): A container with a canvasInput, and slider.
235. [UI/Text box](ui-textbox.md): A container with an icon, (typing and paging) text, and background.
236. [UI/Title label](ui-titlelabel.md): A container with title, text in two rows, and an icon, background.
237. [UI/Toast](ui-toast.md): Show text message for a short while.
238. [UI/Toast queue](ui-toastqueue.md): Queue messages for a short while.
239. [UI/Trees](ui-trees.md): A container with trees and leaf-nodes.
240. [UI/Tweaker](ui-tweaker.md): Fine-tuning properties of target object.
241. [Unique item list](uniqueitemlist.md): List of unique items. Support array and set methods.
242. [Viewport-coordinate](viewport-coordinate.md): Attach `vpx`, `vpy` properties to a game object, to set position according to proportion of viewport.
243. [Virtual joystick](virtualjoystick.md): Simulate cursor keys according to touch events.
244. [Wait events](waitevents.md): Wait fired events or callbacks.
245. [Webfont-loader](webfontloader.md): Load web font by google webfont loader in preload stage.
246. [XOR](xor.md): Encrypt or decrypt string by XOR algorithm.
246. [YAML loader](yamlloader.md): Load a YAML text file, parse its contents, and store the result in a JSON cache.
247. [YML-Achievements](ymlachievements.md): Achievements in a YAML table.
248. [YML-Conditions table](ymlconditionstable.md): Check conditions to find passed tests listed in a YAML table.
249. [Youtube player](youtubeplayer.md): Play youtube video on iframe.
