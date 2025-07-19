const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Port configuration
const PORT = process.env.PORT || 3000;

// MIME types for different file extensions
const contentTypes = {
'.html': 'text/html',
'.css': 'text/css',
'.js': 'text/javascript',
'.json': 'application/json',
'.png': 'image/png',
'.jpg': 'image/jpeg',
'.jpeg': 'image/jpeg',
'.gif': 'image/gif',
'.svg': 'image/svg+xml',
'.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
// Parse the request URL
const parsedUrl = url.parse(req.url);

// Determine the file path
let filePath = path.join(__dirname, parsedUrl.pathname);

// If path ends with '/', serve index.html
if (filePath.endsWith('/')) {
    filePath = path.join(filePath, 'index.html');
}

// Get the file extension
const extname = path.extname(filePath);

// Set the default content type to text/plain
let contentType = contentTypes[extname] || 'text/plain';

// Read the file
fs.readFile(filePath, (err, content) => {
    if (err) {
    if (err.code === 'ENOENT') {
        // File not found
        console.error(`File not found: ${filePath}`);
        res.writeHead(404);
        res.end('404 - File Not Found');
    } else {
        // Server error
        console.error(`Server error: ${err.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
    }
    } else {
    // Success - send the file
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
    }
});
});

server.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}/`);
console.log(`Serving files from: ${__dirname}`);
});

