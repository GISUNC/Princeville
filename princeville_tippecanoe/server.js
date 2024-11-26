const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Choose any available port

// Serve files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pmtiles.html'));
  });
app.get('/leaflet', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'PrincevilleLeaflet.html'));
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
