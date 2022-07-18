# TIDITO
Tidito is a processes visualization tool. It allows you to present and plan processes by using timing diagrams.

Tidito is an online tool, no installation is required. It's available at https://tidito.github.io/. It was created using JavaScript and [p5](https://p5js.org/)

You are able to:
* Create, edit and delete timing diagrams.
* Export your work to a \*.json file to back it up or share it.

![image](https://user-images.githubusercontent.com/47335779/178152334-03bf105a-120d-4a5f-bc96-3939898ff4ba.png)

## Keyboard shortcuts
* [w] - increase length of selected high states by 1
* [s] - decrease length of selected high states by 1
* [a] - move selected high states to the left by 1
* [d] - move selected high states to the right by 1
* [shift] + [w/s/a/d] - repeat the action 5 times
* [x ] - delete selected high states
* [ctrl] + click - multi selection
* [shift] + ? - show shortcuts list

## To do
* Display the length of currently drawn high state
* Add editable label to every high state
* Add right sidebar with editable parameters for selected high state
  * Starting point
  * Length
  * Label
* Add a guideline - vertical line that constantly follow mouse cursor and snaps to ticks
* Add on/off toggle for the guideline
* Add editable text area for project notes with markdown support
* Add unit multiplier. One tick can be 1, 0.1, 0.01 etc.
* Add rising and falling ramps
