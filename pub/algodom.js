class AlgoDomArray {
    constructor(color, elements, showUI) {
        this.color = color;
        this.elements = elements;
        this.showUI = showUI;
        this.arrayDiv = document.createElement("div");
        this.mainContainerDiv = document.createElement("div");
    }
    
    // This method is not written by me. It's from Stackoverflow
    // Reference: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    fadeAway(element) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

    // This method is not written by me. It's from Stackoverflow
    // Reference: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    fadeAppear(element) {
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }

    
    restoreDiagramToOriginalColor() {
        for (let i = 0; i < this.arrayDiv.children.length; i++) {
            this.arrayDiv.children[i].style.borderLeft = "1px"
            this.arrayDiv.children[i].style.borderWidth = "1px";
            this.arrayDiv.children[i].style.borderColor = this.color;
            this.arrayDiv.children[i].children[0].style.color = this.color;
        }
    }


    drawArray() {
        this.arrayDiv.style = "display: flex; flex-direction: row;"; 

        for (let i = 0; i < this.elements.length; i++) {
            const arrayNode = document.createElement("div");
            arrayNode.setAttribute("id", "arrayNode" + i);
        
            const arrayNodeValue = document.createElement("p");
            arrayNodeValue.innerText = this.elements[i];
            arrayNodeValue.style = "font-family: sans-serif; font-size: 25px";
            arrayNodeValue.style.color = this.color;
        
            arrayNode.appendChild(arrayNodeValue);
            arrayNode.style = "min-width: 40px; height: 40px; border: 1px solid black; text-align: center; ";
            arrayNode.style.borderColor  = this.color;
    
            if (i != 0) {
                arrayNode.style.borderLeft = 0;
            }
    
            // append to arrayDiv
            this.arrayDiv.appendChild(arrayNode);
        }

        this.mainContainerDiv.appendChild(this.arrayDiv);


        let formStyle = ` 
                        margin: 20px 0px;
                        display: flex;
                        flex-direction: row;
                        gap: 15px;
                        `
        let formTextAreaStyle = `width: 60px; height: 40px; resize: none;`

        let formButtonStyle = `
                                font-family: verdana
                                color: black;
                                border: 1px solid black; 
                                border-radius: 10px;
                                background-color: white;
                                padding: 5px 5px;
                                `

        // UI for find element by index
        let findElementByIndexForm = document.createElement("form");
        findElementByIndexForm.onsubmit = (e) => this.findElementByIndex(e);
        findElementByIndexForm.style= formStyle

        let findElementByIndexFormTextArea = document.createElement("textarea");
        findElementByIndexFormTextArea.setAttribute("type", "text")
        findElementByIndexFormTextArea.style = formTextAreaStyle

        let findElementByIndexFormInput = document.createElement("input");
        findElementByIndexFormInput.setAttribute("type", "submit")
        findElementByIndexFormInput.setAttribute("value", "Find by index")
        findElementByIndexFormInput.style = formButtonStyle

        findElementByIndexForm.appendChild(findElementByIndexFormTextArea)
        findElementByIndexForm.appendChild(findElementByIndexFormInput)


        // UI for find element by value
        let findElementByValueForm = document.createElement("form");
        findElementByValueForm.onsubmit = (e) => this.findElementByValue(e);
        findElementByValueForm.style = formStyle;

        let findElementByValueFormTextArea = document.createElement("textarea");
        findElementByValueFormTextArea.setAttribute("type", "text")
        findElementByValueFormTextArea.style = formTextAreaStyle;

        let findElementByValueFormInput = document.createElement("input");
        findElementByValueFormInput.setAttribute("type", "submit")
        findElementByValueFormInput.setAttribute("value", "Find by value")
        findElementByValueFormInput.style = formButtonStyle;

        findElementByValueForm.appendChild(findElementByValueFormTextArea)
        findElementByValueForm.appendChild(findElementByValueFormInput)


        // UI for finding an element by index, and modifying that element
        let modifyElementByIndexForm = document.createElement("form");
        modifyElementByIndexForm.onsubmit = (e) => this.modifyElementByIndex(e);
        modifyElementByIndexForm.style = formStyle;

        let modifyElementByIndexFormTextArea = document.createElement("textarea");
        modifyElementByIndexFormTextArea.setAttribute("type", "text")
        modifyElementByIndexFormTextArea.style = formTextAreaStyle;

        let modifyElementByIndexFormInput = document.createElement("input");
        modifyElementByIndexFormInput.setAttribute("type", "submit")
        modifyElementByIndexFormInput.setAttribute("value", "Modify by index")
        modifyElementByIndexFormInput.style = formButtonStyle;

        modifyElementByIndexForm.appendChild(modifyElementByIndexFormTextArea)
        modifyElementByIndexForm.appendChild(modifyElementByIndexFormInput)


        // UI for finding an element by value, and modifying that element
        let modifyElementByValueForm = document.createElement("form");
        modifyElementByValueForm.onsubmit = (e) => this.modifyElementByValue(e);
        modifyElementByValueForm.style = formStyle;

        let modifyElementByValueFormTextArea = document.createElement("textarea");
        modifyElementByValueFormTextArea.setAttribute("type", "text")
        modifyElementByValueFormTextArea.style = formTextAreaStyle;

        let modifyElementByValueFormInput = document.createElement("input");
        modifyElementByValueFormInput.setAttribute("type", "submit")
        modifyElementByValueFormInput.setAttribute("value", "Modify by value")
        modifyElementByValueFormInput.style = formButtonStyle;

        modifyElementByValueForm.appendChild(modifyElementByValueFormTextArea)
        modifyElementByValueForm.appendChild(modifyElementByValueFormInput)

        let instruction1 = document.createElement("p")
        instruction1.innerText = "To modify an element by index, enter the index you want to modify and the value you want to change it into, separated by comma."
        let instruction2 = document.createElement("p")
        instruction2.innerText = "E.g. To change index 3's value to 10, enter:  3,10"

        let instruction3 = document.createElement("p")
        instruction3.innerText = "To modify an element by value, enter the old value and new value, separated by comma"
        let instruction4 = document.createElement("p")
        instruction4.innerText = "E.g. To change 6's value to 8, enter:  6,8"

        if (this.showUI == true) {
            this.mainContainerDiv.appendChild(findElementByIndexForm);
            this.mainContainerDiv.appendChild(findElementByValueForm);
            this.mainContainerDiv.appendChild(modifyElementByIndexForm);
            this.mainContainerDiv.appendChild(modifyElementByValueForm);
            this.mainContainerDiv.appendChild(instruction1);
            this.mainContainerDiv.appendChild(instruction2);
            this.mainContainerDiv.appendChild(instruction3);
            this.mainContainerDiv.appendChild(instruction4);
        }

        return this.mainContainerDiv;
    }


    findElementByIndex(e) {
        e.preventDefault();
        console.log("Array find elem by value")
        this.restoreDiagramToOriginalColor()

        let index = 0;
        let originalColor = this.arrayDiv.children[index].style.borderColor;
        let originalBorderWidth = this.arrayDiv.children[index].style.borderWidth;

        let interval = setInterval(() => {
            console.log(index)

            this.arrayDiv.children[index].style.borderLeft = "3.5px solid red"
            this.arrayDiv.children[index].style.borderColor = "red";
            this.arrayDiv.children[index].style.borderWidth = "3.5px";
            this.arrayDiv.children[index].children[0].style.color = "red";

            // We've arrived at the target array index
            if (index == e.target.children[0].value) {
                clearInterval(interval)
            } 

            // After we traverse an element, set it back to its original color
            if (index > 0) {
                this.arrayDiv.children[index-1].style.borderColor = originalColor;
                this.arrayDiv.children[index-1].style.borderWidth = originalBorderWidth;
                this.arrayDiv.children[index-1].children[0].style.color = originalColor;
            }

            index++;
               
        }, 1000);
    }


    findElementByValue(e) {
        e.preventDefault();
        console.log("Array find elem by index")
        this.restoreDiagramToOriginalColor()

        let index = 0;
        let originalColor = this.arrayDiv.children[index].style.borderColor;
        let originalBorderWidth = this.arrayDiv.children[index].style.borderWidth;

        let interval = setInterval(() => {

            console.log(index)

            this.arrayDiv.children[index].style.borderLeft = "3.5px solid red"
            this.arrayDiv.children[index].style.borderColor = "red";
            this.arrayDiv.children[index].style.borderWidth = "3.5px";
            this.arrayDiv.children[index].children[0].style.color = "red";

            if (this.arrayDiv.children[index]
                && this.arrayDiv.children[index].children[0].innerText 
                && this.arrayDiv.children[index].children[0].innerText == e.target.children[0].value) {
                    clearInterval(interval)
            } 

            // After we traverse an element, set it back to its original color
            if (index > 0) {
                this.arrayDiv.children[index-1].style.borderColor = originalColor;
                this.arrayDiv.children[index-1].style.borderWidth = originalBorderWidth;
                this.arrayDiv.children[index-1].children[0].style.color = originalColor;
            }

            index++;
               
        }, 1000);
    }


    modifyElementByIndex(e) {
        e.preventDefault();
        console.log("Array modify elem by index")
        this.restoreDiagramToOriginalColor()

        let formInput = e.target.children[0].value;
        let formInputArray = formInput.split(",");
        let targetIndex = formInputArray[0];
        let newValue = formInputArray[1];

        let index = 0;
        let originalColor = this.arrayDiv.children[index].style.borderColor;
        let originalBorderWidth = this.arrayDiv.children[index].style.borderWidth;

        let interval = setInterval(() => {
            index++;
            console.log(index-1)

            this.arrayDiv.children[index-1].style.borderLeft = "3.5px solid red"
            this.arrayDiv.children[index-1].style.borderColor = "red";
            this.arrayDiv.children[index-1].style.borderWidth = "3.5px";
            this.arrayDiv.children[index-1].children[0].style.color = "red";

            // We've arrived at the target array index
            if (index-1 == targetIndex) {
                clearInterval(interval)

                this.fadeAway(this.arrayDiv.children[index-1].children[0])
                
                setTimeout(() => {
                    console.log("1st setTimeOut")
                    this.arrayDiv.children[index-1].children[0].innerText = '';
                    
                    setTimeout(() => {
                        console.log("2nd setTimeOut")
                        this.fadeAppear(this.arrayDiv.children[index-1].children[0])
                        this.arrayDiv.children[index-1].children[0].innerText = newValue;
                    }, 1200)
                }, 100)
          
            } 

            // After we traverse an element, set it back to its original color
            if (index > 0) {
                this.arrayDiv.children[index-2].style.borderColor = originalColor;
                this.arrayDiv.children[index-2].style.borderWidth = originalBorderWidth;
                this.arrayDiv.children[index-2].children[0].style.color = originalColor;
            }
               
        }, 800);
    }


    modifyElementByValue(e) {
        e.preventDefault();
        console.log("Array modify elem by index")
        this.restoreDiagramToOriginalColor()

        let formInput = e.target.children[0].value;
        let formInputArray = formInput.split(",");
        let originalValue = formInputArray[0];
        let newValue = formInputArray[1];

        let index = 0;
        let originalColor = this.arrayDiv.children[index].style.borderColor;
        let originalBorderWidth = this.arrayDiv.children[index].style.borderWidth;

        let interval = setInterval(() => {
            index++;
            console.log(index-1)

            this.arrayDiv.children[index-1].style.borderLeft = "3.5px solid red"
            this.arrayDiv.children[index-1].style.borderColor = "red";
            this.arrayDiv.children[index-1].style.borderWidth = "3.5px";
            this.arrayDiv.children[index-1].children[0].style.color = "red";

            // We've arrived at the target array index
            if (this.arrayDiv.children[index-1]
                && this.arrayDiv.children[index-1].children[0].innerText 
                && this.arrayDiv.children[index-1].children[0].innerText == originalValue) {

                clearInterval(interval)

                this.fadeAway(this.arrayDiv.children[index-1].children[0])
                
                setTimeout(() => {
                    console.log("1st setTimeOut")
                    this.arrayDiv.children[index-1].children[0].innerText = '';
                    
                    setTimeout(() => {
                        console.log("2nd setTimeOut")
                        this.fadeAppear(this.arrayDiv.children[index-1].children[0])
                        this.arrayDiv.children[index-1].children[0].innerText = newValue;
                    }, 1200)
                }, 100)

                
            } 

            // After we traverse an element, set it back to its original color
            if (index > 0) {
                this.arrayDiv.children[index-2].style.borderColor = originalColor;
                this.arrayDiv.children[index-2].style.borderWidth = originalBorderWidth;
                this.arrayDiv.children[index-2].children[0].style.color = originalColor;
            }
   
        }, 800);

    }
}



class AlgoDomLinkedList {
    constructor(color, elements, showUI) {
        this.color = color;
        this.elements = elements;
        this.showUI = showUI;
        this.linkedListDiv = document.createElement("div");
        this.mainContainerDiv = document.createElement("div");
    }


    restoreDiagramToOriginalColor() {
        for (let i = 0; i < this.linkedListDiv.children.length; i++) {
            if (this.linkedListDiv.children[i].children[0].innerText != "⎯⎯⎯>" ) {
                this.linkedListDiv.children[i].style.borderLeft = `1px solid ${this.color}`
            }
            
            this.linkedListDiv.children[i].style.borderWidth = "1px";
            this.linkedListDiv.children[i].style.borderColor = this.color;
            this.linkedListDiv.children[i].children[0].style.color = this.color;
        }
    }

    // This method is not written by me. It came from Stackoverflow.
    // Reference: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    fadeAway(element) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

    // This method is not written by me. It came from Stackoverflow.
    // Reference: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    fadeAppear(element) {
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }

        
    drawLinkedList() {
        this.linkedListDiv.style = "display: flex; flex-direction: row;" 

        for (let i = 0; i < this.elements.length; i++) {
            const linkedListNode = document.createElement("div");
            linkedListNode.setAttribute("id", "linkedListNode" + i);
        
            const linkedListNodeValue = document.createElement("p");
            linkedListNodeValue.innerText = this.elements[i];
            linkedListNodeValue.style = "font-family: sans-serif; font-size: 25px";
            linkedListNodeValue.style.color = this.color;
        
            linkedListNode.appendChild(linkedListNodeValue);
            linkedListNode.style = "min-width: 40px; height: 40px; border: 1px solid black; text-align: center; ";
            linkedListNode.style.borderColor  = this.color;
    
            // LinkedList Pointer
            const linkedListPointer = document.createElement("div");
            const linkedListPointerValue = document.createElement("p");
            linkedListPointerValue.innerText = "⎯⎯⎯>";
            linkedListPointerValue.style = "font-family: sans-serif; font-size: 25px";
            linkedListPointerValue.style.color = this.color;
            linkedListPointer.appendChild(linkedListPointerValue);
    
            // append to linkedListDiv
            this.linkedListDiv.appendChild(linkedListNode);
            this.linkedListDiv.appendChild(linkedListPointer);
    
        }

        this.mainContainerDiv.appendChild(this.linkedListDiv)

        let formStyle = ` 
                        margin: 20px 0px;
                        display: flex;
                        flex-direction: row;
                        gap: 15px;
                        `
        let formTextAreaStyle = `width: 60px; height: 40px; resize: none;`

        let formButtonStyle = `
                                font-family: verdana
                                color: black;
                                border: 1px solid black; 
                                border-radius: 10px;
                                background-color: white;
                                padding: 5px 5px;
                                `

        // UI for find element by value
        let findElementByValueForm = document.createElement("form");
        findElementByValueForm.onsubmit = (e) => this.findElementByValue(e);
        findElementByValueForm.style = formStyle;

        let findElementByValueFormTextArea = document.createElement("textarea");
        findElementByValueFormTextArea.setAttribute("type", "text")
        findElementByValueFormTextArea.style = formTextAreaStyle;

        let findElementByValueFormInput = document.createElement("input");
        findElementByValueFormInput.setAttribute("type", "submit")
        findElementByValueFormInput.setAttribute("value", "Find by value")
        findElementByValueFormInput.style = formButtonStyle

        findElementByValueForm.appendChild(findElementByValueFormTextArea)
        findElementByValueForm.appendChild(findElementByValueFormInput)


        // UI for insert element at tail
        let insertElementAtTailForm = document.createElement("form");
        insertElementAtTailForm.onsubmit = (e) => this.insertElementAtTail(e);
        insertElementAtTailForm.style = formStyle

        let insertElementAtTailFormTextArea = document.createElement("textarea");
        insertElementAtTailFormTextArea.setAttribute("type", "text")
        insertElementAtTailFormTextArea.style = formTextAreaStyle;

        let insertElementAtTailFormInput = document.createElement("input");
        insertElementAtTailFormInput.setAttribute("type", "submit")
        insertElementAtTailFormInput.setAttribute("value", "Insert at tail")
        insertElementAtTailFormInput.style = formButtonStyle

        insertElementAtTailForm.appendChild(insertElementAtTailFormTextArea)
        insertElementAtTailForm.appendChild(insertElementAtTailFormInput)


        // UI for delete element at tail
        let deleteElementAtTailForm = document.createElement("form");
        deleteElementAtTailForm.onsubmit = (e) => this.deleteElementAtTail(e);
        deleteElementAtTailForm.style = formStyle


        let deleteElementAtTailFormInput = document.createElement("input");
        deleteElementAtTailFormInput.setAttribute("type", "submit")
        deleteElementAtTailFormInput.setAttribute("value", "Delete tail node")
        deleteElementAtTailFormInput.style = formButtonStyle;
        deleteElementAtTailFormInput.style.margin = "0px 74px";

        deleteElementAtTailForm.appendChild(deleteElementAtTailFormInput)


        if (this.showUI == true) {
            this.mainContainerDiv.appendChild(findElementByValueForm);
            this.mainContainerDiv.appendChild(insertElementAtTailForm);
            this.mainContainerDiv.appendChild(deleteElementAtTailForm);
        }

        return this.mainContainerDiv;
    }


    findElementByValue(e) {
        e.preventDefault()
        console.log("find elem by value")
        this.restoreDiagramToOriginalColor()

        let index = 0;
        let originalColor = this.linkedListDiv.children[index].style.borderColor;
        let originalBorderWidth = this.linkedListDiv.children[index].style.borderWidth;

        let interval = setInterval(() => {

             if (index > this.linkedListDiv.children.length - 2) {
                 // element not found
                 this.linkedListDiv.children[index-2].style.borderColor = originalColor;
                 this.linkedListDiv.children[index-2].style.borderWidth = originalBorderWidth;
                 this.linkedListDiv.children[index-2].children[0].style.color = originalColor;

                 this.linkedListDiv.children[index-1].children[0].style.color = originalColor;

                 index = 0;
                 clearInterval(interval);
             } else {
                 console.log(index)

                 this.linkedListDiv.children[index].style.borderColor = "red";
                 this.linkedListDiv.children[index].style.borderWidth = "3.5px";
                 this.linkedListDiv.children[index].children[0].style.color = "red";

                 this.linkedListDiv.children[index+1].children[0].style.color = "red";

                 // After we traverse an element, set it back to its original color
                 if (index > 1) {
                     // previous linked list node
                     this.linkedListDiv.children[index-2].style.borderColor = originalColor;
                     this.linkedListDiv.children[index-2].style.borderWidth = originalBorderWidth;
                     this.linkedListDiv.children[index-2].children[0].style.color = originalColor;

                     // previous linked list node's pointer
                     this.linkedListDiv.children[index-1].children[0].style.color = originalColor;
                 }

                 if (this.linkedListDiv.children[index]
                    && this.linkedListDiv.children[index].children[0].innerText 
                    && this.linkedListDiv.children[index].children[0].innerText == e.target.children[0].value) {
                        clearInterval(interval)
                 } 

                 index+=2;
             }

        }, 1000);
    }


    insertElementAtTail(e) {
        e.preventDefault()
        console.log("insert elem at tail")
        this.restoreDiagramToOriginalColor()

        const linkedListNode = document.createElement("div");
            
        const linkedListNodeValue = document.createElement("p");
        linkedListNodeValue.innerText = e.target.children[0].value
        linkedListNodeValue.style = "font-family: sans-serif; font-size: 25px";
        linkedListNodeValue.style.color = this.color;
    
        linkedListNode.appendChild(linkedListNodeValue);
        linkedListNode.style = "min-width: 40px; height: 40px; border: 1px solid black; text-align: center; ";
        linkedListNode.style.borderColor  = this.color;

        // LinkedList Pointer
        const linkedListPointer = document.createElement("div");
        const linkedListPointerValue = document.createElement("p");
        linkedListPointerValue.innerText = "⎯⎯⎯>";
        linkedListPointerValue.style = "font-family: sans-serif; font-size: 25px";
        linkedListPointerValue.style.color = this.color;
        linkedListPointer.appendChild(linkedListPointerValue);

        // LinkedList null value
        const linkedListNull = document.createElement("div");
        const linkedListNullValue = document.createElement("p");
        linkedListNullValue.innerText = "NULL";
        linkedListNullValue.style = "font-family: sans-serif; font-size: 25px";
        linkedListNullValue.style.color = this.color;
        linkedListNull.appendChild(linkedListNullValue);


        setTimeout(() => {
            this.fadeAppear(linkedListNode);
            this.fadeAppear(linkedListPointer);
            this.linkedListDiv.appendChild(linkedListNode);
            this.linkedListDiv.appendChild(linkedListPointer);
            
        }, 500)

    }


    deleteElementAtTail(e) {
        e.preventDefault()
        console.log("delete elem at tail")
        this.restoreDiagramToOriginalColor()

        let numberOfLinkedListDomNodes = this.linkedListDiv.children.length

        if (this.linkedListDiv.children[numberOfLinkedListDomNodes-1]
            && this.linkedListDiv.children[numberOfLinkedListDomNodes-2]) {
            this.fadeAway(this.linkedListDiv.children[numberOfLinkedListDomNodes-1])
            this.fadeAway(this.linkedListDiv.children[numberOfLinkedListDomNodes-2])
        }

        setTimeout(() => {
            if (this.linkedListDiv.children[numberOfLinkedListDomNodes-1]
                && this.linkedListDiv.children[numberOfLinkedListDomNodes-2]) {
                this.linkedListDiv.removeChild(this.linkedListDiv.children[numberOfLinkedListDomNodes-1])
                this.linkedListDiv.removeChild(this.linkedListDiv.children[numberOfLinkedListDomNodes-2])
            }
        }, 1000)

    }
}


class AlgoDomStack {
    constructor(color, elements, showUI) {
        this.color = color;
        this.elements = elements;
        this.showUI = showUI;
        this.stackDiv = document.createElement("div");
        this.mainContainerDiv = document.createElement("div");
    }

    drawStack() {
        this.stackDiv.style = "display: flex; flex-direction: column;" 
        this.stackDiv.setAttribute("id", "stackDiv")

        for (let i = this.elements.length - 1; i >= 0; i--) {
            const stackNode = document.createElement("div");
            stackNode.setAttribute("id", "stackNode" + i);
        
            const stackNodeValue = document.createElement("p");
            stackNodeValue.innerText = this.elements[i];
            stackNodeValue.style = "font-family: sans-serif; font-size: 25px";
            stackNodeValue.style.color = this.color;
        
            stackNode.appendChild(stackNodeValue);
            stackNode.style = "min-width: 60px; height: 40px; border: 1px solid black; text-align: center; ";
            stackNode.style.borderColor = this.color;
    
            this.stackDiv.appendChild(stackNode);
    
            // Arrow indicating top of stack
            const topOfStackArrow = document.createElement("div");
            const topOfStackArrowValue = document.createElement("p");
            topOfStackArrowValue.innerText = "<⎯⎯⎯TOP";
            topOfStackArrowValue.style = "font-family: sans-serif; font-size: 25px";
            topOfStackArrowValue.style.color = this.color;
            topOfStackArrow.appendChild(topOfStackArrowValue);
    
        }

        this.mainContainerDiv.appendChild(this.stackDiv)
        this.mainContainerDiv.style = `display: flex; flex-direction: column; align-items: flex-start; `

        let formStyle = ` 
                        margin: 20px 0px;
                        display: flex;
                        flex-direction: row;
                        gap: 15px;
                        `
        let formTextAreaStyle = `width: 60px; height: 40px; resize: none;`

        let formButtonStyle = `
                                font-family: verdana
                                color: black;
                                border: 1px solid black; 
                                border-radius: 10px;
                                background-color: white;
                                padding: 5px 5px;
                                `

        let peekButton = document.createElement("button");
        peekButton.style = formButtonStyle;
        peekButton.style.margin = "15px 74px"

        // Form for pushing elements onto stack
        let pushElementForm = document.createElement("form");
        pushElementForm.onsubmit = (e) => this.pushElement(e);
        pushElementForm.style = formStyle;


        let pushElementFormTextArea = document.createElement("textarea");
        pushElementFormTextArea.setAttribute("type", "text")
        pushElementFormTextArea.style = formTextAreaStyle;

        let pushElementFormInput = document.createElement("input");
        pushElementFormInput.setAttribute("type", "submit")
        pushElementFormInput.setAttribute("value", "push")
        pushElementFormInput.style = formButtonStyle;

        pushElementForm.appendChild(pushElementFormTextArea)
        pushElementForm.appendChild(pushElementFormInput)
        // =======================


        let popButton = document.createElement("button");
        popButton.style = formButtonStyle;
        popButton.style.margin = "0px 74px"

        peekButton.innerText = "Peek";
        popButton.innerText = "Pop";

        // https://stackoverflow.com/questions/52488110/why-cant-i-call-class-function-inside-addeventlistener/52488238
        peekButton.addEventListener("click", () => this.peekElement())
        popButton.addEventListener("click", ()=> this.popElement())

        if (this.showUI == true) {
            this.mainContainerDiv.appendChild(peekButton);
            this.mainContainerDiv.appendChild(popButton);
            this.mainContainerDiv.appendChild(pushElementForm);
        }
    
        this.stackDiv.style = "width: 77px; padding: 5px 5px 0px 5px; border-left: 4px solid black; border-right: 4px solid black; border-bottom: 4px solid black";
    
        return this.mainContainerDiv;

    }

    restoreDiagramToOriginalColor() {
        for (let i = 0; i < this.stackDiv.children.length; i++) {

            this.stackDiv.children[i].style.borderWidth = "1px";
            this.stackDiv.children[i].style.borderColor = this.color;
            this.stackDiv.children[i].children[0].style.color = this.color;
        }
    }

    // This method is not written by me. It came from Stackoverflow.
    // Reference: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    fadeAway(element) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

    // This method is not written by me. It came from Stackoverflow.
    // Reference: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    fadeAppear(element) {
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }


    peekElement() {
        console.log("peek")
        let originalColor = this.stackDiv.firstChild.children[0].style.color
        console.log(originalColor)
        this.restoreDiagramToOriginalColor()

        setTimeout(() => {
            this.stackDiv.firstChild.style.borderLeft = "3.5px solid red"
            this.stackDiv.firstChild.style.borderColor = "red";
            this.stackDiv.firstChild.style.borderWidth = "3.5px";
            this.stackDiv.firstChild.children[0].style.color = "red";
            this.fadeAppear(this.stackDiv.firstChild)

        }, 200)

    }


    pushElement(e) {
        console.log("push")
        e.preventDefault()
        console.log(e.target.children[0].value)
        this.restoreDiagramToOriginalColor()


        const stackNode = document.createElement("div");
    
        const stackNodeValue = document.createElement("p");
        stackNodeValue.innerText = e.target.children[0].value
        stackNodeValue.style = "font-family: sans-serif; font-size: 25px";
        stackNodeValue.style.color = this.color;
    
        stackNode.appendChild(stackNodeValue);
        stackNode.style = "min-width: 60px; height: 40px; border: 1px solid black; text-align: center; ";
        stackNode.style.borderColor = this.color;
        
        setTimeout(() => {
            this.fadeAppear(stackNode);
            this.stackDiv.insertBefore(stackNode, this.stackDiv.firstChild);            
        }, 200)
    }

    popElement() {
        console.log("pop")
        this.restoreDiagramToOriginalColor()

        let numOfStackNodes = this.stackDiv.children.length
        this.fadeAway(stackDiv.children[0])

        setTimeout(() => {
            if (this.stackDiv.firstChild) {
                this.stackDiv.removeChild(this.stackDiv.firstChild)
            }
        }, 1000)
    }
}



class AlgoDomQueue {
    constructor(color, elements, showUI) {
        this.color = color;
        this.elements = elements;
        this.showUI = showUI;
        this.queueDiv = document.createElement("div");
        this.mainContainerDiv = document.createElement("div");
    }

    drawQueue() {

        this.queueDiv.style = "display: flex; flex-direction: row; padding: 5px; padding-top: 15px; width: 700px; border-top: 4px solid black; border-bottom: 4px solid black;" 
        this.queueDiv.style.width = (this.elements.length * 80 + 200).toString() + "px";
    
        // Arrow indicating tail of queue
        const queueIn = document.createElement("div");
        queueIn.style = "margin: 0px 20px";
        const queueInValue = document.createElement("p");
        queueInValue.innerText = "⎯⎯⎯> IN";
        queueInValue.style = "font-family: sans-serif; font-size: 25px;";
        queueInValue.style.color = this.color;
        queueIn.appendChild(queueInValue);
        
        // Arrow indicating head of queue
        const queueOut = document.createElement("div");
        queueOut.style = "margin: 0px 20px";
        const queueOutValue = document.createElement("p");
        queueOutValue.innerText = "⎯⎯⎯> OUT";
        queueOutValue.style = "font-family: sans-serif; font-size: 25px;";
        queueOutValue.style.color = this.color;
        queueOut.appendChild(queueOutValue);
    
    
        this.queueDiv.appendChild(queueIn)
    
        for (let i = this.elements.length - 1; i >= 0; i--) {
            const queueNode = document.createElement("div");
            queueNode.setAttribute("id", "queueNode" + i);
        
            const queueNodeValue = document.createElement("p");
            queueNodeValue.innerText = this.elements[i];
            queueNodeValue.style = "font-family: sans-serif; font-size: 25px";
            queueNodeValue.style.color = this.color;
        
            queueNode.appendChild(queueNodeValue);
            queueNode.style = "min-width: 40px; height: 40px; border: 1px solid black; text-align: center; ";
            queueNode.style.borderColor = this.color;
    
            if (i != this.elements.length - 1) {
                queueNode.style.borderLeft = 0;
            }
    
            this.queueDiv.appendChild(queueNode);
    
    
            if (i == 0) {
                this.queueDiv.appendChild(queueOut)
            }
        }


        this.mainContainerDiv.appendChild(this.queueDiv)
        this.mainContainerDiv.style = `display: flex; flex-direction: column; align-items: flex-start`

        let formStyle = ` 
                        margin: 20px 0px;
                        display: flex;
                        flex-direction: row;
                        gap: 15px;
                        `
        let formTextAreaStyle = `width: 60px; height: 40px; resize: none;`

        let formButtonStyle = `
                                font-family: verdana
                                color: black;
                                border: 1px solid black; 
                                border-radius: 10px;
                                background-color: white;
                                padding: 5px 5px;
                                `

        // UI for peek ============================================
        let peekButton = document.createElement("button");
        peekButton.innerText = "Peek";
        peekButton.style = formButtonStyle;
        peekButton.style.margin = "15px 74px"

        // UI for enqueue =========================================
        let enqueueElementForm = document.createElement("form");
        enqueueElementForm.onsubmit = (e) => this.enqueueElement(e);
        enqueueElementForm.style = formStyle

        let enqueueElementFormTextArea = document.createElement("textarea");
        enqueueElementFormTextArea.setAttribute("type", "text")
        enqueueElementFormTextArea.style = formTextAreaStyle

        let enqueueElementFormInput = document.createElement("input");
        enqueueElementFormInput.setAttribute("type", "submit")
        enqueueElementFormInput.setAttribute("value", "Enqueue")
        enqueueElementFormInput.style = formButtonStyle;

        enqueueElementForm.appendChild(enqueueElementFormTextArea)
        enqueueElementForm.appendChild(enqueueElementFormInput)
        

        // UI for dequeue =========================================
        let dequeueButton = document.createElement("button");
        dequeueButton.innerText = "Dequeue";
        dequeueButton.style = formButtonStyle;
        dequeueButton.style.margin = "0px 74px"

        
        // Add event listeners for the buttons
        // Reference: https://stackoverflow.com/questions/52488110/why-cant-i-call-class-function-inside-addeventlistener/52488238
        peekButton.addEventListener("click", () => this.peekElement())
        dequeueButton.addEventListener("click", ()=> this.dequeueElement())

        if (this.showUI == true) {
            this.mainContainerDiv.appendChild(peekButton);
            this.mainContainerDiv.appendChild(dequeueButton);
            this.mainContainerDiv.appendChild(enqueueElementForm);
        
        }
    
        return this.mainContainerDiv;
    }


    restoreDiagramToOriginalColor() {
        for (let i = 0; i < this.queueDiv.children.length; i++) {

            this.queueDiv.children[i].style.borderWidth = "1px";
            this.queueDiv.children[i].style.borderColor = this.color;
            this.queueDiv.children[i].children[0].style.color = this.color;
        }
    }

    
    // This method is not written by me. It came from Stackoverflow.
    // Reference: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    fadeAway(element) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }


    // This method is not written by me. It came from Stackoverflow.
    // Reference: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    fadeAppear(element) {
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }
    

    peekElement() {
        console.log("peek")
        this.restoreDiagramToOriginalColor()

        let queueFrontIndex = this.queueDiv.children.length - 2;
        

        let originalColor = this.queueDiv.firstChild.children[0].style.color

        setTimeout(() => {
            this.queueDiv.children[queueFrontIndex].style.borderLeft = "3.5px solid red"
            this.queueDiv.children[queueFrontIndex].style.borderColor = "red";
            this.queueDiv.children[queueFrontIndex].style.borderWidth = "3.5px";
            this.queueDiv.children[queueFrontIndex].children[0].style.color = "red";
            this.fadeAppear(this.queueDiv.children[queueFrontIndex])

        }, 200)
    }


    enqueueElement(e) {
        console.log("enqueue")
        e.preventDefault();
        this.restoreDiagramToOriginalColor()

        const queueNode = document.createElement("div");
            
        const queueNodeValue = document.createElement("p");
        queueNodeValue.innerText = e.target.children[0].value
        queueNodeValue.style = "font-family: sans-serif; font-size: 25px";
        queueNodeValue.style.color = this.color;
    
        queueNode.appendChild(queueNodeValue);
        queueNode.style = "min-width: 40px; height: 40px; border: 1px solid black; text-align: center; ";
        queueNode.style.borderColor = this.color;

        setTimeout(() => {
            this.fadeAppear(queueNode);
            this.queueDiv.insertBefore(queueNode, this.queueDiv.children[1]);
        }, 450)

    }


    dequeueElement() {
        this.restoreDiagramToOriginalColor()

        let numOfQueueNodes = this.queueDiv.children.length
        this.fadeAway(this.queueDiv.children[numOfQueueNodes-2])

        setTimeout(() => {
            if (this.queueDiv.firstChild) {
                this.queueDiv.removeChild(this.queueDiv.children[numOfQueueNodes-2])
            }
        }, 500)

    }
}


class AlgoDomAnimation {
    constructor(parentContainer, diagramList, animationSpeed) {
        this.parentContainer = parentContainer;
        this.diagramList = diagramList;
        this.animationSpeed = animationSpeed;
        this.speed = 0;
        this.totalFrames = 0;
        this.frameCount = 0;
    }

    animate() {
        if (this.animationSpeed == 0) {
            parentContainer.removeChild(this.parentContainer.firstChild)
            return;
        }
        if (this.animationSpeed === 1) {
            this.speed = 2500;
        } else if (this.animationSpeed == 2) {
            this.speed = 1500;
        } else if (this.animationSpeed == 3 ) {
            this.speed = 500;
        } else {
            this.speed = 1000;
        }
    
        this.totalFrames = this.diagramList.length;
    
        let interval = setInterval(() => {
            // Reference for idea: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
            
            // Remove current diagram
            if (this.parentContainer.firstChild) {
                this.parentContainer.removeChild(this.parentContainer.firstChild)
            }
    
            // Add next diagram
            this.parentContainer.appendChild(this.diagramList[this.frameCount]); 
            this.frameCount++;
    
            // Replay the animation continuously
            if (this.frameCount == this.totalFrames) {
                this.frameCount = 0;
            }
        }, this.speed);
    
        return this.interval;
    }
}



