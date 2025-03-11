import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { readFileSync, existsSync } from "fs";
import pool from "./db/db";

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

//getting all books
app.get("/api/v1/books", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.books ORDER BY id ASC "
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get Book by Id
app.get("/api/v1/books/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM public.books WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(400).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting book by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//post to books
app.post("/api/v1/books", async (req: Request, res: Response) => {
  try {
    const { title, author, genre } = req.body;

    // Check if the book already exists
    const bookCheck = await pool.query(
      "SELECT id FROM books WHERE title = $1 AND author = $2",
      [title, author]
    );

    if (bookCheck.rows.length > 0) {
      res.status(400).json({
        message: "Book already exists",
      });
      return;
    }

    // Insert the book
    const bookResult = await pool.query(
      "INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *",
      [title, author, genre]
    );

    res.status(201).json({
      message: "Book successfully added",
      book: bookResult.rows[0],
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Put API
app.put("/api/v1/books/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, genre } = req.body;

    // Check if the book exists
    const checkBook = await pool.query("SELECT * FROM books WHERE id = $1", [
      id,
    ]);
    if (checkBook.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update the book
    const result = await pool.query(
      "UPDATE books SET title=$1, author=$2, genre=$3, updated_at=NOW() WHERE id=$4 RETURNING *",
      [title, author, genre, id]
    );

    res.json({ message: "Book updated successfully", book: result.rows[0] });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//patch API
// app.patch("/api/v1/books/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { title, author, genre } = req.body;

//     // Build dynamic update query
//     let updateFields = [];
//     let values = [];
//     let counter = 1;

//     if (title) {
//       updateFields.push(`title = $${counter++}`);
//       values.push(title);
//     }
//     if (author) {
//       updateFields.push(`author = $${counter++}`);
//       values.push(author);
//     }
//     if (genre) {
//       updateFields.push(`genre = $${counter++}`);
//       values.push(genre);
//     }

//     if (updateFields.length === 0) {
//       return res.status(400).json({ message: "No fields to update" });
//     }

//     values.push(id); // Add id as last value

//     const updateBook = await pool.query(
//       `UPDATE books SET ${updateFields.join(
//         ", "
//       )} WHERE id = $${counter} RETURNING *`,
//       values
//     );

//     if (updateBook.rowCount === 0) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.status(200).json({
//       message: "Book updated successfully",
//       book: updateBook.rows[0],
//     });
//   } catch (error) {
//     console.error("Error updating book:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

//Delete API
// app.delete("/api/v1/books/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const deleteBook = await pool.query(
//       "DELETE FROM books WHERE id = $1 RETURNING *",
//       [id]
//     );

//     if (deleteBook.rowCount === 0) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.status(200).json({
//       message: "Book deleted successfully",
//       book: deleteBook.rows[0],
//     });
//   } catch (error) {
//     console.error("Error deleting book:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

//get all books with filtering and sorting
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
