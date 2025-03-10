import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { readFileSync, existsSync } from "fs";

//configuring the dotenv is the top most level
dotenv.config();

//instance of express is the second top most level
const app = express();

//load the variables
const port = process.env.PORT || 3000;
console.log(port); //3000

//enable cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT, DELETE, POST",
    credentials: true, //allows cookies and auth headers
  })
);

//Middleware to parse json
app.use(express.json());

//get the current directory
const _dirname = path.resolve();

// Read the file synchronously (Handle errors properly)
const booksData = readFileSync(
  path.join(_dirname, "src", "db", "data.json"),
  "utf-8"
);
const books = JSON.parse(booksData).books;

//a simple get request

app.get("/api/books", (req: Request, res: Response) => {
  try {
    const { search, genre, year, sort } = req.query;

    let filteredBooks = [...books];

    // Apply filters
    if (genre) {
      filteredBooks = filteredBooks.filter(
        (book) => book.genre.toLowerCase() === (genre as string).toLowerCase()
      );
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase().trim();
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (sort) {
      const [sortField, sortOrder] = (sort as string).split("-");

      if (sortField === "year") {
        filteredBooks.sort((a, b) => {
          return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
        });
      } else if (sortField === "pages") {
        filteredBooks.sort((a, b) => {
          return sortOrder === "asc" ? a.pages - b.pages : b.pages - a.pages;
        });
      }
    }

    res.json({
      books: filteredBooks,
    });
  } catch (error) {
    console.error("Error processing book request:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});
app.get("/api/books", (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
