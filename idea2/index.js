divs = []

function divGen() {
    div = document.createElement("div");
    div.className = "grid-stack-item"
    div.setAttribute("data-gs-x", "10")
    div.setAttribute("data-gs-y", "10")
    div.setAttribute("data-gs-width", "10")
    div.setAttribute("data-gs-height", "10")

    document.getElementsByClassName("grid-stack").appendChild(div)

    childDiv = document.createElement("div")
    childDiv.className = "grid-stack-item-content"
    num = `div${divs.length++}`
    divs.push(num)
    childDiv.id = num
    div.appendChild(childDiv)
    div.body.style.background = "white"
    
}

// divGen()
