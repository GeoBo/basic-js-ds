const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor () {
      this.value = null;
      this.next = null;
  }
  getUnderlyingList () {
      if (!this.value) return null;
      return this;
  }

  enqueue (value, level = this) {
      if (!this.value)  {
          this.value = value;
          return this;
      }
      if (level.next) {
          this.enqueue (value, level.next)
      }
      else level.next = {
          value,
          next: null
      }
  }

  dequeue () {  //удаляем первый элемент
    let removeNode = this.value;
    if (!this.value) return null;   
    if (!this.next) this.value = null; 
    else Object.assign(this, this.next);
    return removeNode;        
  }
}

module.exports = {
  Queue
};
