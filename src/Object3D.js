// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { mix } from 'mixwith/src/mixwith'
import * as Three from 'three'

import { EventDispatcherMixin, EventTargetMixin } from '@takram/planck-event'

import SceneGraphMixin from './SceneGraphMixin'

export default class Object3D extends mix(Three.Object3D)
  .with(
    EventDispatcherMixin,
    EventTargetMixin,
    SceneGraphMixin
  ) {}
