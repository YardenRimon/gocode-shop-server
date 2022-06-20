import * as fsp from "fs/promises";
import express from "express";

const app = express();
app.get("/products", (req, res) => {
  fsp.readFile("./products.json", "utf8").then((data) => res.send(data));
});

app.get("/products/:productId", (req, res) => {
  fsp.readFile("./products.json", "utf8").then((data) => {
    // console.log(productId);
    const products = JSON.parse(data);
    const product = products.find(
      (product) => product.id === +req.params.productId
    );
    if (product) {
      res.send(product);
    } else {
      res.send("Balagan");
    }
  });
});

function getMaxId(arr) {
  const ids = arr.map((object) => {
    return object.id;
  });
  const max = Math.max(...ids);
  return max;
}

app.use(express.json());

app.post("/products", (req, res) => {
  console.log("req.body", req.body);
  fsp.readFile("./products.json", "utf8").then((data) => {
    const products = JSON.parse(data);
    products.push({
      id: getMaxId(products) + 1,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      rating: req.body.rating,
    });
    fsp.writeFile("./products.json", JSON.stringify(products));
    res.send(products);
  });
});

app.listen(8000);
