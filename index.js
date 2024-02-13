require("dotenv").config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const QUICKNODE_RPC_URL = process.env.QUICKNODE_RPC_URL;

const app = express();

const PORT="3000";
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

//https://www.quicknode.com/docs/solana/searchAssets
//Returns aggregated data on NFTs for a given wallet. 
app.post('/api/fetch', async (req, res) => {
  try {
    let { page = 1, perPage = 10, wallet } = req.body;
    let params = {
      ownerAddress: wallet,
      limit: perPage,
      page: page
    };

    const response = await axios.post(
      QUICKNODE_RPC_URL,
      {
        id: 1,
        jsonrpc: '2.0',
        method: 'searchAssets',
        params: params
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error occurred:', error);
    // Send a generic error response or customize based on the error
    res.status(500).json({ message: 'An error occurred while fetching data' });
  }
});
//https://www.quicknode.com/docs/solana/getAssetsByGroup
app.post('/api/infoCollection', async (req, res) => {
  try{
   let { page=1,perPage=10,collection } = req.body;
   let params={
     groupKey: "collection",
     groupValue: collection,
     limit: perPage,
     page: page
   };

     const response = await axios.post(
       QUICKNODE_RPC_URL, 
       {
         id: 1,
         jsonrpc: '2.0',
         method: 'getAssetsByGroup',
         params: params
       }, 
       {
         headers: { 'Content-Type': 'application/json' }
       }
     );
   
     res.status(200).json(response.data);      
   }
   
   catch (error) {
       console.error('Error occurred:', error);
       // Send a generic error response or customize based on the error
       res.status(500).json({ message: 'An error occurred while fetching data' });
     }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});