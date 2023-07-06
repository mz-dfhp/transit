# transit


-   **🚀 5kb publishing subscription tool**
-   **🍭 Written in TypeScript**
-   **💪 Unit testing provides stability assurance**
## Install

```sh
$ npm install --save transit
```

```javascript
// using ES6 modules
import transit from 'transit'

// using  modules
var transit = require('transit')
```

## Usage

```js
import transit from 'transit'

const event = transit()

event.on('foo', (data) => {
  console.log(data) // abc
})
event.on('add', (data) => {
  console.log(data) // 1
})

event.emit('foo', 'abc')
event.emit('add', 1)

event.off('foo')
event.clear()
```


## Typescript

```ts
import transit from 'transit'

interface Events {
  foo: string
  bar?: number
  add: symbol
}

const event = transit<Events>()
event.on('foo', (data) => {
  // (parameter) data: string
  console.log(data) // abc
})
event.on('bar', (data) => {
  // (parameter) data: number
  console.log(data) // 1
})

event.emit('foo', 'abc')
event.emit('bar')
event.emit('add', 1) // Argument of type 'number' is not assignable to parameter of type 'symbol'
event.emit('divide', 1) // Argument of type '"add1"' is not assignable to parameter of type 'keyof Events'.
```

## API

 - on

    eventType: string | symbol

    handler: (data?: unknown) => void
 - emit

    eventType: string | symbol

    data?: unknown
 - off

    eventType: string | symbol
 - clear
