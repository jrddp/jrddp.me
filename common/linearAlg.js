'use strict'

// Vector of 4 elements
// all operations do NOT mutate original data
class Vec4 {
    constructor(x, y, z, w) {
        this.data = [x, y, z, w]
    }

    static fromPoints(source, dest) {
        return new Vec4(dest[0] - source[0], dest[1] - source[1], dest[2] - source[2], 1)
    }

    printData() {
        let str = "["
        for (let i = 0; i < 4; i++) {
            str += " " + this.data[i].toFixed(4)
        }
        str += " ]"

        console.log(str)
    }

    copy() {
        return new Vec4(...this.data)
    }

    mult(scalar) {
        let newData = []
        for (let i = 0; i < 4; i++) {
            newData[i] = this.data[i] * scalar
        }
        return new Vec4(...newData)
    }

    add(vecB) {
        let newData = []
        for (let i = 0; i < 4; i++) {
            newData[i] = this.data[i] + vecB.data[i]
        }
        return new Vec4(...newData)
    }

    sub(vecB) {
        let newData = []
        for (let i = 0; i < 4; i++) {
            newData[i] = this.data[i] - vecB.data[i]
        }
        return new Vec4(...newData)
    }

    mag() {
        let sumSqrs = 0
        for (let i = 0; i < 4; i++) {
            sumSqrs += this.data[i] * this.data[i]

        }
        return Math.sqrt(sumSqrs)
    }

    norm() {
        let newData = []
        let mag = this.mag()
        for (let i = 0; i < 4; i++) {
            newData[i] = this.data[i] / mag
        }
        return new Vec4(...newData)
    }

    dot(vecB) {
        let sum = 0
        for (let i = 0; i < 4; i++) {
            sum += this.data[i] * vecB.data[i]
        }
        return sum
    }

    angleTo(vecB) {
        let dot = this.dot(vecB)
        return Math.acos(dot / (this.mag() * vecB.mag()))
    }

    cross(vecB) {
        return new Vec4(
            this.data[1] * vecB.data[2] - this.data[2] * vecB.data[1],
            this.data[2] * vecB.data[0] - this.data[0] * vecB.data[2],
            this.data[0] * vecB.data[1] - this.data[1] * vecB.data[0],
            0
        )
    }
}

// 4 by 4 matrix
// all operations do NOT mutate the original data
class Mat4x4 {

    // column-major arrays
    constructor(col1, col2, col3, col4) {
        this.data = [col1, col2, col3, col4]
    }

    printData() {
        let str = ""
        // rows
        for (let i = 0; i < 4; i++) {
            str += "["
            // columns
            for (let j = 0; j < 4; j++) {
                str += " " + this.data[j][i].toFixed(4)
            }
            str += " ]"
            if (i != 3) str += "\n"
        }
        console.log(str)
    }

    copy() {
        // arr.slice(0) is a fast way of copying an array
        return new Mat4x4(this.data[0].slice(0), this.data[1].slice(0), this.data[2].slice(0), this.data[3].slice(0))
    }

    // accepts both Mat4x4 and scalars
    mult(other) {
        // multiply scalar
        let newData = []
        if (!isNaN(other)) {
            for (let i = 0; i < 4; i++) {
                newData[i] = []
                for (let j = 0; j < 4; j++) {
                    newData[i][j] = this.data[i][j] * other
                }
            }
            return new Mat4x4(...newData)
        } else if (other instanceof Vec4) {
            // matrix row loop
            for (let i = 0; i < 4; i++) {
                newData[i] = 0
                // matrix col/vector row loop
                for (let j = 0; j < 4; j++) {
                    newData[i] += this.data[j][i] * other.data[j]
                }
            }
            return new Vec4(...newData)
        } else if (other instanceof Mat4x4) {
            // result col
            for (let i = 0; i < 4; i++) {
                newData[i] = []
                // result row
                for (let j = 0; j < 4; j++) {
                    newData[i][j] = 0
                    // operand row/col
                    for (let k = 0; k < 4; k++) {
                        // sum products of this row and other column
                        newData[i][j] += this.data[k][j] * other.data[i][k]
                    }
                }
            }
            return new Mat4x4(...newData)
        } else {
            throw new Error("Mat4x4.mult supports only scalar, Vec4, and Mat4x4 arguments")
        }
    }

    add(matB) {
        let newData = []
        for (let i = 0; i < 4; i++) {
            newData[i] = []
            for (let j = 0; j < 4; j++) {
                newData[i][j] = this.data[i][j] + matB.data[i][j]
            }
        }
        return new Mat4x4(...newData)
    }

    sub(matB) {
        let newData = []
        for (let i = 0; i < 4; i++) {
            newData[i] = []
            for (let j = 0; j < 4; j++) {
                newData[i][j] = this.data[i][j] - matB.data[i][j]
            }
        }
        return new Mat4x4(...newData)
    }

    transpose() {
        let newMat = this.copy()
        for (let i = 1; i < 4; i++) {
            for (let j = 0; i - j >= 0; j++) {
                // swap diagonally opposite elements
                let temp = newMat.data[i][j]
                newMat.data[i][j] = newMat.data[j][i]
                newMat.data[j][i] = temp
            }
        }
        return newMat
    }

    inverse() {
        // calculate matrix minor
        let minorArr = []
        for (let i = 0; i < 4; i++) {
            minorArr[i] = []
            for (let j = 0; j < 4; j++) {
                // create 3x3 minor matrix
                let min3x3 = []
                let c = 0
                let r = 0
                for (let k = 0; k < 4; k++) {
                    if (k == i) continue
                    min3x3[c] = []
                    for (let l = 0; l < 4; l++) {
                        if (l == j) continue
                        min3x3[c][r++] = this.data[k][l]
                    }
                    c++
                    r = 0
                }
                // set minorArr to determinant of min3x3
                minorArr[i][j] = min3x3[0][0] * min3x3[1][1] * min3x3[2][2]
                    + min3x3[1][0] * min3x3[2][1] * min3x3[0][2]
                    + min3x3[2][0] * min3x3[0][1] * min3x3[1][2]
                    - min3x3[0][2] * min3x3[1][1] * min3x3[2][0]
                    - min3x3[1][2] * min3x3[2][1] * min3x3[0][0]
                    - min3x3[2][2] * min3x3[0][1] * min3x3[1][0]
            }

        }

        // create matrix of cofactor
        let cofact = []
        for (let i = 0; i < 4; i++) {
            cofact[i] = []
            // multiply each minorArr element by their place in a checkerboard of positives/negatives
            for (let j = 0; j < 4; j++) {
                if ((i + j) % 2 === 0) cofact[i][j] = minorArr[i][j]
                else cofact[i][j] = minorArr[i][j] * -1
            }
        }

        // calculate determinant of the original matrix
        let det = this.data[0][0] * minorArr[0][0]
            - this.data[0][1] * minorArr[0][1]
            + this.data[0][2] * minorArr[0][2]
            - this.data[0][3] * minorArr[0][3]

        if (det === 0) throw new Error("The given matrix does not have a valid inverse.")

        // transpose cofactor of matrix of minor
        let res = new Mat4x4(...cofact).transpose()

        // result is the cofactor of matrix of minor divided by the determinant of the original
        return res.mult(1 / det)
    }

    to1DF32Array() {
        return to1DF32Array(this.data)
    }

}

/* to1DF32Array(a2DArray)
 *
 * This function turns an array of 4-element arrays a2DArray into a packed
 * 1-dimensional array of 32-bit floating-point numbers.
 */

function to1DF32Array(a2DArray) {
    var size = a2DArray.length

    if (size == 0) {
        console.log("[mylib/to1DF32Array - DEBUG]: size is 0")
        return new Float32Array([])
    }

    var result = []
    var index = 0

    for (var i = 0; i < size; i++) {
        var anElement = a2DArray[i]

        if (anElement.length != 4)
            console.log("[mylib/to1DF32Array - ERROR]: Not a 4-element vector")

        result[index] = anElement[0]
        result[index + 1] = anElement[1]
        result[index + 2] = anElement[2]
        result[index + 3] = anElement[3]
        index += 4
    }

    // column-major
    return new Float32Array(result)
}

function getIdentityMat() {
    return new Mat4x4([1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1])
}

function getTransformMat(ax, ay, az) {
    return new Mat4x4([1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [ax, ay, az, 1])
}

function getScaleMat(bx, by, bz) {
    return new Mat4x4([bx, 0, 0, 0], [0, by, 0, 0], [0, 0, bz, 0], [0, 0, 0, 1])
}

function getRotMatAboutX(theta) {
    let cost = Math.cos(theta)
    let sint = Math.sin(theta)
    return new Mat4x4([1, 0, 0, 0], [0, cost, sint, 0], [0, -sint, cost, 0], [0, 0, 0, 1])
}

function getRotMatAboutY(theta) {
    let cost = Math.cos(theta)
    let sint = Math.sin(theta)
    return new Mat4x4([cost, 0, -sint, 0], [0, 1, 0, 0], [sint, 0, cost, 0], [0, 0, 0, 1])
}

function getRotMatAboutZ(theta) {
    let cost = Math.cos(theta)
    let sint = Math.sin(theta)
    return new Mat4x4([cost, sint, 0, 0], [-sint, cost, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1])
}

function getRotMatAboutVec(vec, theta) {
    vec = vec.norm()
    let ax = vec.data[0]
    let ay = vec.data[1]
    let az = vec.data[2]
    let d = Math.sqrt(ay * ay + az * az)

    let sintx, costx
    if (ay === 0) {
        sintx = 0
        costx = 1
    } else {
        sintx = ay / d
        costx = az === 0 ? 0 : az / d
    }
    let rx = new Mat4x4([1, 0, 0, 0], [0, costx, sintx, 0], [0, -sintx, costx, 0], [0, 0, 0, 1])
    let rxi = new Mat4x4([1, 0, 0, 0], [0, costx, -sintx, 0], [0, sintx, costx, 0], [0, 0, 0, 1])
    // let rxi = rx.inverse()
    // console.log(rx.mult(rxi))

    let sinty = ax
    let costy = d
    let ry = new Mat4x4([costy, 0, -sinty, 0], [0, 1, 0, 0], [sinty, 0, costy, 0], [0, 0, 0, 1])
    let ryi = new Mat4x4([costy, 0, sinty, 0], [0, 1, 0, 0], [-sinty, 0, costy, 0], [0, 0, 0, 1])
    // let ryi = ry.inverse()

    let rz = getRotMatAboutZ(theta)

    // console.log("rx dynamic");
    // rx.printData()
    // console.log("ry dynamic");
    // ry.printData()
    // console.log("rz dynamic");
    // rz.printData()

    return rxi.mult(ry).mult(rz).mult(ryi).mult(rx)
}

// rotation matrix from a to b about the origin
function getRotMatBetweenVec(a, b) {
    const u = a.cross(b)

    const ux = u.data[0]
    const uy = u.data[1]
    const uz = u.data[2]

    let maga = 0
    let magb = 0
    let magu = 0

    // calculate manually to avoid using the w value
    for (let i = 0; i < 3; i++) {
        maga += a.data[i] * a.data[i]
        magb += b.data[i] * b.data[i]
        magu += u.data[i] * u.data[i]
    }

    if (magu === 0) return getIdentityMat()

    maga = Math.sqrt(maga)
    magb = Math.sqrt(magb)
    magu = Math.sqrt(magu)
    
    const magab = maga * magb

    const d = Math.sqrt(uy * uy + uz * uz)

    const sintx = uy / d
    const costx = uz / d

    const sinty = ux / magu
    const costy = d / magu

    // done manually to ignore w
    let adotb = 0
    for (let i = 0; i < 3; i++) {
        adotb += a.data[i] * b.data[i]
    }

    const costz = adotb / magab
    // const sintz = magu / magab
    const sintz = Math.sin(Math.acos(costz))

    const rx = new Mat4x4([1, 0, 0, 0], [0, costx, sintx, 0], [0, -sintx, costx, 0], [0, 0, 0, 1])
    const rxi = new Mat4x4([1, 0, 0, 0], [0, costx, -sintx, 0], [0, sintx, costx, 0], [0, 0, 0, 1])
    const ry = new Mat4x4([costy, 0, -sinty, 0], [0, 1, 0, 0], [sinty, 0, costy, 0], [0, 0, 0, 1])
    const ryi = new Mat4x4([costy, 0, sinty, 0], [0, 1, 0, 0], [-sinty, 0, costy, 0], [0, 0, 0, 1])
    const rz = new Mat4x4([costz, sintz, 0, 0], [-sintz, costz, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1])

    // console.log("rotate about:");
    // u.printData()
    // console.log("rx vec method");
    // rx.printData()
    // console.log("ry vec method");
    // ry.printData()
    // console.log("rz vec method");
    // rz.printData()
    // console.log("-------");

    return rxi.mult(ry).mult(rz).mult(ryi).mult(rx)
}

// const a = new Vec4(-0.9791, 0.0664, 0.1924, 1)
// const b = new Vec4(-0.8674, 0.4657, 0.1756, 1)
// const a = new Vec4(-1, 0, 0, 1)
// const b = new Vec4(0, 0, 1, 1)
// console.log("between vecs");
// getRotMatBetweenVec(a, b).printData()
// console.log("about Z dynamic");
// getRotMatAboutVec(a.cross(b), Math.PI/2).printData()
// console.log("about Z native");
// getRotMatAboutY(Math.PI/2).printData()