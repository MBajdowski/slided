let box2d;
let world;
let drawables = [];
let initialized = false;
let hero;
let worldXOffset = 0;
let worldYOffset = 0;
let drawFactor = 1;
let startPos = 0;
let cloudEmitter;

let balloonImg;
let cloudsImg;
let raceFlagImg;
let menuBg;
let endGameBg;
let startTime;
let counterInterval;
let currentTime = 0;
let topScores;
let inp;

// 0 - MENU, 1 - GAME, 2 - FINISH
let state = 0;

function preload() {
    balloonImg = loadImage('resources/balloon.png');
    cloudsImg = loadImage('resources/clouds.png');
    raceFlagImg = loadImage('resources/raceFlag.png');
    topScores = JSON.parse(localStorage.getItem("top_scores"));
    topScores = topScores ? topScores : [];
    topScores = topScores.sort((a, b) => b.time - a.time);
}

function setup() {
    createCanvas(600, 400);
    initMenu();

    Box2D(Box2D).then(result => {
        box2d = result;
        var gravity = new box2d.b2Vec2(0, -10);
        world = new box2d.b2World(gravity, true);
        new Ceiling(0, -1.5 * height, height * 200, 10);

        startPos = height / 2;
        hero = new Hero(startPos, height / 20, height / 40, balloonImg);
        hero.init();
        drawables.push(hero);
        drawables = drawables.concat(getLevels());

        cloudEmitter = new CloudEmitter(cloudsImg, 10);
        initialized = true;
    });
}

function draw() {
    if (initialized) {
        if (state === 0) {
            drawWorld();
            imageMode(CORNER);
            image(menuBg, 0, 0);

            if (keyIsPressed && keyCode === 32) {
                state = 1;
                startTime = new Date();
                counterInterval = setInterval(() => {
                    currentTime = new Date().getTime() - startTime.getTime();
                }, 10);
            }
        } else if (state === 1) {
            let timeStep = 1.0 / frameRate();
            world.Step(timeStep, 5, 5);
            drawWorld();
            drawTime();
        } else if (state === 2) {
            drawWorld();
            drawTime();
            imageMode(CORNER);
            image(endGameBg, 0, 0);
        }
    }
}

function keyPressed() {
    if (state === 2 && keyCode === 13) {
        if(inp) {
            let score = {"name": inp.value(), "time": currentTime};
            if (topScores.length < 3) {
                topScores.push(score);
            } else if (topScores[0].time > currentTime) {
                topScores[0] = score;
            }

            localStorage.setItem("top_scores", JSON.stringify(topScores));
        }
        location.reload();
    }
}

function drawWorld() {
    background(135, 206, 235);
    cloudEmitter.run();

    for (let i = drawables.length - 1; i >= 0; i--) {
        let be = drawables[i];
        if (be.isDead()) {
            be.destroy();
            drawables.splice(i, 1);
        } else {
            be.draw(worldXOffset, worldYOffset, drawFactor);
        }
    }

    if (keyIsPressed && keyCode === 32 || touches.length > 0) {
        hero.body.ApplyForceToCenter(p5VecToB2Vec(createVector(0, 800 * height / 400)));
    }

    worldXOffset = b2VecToP5Vec(hero.body.GetPosition()).x - startPos;
    worldYOffset = b2VecToP5Vec(hero.body.GetPosition()).y > height / 40 ? 0 : b2VecToP5Vec(hero.body.GetPosition()).y - height / 40;
    drawFactor = b2VecToP5Vec(hero.body.GetPosition()).y > 0 ? 1 : Math.exp(0.69 * b2VecToP5Vec(hero.body.GetPosition()).y / height);
    if (state === 1) {
        hero.update();
    }

    if (state === 1 && b2VecToP5Vec(hero.body.GetPosition()).x >= drawables[2].pos.x) {
        clearInterval(counterInterval);
        state = 2;
        initEndGame();
    }
}

function initMenu() {
    menuBg = createGraphics(width, height);
    menuBg.background(0, 80);
    menuBg.fill(255);
    menuBg.textAlign(CENTER);
    menuBg.textSize(height / 3);
    menuBg.textStyle(BOLDITALIC);
    menuBg.text('SLIDED', width / 2, height / 3);

    menuBg.textSize(height / 20);
    menuBg.textStyle(NORMAL);
    menuBg.text('Press Space (or tap the screen) to go down', width / 2, height * 0.5);
    menuBg.text('Try to slide only down the hill!', width / 2, height * 0.6);
    for (let i = 0; i < topScores.length; i++) {
        let score = topScores[i];
        menuBg.text(score.name + ": " + (score.time / 1000).toFixed(3), width / 2, height * (0.7 + 0.05 * i));
    }

}

function drawTime() {
    fill(255);
    textAlign(CENTER);
    textSize(height / 15);
    textStyle(BOLD);

    text((currentTime / 1000).toFixed(3), width / 2, height / 15);
}

function initEndGame() {
    endGameBg = createGraphics(width, height);
    endGameBg.background(0, 80);
    endGameBg.fill(255);
    endGameBg.textAlign(CENTER);
    endGameBg.textSize(height / 3);
    endGameBg.textStyle(BOLDITALIC);
    endGameBg.text('The End', width / 2, height / 3);

    endGameBg.textSize(height / 20);
    endGameBg.textStyle(NORMAL);

    if (topScores.length < 3 || currentTime < topScores[0].time) {
        endGameBg.text('Wow! You have one of the best scores so far!', width / 2, height * 0.5);
        endGameBg.text('Add your name to list:', width / 2, height * 0.6);
        inp = createInput('');
        inp.position(width / 2 - 50, height * 0.70);
        inp.size(100);
    } else {
        endGameBg.text('Press Enter to play again', width / 2, height * 0.5);
    }
}



