const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

req.on('error', (err) => {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('TIMEOUT: Health check timed out');
  req.destroy();
  process.exit(1);
});

req.end();
