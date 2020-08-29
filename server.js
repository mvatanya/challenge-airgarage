const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors')

const port = 5000;

app.use(cors())
app.use(express.json());

app.get('/search', async function (req, res) {
  const url = `https://api.yelp.com/v3/businesses/search?categories=parking&location=${req.query.location}`
  const apiKey = 'mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx'
  const getData = async (url) => {
    try {
      const response = await axios.get(url,
        {
          headers: {
            Authorization: 'Bearer ' + apiKey
          }
        })
        
      const data = response.data
      return data
    } catch (error){
      console.log(error)
    }
  }
  const response = await getData(url)
  if(!response){
    return res.status(400).json({error: 'There is no parking garage for this location'})
  }

  return res.json( response )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// const apiKey = 'mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx'
// const response = await axios.get(`https://api.yelp.com/v3/businesses/search?categories=parking&location=${location}`,
//   {
//     headers: {
//       Authorization: 'Bearer' + apiKey
//     }
//   }
// )