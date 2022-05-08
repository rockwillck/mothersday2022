var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var playing = false
function clicked() {
    if (!playing) {
        playing = true
        var audio = new Audio('sunshine.mp3');
        audio.play();
        setInterval(() => {
            audio.pause()
            audio.currentTime = 0
            audio.play();
        }, 102000)
    }

    document.getElementById("launch").hidden = true
}

function getCursorPosition(event) {
    if (playing) {
        flowers.push([[event.clientX, event.clientY], 1, Math.random()*40, 1])
    }
}
document.addEventListener('mousedown', function(e) {
    getCursorPosition(e)
})

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let animationId
var frame = 0
var rings = []
var flowers = []
function animate() {
    requestAnimationFrame(animate)

    if (playing) {
        frame += 1
        ctx.fillStyle = `rgb(255, 125, 125)`
        ctx.beginPath()
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.closePath()
        ctx.fill()

        rings.forEach((ring, index) => {
            ctx.fillStyle = `rgba(255, 0, 0, ${((canvas.width < canvas.height ? canvas.width : canvas.height) - ring[1])/(canvas.width < canvas.height ? canvas.width : canvas.height) - 0.4})`
            ctx.beginPath()
            ctx.arc(ring[0][0], ring[0][1], ring[1], 0, 2*Math.PI)
            ctx.closePath()
            ctx.fill()
            ctx.fillStyle = `rgb(255, 125, 125)`
            ctx.beginPath()
            ctx.arc(ring[0][0], ring[0][1], ring[1] > 10 ? ring[1] - 10 : 0, 0, 2*Math.PI)
            ctx.closePath()
            ctx.fill()
            if (((canvas.width < canvas.height ? canvas.width : canvas.height) - ring[1])/(canvas.width < canvas.height ? canvas.width : canvas.height) - 0.4 > 0) {
                ring[1] *= 1.01
            } else {
                rings.splice(index, 1)
            }
        })

        ctx.fillStyle = `rgb(255, 0, 0)`
        ctx.beginPath()
        ctx.arc(canvas.width/2, canvas.height/2, 0.25*(canvas.height < canvas.width ? canvas.height: canvas.width), 0, 2*Math.PI)
        ctx.closePath()
        ctx.fill()

        flowers.forEach((flower, index) => {
            ctx.fillStyle = `rgb(230, 0, 0, ${flower[3]})`
            for (i=0; i<3; i++) {
                ctx.beginPath()
                ctx.ellipse(flower[0][0], flower[0][1], 2*flower[1], flower[1]/1.5, i*Math.PI/3, 0, 2*Math.PI)
                ctx.closePath()
                ctx.fill()
            }
            ctx.fillStyle = `rgba(220, 0, 0, ${flower[3]})`
            ctx.beginPath()
            ctx.arc(flower[0][0], flower[0][1], flower[1], 0, 2*Math.PI)
            ctx.closePath()
            ctx.fill()
            flower[1] *= flower[1] < flower[2] ? 1.01 : 1
            flower[3] *= flower[1] < flower[2] ? 1 : 0.95
            if (flower[3] < 0.05) {
                flowers.splice(index, 1)
            }
        })

        if (frame % 60 == 1) {
            rings.push([[canvas.width/2, canvas.height/2], 100])
        }
    }
}

animate()