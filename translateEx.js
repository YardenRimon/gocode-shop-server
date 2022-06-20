import * as fsp from "fs/promises";
// import * as http from "http";
import express from "express";

function writeHeb(heFile, heWord) {
  fsp
    .writeFile(`./${heFile}`, heWord)
    .then(() => console.log("done"))
    .catch((err) => console.log(err));
}

function rtanslateWord(enWord) {
  fsp
    .readFile("./translates.json", "utf8")
    .then((x) => {
      const json = JSON.parse(x);
      const translation = json.find((wordObj) => wordObj.en === enWord);
      console.log(translation);
      writeHeb("he.txt", translation.he);
      console.log("found");
    })
    .catch((err) => console.log(err));
}

// http
//   .createServer((request, response) => {
//     fsp.readFile("./en.txt", "utf8").then((enWord) => {
//       rtanslateWord(enWord);
//     });
//     response.writeHead(200, { "content-Type": "text/plain" });
//     response.end("success");
//   })
//   .listen(8000);

const app = express();
app.get("/", (req, res) => {
  fsp.readFile("./en.txt", "utf8").then((enWord) => {
    rtanslateWord(enWord);
  });
  res.send("Hello World!");
});
app.listen(8000);
