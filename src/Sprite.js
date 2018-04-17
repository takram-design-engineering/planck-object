// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { mix } from 'mixwith/src/mixwith'
import * as Three from 'three'

import EventDispatcherMixin from '@takram/planck-event/src/EventDispatcherMixin'
import EventTargetMixin from '@takram/planck-event/src/EventTargetMixin'

import SceneGraphMixin from './SceneGraphMixin'

export default class Sprite extends mix(Three.Sprite)
  .with(
    EventDispatcherMixin,
    EventTargetMixin,
    SceneGraphMixin
  ) {
  constructor (material) {
    super(material)
    if (this.material) {
      this.customDepthMaterial = this.material.customDepthMaterial
      this.customDistanceMaterial = this.material.customDistanceMaterial
      this.customPickingMaterial = this.material.customPickingMaterial
    }
    this.size = new Three.Vector2()
  }

  onBeforeRender (renderer, scene, camera, geometry, material, group) {
    const scale = 1 / camera.zoom
    const x = this.size.x * scale
    const y = this.size.y * scale
    if (this.scale.x !== x || this.scale.y !== y) {
      this.scale.set(this.size.x * scale, this.size.y * scale, 1)
      this.updateMatrixWorld()
    }
  }
}
