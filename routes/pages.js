const pageRouter = require('express').Router();
const path = require('path');

pageRouter.get('/notes', (req, res) => {
  // console.log({req,res});
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

pageRouter.get('*', (req, res) => {
  // console.log({req,res});
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = { pageRouter };