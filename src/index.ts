export type EventType = symbol | string
export type EventHandler<T = unknown> = (data: T) => void

function transit<T extends Record<EventType, any>>() {
  const transitMap = new Map<keyof T, EventHandler<T[keyof T]>[]>()

  function emit<k extends keyof T>(event: k, data?: T[k]) {
    const handlers = transitMap.get(event)
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
    if (transitMap.has(event)) {
      const handlers = [...transitMap.get(event), handler]
      transitMap.set(event, handlers)
    }
    else {
      transitMap.set(event, [handler])
    }
  }

  function off<k extends keyof T>(event: k) {
    if (transitMap.has(event))
      transitMap.delete(event)
  }

  function clear() {
    transitMap.clear()
  }

  return { emit, on, off, clear }
}

export default transit
