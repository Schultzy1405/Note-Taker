const express = require('express');
const { pageRouter } = require('./routes/pages');
const { notesRouter } = require('./routes/notes')
const path = require('path')
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/', pageRouter);
app.use('/api', notesRouter)
// app.use('/assets', express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

app.listen(PORT, () => {
  console.info(`Server started on http://localhost:${PORT}`);
});