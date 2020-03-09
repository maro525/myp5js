'use strict'

export default class Grid {

    constructor(p, x, y, w, h) {
        this.p = p
        this.w = w
        this.h = h
        this.resolution = w * 0.02
        this.column_num = w / this.resolution
        this.row_num = h / this.resolution
        this.grid = Array(this.column_num).fill(0).map(()=>new Array(this.row_num).fill(0))

        this.default_angle = Math.PI * 0.5

        let noiseX = 0.0
        for(let i=0; i<this.column_num; i++){
            let noiseY = 0.01
            for(let j=0; j<this.row_num; j++) {
                this.grid[i][j] = (i + j / this.column_num) * this.default_angle
                // this.grid[i][j] = Math.random() * Math.PI * 2
                // const noiseval = this.p.noise(i*noiseX, j*noiseY) * Math.PI / 2 - Math.PI
                // this.grid[i][j] = noiseval
                noiseY += 0.45
            }
            noiseX += 0.2
        }
    }

    draw() {
        this.p.stroke(255)
        this.p.strokeWeight(1)
        for(let i=0; i<this.column_num; i++){
            for(let j=0; j<this.row_num; j++) {
                const x = (2*i+1)*this.resolution / 2
                const y = (2*j+1)*this.resolution / 2
                const l = this.resolution / 2
                const angle = this.grid[i][j]
                const a = Math.cos(angle) * l
                const b = Math.sin(angle+Math.PI) * l
                this.p.line(x, y, x+a, y+b)
                const size = this.resolution / 10
                this.p.circle(x+a, y+b, size)
            }
        }
    }

    drawCurves() {
        const num = 10000
        for(let i=0; i<num; i++){
            const x = Math.random() * this.w
            const y = Math.random() * this.h
            const step = Math.random() * 200
            const res = Math.random() * (this.resolution * 10)
            this.drawCurve(x, y, step, res)
        }
    }

    drawCurve(startX, startY, steps, step_len) {
        this.p.push()
        this.p.beginShape()
        if(Math.random() > 0.8)
            this.p.stroke(240)
        else
            this.p.stroke(50)
        this.p.strokeWeight(1)
        this.p.noFill()
        let x = startX
        let y = startY
        for(let i=0; i<steps; i++) {
            this.p.vertex(x, y)

            const x_idx = Math.floor(x / this.resolution)
            const y_idx = Math.floor(y / this.resolution)
            const angle = this.grid[x_idx][y_idx]
            const x_step = step_len * Math.cos(angle)
            const y_step = step_len * Math.sin(angle)

            x += x_step
            y += y_step

            if(x > this.w || x < 0)
                break
            if(y > this.h || y < 0)
                break

        }
        this.p.endShape()
        this.p.pop()
    }
}
