
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

request.onupgradeneeded = function (evt) {

    const db = evt.target.result;

    db.createObject('new_transaction', { autoIncrement: true });

};

request.onsuccess = function (evt) {

    db = evt.target.result;

    if (navigator.onLine) {
        uploadTransaction();

    }
};

request.oneErr = function(evt) {

console.log(evt.target.errCode)

};

function saveRecord(rec) {

const transaction = db.transaction(['new_transaction'], 'readwrite'); 

const budgetObjectStore = transaction.objectStore('new_transaction');

budgetObjectStore.add(rec);

};











window.addEventListener('online', checkDatabase);