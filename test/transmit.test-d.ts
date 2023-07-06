import { describe, expectTypeOf, it } from 'vitest'
import transmit from '../src'

interface events {
  foo: string
  bar?: number
}

const event = transmit<events>()

describe('my types work properly', () => {
  it('transmit', () => {
    expectTypeOf(transmit).toBeFunction()
  })

  it('types', () => {
    expectTypeOf<void>(event.emit('foo', 'Hello'))
    expectTypeOf<void>(event.emit('bar', 123))

    // error
    // expectTypeOf<void>(event.emit('baz', true));

    event.on('foo', (data) => {
      expectTypeOf<string>(data)
    })

    event.on('bar', (data) => {
      expectTypeOf<number | undefined>(data)
    })

    // error
    // event.on('baz', (data) => {
    //   expectTypeOf<boolean>(data)
    // })

    event.off('foo')
    event.off('bar')

    // error
    // event.off('baz')
  })
})
