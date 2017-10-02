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

import { Mixin } from 'mixwith/src/mixwith'
import * as Three from 'three'

import Namespace from '@takram/planck-core/src/Namespace'

export const internal = Namespace('SceneGraphMixin')

export default Mixin(S => class SceneGraphMixin extends S {
  constructor(...args) {
    super(...args)
    const scope = internal(this)
    scope.setup = false
    scope.disposed = false
    scope.scene = null
  }

  get ancestorEventTarget() {
    return this.parent || super.ancestorEventTarget
  }

  set ancestorEventTarget(value) {
    super.ancestorEventTarget = value
  }

  get scene() {
    const scope = internal(this)
    return scope.scene
  }

  setup() {
    const scope = internal(this)
    scope.setup = true
  }

  dispose() {
    // Remove from its parent if exists
    if (this.parent) {
      this.parent.remove(this)
    }
  }

  addedToParent(parent) {
    const scope = internal(this)
    if (!scope.setup) {
      this.setup()
      scope.setup = true
    }
    if (parent instanceof Three.Scene) {
      this.addedToScene(parent)
      this.dispatchEvent({
        type: 'addedToScene',
        scene: parent,
      })
    } else if (parent !== null && parent.scene !== null) {
      this.addedToScene(parent.scene)
      this.dispatchEvent({
        type: 'addedToScene',
        scene: parent.scene,
      })
    }
  }

  addedToScene(scene) {
    const scope = internal(this)
    scope.scene = scene
    for (let i = 0; i < this.children.length; ++i) {
      const child = this.children[i]
      child.addedToScene(scene)
      child.dispatchEvent({
        type: 'addedToScene',
        scene,
      })
    }
  }

  removedFromParent(parent) {
    const scope = internal(this)
    scope.scene = null
    if (parent instanceof Three.Scene) {
      this.removedFromScene(parent)
      this.dispatchEvent({
        type: 'removedFromScene',
        scene: parent,
      })
    } else if (parent !== null && parent.scene !== null) {
      this.removedFromScene(parent.scene)
      this.dispatchEvent({
        type: 'removedFromScene',
        scene: parent.scene,
      })
    }
  }

  removedFromScene(scene) {
    for (let i = 0; i < this.children.length; ++i) {
      const child = this.children[i]
      child.removedFromScene(scene)
      child.dispatchEvent({
        type: 'removedFromScene',
        scene,
      })
    }
  }

  dispatchEvent(event, ...rest) {
    // Add `to` property to the event
    if (event.type === 'added' && !event.to) {
      const scope = internal(this)
      this.addedToParent(this.parent)
      super.dispatchEvent({ type: 'added', parent: this.parent })
      super.dispatchEvent({ type: 'addedToParent', parent: this.parent })
      scope.parent = this.parent
      return
    }
    // Add `from` property to the event
    if (event.type === 'removed' && !event.from) {
      const scope = internal(this)
      this.removedFromParent(scope.parent)
      super.dispatchEvent({ type: 'removed', parent: scope.parent })
      super.dispatchEvent({ type: 'removedFromParent', parent: scope.parent })
      delete scope.parent
      return
    }
    super.dispatchEvent(event, ...rest)
  }
})
