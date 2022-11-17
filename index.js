'use strict'

// 0: cube, 1: cone, 2: cylinder, 3: sphere, 4: torus
var shapeIndex = 4
var shapeStarts = []
var shapeVertCounts = []

/* getConeVerticies(x, y, z, r, h, s)
   x, y, z: position (center of base)
   r: radius
   h: height
   s: segment count (how many triangles to form a circle)
 */
function getConeVerticies(x, y, z, r, h, s) {
    var verticies = []
    var inc = 2 * Math.PI / s
    for (var thet = 0; thet < 2 * Math.PI; thet += inc) {
        var base1 = [x + Math.cos(thet) * r, y, z + Math.sin(thet) * r, 1]
        var base2 = [x + Math.cos(thet + inc) * r, y, z + Math.sin(thet + inc) * r, 1]
        // side triangle (oriented outward)
        verticies.push(base1)
        verticies.push([x, y + h, z, 1])
        verticies.push(base2)
        // base triangle (oriented outward)
        verticies.push(base2)
        verticies.push([x, y, z, 1])
        verticies.push(base1)
    }
    return verticies
}

/* getCylinderVerticies(x, y, z, r, h, s)
   x, y, z: position (center of base)
   r: radius
   h: height
   s: segment count (how many triangles to form a circle)
 */
function getCylinderVerticies(x, y, z, r, h, s) {
    let verticies = []

    let inc = 2 * Math.PI / s
    for (let thet = 0; thet < 2 * Math.PI; thet += inc) {
        let base1 = [x + Math.cos(thet) * r, y, z + Math.sin(thet) * r, 1]
        let base2 = [x + Math.cos(thet + inc) * r, y, z + Math.sin(thet + inc) * r, 1]
        let top1 = [x + Math.cos(thet) * r, y + h, z + Math.sin(thet) * r, 1]
        let top2 = [x + Math.cos(thet + inc) * r, y + h, z + Math.sin(thet + inc) * r, 1]

        // side triangle 1 (oriented outward)
        verticies.push(base1)
        verticies.push(top1)
        verticies.push(base2)

        // side triangle 2 (oriented outward)
        verticies.push(top1)
        verticies.push(top2)
        verticies.push(base2)

        // base triangle (oriented outward)
        verticies.push(base2)
        verticies.push([x, y, z, 1])
        verticies.push(base1)

        // top triangle
        verticies.push(top1)
        verticies.push([x, y + h, z, 1])
        verticies.push(top2)

    }

    return verticies
}


/* getCubeVerticies(x, y, z, l)
   x, y, z: position (center)
   l: side length
 */
function getCubeVerticies(x, y, z, l) {
    let verticies = []

    // top/bottom (constant y)
    // top
    verticies.push([x + -0.5 * l, y + 0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + 0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])

    // bottom
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + -0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + -0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])

    // opposite x sides
    // left
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + 0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])

    // right
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + -0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])

    // opposite z sides
    // close
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + 0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + -0.5 * l, z + 0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + 0.5 * l, 1])

    // far
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + 0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + 0.5 * l, y + -0.5 * l, z + -0.5 * l, 1])
    verticies.push([x + -0.5 * l, y + -0.5 * l, z + -0.5 * l, 1])

    return verticies
}

/* getSphereVerticies(x, y, z, r, s)
   x, y, z: position (center of base)
   r: radius
   h: height
   s: segment count (how many triangles to form a base circle)
 */
function getSphereVerticies(x, y, z, r, s) {
    let verticies = []

    let inc = 2 * Math.PI / s
    for (let phi = -Math.PI; phi < Math.PI; phi += inc) {
        let sinp = Math.sin(phi)
        let sinpi = Math.sin(phi + inc)
        let cosp = Math.cos(phi)
        let cospi = Math.cos(phi + inc)
        for (let thet = 0; thet < 2 * Math.PI; thet += inc) {
            let sint = Math.sin(thet)
            let sinti = Math.sin(thet + inc)
            let cost = Math.cos(thet)
            let costi = Math.cos(thet + inc)

            let base1 = [x + r * sinp * cost, y + r * cosp, z + r * sinp * sint, 1]
            let base2 = [x + r * sinp * costi, y + r * cosp, z + r * sinp * sinti, 1]
            let top1 = [x + r * sinpi * cost, y + r * cospi, z + r * sinpi * sint, 1]
            let top2 = [x + r * sinpi * costi, y + r * cospi, z + r * sinpi * sinti, 1]

            // side triangle 1 (oriented outward)
            verticies.push(base2)
            verticies.push(top1)
            verticies.push(base1)

            // side triangle 2 (oriented outward)
            verticies.push(base2)
            verticies.push(top2)
            verticies.push(top1)
        }
    }

    return verticies
}

/* getTorusVerticies(x, y, z, ri, ro, s)
   x, y, z: position (center of base)
   ri: inner radius
   ro: outer radius
   s: segment count (how many triangles to form a circle)
 */
function getTorusVerticies(x, y, z, ri, ro, s) {
    let verticies = []

    let inc = 2 * Math.PI / s
    for (let thet = 0; thet < 2 * Math.PI; thet += inc) {
        for (let phi = 0; phi < 2 * Math.PI; phi += inc) {
            const sint = Math.sin(thet)
            const cost = Math.cos(thet)
            const sinti = Math.sin(thet + inc)
            const costi = Math.cos(thet + inc)

            const cosp = Math.cos(phi)
            const sinp = Math.sin(phi)
            const cospi = Math.cos(phi + inc)
            const sinpi = Math.sin(phi + inc)

            const a1 = [x + (ri + ro * cosp) * cost, y + ro * sinp, z + (ri + ro * cosp) * sint, 1]
            const b1 = [x + (ri + ro * cospi) * cost, y + ro * sinpi, z + (ri + ro * cospi) * sint, 1]
            const a2 = [x + (ri + ro * cosp) * costi, y + ro * sinp, z + (ri + ro * cosp) * sinti, 1]
            const b2 = [x + (ri + ro * cospi) * costi, y + ro * sinpi, z + (ri + ro * cospi) * sinti, 1]

            // side triangle 1 (oriented outward)
            verticies.push(b2)
            verticies.push(a2)
            verticies.push(a1)

            // side triangle 2 (oriented outward)
            verticies.push(b2)
            verticies.push(a1)
            verticies.push(b1)
        }
    }

    return verticies
}

// returns array of random colors where each color is repeated counts times
function getColors(n, counts) {
    var colors = []
    // var r1 = Math.random() * .7 + .3
    // var r2 = 1 - r1
    // var g1 = Math.random() * .7 + .3
    // var g2 = 1 - g1
    // var b1 = Math.random() * .7 + .3
    // var b2 = 1 - b1
    var r1 = .3
    var r2 = 1 - r1
    var g1 = .2
    var g2 = 1 - g1
    var b1 = .5
    var b2 = 1 - b1
    for (var i = 0; i < n; i++) {
        //let col = [Math.random(), Math.random(), Math.random(), 1]
        var col = [Math.random() * r1 + r2, Math.random() * g1 + g2, Math.random() * b1 + b2, 1]
        for (var j = 0; j < 3; j++) {
            colors.push(col)
        }
    }
    return colors
}
// These variables must be global variables.
// Some callback functions may need to access them.
/** @type {WebGLRenderingContext} */
var gl = null
var canvas = null
var ctm_location
// var ctm = getIdentityMat()
var ctm = new Mat4x4([0.387835857009592, 0.7518691611785048, 0.5331754987678289, 0], [0.8221064686100782, -0.5437448967078488, 0.16876741857834754, 0], [0.4168024739453742, 0.37287297002180086, -0.8290002689626145, 0], [0, 0, 0, 1])
var vertCount = 3
function initGL(canvas) {
    gl = canvas.getContext("webgl")
    if (!gl) {
        alert("WebGL is not available...")
        return -1
    }
    // Set the clear screen color to black (R, G, B, A)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // Enable hidden surface removal
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)
    return 0
}
function init() {

    let cubeVerts = getCubeVerticies(0, 0, 0, 1)
    shapeStarts[0] = 0
    shapeVertCounts[0] = cubeVerts.length
    let coneVerts = getConeVerticies(0, -0.5, 0, 0.5, 1, 22)
    shapeStarts[1] = cubeVerts.length
    shapeVertCounts[1] = coneVerts.length
    let cylVerts = getCylinderVerticies(0, -0.5, 0, 0.5, 1, 22)
    shapeStarts[2] = shapeStarts[1] + coneVerts.length
    shapeVertCounts[2] = cylVerts.length
    let sphereVerts = getSphereVerticies(0, 0, 0, 1, 22)
    shapeStarts[3] = shapeStarts[2] + cylVerts.length
    shapeVertCounts[3] = sphereVerts.length
    let torusVerts = getTorusVerticies(0, 0, 0, 0.7, 0.3, 11)
    shapeStarts[4] = shapeStarts[3] + sphereVerts.length
    shapeVertCounts[4] = torusVerts.length

    var positions = cubeVerts.concat(coneVerts).concat(cylVerts).concat(sphereVerts).concat(torusVerts)
    var colors = getColors(positions.length / 3, 3)

    // Load and compile shader programs
    var shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader")
    if (shaderProgram == -1)
        return -1
    gl.useProgram(shaderProgram)

    // Allocate memory in a graphics card
    var buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, 4 * 4 * (positions.length + colors.length), gl.STATIC_DRAW)
    // Transfer positions and put it at the beginning of the buffer
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, to1DF32Array(positions))
    // Transfer colors and put it right after positions
    gl.bufferSubData(gl.ARRAY_BUFFER, 4 * 4 * positions.length, to1DF32Array(colors))

    // Vertex Position - locate and enable "vPosition"
    var vPosition_location = gl.getAttribLocation(shaderProgram, "vPosition")
    if (vPosition_location == -1) {
        alert("Unable to locate vPosition")
        return -1
    }
    gl.enableVertexAttribArray(vPosition_location)
    // vPosition starts at offset 0
    gl.vertexAttribPointer(vPosition_location, 4, gl.FLOAT, false, 0, 0)

    // Vertex Color - locate and enable vColor
    var vColor_location = gl.getAttribLocation(shaderProgram, "vColor")
    if (vColor_location == -1) {
        alert("Unable to locate vColor")
        return -1
    }
    gl.enableVertexAttribArray(vColor_location)
    // vColor starts at the end of positions
    gl.vertexAttribPointer(vColor_location, 4, gl.FLOAT, false, 0, 4 * 4 * positions.length)

    gl.clearColor(1, 1, 1, 1)

    // Current Transformation Matrix - locate and enable "ctm"
    ctm_location = gl.getUniformLocation(shaderProgram, "ctm")
    if (ctm_location == -1) {
        alert("Unable to locate ctm")
        return -1
    }

    return 0

}

function display() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    // Set the ctm
    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(ctm.data))
    // Draw the object
    gl.drawArrays(gl.TRIANGLES, shapeStarts[shapeIndex], shapeVertCounts[shapeIndex])
}

function idle() {
    display()
    requestAnimationFrame(idle)
    ctm = ctm.mult(rotationMat)
}

// Vec4 with components between 0 and 1
var rotStart = null
// var rotationMat = getIdentityMat()
var rotationMat = new Mat4x4([0.9996749957004568, -0.019550777409693132, 0.016360625720555688, 0], [0.018082506037949295, 0.9961716177427132, 0.08552853897532298, 0], [-0.017970140419011814, -0.0852049007190458, 0.9962013847344213, 0], [0, 0, 0, 1])


// return a vector of the point on a theoretical glass globe the vector space rotates with
function mouseToGlobeVec(clientX, clientY) {
    const mouseX = clientX - canvas.offsetLeft
    const mouseY = clientY - canvas.offsetTop
    const x = (mouseX / canvas.width) * 2 - 1
    const y = (-mouseY / canvas.height) * 2 + 1
    const d = x * x + y * y
    if (d > 1) return null
    const z = Math.sqrt(1 - d)
    // new Vec4(x, y, z, 1).printData()
    return new Vec4(x, y, z, 1)
}

// This function will be called when a mouse button is down inside the canvas.
function mouseDownCallback(event) {
    rotationMat = getIdentityMat()
}

// This function will be called when a mouse button is up inside the canvas
function mouseUpCallback(event) {
}

var lastMousePos = [0, 0]

// This function will be called when a mouse pointer moves over the canvas.
function mouseMoveCallback(event) {
    const button_pressed = event.buttons !== 0
    let rotStart = mouseToGlobeVec(lastMousePos[0], lastMousePos[1])
    let rotEnd = mouseToGlobeVec(event.clientX, event.clientY)
    
    if (button_pressed && rotStart != null && rotEnd != null) {
        const inverse = ctm.inverse()
        rotStart = inverse.mult(rotStart)
        rotEnd = inverse.mult(rotEnd)

        // console.log("start")
        // rotStart.printData()
        // console.log("end")
        // rotEnd.printData()
        // console.log("prod")
        // vec.printData()

        // const vec = rotStart.cross(rotEnd)
        // const thet = rotStart.angleTo(rotEnd)
        // ctm = ctm.mult(getRotMatAboutVec(vec, thet))
        // console.log(thet * 180 / Math.PI);

        rotationMat = getRotMatBetweenVec(rotStart, rotEnd)
    }

    lastMousePos = [event.clientX, event.clientY]
}

function keyDownCallback(event) {
    switch (event.keyCode) {
        case 67: // c
            // Display the cube
            shapeIndex = 0
            display()
            break
        case 79: // o
            // Display the cone
            shapeIndex = 1
            display()
            break
        case 76: // l
            // Display the cylinder
            shapeIndex = 2
            display()
            break
        case 83: // s
            // Display the sphere
            shapeIndex = 3
            display()
            break
        case 84: // t
            // Display the torus
            shapeIndex = 4
            display()
            break
    }
}

function mouseWheelCallback(event) {
    // const amt = event.deltaY < 0 ? -event.deltaY / 100 : 100 / event.deltaY
    // ctm = ctm.mult(getScaleMat(amt, amt, amt))
}

function main() {
    canvas = document.getElementById("gl-canvas")
    if (initGL(canvas) == -1)
        return -1
    if (init() == -1)
        return -1
    // Register callback functions
    canvas.onmousedown = mouseDownCallback
    canvas.onmouseup = mouseUpCallback
    canvas.onmousemove = mouseMoveCallback
    document.onkeydown = keyDownCallback
    canvas.onwheel = mouseWheelCallback
    idle()
}
