const metroGraph = {};

function addStation(station) {

    if (!metroGraph[station]) {
        metroGraph[station] = [];
    }

}

function addEdge(station1, station2) {

    addStation(station1);
    addStation(station2);

    metroGraph[station1].push(station2);
    metroGraph[station2].push(station1);

}

function buildMetroGraph() {

    const yellowLine = [
        "Samaypur Badli",
        "Rohini Sector 18",
        "Haiderpur Badli Mor",
        "Jahangirpuri",
        "Azadpur",
        "Model Town",
        "GTB Nagar",
        "Vishwavidyalaya",
        "Vidhan Sabha",
        "Civil Lines",
        "Kashmere Gate",
        "Chandni Chowk",
        "Chawri Bazar",
        "New Delhi",
        "Rajiv Chowk",
        "Patel Chowk",
        "Central Secretariat",
        "Udyog Bhawan",
        "Lok Kalyan Marg",
        "Jor Bagh",
        "INA",
        "AIIMS",
        "Green Park",
        "Hauz Khas"
    ];

    const violetLine = [
        "Kashmere Gate",
        "Lal Qila",
        "Jama Masjid",
        "Delhi Gate",
        "ITO",
        "Mandi House",
        "Janpath",
        "Central Secretariat"
    ];

    for (let i = 0; i < yellowLine.length - 1; i++) {
        addEdge(yellowLine[i], yellowLine[i + 1]);
    }

    for (let i = 0; i < violetLine.length - 1; i++) {
        addEdge(violetLine[i], violetLine[i + 1]);
    }

}

function bfs(source, destination) {

    const queue = [];
    const visited = new Set();
    const parent = new Map();

    queue.push(source);
    visited.add(source);
    parent.set(source, null);

    let front = 0;

    while (front < queue.length) {

        const current = queue[front++];

        if (current === destination) {
            break;
        }

        for (const neighbour of metroGraph[current]) {

            if (!visited.has(neighbour)) {

                visited.add(neighbour);
                parent.set(neighbour, current);

                queue.push(neighbour);

            }

        }

    }

    if (!visited.has(destination)) {
        return null;
    }

    const path = [];

    let current = destination;

    while (current !== null) {

        path.push(current);
        current = parent.get(current);

    }

    path.reverse();

    return path;

}

function loadStations() {

    const sourceSelect = document.getElementById("source");
    const destinationSelect = document.getElementById("destination");

    const stations = Object.keys(metroGraph).sort();

    stations.forEach(station => {

        const option1 = document.createElement("option");
        option1.value = station;
        option1.textContent = station;

        const option2 = document.createElement("option");
        option2.value = station;
        option2.textContent = station;

        sourceSelect.appendChild(option1);
        destinationSelect.appendChild(option2);

    });

}

function displayRoute(path) {

    const resultSection = document.getElementById("resultSection");
    const routePath = document.getElementById("routePath");

    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;

    document.getElementById("resultSource").textContent = source;

    document.getElementById("resultDestination").textContent = destination;

    document.getElementById("totalStations").textContent = path.length;

    const averageTimePerConnection = 3;

    const totalTime = (path.length - 1) * averageTimePerConnection;

    document.getElementById("estimatedTime").textContent =
        totalTime + " mins";

    routePath.replaceChildren();

    path.forEach((station, index) => {

        const stationElement = document.createElement("p");

        stationElement.textContent = `${index + 1}. ${station}`;

        routePath.appendChild(stationElement);

    });

    resultSection.hidden = false;

}

const routeForm = document.getElementById("routeForm");

routeForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;

    const errorMessage = document.getElementById("errorMessage");
    const resultSection = document.getElementById("resultSection");

    errorMessage.hidden = true;
    resultSection.hidden = true;

    if (!source || !destination) {

        errorMessage.textContent = "Please select both stations.";
        errorMessage.hidden = false;

        return;

    }

    const shortestPath = bfs(source, destination);

    if (shortestPath === null) {

        errorMessage.textContent = "No route found between these stations.";
        errorMessage.hidden = false;

        return;

    }

    displayRoute(shortestPath);

});

buildMetroGraph();
loadStations();
