import P5 from "p5";
import "../scss/style.scss"
const { gnome_sort } = require('./sort')

const sketch = p => {
    var w, h, linewidth, bgColor;
    var element_count = 10 
    var colors = []
    var connect_everything
    var colors = [[250, 20, 20], [0, 255, 255], [0, 0, 0]]
    var circle_size = 8    

    p.preload = () => {
        w = 1550
        h = 950
        linewidth = 3
        bgColor = 50 

        connect_everything = false 
    }

    p.setup = () => {
        p.createCanvas(w, h);
        p.frameRate(30);
        p.strokeWeight(linewidth);
        p.smooth()
        p.pixelDensity(2.0)
        p.background(bgColor)

        let v = []
        for(let i=0; i<element_count; i++)
            v.push(i)

        p.shuffle(v)
        const stages = gnome_sort(v)
        p.visualize(stages)
    }

    p.draw = () => {

    }

    p.shuffle = (l) => l.sort(() => Math.random() - 0.5)

    p.visualize = (arr) => {
        for(let i=0; i<element_count; i++)
            colors.push([i*255/element_count, 20, 60])        

        const len = arr.length

        if(connect_everything == true){
            arr.unshift(arr[0])
            arr.push(arr[len-1])
        }

        const column_sep = w / (len + 1)
        const row_sep = h / (element_count + 1)

        for(let i=0; i<element_count; i++){
            const c = p.get_gradient_point(colors[0], colors[1], i, element_count)
            p.stroke(...c)
            p.beginShape()
            for(let a=0; a<len; a++){
                if(arr[a].indexOf(i) == -1) continue;

                const x  = column_sep + a * column_sep
                const y = row_sep + arr[a].indexOf(i) * row_sep
                p.curveVertex(x, y)
                p.fill(...c)
                p.circle(x, y, circle_size)
            }
            p.noFill()
            p.endShape()
        }
    }

    p.get_gradient_point = (color_one, color_two, step, max_steps) => {
        const s = step / max_steps
        const r =  (color_two[0] - color_one[0]) * s + color_one[0]
        if(r < 0) r += 255.0

        const g = (color_two[1] - color_one[1]) * s + color_one[1]
        if(g < 0) g  += 255.0

        const b = (color_two[2] - color_one[2]) * s + color_one[2]
        if(b < 0) b += 255.0

        return [r, g, b]
    }

    p.keyPressed = () => {
        if (p.key == 'P') {
            const d = new Date().toLocaleTimeString()
            p.save(`output/canvas-${d}.png`)
        }
    }
}

new P5(sketch);
