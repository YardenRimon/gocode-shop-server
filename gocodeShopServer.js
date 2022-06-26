import * as fsp from "fs/promises";
import express from "express";
import mongoose from "mongoose";

const app = express();

const Product = mongoose.model("Product", {
  title: String,
  price: Number,
  description: String,
});

mongoose.connect("mongodb://localhost:27017/GoCodeShop").then(() => {
  app.listen(8000);
});
// app.get("/products", (req, res) => {
//   fsp.readFile("./products.json", "utf8").then((data) => res.send(data));
// });

// app.get("/products/:id", (req, res) => {
//   fsp.readFile("./products.json", "utf8").then((data) => {
//     // console.log(id);
//     const products = JSON.parse(data);
//     const product = products.find((product) => product.id === +req.params.id);
//     if (product) {
//       res.send(product);
//     } else {
//       res.send("Balagan");
//     }
//   });
// });

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

app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  // const { title } = req.body;
  fsp.readFile("./products.json", "utf8").then((data) => {
    if (req.body) {
      const products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === +id);
      products[productIndex] = { ...products[productIndex], ...req.body };
      fsp.writeFile("./products.json", JSON.stringify(products)).then(() => {
        res.send(products);
      });
      console.log("req.params", req.params);
      console.log("req.body", req.body);
    }
    console.log("else");
  });
});
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  fsp.readFile("./products.json", "utf8").then((data) => {
    if (req.body) {
      const products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === +id);
      products.splice(productIndex, 1);
      fsp.writeFile("./products.json", JSON.stringify(products)).then(() => {
        res.send(products);
      });
    }
  });
});

app.get("/products", (req, res) => {
  console.log("req.query", req.query);
  fsp.readFile("./products.json", "utf8").then((data) => {
    const products = JSON.parse(data);
    if (req.query) {
      const { description } = req.query;
      const filteredProducts = products.filter((product) =>
        product.description.toLowerCase().includes(description.toLowerCase())
      );
      res.send(filteredProducts);
    } else {
      res.send(products);
    }
  });
});

app.get("/products/:id", (req, res) => {
  console.log("req.ip", req.ip);
  const { id } = req.params;
  console.log("id", id);
  fsp.readFile("./products.json", "utf8").then((data) => {
    const products = JSON.parse(data);
    const product = products.find((product) => product.id === +id);
    if (product) {
      res.send(product);
    } else {
      res.send("Lech abaita");
    }
  });
});
// app.listen(8000);
