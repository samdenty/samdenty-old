import * as React from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'

const init = canvas => {
  if (!canvas) return

  let elements = []
  var ctx = canvas.getContext('2d')

  const resize = () => {
    canvas.width = canvas.clientWidth * devicePixelRatio
    canvas.height = canvas.clientHeight * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)

    elements = []
    const randomness = 40000 / devicePixelRatio

    for (var x = 0; x < canvas.width; x++) {
      for (var y = 0; y < canvas.height; y++) {
        if (Math.round(Math.random() * randomness) === 1) {
          var s = (Math.random() * 5 + 1) / 10
          if (Math.round(Math.random()) === 1)
            elements.push(presets.o(x, y, s, 0, 0))
          else
            elements.push(
              presets.x(
                x,
                y,
                s,
                0,
                0,
                (Math.random() * 3 - 1) / 10,
                Math.random() * 360
              )
            )
        }
      }
    }
  }
  window.addEventListener('resize', resize)

  const presets = {
    o(x, y, s, dx, dy) {
      return {
        x: x,
        y: y,
        r: 12 * s,
        w: 5 * s,
        dx: dx,
        dy: dy,
        draw: function(ctx, t) {
          this.x += this.dx
          this.y += this.dy

          ctx.beginPath()
          ctx.arc(
            this.x + +Math.sin((50 + x + t / 10) / 100) * 3,
            this.y + +Math.sin((45 + x + t / 10) / 100) * 4,
            this.r,
            0,
            2 * Math.PI,
            false
          )
          ctx.lineWidth = this.w
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
          ctx.stroke()
        },
      }
    },

    x(x, y, s, dx, dy, dr, r) {
      r = r || 0
      return {
        x: x,
        y: y,
        s: 20 * s,
        w: 5 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function(ctx, t) {
          this.x += this.dx
          this.y += this.dy
          this.r += this.dr

          var _this = this
          var line = function(x, y, tx, ty, c, o) {
            o = o || 0
            ctx.beginPath()
            ctx.moveTo(-o + (_this.s / 2) * x, o + (_this.s / 2) * y)
            ctx.lineTo(-o + (_this.s / 2) * tx, o + (_this.s / 2) * ty)
            ctx.lineWidth = _this.w
            ctx.strokeStyle = c
            ctx.stroke()
          }

          ctx.save()

          ctx.translate(
            this.x + Math.sin((x + t / 10) / 100) * 5,
            this.y + Math.sin((10 + x + t / 10) / 100) * 2
          )
          ctx.rotate((this.r * Math.PI) / 180)

          line(-1, -1, 1, 1, 'rgba(255, 255, 255, 0.3)')
          line(1, -1, -1, 1, 'rgba(255, 255, 255, 0.3)')

          ctx.restore()
        },
      }
    },
  }

  resize()

  const timer = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    var time = new Date().getTime()
    for (var e in elements) elements[e].draw(ctx, time)
  }, 10)

  return () => {
    clearInterval(timer)
    window.removeEventListener('resize', resize)
  }
}

export const StyledCanvas = styled.canvas`
  position: fixed;
  z-index: -1;
  height: 100%;
  width: 100%;
`

export const BackgroundEffect = () => {
  const canvas = React.useRef(null)

  React.useLayoutEffect(() => init(canvas.current), [])

  return (
    <>
      <Global
        styles={css`
          body {
            background: radial-gradient(circle, #050505, #010010);
          }
        `}
      />
      <StyledCanvas ref={canvas} />
    </>
  )
}
