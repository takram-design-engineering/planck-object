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

import { mix } from 'mixwith/src/mixwith'
import * as Three from 'three'

import EventDispatcherMixin from '@takram/planck-event/src/EventDispatcherMixin'
import EventTargetMixin from '@takram/planck-event/src/EventTargetMixin'
import PointsMaterial from '@takram/planck-renderer/src/PointsMaterial'

import SceneGraphMixin from './SceneGraphMixin'

export default class Points extends mix(Three.Points)
  .with(
    EventDispatcherMixin,
    EventTargetMixin,
    SceneGraphMixin) {
  constructor(geometry, material) {
    super(geometry, material || new PointsMaterial())
    if (this.material) {
      this.customDepthMaterial = this.material.customDepthMaterial
      this.customDistanceMaterial = this.material.customDistanceMaterial
      this.customPickingMaterial = this.material.customPickingMaterial
    }
  }

  get identifierLength() {
    const position = this.geometry.getAttribute('position')
    if (!position) {
      return super.identifierLength
    }
    return position.count + 1
  }
}
