const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.use((req,res)=>{
  res.send('hello Almabetter')
})
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
