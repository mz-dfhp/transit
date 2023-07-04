export type EventType = Symbol | String
export type EventHandler = (data?: any) => void

function transmit() {
  let transmitMap = new Map<EventType, EventHandler[]>()

  function emit(event: EventType, data) {
    const handlers = transmitMap.get(event)
    if (handlers) {
      handlers.forEach((handler) => {
        handler(data)
      })
    }
  }

  function on(event: EventType, handler: (data: any) => void) {
    if (transmitMap.has(event)) {
      const handlers = [...transmitMap.get(event), handler]
      transmitMap.set(event, handlers)
    }
    else {
      transmitMap.set(event, [handler])
    }
  }

  function off(event) {
    if (transmitMap.has(event))
      transmitMap.clear()
  }

  function clear() {
    transmitMap = new Map()
  }

  return { emit, on, off, clear }
}

const event = transmit()
event.on('foo', (e: any) => {
  console.log('foo', e)
})
// event.emit('foo', 121212)
// event.emit('foo', 456)

export default transmit
