//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

import * as Three from 'three'

import Sprite from './Sprite'
import TextStyle from './TextStyle'

export default class Text extends Sprite {
  constructor({ text, style, pixelRatio } = {}) {
    super(new Three.SpriteMaterial())
    this.text = text || ''
    this.style = new TextStyle(style)
    this.pixelRatio = pixelRatio || window.devicePixelRatio
    this.canvas = document.createElement('canvas')

    // Use nearest filtering because canvas always dumps colors of
    // transparent pixels as black, texture filtering that looks up
    // neighboring pixels will produce artifact on edge.
    this.material.transparent = true
    this.material.map = new Three.CanvasTexture(
      this.canvas,
      undefined,
      undefined,
      undefined,
      Three.NearestFilter,
      Three.NearestFilter,
    )
    this.draw()
  }

  draw() {
    const context = this.canvas.getContext('2d')
    const { style } = this
    const lines = this.text.toString().split('\n')
    const size = this.measureLines(lines, this.style)
    const {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      textAlign,
      verticalAlign,
    } = this.style
    size.width += paddingLeft + paddingRight
    size.height += paddingTop + paddingBottom
    const content = { ...size }
    size.width += marginLeft + marginRight
    size.height += marginTop + marginBottom
    const width = size.width * this.pixelRatio
    const height = size.height * this.pixelRatio
    const { pixelRatio } = this
    this.canvas.width = Three.Math.ceilPowerOfTwo(width + 2 * pixelRatio)
    this.canvas.height = Three.Math.ceilPowerOfTwo(height + 2 * pixelRatio)
    const offsetX = (this.canvas.width - width) / 2
    const offsetY = (this.canvas.height - height) / 2
    context.save()
    context.translate(offsetX, offsetY)
    context.scale(pixelRatio, pixelRatio)
    switch (textAlign) {
      case 'left':
      case 'right':
        context.translate(marginLeft, 0)
        break
      case 'center':
      default:
        context.translate((marginLeft + marginRight) / 2, 0)
        break
    }
    switch (verticalAlign) {
      case 'top':
      case 'bottom':
        context.translate(0, marginTop)
        break
      case 'middle':
      default:
        context.translate(0, (marginTop + marginBottom) / 2)
        break
    }
    this.drawBackground(content, style)
    this.drawLines(lines, content, style)
    context.restore()

    // Apply size to sprite and map
    switch (textAlign) {
      case 'left':
        this.size.x = size.width * 2
        this.material.map.offset.x = (offsetX - width) / this.canvas.width
        this.material.map.repeat.x = width / this.canvas.width * 2
        break
      case 'right':
        this.size.x = size.width * 2
        this.material.map.offset.x = offsetX / this.canvas.width
        this.material.map.repeat.x = width / this.canvas.width * 2
        break
      case 'center':
      default:
        this.size.x = size.width
        this.material.map.offset.x = offsetX / this.canvas.width
        this.material.map.repeat.x = width / this.canvas.width
        break
    }
    switch (verticalAlign) {
      case 'top':
        this.size.y = size.height * 2
        this.material.map.offset.y = offsetY / this.canvas.height
        this.material.map.repeat.y = height / this.canvas.height * 2
        break
      case 'bottom':
        this.size.y = size.height * 2
        this.material.map.offset.y = (offsetY - height) / this.canvas.height
        this.material.map.repeat.y = height / this.canvas.height * 2
        break
      case 'middle':
      default:
        this.size.y = size.height
        this.material.map.offset.y = offsetY / this.canvas.height
        this.material.map.repeat.y = height / this.canvas.height
        break
    }
    this.material.map.needsUpdate = true
  }

  drawBackground(size, style) {
    if (style.backgroundColor === 'transparent') {
      return
    }
    const context = this.canvas.getContext('2d')
    context.save()
    context.fillStyle = style.backgroundColor
    context.fillRect(0, 0, size.width, size.height)
    context.restore()
  }

  // TODO: Support text transform, and letter spacing
  drawLines(lines, size, style) {
    const context = this.canvas.getContext('2d')
    context.save()
    context.font = style.font
    context.textAlign = style.textAlign
    context.fillStyle = style.color

    // Bottom is the only value that respects em box
    context.textBaseline = 'bottom'

    let x = 0
    switch (style.textAlign) {
      case 'left':
        x = style.paddingLeft
        break
      case 'right':
        x = size.width - style.paddingRight
        break
      case 'center':
      default:
        x = (style.paddingLeft + size.width - style.paddingRight) / 2
        break
    }
    const lineHeight = style.fontSize * style.lineHeight
    let y = (lineHeight + style.fontSize) * 0.5 + style.paddingTop
    for (let i = 0; i < lines.length; ++i) {
      context.fillText(lines[i], x, y)
      y += lineHeight
    }

    // Draw white fill with source-in composite to remove subpixel-antialias
    if (style.backgroundColor === 'transparent') {
      context.globalCompositeOperation = 'source-in'
      context.fillStyle = style.color
      context.fillRect(0, 0, size.width, size.height)
    }
    context.restore()
  }

  measureLines(lines, style) {
    const context = this.canvas.getContext('2d')
    context.save()
    context.font = style.font
    const height = style.fontSize * style.lineHeight * lines.length
    let width = 0
    for (let i = 0; i < lines.length; ++i) {
      const lineWidth = context.measureText(lines[i]).width
      if (lineWidth > width) {
        width = lineWidth
      }
    }
    context.restore()
    return { width, height }
  }
}
