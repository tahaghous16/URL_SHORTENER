import express from "express";
import { shortenerUrlRoutes } from "./routes/urlShortener.router.js";

const app = express();

const PORT = 3000;

//Middleware
app.use(express.urlencoded({ extended: true }));

//Express Router
app.use(shortenerUrlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
