const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

let records = [
  {
    id: 1,
    recordName: 'The Bends',
    artistName: 'Radiohead',
    description:
      'This album is a masterpiece.  I had the privilege of seeing Radiohead open up for Soul Asylum at The Warfield in San Francisco.  It was historic, intense, visceral, raw.  We were in the front row of the sardine-packed dancefloor.',
  },
  {
    id: 2,
    recordName: 'Fear of the dark',
    artistName: 'Iron Maiden',
    description:
      'Triumphant return of Bruce and Adrian.  Start of a new renaissance for iron maiden. All tracks are great and epic',
  },
  {
    id: 3,
    recordName: 'Piano Man',
    artistName: 'Billy Joel',
    description: 'Lovely album',
  },
];

app.get('/api/records', (req, res) => {
  res.send(records);
});
app.post('/api/records', (req, res) => {
  const newRecord = {
    id:
      records.reduce((acc, item) => {
        return item.id > acc ? item.id : acc;
      }, 0) + 1,
    ...req.body,
  };
  records.push(newRecord);
  res.send(newRecord);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
