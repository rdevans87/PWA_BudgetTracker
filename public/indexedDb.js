
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


let indexedDb;

let budgetTracker;



window.addEventListener('online', checkDatabase);