const assert = require('assert');
const http = require('http');
const server = require('../app');

function testHealthCheck() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000/health', (res) => {
      assert.strictEqual(res.statusCode, 200, 'Health check must return 200');
      console.log('✅ PASS: Health check 200');
      resolve();
    }).on('error', reject);
  });
}

function testRootPath() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000/', (res) => {
      assert.strictEqual(res.statusCode, 200, 'Root path must return 200');
      console.log('✅ PASS: Root path 200');
      resolve();
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('\n🧪 Running Test Suite...\n');
  try {
    await testHealthCheck();
    await testRootPath();
    console.log('\n✅ All tests passed successfully!\n');
    server.close(() => process.exit(0));
  } catch (err) {
    console.error('\n❌ Test failed:', err.message);
    server.close(() => process.exit(1));
  }
}

runTests();