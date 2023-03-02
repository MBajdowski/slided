class CloudEmitter {
    constructor(sprite, noOfClouds) {
        this.clouds = [];

        this.initClouds(sprite, noOfClouds);
    }

    initClouds = (sprite, noOfClouds) => {
        for (let i = 0; i < noOfClouds; i++) {
            this.clouds.push(new Cloud(random(0, width), random(0, height / 2), sprite));
        }
    }

    run = () => {
        for (let i = 0; i < this.clouds.length; i++) {
            let cloud = this.clouds[i];
            cloud.update();
            if (cloud.isDead()) {
                cloud.pos.x = width + random(40, 120);
                cloud.pos.y = random(0, height / 2);
            }
            cloud.draw();
        }
    }
}

class Cloud {
    constructor(x, y, image) {
        this.pos = createVector(x, y);
        this.w = random([0, 1, 2]);
        this.h = random([0, 1, 2, 3]);
        this.image = image;
    }

    draw = () => {
        let cloudWidth = this.image.width / 3;
        let cloudHeight = this.image.height / 4;

        push();
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        image(this.image, 0, 0, height / 10, height / 13,
            cloudWidth * this.w, cloudHeight * this.h, cloudWidth, cloudHeight);
        pop();
    }

    update = () => {
        this.pos.x -= 1;
    }

    isDead = () => {
        return this.pos.x < -40;
    }
}
