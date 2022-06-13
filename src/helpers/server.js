const express = require('express');
var cors = require('cors');
const {useWebPageAnalyser} = require('./crawler.js');
const app = express();
app.use(cors());
// app.get('/', (req, res) => {
//   res.send('Hello from App Engine!');
// });

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT,  () => {
  console.log(`Server listening on port ${PORT}...`);
  app.get("/params", async(req, res, next) => {
      if (req.query.url)
      {
        // let result = estafunction()
        let jsonResul =  await useWebPageAnalyser(
            ["dummy",
             "dummy",
             "http://insuit.com",
             "sleepTimeout=500",
             "responseTimeout=60000",
             "browserWidth=1920",
             "browserHeight=1080",
             "locale=es" ,
             "device=Galaxy S III"
            ])

          res.json(jsonResul); //["Tony","Lisa","Michael","Ginger","Food"]);
      }
     });
});
