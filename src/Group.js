// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { mix } from 'mixwith/src/mixwith'
import * as Three from 'three'

import EventDispatcherMixin from '@takram/planck-event/src/EventDispatcherMixin'
import EventTargetMixin from '@takram/planck-event/src/EventTargetMixin'

import SceneGraphMixin from './SceneGraphMixin'

export default class Group extends mix(Three.Group)
  .with(
    EventDispatcherMixin,
    EventTargetMixin,
    SceneGraphMixin
  ) {}
