class Ceiling {
    constructor(x, y, w, h) {
        this.initialPos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.body = this.createBody();
    }

    createBody = () => {
        let bd = new box2d.b2BodyDef();
        bd.type = box2d.b2_staticBody;
        bd.position = p5VecToB2Vec(this.initialPos);
        let body = world.CreateBody(bd);

        body.CreateFixture(this.getFixtureDef());

        return body;
    }

    getFixtureDef = () => {
        let fd = new box2d.b2FixtureDef();
        fd.shape = this.getShape();
        fd.density = 0.1;
        fd.friction = 0.3;
        fd.restitution = 0.2;

        return fd;
    }

    getShape = () => {
        let shape = new box2d.b2PolygonShape();
        shape.SetAsBox(this.w / 2 / scaleFactor, this.h / 2 / scaleFactor);

        return shape;
    }
}
