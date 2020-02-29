import P5 from "p5";
import "../scss/style.scss"

const sketch = p => {
    let w, h, linewidth, bgColor;

    p.preload = () => {
        w = 600
        h = 600
        linewidth = 2
        bgColor = 50 
    }

    p.setup = () => {
        p.createCanvas(w, h);
        p.frameRate(30);
        p.strokeWeight(linewidth);
        p.smooth()
        p.pixelDensity(2.0)
        p.background(bgColor)
    }

    p.draw = () => {

    }

    p.keyPressed = () => {
        if (p.key == 'P') {
            const d = new Date().toLocaleTimeString()
            p.save(`output/canvas-${d}.png`)
        }
    }
}

new P5(sketch);
