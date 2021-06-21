
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
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });

};

request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {
        uploadTransaction();

    }
};

request.onError = function(event) {
    console.log(event.target.errCode)

};

function saverecordord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('new_transaction');
    budgetObjectStore.add(record);

};


function uploadTransaction(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('new_transaction');

    const getAll = budgetObjectStore.getAll();

    getAll.onSuccess = function() {
    if (getAll.results.length > 0) {
        fetch('/api/transaction/bulk', {
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


        const transaction = db.transaction(['new_transaction'], 'readwrite');
        const budgetObjectStore = transaction.objectStore('new_transaction');
        budgetObjectStore.clear();
        alert('Saved Transactions');
     })
       .catch(err => {
           console.log(err);
     });
    
    } 
  
};

}

window.addEventListener('online', checkDatabase);