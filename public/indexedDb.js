
(function () {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js")
            .then(res => {
                console.log(res);
                console.log("Service Worker registered successfully.");
            })
            .catch(error =>
                console.log("Service Worker registration failed:", error)
            );
    }
})();


let db;

//establish connection with database
const request = indexedDB.open('budget', 1);

request.onupgradeneeded = function(event) {

    const db = event.target.result;
    

    db.createObject('new_transaction', { autoIncrement: true });








window.addEventListener('online', checkDatabase);