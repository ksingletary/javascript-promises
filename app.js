// Promises Exercise

let favNum = 18;
let baseURL = "http://numbersapi.com"

$.getJSON(`${baseURL}/${favNum}?json`).then(data => {
    console.log(data);
})

let favNumbs = [18, 23, 22]

$.getJSON(`${baseURL}/${favNumbs}?json`).then(data => {
    console.log(data);
})

let allPromises = Array.from({ length: 4}, () => $.getJSON(`${baseURL}/${favNum}?json`))

Promise.all(allPromises)
    .then(facts => {
        facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
    })
    .catch(error => console.error("error:", error));