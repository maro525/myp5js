import p5 from 'p5';

const sketch = p => {
  let canvas;
  let diameter = 16;
  let t = 0.0;
  let dt = 0.1;
  let amplitude = 100.0;
  let frequency = 0.3;

  p.preload = () => {
  };

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    background(80);
    for(let i = 0; i < p.windowWidth/diameter+10; i++)
    {
      ellipse(i*diamter, amplitude*sin(frequency*(t+i)))+p.windowHeight/2, diamter, diamter);
    }
    t += dt;
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
  };

};

new p5(sketch);


