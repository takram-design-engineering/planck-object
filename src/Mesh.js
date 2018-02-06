// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { mix } from 'mixwith/src/mixwith'
import * as Three from 'three'

import EventDispatcherMixin from '@takram/planck-event/src/EventDispatcherMixin'
import EventTargetMixin from '@takram/planck-event/src/EventTargetMixin'

import SceneGraphMixin from './SceneGraphMixin'

export default class Mesh extends mix(Three.Mesh)
  .with(
    EventDispatcherMixin,
    EventTargetMixin,
    SceneGraphMixin,
  ) {
  constructor(geometry, material) {
    super(geometry, material || new Three.MeshLambertMaterial())
    this.castShadow = true
    this.receiveShadow = true
    if (this.material) {
      this.customDepthMaterial = this.material.customDepthMaterial
      this.customDistanceMaterial = this.material.customDistanceMaterial
      this.customPickingMaterial = this.material.customPickingMaterial
    }
  }
}
