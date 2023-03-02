class Drawable {
    constructor() {
    }

    init = () => {
        if (this.body === undefined) {
            this.body = this.createBody();
        }
    }

    createBody = () => {
    }

    draw = () => {
    }

    destroy = () => {
        world.DestroyBody(this.body);
    }

    isDead = () => {
        return false;
    }

}
