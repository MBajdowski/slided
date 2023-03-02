getLevels = () => {
    let drawables = [];
    let funcs = [
        [new SinFn(1, height * 0.5, height * 0.5)],
        [new SinFn(0.025, height * 0.6, height * 0.4)],
        [
            new SinFn(0.005, height * 0.8, height * 0.5),
            new SinFn(0.03, height * 0.1, -height * 0.1, 0),
        ],
        [
            new SinFn(0.02, height * 0.6, height * 0.5),
            new SinFn(0.025, height * 0.10, 0, 50),
            new SinFn(0.025, height * 0.15, 0, 0),
        ],
        [
            new SinFn(0.02, height * 0.5, height * 0.4, 10),
            new SinFn(0.025, height * 0.2, 0, 40),
            new SinFn(0.025, height * 0.15, 0, 0),
            new SinFn(0.01, -height * 0.3, 0, 5),
        ],
        [new SinFn(1, height * 0.5, height * 0.5)]
    ];

    let lvls = generateLvls(funcs);
    let connectors = generateConnectors(lvls);
    let startFlag = new RaceFlag(b2VecToP5Vec(lvls[0].vertices[lvls[0].vertices.length - 1]), height / 8, height / 8, raceFlagImg);
    let finishFlag = new RaceFlag(b2VecToP5Vec(lvls[lvls.length - 1].vertices[20]), height / 8, height / 8, raceFlagImg);

    drawables.push(startFlag);
    drawables.push(finishFlag);
    drawables = drawables.concat(lvls);
    drawables = drawables.concat(connectors);

    return drawables;
}

generateLvls = (funcs) => {
    let lvls = [];
    let lvlOffset = 0.5;
    let offset = 0;
    for (let i = 0; i < funcs.length; i++) {
        let w = (i === 0 || i === funcs.length - 1) ? 0.5 : 9.5;
        let lvl = new MultiSinGround(offset * height, w * height, funcs[i]);
        lvl.init();
        lvls.push(lvl);
        offset += (w + lvlOffset);
    }

    return lvls;
}

generateConnectors = (lvls) => {
    let connectors = [];
    for (let i = 0; i < lvls.length - 1; i++) {
        let connector = new BezierGround(lvls[i], lvls[i + 1]);
        connector.init();
        connectors.push(connector);
    }

    return connectors;
}
