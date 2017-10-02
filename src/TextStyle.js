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

export default class TextStyle {
  constructor(style = {}) {
    this.color = 'white'
    this.backgroundColor = 'transparent'
    this.fontSize = 10
    this.fontFamily = 'sans-serif'
    this.fontWeight = 'normal'
    this.lineHeight = 1
    this.letterSpacing = 0
    this.textTransform = 'uppercase'
    this.textAlign = 'center'
    this.verticalAlign = 'middle'
    const names = Object.keys(style)
    for (let i = 0; i < names.length; ++i) {
      const name = names[i]
      if ({}.hasOwnProperty.call(this, name)) {
        this[name] = style[name]
      }
    }
    if (style.marginTop === undefined) {
      this.marginTop = style.margin || 0
    } else {
      this.marginTop = style.marginTop
    }
    if (style.marginRight === undefined) {
      this.marginRight = style.margin || 0
    } else {
      this.marginRight = style.marginRight
    }
    if (style.marginBottom === undefined) {
      this.marginBottom = style.margin || 0
    } else {
      this.marginBottom = style.marginBottom
    }
    if (style.marginLeft === undefined) {
      this.marginLeft = style.margin || 0
    } else {
      this.marginLeft = style.marginLeft
    }
    if (style.paddingTop === undefined) {
      this.paddingTop = style.padding || 0
    } else {
      this.paddingTop = style.paddingTop
    }
    if (style.paddingRight === undefined) {
      this.paddingRight = style.padding || 0
    } else {
      this.paddingRight = style.paddingRight
    }
    if (style.paddingBottom === undefined) {
      this.paddingBottom = style.padding || 0
    } else {
      this.paddingBottom = style.paddingBottom
    }
    if (style.paddingLeft === undefined) {
      this.paddingLeft = style.padding || 0
    } else {
      this.paddingLeft = style.paddingLeft
    }
  }

  get font() {
    return `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`
  }

  set margin(value) {
    this.marginTop = value
    this.marginRight = value
    this.marginBottom = value
    this.marginLeft = value
  }

  set padding(value) {
    this.paddingTop = value
    this.paddingRight = value
    this.paddingBottom = value
    this.paddingLeft = value
  }

  copy(other) {
    this.color = other.color
    this.backgroundColor = other.backgroundColor
    this.fontSize = other.fontSize
    this.fontFamily = other.fontFamily
    this.fontWeight = other.fontWeight
    this.lineHeight = other.lineHeight
    this.letterSpacing = other.letterSpacing
    this.textTransform = other.textTransform
    this.textAlign = other.textAlign
    this.verticalAlign = other.verticalAlign
    this.marginTop = other.marginTop
    this.marginRight = other.marginRight
    this.marginBottom = other.marginBottom
    this.marginLeft = other.marginLeft
    this.paddingTop = other.paddingTop
    this.paddingRight = other.paddingRight
    this.paddingBottom = other.paddingBottom
    this.paddingLeft = other.paddingLeft
    return this
  }

  clone() {
    return new this.constructor().copy(this)
  }

  equals(other) {
    return (
      this.color === other.color &&
      this.backgroundColor === other.backgroundColor &&
      this.fontSize === other.fontSize &&
      this.fontFamily === other.fontFamily &&
      this.fontWeight === other.fontWeight &&
      this.lineHeight === other.lineHeight &&
      this.letterSpacing === other.letterSpacing &&
      this.textTransform === other.textTransform &&
      this.textAlign === other.textAlign &&
      this.verticalAlign === other.verticalAlign &&
      this.marginTop === other.marginTop &&
      this.marginRight === other.marginRight &&
      this.marginBottom === other.marginBottom &&
      this.marginLeft === other.marginLeft &&
      this.paddingTop === other.paddingTop &&
      this.paddingRight === other.paddingRight &&
      this.paddingBottom === other.paddingBottom &&
      this.paddingLeft === other.paddingLeft)
  }
}
