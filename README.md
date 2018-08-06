# Applications
#### TL;DR: Please read this README.md for an overview/description of each app in this repo

This repo holds a collection of applications I have made in JavaScript. Most -- if not all -- of the apps I have made in JavaScript use p5.js library. 

### JAVASCRIPT

1. [Clock](https://github.com/joos2010kj/Applications/tree/master/Applications/JavsScript/Clock)
  - Analog Clock
  
    [SCREENSHOT](https://github.com/joos2010kj/Applications/blob/master/Applications/JavsScript/Clock/Screen%20Shot/SS.png)
    
2. [Piano](https://github.com/joos2010kj/Applications/tree/master/Applications/JavsScript/Piano)
  - Virtual piano in which you can set the range of piano notes and play the corresponding note.
    Note that each note is denoted by a number, which ranges from 0 to 88. Standard C's note number is 60, and the piano is by default set to have the standard range, playing from 60 to 72 (C to B#).

    For convenience, you can play the standard notes with KEYS, too.
    
    *If Key is...(1), then it plays...(2) (i.e. Z...C means, if you press the key 'Z', then it plays the C-note)*

    [LOWER TONE]

    Z...C   X...D  C...E  V...F   B...G   N...A  M...B

    S...C#  D...D#  G...F#  H...G#  J...A#

    [UPPER TONE]

    Q...C   W...D   E...E   R...F   T...G   Y...A   U...B

    2...C#  3...D#   5...F#  6...G#   7...A#
  
    [SCREENSHOT 1](https://github.com/joos2010kj/Applications/blob/master/Applications/JavsScript/Piano/Screen%20Shot/SS1.png)
    
    [SCREENSHOT 2](https://github.com/joos2010kj/Applications/blob/master/Applications/JavsScript/Piano/Screen%20Shot/SS2.png)
    
3. [Terrain Generator](https://github.com/joos2010kj/Applications/tree/master/Applications/JavsScript/Terrain%20Generator)
  - Terrain Generator generates a terrain based on the pitch-level of the input noise.  For example, if you yell while this generator is running, it will create a steep valley, while tapping noise will create a small valley.  There will be a bold white dot at the climax of every valley, which can be used for making a flat terrain by connecting all the dots in sequence.  
  
    [SCREENSHOT](https://github.com/joos2010kj/Applications/blob/master/Applications/JavsScript/Terrain%20Generator/Screen%20Shot/SS.png)
    
4. [Painter](https://github.com/joos2010kj/Applications/tree/master/Applications/JavsScript/Painter)
  - Painter allows a client to draw objects with rectangles.
    - HOW TO DRAW: 
    
      -Press and hold with your mouse on any spot in the black background to set the starting point (you will see a dot when clicked to mark the starting point) and keep holding until you want to create a rectangle that stretches up to that point from the marked starting point.

      -If you want to change the color of rectangles, use the three circular RGB-toggles in the top and move it around horizontally until you find the color of your choice. The changed color will only apply to the rectangles created from there on, not the ones made in the past.

      -If you would like to undo your work, press SPACEBAR.
  
    [SCREENSHOT](https://github.com/joos2010kj/Applications/blob/master/Applications/JavsScript/Painter/Screen%20Shot/SS.png)
