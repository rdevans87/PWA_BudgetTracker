
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

request.onError = function(evt) {
console.log(evt.target.errCode)

};

function saveRecord(rec) {
const transaction = db.transaction(['new_transaction'], 'readWrite'); 
const budgetObjectStore = transaction.objectStore('new_transaction');
budgetObjectStore.add(rec);

};

if (getAll.result.length > 0) {
fetch('/api/transaction', {
    method: 'POST',
    body: JSON.stringify(getAll.result),
    headers: {
        Accept: 'application/json, text/plain, */*',
       'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(serverResponse => {
    if (serverResponse.message) {
    throw newError(serverResponse);

}

});

const transaction = db.transaction(['new_transaction'], 'readWrite');
const budgetObjectStore = transaction.objectStore('new_transaction');
budgetObjectStore.clear();
alters('Saved Transactions' )






window.addEventListener('online', checkDatabase)