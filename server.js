import * as fsp from "fs/promises";
import * as http from "http";
function writeHeb(heFile, heWord) {
  fsp
    .writeFile(`./${heFile}`, heWord)
    .then(() => console.log("done"))
    .catch((err) => console.log(err));
}

function rtanslateWord(data) {
  fsp.readFile("./translates.json", "utf8").then((x) => {
    const json = JSON.parse(x);
    for (let i = 0; i < json.length; i++) {
      if (json[i].en === data) {
        console.log(json[i].he);
        writeHeb("he.txt", JSON.stringify(json[i].he));
        console.log("found");
      }
    }
  });
}

http
  .createServer((request, response) => {
    fsp.readFile("./en.txt", "utf8").then((data) => {
      rtanslateWord(data);
    });
    response.writeHead(200, { "content-Type": "text/plain" });
    response.end("success");
  })
  .listen(8000);
