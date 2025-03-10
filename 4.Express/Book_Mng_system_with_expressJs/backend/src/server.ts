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
    origin: "http://localhost:5173", // Allow requests from React development server
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
// Parse JSON data and extract the books array
const books = JSON.parse(booksData).books;

// API endpoint to get books with optional filtering and sorting
app.get("/api/books", (req: Request, res: Response) => {
  try {
    // Extract query parameters for filtering and sorting
    const { search, genre, year, sort } = req.query;

    // Create a copy of the books array to avoid modifying the original
    let filteredBooks = [...books];

    // Apply filters
    if (genre) {
      // Filter books by genre (case-insensitive)
      filteredBooks = filteredBooks.filter(
        (book) => book.genre.toLowerCase() === (genre as string).toLowerCase()
      );
    }

    if (search) {
      // Filter books by search term in title or author (case-insensitive)
      const searchTerm = (search as string).toLowerCase().trim();
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (sort) {
      // Parse sort parameter (format: field-order, e.g., "year-asc")
      const [sortField, sortOrder] = (sort as string).split("-");

      if (sortField === "year") {
        // Sort by publication year
        filteredBooks.sort((a, b) => {
          return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
        });
      } else if (sortField === "pages") {
        // Sort by number of pages
        filteredBooks.sort((a, b) => {
          return sortOrder === "asc" ? a.pages - b.pages : b.pages - a.pages;
        });
      }
    }

    // Return the filtered and sorted books as JSON
    res.json({
      books: filteredBooks,
    });
  } catch (error) {
    // Handle any errors that occur during processing
    console.error("Error processing book request:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

// WARNING: This is a duplicate route that will never be reached
// The first matching route handler will be used
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
