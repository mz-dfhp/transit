import { describe, expect, it, vi } from 'vitest'
import transit from '../src'

interface events {
  foo: string
  bar?: number
  add: symbol
}

const event = transit<events>()

describe('test transit function', () => {
  it('test emit function', () => {
    const mockHandler = vi.fn()

    event.on('foo', mockHandler)

    event.emit('foo', 'abc')

    expect(mockHandler).toHaveBeenCalledWith('abc')
  })

  it('test on function', () => {
    const mockHandler = vi.fn()

    event.on('bar', mockHandler)

    event.emit('bar', 123)

    expect(mockHandler).toHaveBeenCalledWith(123)
  })

  it('test off function', () => {
    const mockHandler = vi.fn()

    event.on('add', mockHandler)

    event.off('add')

    event.emit('add', Symbol('add'))

    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('test clear function', () => {
    const mockHandler = vi.fn()

    event.on('foo', mockHandler)

    event.clear()

    event.emit('foo', 'abc')

    expect(mockHandler).not.toHaveBeenCalled()
  })
})
