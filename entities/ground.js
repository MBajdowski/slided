class Ground extends Drawable {
    constructor(widthStep, offset, width) {
        super();
        this.vertices = [];
        this.widthStep = max(widthStep, 5);
        this.offset = offset;
        this.width = width;
    }

    init = () => {
        this.vertices = this.createVertices();
        this.body = this.createBody();
    }

    createVertices = () => {
        let verts = [];
        let noOfVerts = this.width / this.widthStep + 1;
        for (let i = 0; i < noOfVerts; i++) {
            let x = i * this.widthStep + this.offset;
            let y = height / 2;
            verts.push(p5VecToB2Vec(createVector(x, y)));
        }

        return verts;
    }

    createBody = () => {
        let bd = new box2d.b2BodyDef();
        bd.type = this.getBodyType();
        let body = world.CreateBody(bd);
        let fd = this.getFixtureDef();

        createChainShape(body, fd, this.vertices);
        body.p5Entity = this;

        return body;
    }

    getBodyType = () => {
        return box2d.b2_staticBody;
    }

    getFixtureDef = () => {
        let fd = new box2d.b2FixtureDef();
        fd.density = 1;
        fd.friction = 1;
        fd.restitution = 0;

        return fd;
    }

    draw = (worldXOffset, worldYOffset, drawFactor) => {
        stroke(0, 110, 51);
        fill(106, 196, 106);
        beginShape();
        vertex((b2VecToP5Vec(this.vertices[0]).x - worldXOffset) * drawFactor, height);
        for (let i = 0; i < this.vertices.length; i++) {
            let p5Vec = b2VecToP5Vec(this.vertices[i]);
            vertex((p5Vec.x - worldXOffset) * drawFactor, (p5Vec.y - worldYOffset) * drawFactor);
        }
        vertex((b2VecToP5Vec(this.vertices[this.vertices.length - 1]).x - worldXOffset) * drawFactor, height);
        endShape(CLOSE);
    }

    isDead = () => {
        return false;
    }

    destroy = () => {
        world.DestroyBody(this.body);
    }
}

class BezierGround extends Ground {
    constructor(g1, g2) {
        super(height / 80, 0, 0);
        this.p1 = b2VecToP5Vec(g1.vertices[g1.vertices.length - 1]);
        this.h1 = b2VecToP5Vec(g1.vertices[g1.vertices.length - 2]);
        this.h2 = b2VecToP5Vec(g2.vertices[1]);
        this.p2 = b2VecToP5Vec(g2.vertices[0]);
    }

    createVertices = () => {
        let verts = [];
        let noOfVerts = ceil(p5.Vector.sub(this.p2, this.p1).mag() / this.widthStep);
        let handleValue = p5.Vector.sub(this.p2, this.p1).mag() / 2;
        let p1Delta = this.p1.y - this.h1.y;
        let p2Delta = this.p2.y - this.h2.y;
        let h1Offset = p1Delta === 0 ? 0 : (p1Delta > 0 ? handleValue : -handleValue);
        let h2Offset = p2Delta === 0 ? 0 : (p2Delta > 0 ? handleValue : -handleValue);
        for (let i = 0; i <= noOfVerts; i++) {
            let t = i / noOfVerts;
            let x = bezierPoint(this.p1.x, this.h1.x + handleValue, this.h2.x - handleValue, this.p2.x, t);
            let y = bezierPoint(this.p1.y, this.h1.y + h1Offset, this.h2.y + h2Offset, this.p2.y, t);

            verts.push(p5VecToB2Vec(createVector(x, y)));
        }

        return verts;
    }
}

class MultiSinGround extends Ground {
    constructor(offset, width, sinFns) {
        super(height / 50, offset, width);
        this.sinFns = sinFns;
    }

    createVertices = () => {
        let verts = [];
        let noOfVerts = ceil(this.width / this.widthStep);
        for (let i = 0; i < noOfVerts; i++) {
            let x = i * this.widthStep + this.offset;
            let y = 0;
            for (let j = 0; j < this.sinFns.length; j++) {
                const sinFn = this.sinFns[j];
                y += sinFn.getValue(x);
            }
            verts.push(p5VecToB2Vec(createVector(x, y)));
        }

        return verts;
    }
}

class SinFn {
    constructor(step, maxAmp, minAmp, offset = 0) {
        this.step = 400 / height * step;
        this.maxAmp = maxAmp;
        this.minAmp = minAmp;
        this.offset = offset;
    }

    getValue = (x) => {
        return map(sin((x + this.offset) * this.step), -1, 1, this.minAmp, this.maxAmp);
    }
}
