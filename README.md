# SLIDED
Simple arcade game using p5.js and Box2d.js

## About game
It's a simple arcade game in which player tries to have best time flying over different terrains.
Player controls gravitational force applied to the ship and tries to always hit the downhill (which gives a speed boost).
Hitting the uphill reduces speed to minimum.

Levels are generated using set of sin functions with different amplitude and frequency.

The game consists of number of those levels connected to each other using bezier curves.

## Running the game
To run this game you need some simple web server. I can recommend [Simple Web Server](https://simplewebserver.org/), but any server will do :) 

## Librares
1. [p5.js](https://p5js.org/) - used here as graphic engine. Not the best choice for game making, but it does its job here :) 
2. [box2D.js](https://github.com/kripken/box2d.js/) - Box2D physics engine ported to js.

## Graphics
I am using some free graphics in this game:
1. Checkered flags - [Image by macrovector on Freepik](https://www.freepik.com/free-vector/checkered-flags-pictograms-collection_2868684.htm#query=checkered-flags-pictograms-collection&position=1&from_view=search&track=sph)
2. Balloon - [Image by brgfx on Freepik](https://www.freepik.com/free-vector/different-kind-transportations_5912873.htm#query=different-kind-transportations&position=0&from_view=search&track=sph)
3. Clouds - [Image by rawpixel.com on Freepik](https://www.freepik.com/free-vector/cloud-sticker-clipart-vector-set-flat-design_18705168.htm)

## Screenshots
![Screenshot 1](https://github.com/MBajdowski/slided/blob/main/resources/screenshot1.png)
![Screenshot 2](https://github.com/MBajdowski/slided/blob/main/resources/screenshot2.png)
