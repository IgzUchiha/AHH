import express from "express";
import bodyParser from "body-parser";
import { dirname, join } from "path"; // Import 'join' from the 'path' module
import 'dotenv/config';
import { fileURLToPath } from "url";
// No need to import 'path' again since you've already imported 'join'

const app = express();
const port = 3333;

// Define __dirname using the 'dirname' function from the 'path' module
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, "/AHH/index4.html"), function(err) { // Use 'join' instead of concatenation
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
});

app.get('/ContactUs', (req, res) => {
    res.sendFile(join(__dirname, "public", "index2.html"), function(err) { // Use 'join' instead of concatenation
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
    });
});
app.get('/About', (req, res) => {
    res.sendFile(join(__dirname, "public", "index4.html"), function(err) { // Use 'join' instead of concatenation
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
    });
});
app.get('/Locations', (req, res) => {
    res.sendFile(join(__dirname, "public", "index3.html"), function(err) { // Use 'join' instead of concatenation
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
    });
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});