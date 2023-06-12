const express = require('express');
const pool = require('./dbConnection');
const path = require('path');
const PORT = 8080;


const app = express();
// parses JSON from incoming request
app.use(express.json());

// Do not edit
const options = {
  lemon:  'yellow',
  lime: 'limegreen',
  tangerine: 'orange',
  grapefruit: 'lightcoral'
};

// #3 helper function 'getColor`
const getColor = (fruit) => {

  if (Object.keys(options) === fruit){
    return Object.values(options); 
  }
  if (!Object.keys(options)){
    console.log('Not found')
  }

}


// #1 serve the colors.html page when /colors is visited
// DO NOT USE express.static
app.get('/colors', (req, res) => {
const ABSOLUTE_PATH = path.join(__dirname, './client/colors.html')
res.status(200).send(ABSOLUTE_PATH);
  
});

// #2 & #4 handle POST requests to /colors
app.post('/colors', (req, res) => {
   let fruit = req.body; 
   let color = getColor(fruit);

   res.send(color)

});

// #6 serve styles.css - DO NOT use express.static()
app.get('/styles.css', () => {
  const ABSOLUTE_PATH = path.join(__dirname, './client/styles.css')
  res.status(200).send(ABSOLUTE_PATH);

});

// #5 Update functionality to database
app.put('/colors/:id/:fruit', async (req, res) => {
  let { car_id, fruit } = req.params;
  let color = getColor(fruit);

  const [carColor] = await pool.execute('UPDATE cars SET color = ? WHEN car_id =?', [color, car_id])

  res.status(200).send({message: 'Color updated'})

});

// #7 unknown routes - 404 handler
// research what route to serve this for
app.get('**', (req, res) => {
  const ABSOLUTE_PATH = path.join(__dirname, './client/404.html')
  res.status(200).send(ABSOLUTE_PATH);
  
})

// Global error handling middleware
// You can leave this alone
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
