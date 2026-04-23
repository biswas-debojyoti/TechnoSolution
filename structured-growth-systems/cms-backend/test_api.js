async function testApi() {
  try {
    const res = await fetch('http://localhost:5000/api/expenses');
    const data = await res.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('API Error:', err.message);
  }
}

testApi();
