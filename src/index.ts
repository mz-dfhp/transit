export type EventType = symbol | string
export type EventHandler<T = unknown> = (data?: T) => void

function transmit<T extends Record<EventType, any>>() {
  const transmitMap = new Map<keyof T, EventHandler<T[keyof T]>[]>()

  function emit<k extends keyof T>(event: k, data?: T[k]) {
    const handlers = transmitMap.get(event)
    if (handlers) {
      handlers.forEach((handler) => {
        handler(data)
      })
    }
    else {
      console.warn('Triggers an unsubscribed event type')
    }
  }

  function on<k extends keyof T>(event: k, handler: EventHandler<T[k]>) {
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
      transmitMap.delete(event)
  }

  function clear() {
    transmitMap.clear()
  }

  return { emit, on, off, clear }
}

export default transmit
