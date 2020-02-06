
const green = "#00ff00"
const red = "#ff0000"
const delay = "30000"
const serverURL = "https://api.battlemetrics.com/servers/"

window.resizeTo(window.screen.availWidth / 6.5, window.screen.availHeight / 3)

function setup() {
    serverLabel = document.createElement("P")
    serverLabel.setAttribute("type", "text")
    serverLabel.setAttribute("id","serverLabel")
    serverLabel.innerHTML = "BattleMetrics.com"
    document.getElementById("text").appendChild(serverLabel)

    server = document.createElement("INPUT")
    server.setAttribute("type", "text")
    server.setAttribute("id","inputID")
    server.setAttribute("placeholder", "Server ID")
    document.getElementById("text").appendChild(server)
    document.body.style.border = 0
}
function fetchInfo(serverID) {
    fetch(serverURL + serverID)
    .then((resp) => resp.json())
    .then(function(data) {

        let name = data.data.attributes.name
        let status = data.data.attributes.status
        let game = data.data.relationships.game.data.id
        let queuedPlayers = data.data.attributes.details.rust_queued_players
        let wipeDay = data.data.attributes.details.rust_last_wipe
        let maxPlayers = data.data.attributes.maxPlayers
        let playerCount = data.data.attributes.players
        let playerText = `${playerCount}/${maxPlayers}`

        function wipeText() {
            dateReg = "\w{4}-\w{2}-\w{2}"
            timeReg = "\w{2}:\w{2}:\w{2}"
        }
        function main(){
            frame = document.createElement("iframe")
            frame.setAttribute("src", `https://cdn.battlemetrics.com/b/standardVertical/${serverID}.html?foreground=%ffa500&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300`)
            frame.setAttribute("frameborder", "1")
            frame.body.style.border = 0
            frame.setAttribute("name", "hrfdp")
            document.getElementById("text").appendChild(frame)
            // let maxPlayers = data.data.attributes.maxPlayers
            // let playerCount = data.data.attributes.players
            // let playerText = `${playerCount}/${maxPlayers} Players`

            // document.getElementById("serverName").innerHTML = name
            // document.getElementById("wipeTime").innerHTML = wipeDay

            // if (queuedPlayers > 1) {
            //     playerText += `(${queuedPlayers} in Que)`
            //     document.getElementById("serverPlayers").innerHTML = playerText
            // }
            // else {
            //     document.getElementById("serverPlayers").innerHTML = playerText
            //     return
            // }
        }
        main()
        setTimeout(function(){
            main()}, delay)
    })
    .catch(function(){
        console.log("Site down :(")
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
    setup()

    document.getElementById('inputID').addEventListener('keypress', function (e){
        var key = e.which || e.keyCode
        if (key === 13) {
            serverID = document.getElementById("inputID").value
            document.getElementById("inputID").remove()
            document.getElementById("serverLabel").remove()
            fetchInfo(serverID)
        }
    })
    document.getElementById("openMore").addEventListener('click', function(){
        window.open("index.html")
    })
})

