// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { mix } from 'mixwith/src/mixwith'
import * as Three from 'three'

import { EventDispatcherMixin, EventTargetMixin } from '@takram/planck-event'
import { LineBasicMaterial } from '@takram/planck-renderer'

import SceneGraphMixin from './SceneGraphMixin'

export default class LineSegments extends mix(Three.LineSegments)
  .with(
    EventDispatcherMixin,
    EventTargetMixin,
    SceneGraphMixin
  ) {
  constructor (geometry, material) {
    super(geometry, material || new LineBasicMaterial())
    if (this.material) {
      this.customDepthMaterial = this.material.customDepthMaterial
      this.customDistanceMaterial = this.material.customDistanceMaterial
      this.customPickingMaterial = this.material.customPickingMaterial
    }
  }
}
