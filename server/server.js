import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const buildFolder = "../dist";
const buildPath = path.join(__dirname, buildFolder);
const indexPath = path.join(buildPath, "index.html");

const dbURL = "mongodb+srv://final-exam-practice:final-exam-practice@pfw-cs.ctovaum.mongodb.net/final-exam-practice?retryWrites=true&w=majority";

const app = express();

//TODO Implement missing structures and functionality
//DB connection, middleware, and API routes
//DB Connection-----------------
mongoose.connect(dbURL, {
  useNewURLParser: true,
  userUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error(err));

//middleware--------------------
app.use(cors());
app.use(express.json());

///mongoose schema + model------------------
const animalSchema = new mongoose.Schema ({
  animal: String,
  url: String
})

const Animal = mongoose.model("Animal", animalSchema);

//API ---------------------------------
// POST /animals/upload
app.post ("/amimals/upload", async (req, res) => {
  const {name, pictureUrl } = req.body;

  //save to db
  await Animal.create({
    animal: name,
    url: pictureUrl
  });
  
  res.send(`Animal ${name} uploaded!`);
})

//GET /amimals/searc/:animal
app.get("/animals/search/:amimal", async (req, res) => {
  const search = req.params.animal;
  const matches = await Animal.find({
    animal: { $regex: new RegExp(`^${search}$`, "i") }
  });

  res.json(matches);
})

//DELETE /animals/clear
app.delete("/animals/clear", async (req, res) => {
  await Animal.deleteMany({});
  res.json({ message: "All animals deleted."});
});

//serv react build
app.use(express.static(buildPath));
app.get("*", (_, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
})

//start server
const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//npm run dev to start React app and Express server
//npm run prod to build React app and start Express server