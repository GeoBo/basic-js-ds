const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor () {
      this.tree = {
          data: null,
          left: null,
          right: null
      }
  }

  root () {
      if (this.tree.data == null) return null;
      return this.tree;
  };
  add (data, level = this.tree) {
      let newNode = {
          data,
          left: null,
          right: null
      }
      if (!level.data) {
          level.data = data;
      }
      else {
          if (level.data > data) {
              if (level.left) this.add(data, level.left);
              else level.left = newNode;
          }
          else if(level.data < data) {
              if (level.right) this.add(data, level.right);
              else level.right = newNode;
          }
          else return this; //такое значение уже есть
      }
      return this;
  } 
  remove (data) {
      let parent = this.find (data, this.tree, false, true); //нашли родителя удаляемого узла
      let parentRemoveSide;
      let removeNode; //удаляемый узел
      let removeNodeLeft;
      let removeNodeRight;
    
      if (parent) {  
          if (parent.left && parent.left.data == data) {
              removeNode = parent.left;
              parentRemoveSide = 'left';
          }
          else {
              removeNode = parent.right;   
              parentRemoveSide = 'right';
          }
          
          removeNodeLeft = removeNode.left;
          removeNodeRight = removeNode.right;
          
          if (!removeNodeLeft && !removeNodeRight) parent[parentRemoveSide] = null;
          else if (!removeNodeRight) parent[parentRemoveSide] = removeNodeLeft;
          else if (!removeNodeLeft) parent[parentRemoveSide] = removeNodeRight;
          else {
              let parentMinNode;
              let minNode;
              let minNodeRight; //если у мин узла есть потомок справа
            
              parentMinNode = this.min (removeNodeRight, false, true);
              if (parentMinNode) {
                  minNode = parentMinNode.left; 
                  minNodeRight = minNode.right;
                  minNode.right = null;
                  parentMinNode.left = null; // отключили мин узел от родителя
                  if (minNodeRight) parentMinNode.left = minNodeRight;
              }      
              else minNode = removeNodeRight
              // console.log(parentMinNode);         
              parent[parentRemoveSide] = minNode; //подключили к родителю удаляемого узла
              //подключить к перемещенному узлу потомков
              minNode.left = removeNodeLeft 
              if (parentMinNode) minNode.right = removeNodeRight;
          }
      }
      else {
            removeNode = this.tree;
            removeNodeLeft = removeNode.left;
            removeNodeRight = removeNode.right;
            if (!removeNodeLeft && !removeNodeRight)  {
                this.tree = {
                  data: null,
                  left: null,
                  right: null
                }
            }
            else if (!removeNodeRight) this.tree = removeNodeLeft;
            else if (!removeNodeLeft) this.tree = removeNodeRight;
            else {
                let parentMinNode;
                let minNode;
                let minNodeRight; //если у мин узла есть потомок справа
              
                parentMinNode = this.min (removeNodeRight, false, true);
                if (parentMinNode) {
                    minNode = parentMinNode.left;   
                    minNodeRight = minNode.right;
                    minNode.right = null;
                    parentMinNode.left = null; // отключили мин узел от родителя
                    if (minNodeRight) parentMinNode.left = minNodeRight;
                }      
                else minNode = removeNodeRight 
                this.tree = minNode;
                //подключить к перемещенному узлу потомков
                minNode.left = removeNodeLeft;
                if (parentMinNode) minNode.right = removeNodeRight;
            }
      }
  }
  has (data) {
      return this.find (data) !== null;
  }
  find (data, level = this.tree, parent = false, needParent = false) {
      if (level.data > data) {
          if (level.left) return this.find(data, level.left, level, needParent);
          return null;
      }
      else if(level.data < data) {
          if (level.right) return this.find(data, level.right, level, needParent);
          return null;
      }
      else {
          if (needParent) return parent; //Нужен родитель, чтобы удалить узел
          return level; //Если нашли узел
      }
  }
  min (level = this.tree, parent = false, needParent = false) {
      if (level.data != null) {
          if (level.left) return this.min(level.left, level, needParent);
          if (needParent) return parent;
          return level.data;
      }
      else return null;
  }
  max (level = this.tree) {
    if (level.data != null) {
        if (level.right) return this.max(level.right);
        else return level.data;
    }
    else return null;
  }
}

module.exports = {
  BinarySearchTree
};