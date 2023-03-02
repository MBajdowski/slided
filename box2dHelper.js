let scaleFactor = 20;

let p5VecToB2Vec = (p5Vec) => {
    return new box2d.b2Vec2(
        p5Vec.x / scaleFactor,
        -p5Vec.y / scaleFactor
    );
}

let b2VecToP5Vec = (b2Vec) => {
    return createVector(
        b2Vec.x * scaleFactor,
        -b2Vec.y * scaleFactor
    );
}

let createChainShape = (body, fd, vertices) => {
    let shape = new box2d.b2EdgeShape();
    fd.set_shape(shape);

    for (let i = 0; i < vertices.length - 1; i++) {
        shape.Set(vertices[i], vertices[i + 1]);
        body.CreateFixture(fd);
    }
}
