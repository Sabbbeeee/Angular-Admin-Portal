const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

function readDB() {
  return JSON.parse(fs.readFileSync('db.json'));
}

app.post('/login', (req, res) => {

  const { userid, password, role } = req.body;

  setTimeout(() => {

    const db = readDB();

    const user = db.users.find(
      u =>
        u.userid === userid &&
        u.password === password &&
        u.role === role
    );

    if (user) {
      res.json({
        success: true,
        user
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

  }, 3000);

});

app.listen(PORT, () => {
  console.log('Server running on port 3000');
});