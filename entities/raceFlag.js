class RaceFlag extends Drawable {
    constructor(pos, width, height, img) {
        super();
        this.pos = pos;
        this.img = img;
        this.w = width;
        this.h = height;
    }

    draw = (xOffset, yOffset, drawFactor) => {
        imageMode(CENTER);
        image(this.img,
            (this.pos.x - xOffset) * drawFactor,
            (this.pos.y - this.h * 0.5 - yOffset) * drawFactor,
            this.w * drawFactor,
            this.h * drawFactor);
    }

    init = () => {
    };
    destroy = () => {
    };
}
