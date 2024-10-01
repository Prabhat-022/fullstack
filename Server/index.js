// const express = require('express');
// const mongoose = require('mongoose');
// const userSchema = require('./modules/userSchema.js')
// const app = express()
// const port = 3000;
// const cors = require('cors');



// mongoose.connect("mongodb://127.0.0.1:27017/data").then(() => {
//   console.log("mongoDB connected")
// }).catch(() => {
//   console.log(error)

// })

// //middleware
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json());

// const corsOptions = {
//     origin: 'http://localhost:5173',
//     //for save the data on browser
//     credentials: true
// };
// app.use(cors(corsOptions));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/singup', (req, res) => {

//   userSchema.create(req.body)
//     .then((employ) => {
//       res.json(employ)
//       res.send("Success")
//     })
//     .catch((err) => {
//       res.json(err)
//       res.send("Failed")
//     })

// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create express app
const app = express();
const path = require('path');

const _dirname = path.resolve();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // To parse JSON bodies

app.use(express.static(path.join(_dirname, "/Client/dist")));



// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/data", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Create User model
const User = mongoose.model('User', userSchema);

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(_dirname, "Client", "dist", "index.html"))
})

app.get('/', (req,res)=>{
  res.send("Hello world")
})
// Routes
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Create new user instance
  const newUser = new User({
    name,
    email,
    password
  });

  try {
    // Save user to database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving user to database' });
  }
});


// Listen on port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
