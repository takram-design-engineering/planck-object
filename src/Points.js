// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

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
    SceneGraphMixin,
  ) {
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
