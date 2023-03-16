

import http from "http"
import fetch from "node-fetch"

const server = http.createServer((req, res) => {
    const url = req.url;
    let tableData = "<table border='1'><tr><th>Name</th><th>Height</th><th>Birth Year</th><th>Gender</th><th>URL</th></tr>";
    if(url === "/") {
        res.write("<h1>Home Page</h1>");
        res.end('<img src="https://dummyimage.com/600x400/000/fff&text=Dummy+Image">');
    }
    if(url === "/list"){
        fetch("https://swapi.dev/api/people")
        .then(res => res.json())
        .then(data => {
            createData(data.results);
            res.write(tableData);
            res.end();
        });

    }else {
        res.write("<h1>Page Not Found</h1>")
        res.end()
    }

    function createData(data) {
        data.forEach(element => {
            tableData+=`<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
        });
        tableData+= `</table>`;
    }

}).listen(8080,console.log("Server is up and listening on port " + 8080))