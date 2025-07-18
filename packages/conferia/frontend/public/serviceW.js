

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(error => {
            // Only send a message if the network request fails due to offline status
            if (!navigator.onLine) {
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        // Notify the client that the fetch failed due to being offline
                        client.postMessage({ type: 'OFFLINE' });
                    });
                });
            }
            // Re-throw the error to let the application handle it
            throw error;
        })
    );
});

