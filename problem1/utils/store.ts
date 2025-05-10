const WINDOW = 10

class ListNode {
  value: number
  next: ListNode | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  head: ListNode | null
  tail: ListNode | null
  size: number
  set: Set<number>

  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
    this.set = new Set()
  }

  insert(value: number) {
    if (this.set.has(value)) {
      return
    }

    if (this.size === WINDOW) {
      this.removeOldest()
    }

    const newNode = new ListNode(value)
    this.set.add(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else if (this.tail) {
      this.tail.next = newNode
      this.tail = newNode
      this.tail.next = null
    }

    this.size++
  }

  removeOldest() {
    if (!this.head) {
      return
    }

    this.set.delete(this.head.value)
    this.head = this.head.next
    this.size--
  }

  getvalues() {
    const values: number[] = []
    let current = this.head
    while (current) {
      values.push(current.value)
      current = current.next
    }

    return values
  }
}

const store = new LinkedList()
export default store
