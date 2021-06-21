
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
request.onupgradeneeded = function(evt) {
    const db = evt.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });

};

request.onsuccess = function(evt) {
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


function uploadTransaction(rec) {
    const transaction = db.transaction(['new_transaction'], 'readWrite');
    const budgetObjectStore = transaction.objectStore('new_transaction');

    const getAll = budgetObjectStore.getAll();

    getAll.onSuccess = function() {

    if (getAll.results.length > 0) {
        fetch('/api/transaction', {
            method: 'POST',
            body: JSON.stringify(getAll.results),
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


        const transaction = db.transaction(['new_transaction'], 'readWrite');
        const budgetObjectStore = transaction.objectStore('new_transaction');
        
        budgetObjectStore.clear();

        alert('Saved Transactions');
     })
       .catch(err => {
           console.log(err);
     });
    
    } 
  }  
};

window.addEventListener('online', checkDatabase)