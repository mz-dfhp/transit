import { describe, expect, vi } from 'vitest'
import transmit from '../index'

interface events {
  foo: string
  bar?: number
  add: symbol
}

// 创建一个transmit实例
const event = transmit<events>()

// 测试emit函数
describe('Test emit function', () => {
  // mock函数
  const mockHandler = vi.fn()

  // 订阅foo事件，并添加handler
  event.on('foo', mockHandler)

  // 触发foo事件
  event.emit('foo', 'abc')

  // 断言mockHandler已被调用且接收到正确的数据
  expect(mockHandler).toHaveBeenCalledWith('abc')
})

// 测试on函数
describe('Test on function', () => {
  // mock函数
  const mockHandler = vi.fn()

  // 订阅bar事件，并添加handler
  event.on('bar', mockHandler)

  // 触发bar事件
  event.emit('bar', 123)

  // 断言mockHandler已被调用且接收到正确的数据
  expect(mockHandler).toHaveBeenCalledWith(123)
})

// 测试off函数
describe('Test off function', () => {
  // mock函数
  const mockHandler = vi.fn()

  // 订阅add事件，并添加handler
  event.on('add', mockHandler)

  // 取消订阅add事件
  event.off('add')

  // 触发add事件
  event.emit('add')

  // 断言mockHandler未被调用
  expect(mockHandler).not.toHaveBeenCalled()
})

// 测试clear函数
describe('Test clear function', () => {
  // mock函数
  const mockHandler = vi.fn()

  // 订阅foo事件，并添加handler
  event.on('foo', mockHandler)

  // 清空所有订阅的事件
  event.clear()

  // 触发foo事件
  event.emit('foo', 'abc')

  // 断言mockHandler未被调用
  expect(mockHandler).not.toHaveBeenCalled()
})
