class Hero extends Drawable {
    constructor(x, y, r, img) {
        super();
        this.initialPos = createVector(x, y);
        this.r = r;
        this.img = img;
    }

    createBody = () => {
        let bd = new box2d.b2BodyDef();
        bd.type = box2d.b2_dynamicBody;
        bd.position = p5VecToB2Vec(this.initialPos);
        bd.angle = 0;
        let body = world.CreateBody(bd);

        body.CreateFixture(this.getFixtureDef());
        body.p5Entity = this;

        return body;
    }

    getFixtureDef = () => {
        let fd = new box2d.b2FixtureDef();
        fd.shape = this.getShape();
        fd.density = 1;
        fd.friction = 1;
        fd.restitution = 0;

        return fd;
    }

    getShape = () => {
        let shape = new box2d.b2CircleShape();
        shape.m_radius = this.r / scaleFactor;

        return shape;
    }

    draw = (worldXOffset, worldYOffset, drawFactor) => {
        let pos = b2VecToP5Vec(this.body.GetPosition());
        let vel = b2VecToP5Vec(this.body.GetLinearVelocity());
        push();
        imageMode(CENTER);
        translate(pos.x - worldXOffset, pos.y - worldYOffset);
        rotate(vel.heading());
        image(this.img, 0, 0, this.r * 3 * drawFactor, this.r * 3 * drawFactor);
        pop();
    }

    update = () => {
        let vel = b2VecToP5Vec(this.body.GetLinearVelocity());
        if (vel.x < 20 * height / 400) {
            this.body.ApplyForceToCenter(p5VecToB2Vec(createVector(3000 * height / 400, 0)))
        }
    }
}
