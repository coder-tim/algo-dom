// Array
const arrayContainer = document.querySelector("#arrayContainer");
let exampleArray = new AlgoDomArray('green', [1, 3, 5, 6, 9, 1], true).drawArray();
arrayContainer.appendChild(exampleArray);
arrayContainer.style = "width: 100%; height: 550px; border: 1px solid #888888; padding: 20px;";


// Linked List
const linkedListContainer = document.querySelector("#linkedListContainer");
let sampleLinkedList = new AlgoDomLinkedList('purple', [1, 22, 7, 9, 8], true).drawLinkedList();
linkedListContainer.appendChild(sampleLinkedList);
linkedListContainer.style = "width: 100%; height: 360px; border: 1px solid #888888; padding: 20px;";


// Stack
const stackContainer = document.querySelector("#stackContainer");
let sampleStack = new AlgoDomStack('blue', [1, 2], true).drawStack();
stackContainer.appendChild(sampleStack);
stackContainer.style = "width: 100%; height: 360px; border: 1px solid #888888; padding: 20px; overflow: scroll";


// Queue
const queueContainer = document.querySelector("#queueContainer");
let sampleQueue = new AlgoDomQueue('orange', [1, 2, 3, 4, 5], true).drawQueue();
queueContainer.appendChild(sampleQueue);
queueContainer.style = "width: 100%; height: 360px; border: 1px solid #888888; padding: 20px;";


// Animation example
const animationContainer1 = document.querySelector("#animationContainer1")

let linkedList1 = new AlgoDomLinkedList('red', [1], false).drawLinkedList()
let linkedList2 = new AlgoDomLinkedList('red', [1, 2], false).drawLinkedList()
let linkedList3 = new AlgoDomLinkedList('red', [1, 2, 3], false).drawLinkedList()
animationContainer1.style = "width: 100%; height: 360px; border: 1px solid #888888; padding: 20px;";

let algoDomAnimation = new AlgoDomAnimation(animationContainer1, [linkedList1, linkedList2, linkedList3], 3)
algoDomAnimation.animate();


