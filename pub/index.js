

const arrayContainer = document.querySelector("#landing-page-demo");
let exampleArray = new AlgoDomArray('white', [1, 3, 5, 6, 9, 1], false).drawArray();
arrayContainer.appendChild(exampleArray);
arrayContainer.style = "background-color: #343a40 ;width: 80%; height: 200px; padding: 20px;display: flex; flex-direction: column; justify-content: center; align-items: center;";
