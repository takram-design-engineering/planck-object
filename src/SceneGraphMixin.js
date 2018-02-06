// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

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
