const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
    console.log(response);
    res.setHeader('Content-Type', 'application/json');
    res.json(response.data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).send('Server Error');
  }
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.get("/in",(req,res)=>{
    res.send("its working");
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
