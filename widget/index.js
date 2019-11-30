
const green = "#00ff00"
const red = "#ff0000"
const delay = "30000"
const serverURL = "https://api.battlemetrics.com/servers/"

window.resizeTo(window.screen.availWidth / 6.5, window.screen.availHeight / 6)

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
        let maxPlayers = data.data.attributes.maxPlayers
        let playerCount = data.data.attributes.players
        let playerText = `${playerCount}/${maxPlayers}`

        function main(){
            if (status == "online") {
                let maxPlayers = data.data.attributes.maxPlayers
                let playerCount = data.data.attributes.players
                let playerText = `${playerCount}/${maxPlayers} Players`

                document.getElementsByTagName("BODY")[0].style.border = `1px solid ${green}`
                document.getElementById("serverName").innerHTML = name
                
                if (queuedPlayers > 1) {
                    playerText += `(${queuedPlayers} in Que)`
                    document.getElementById("serverPlayers").innerHTML = playerText
                }
                else {
                    document.getElementById("serverPlayers").innerHTML = playerText
                    return
                }
            }
            else {
                document.getElementsByTagName("BODY")[0].style.border = `1px solid ${red}`
            }
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

