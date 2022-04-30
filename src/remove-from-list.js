const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList (list, value, prev = null) {
  if (list.next) {
      removeKFromList (list.next, value, list);
  }
  if (list.value == value) {
      if (prev) {
          if (list.next) prev.next = list.next;
          else prev.next = null;
      }
      else {
          if (list.next) Object.assign(list, list.next);
          else list = null;
          // if (list.next) this.list = list.next;
          // else this.list = null;
      }
  }
  return list;
}

module.exports = {
  removeKFromList
};
