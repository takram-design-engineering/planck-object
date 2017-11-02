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

import 'source-map-support/register'

import * as Three from 'three'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { Group } from '../..'

const { expect } = chai
chai.use(sinonChai)

describe('Group', () => {
  it('is instance of Three.Group', () => {
    const object = new Group()
    expect(object).instanceof(Three.Group)
  })

  describe('#add', () => {
    it('dispatches event with `to` property', () => {
      const parent = new Group()
      const child = new Group()
      const listener = sinon.spy(arg => {
        expect(arg.target).equal(child)
        expect(arg.currentTarget).equal(child)
        expect(arg.type).equal('added')
        expect(arg.parent).equal(parent)
      })
      child.addEventListener('added', listener, false)
      parent.add(child)
      expect(listener).calledOnce
    })
  })

  describe('#remove', () => {
    it('dispatches event with `from` property', () => {
      const parent = new Group()
      const child = new Group()
      const listener = sinon.spy(arg => {
        expect(arg.target).equal(child)
        expect(arg.currentTarget).equal(child)
        expect(arg.type).equal('removed')
        expect(arg.parent).equal(parent)
      })
      child.addEventListener('removed', listener, false)
      parent.add(child)
      parent.remove(child)
      expect(listener).calledOnce
    })
  })

  describe('#addedToParent', () => {
    it('is called before event', () => {
      const parent = new Group()
      const child = new Group()
      const listener = sinon.spy()
      sinon.spy(child, 'addedToParent')
      child.addEventListener('added', listener, false)
      parent.add(child)
      expect(child.addedToParent).calledOnce
      expect(child.addedToParent).calledWith(parent)
      expect(child.addedToParent).calledBefore(listener)
    })
  })

  describe('#removedFromParent', () => {
    it('is called before event', () => {
      const parent = new Group()
      const child = new Group()
      const listener = sinon.spy()
      sinon.spy(child, 'removedFromParent')
      child.addEventListener('removed', listener, false)
      parent.add(child)
      parent.remove(child)
      expect(child.removedFromParent).calledOnce
      expect(child.removedFromParent).calledWith(parent)
      expect(child.removedFromParent).calledBefore(listener)
    })
  })

  describe('#addedToScene', () => {
    it('is called when added to the scene graph', () => {
      const scene = new Three.Scene()
      const parent = new Group()
      const child1 = new Group()
      const child2 = new Group()
      sinon.spy(parent, 'addedToScene')
      sinon.spy(child1, 'addedToScene')
      sinon.spy(child2, 'addedToScene')
      parent.add(child1)
      child1.add(child2)
      scene.add(parent)
      expect(parent.addedToScene).calledOnce
      expect(parent.addedToScene).calledWith(scene)
      expect(child1.addedToScene).calledOnce
      expect(child1.addedToScene).calledWith(scene)
      expect(child2.addedToScene).calledOnce
      expect(child2.addedToScene).calledWith(scene)
    })
  })

  describe('#removedFromScene', () => {
    it('is called when removed from the scene graph', () => {
      const scene = new Three.Scene()
      const parent = new Group()
      const child1 = new Group()
      const child2 = new Group()
      sinon.spy(parent, 'removedFromScene')
      sinon.spy(child1, 'removedFromScene')
      sinon.spy(child2, 'removedFromScene')
      parent.add(child1)
      child1.add(child2)
      scene.add(parent)
      scene.remove(parent)
      expect(parent.removedFromScene).calledOnce
      expect(parent.removedFromScene).calledWith(scene)
      expect(child1.removedFromScene).calledOnce
      expect(child1.removedFromScene).calledWith(scene)
      expect(child2.removedFromScene).calledOnce
      expect(child2.removedFromScene).calledWith(scene)
    })
  })
})
