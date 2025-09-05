// node.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy Movies
const movies = [
  {
    id: "m1",
    title: "The Star Voyager",
    genre: "Sci-Fi",
    rating: 8.5,
    duration: 128,
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
    synopsis: "A daring crew risks everything to cross a cosmic rift."
  },
  {
    id: "m2",
    title: "Midnight Murmurs",
    genre: "Thriller",
    rating: 7.8,
    duration: 114,
    image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66",
    synopsis: "A journalist uncovers whispers that could topple a regime."
  }
];

const showTimes = ["10:00", "13:30", "16:45", "20:15"];
const bookings = [];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => res.render("index", { movies }));
app.get("/movie/:id", (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) return res.status(404).render("404");
  res.render("movie", { movie, showTimes });
});
app.get("/book/:id", (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) return res.status(404).render("404");
  res.render("book", { movie, showTimes });
});
app.post("/book/:id", (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) return res.status(404).render("404");
  const { name, email, qty, date, time } = req.body;
  const booking = {
    id: "b" + (bookings.length + 1),
    movieId: movie.id,
    name,
    email,
    qty,
    date,
    time
  };
  bookings.push(booking);
  res.redirect("/confirm/" + booking.id);
});
app.get("/confirm/:id", (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  const movie = movies.find(m => m.id === booking.movieId);
  res.render("confirm", { booking, movie });
});
app.get("/admin/bookings", (req, res) => res.render("admin", { bookings, movies }));
app.use((req, res) => res.status(404).render("404"));

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
