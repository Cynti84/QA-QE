import { Response, Request } from "express";
import pool from "../db/db";
import asyncHandler from "../middlewares/asyncHandler";
import { UserRequest } from "../utils/types/userTypes";


//get all books - all users can get all books
export const getAllBooks = asyncHandler( async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.books ORDER BY book_id ASC "
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

//get book by id - all users can get a single book
export const getBookById = asyncHandler( async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM public.books WHERE book_id = $1",
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
})

//create a new book - only admins and librarians can create books
export const postBook = asyncHandler(async (req: UserRequest, res: Response) => {
  //Modify the createEvent function inside eventController.ts so that user_id is dynamically obtained from the logged-in user.
    //     ✅ Now, user_id is automatically set from the token instead of being manually provided.
    // ✅ Ensures only Organizer or Admin roles can create events.
  try {
    const {title, author, genre, year, pages, publisher, description, image_url, price,  created_by } = req.body;

    //extract user_id from the authenticated user''s token
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" })
      return
    }

    const user_id = req.user.id
    if (req.user.role_name !== 'Librarian' && req.user.role_name !== 'Admin' ) {
      res.status(403).json({ message: "Access denied. Only librarians and adminis can create books" })
      return
    }
    
    // Perform an admin and librarian check
    // const adminCheck = await pool.query(
    //   "select id, role_id FROM users WHERE id = $1",
    //   [created_by]
    // );

    // if (adminCheck.rows.length === 0) {
    //   res.status(400).json({ message: "Admin user does not exist" });
    //   return;
    // }
    // //  Check if the user is an admin (assuming role_id = 1 is for admins)
    // const userRole = adminCheck.rows[0].role_id;
    // if (userRole !== 1) {
    //   res
    //     .status(403)
    //     .json({ message: "Access denied. Only admins can add books." });
    //   return;
    // }

    // Insert the book
    const bookResult = await pool.query(
      "INSERT INTO books (title, author, genre, year, pages, publisher, description, image_url, price,  created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING * ",
      [title, author, genre, year, pages, publisher, description, image_url, price,  created_by]
    );

    res.status(201).json({
      message: "Book successfully added",
      book: bookResult.rows[0],
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

//put book
export const changeBook = asyncHandler( async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, author, genre, year, pages, publisher, description, image_url, price } = req.body;

    // Check if the book already exists
    const bookCheck = await pool.query(
      "SELECT * FROM books WHERE book_id = $1",
      [id]
    );

    if (bookCheck.rows.length === 0) {
      res.status(400).json({
        message: "Book does not exist",
      });
      return;
    }

    // change the book
    const bookResult = await pool.query(
      "UPDATE books set title=$1, author=$2, genre=$3, year=$4, pages=$5, publisher=$6, description=$7, image_url=$8, price=$9 WHERE book_id = $10 RETURNING *",
      [title, author, genre, year, pages, publisher, description, image_url, price]
    );

    res.status(201).json({
      message: "Book successfully added",
      book: bookResult.rows[0],
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

//patch book
export const updateBook = asyncHandler( async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, genre, year, pages, publisher, description, image_url, price } = req.body;

    // Check if the book already exists
    const bookCheck = await pool.query("SELECT * FROM books WHERE book_id = $1", [
      id,
    ]);
      if (bookCheck.rows.length === 0) {
        res.status(404).json({ message: "book not found" });
        return;
      }

    // update the book
    const bookResult = await pool.query(
      "UPDATE books set  title=$1, author=$2, genre=$3, year=$4, pages=$5, publisher=$6, description=$7, image_url=$8, price=$9 WHERE book_id = $10 RETURNING *",
      [title, author, genre, year, pages, publisher, description, image_url, price]
    );

    res.status(201).json({
      message: "Book successfully updated",
      book: bookResult.rows[0],
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

//delete book
export const deleteBook = asyncHandler( async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM public.books WHERE book_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(400).json({ message: "Book not found" });
      return;
    }

    const resultDelete = await pool.query(
      "DELETE FROM public.books WHERE book_id=$1",
      [id]
    );

    res.status(400).json({ message: "Book deleted" });
  } catch (error) {
    console.error("Error getting book by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

//filtering books
// export const bookFilter = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const { search, genre, year, sort } = req.query;
    
//     // Base query
//     let query = `SELECT * FROM books WHERE true`;
//     let queryParams: any[] = [];
//     let paramIndex = 1;

//     // Apply genre filter
//     if (genre) {
//       query += ` AND LOWER(genre) = LOWER($${paramIndex})`;
//       queryParams.push(genre);
//       paramIndex++;
//     }

//     // Apply search filter (title or author)
//     if (search) {
//       query += ` AND (LOWER(title) LIKE LOWER($${paramIndex}) OR LOWER(author) LIKE LOWER($${paramIndex}))`;
//       queryParams.push(`%${search}%`);
//       paramIndex++;
//     }

//     // Apply year filter
//     if (year) {
//       query += ` AND year = $${paramIndex}`;
//       queryParams.push(year);
//       paramIndex++;
//     }

//     // Apply sorting
//     if (sort) {
//       const [sortField, sortOrder] = (sort as string).split("-");
//       const allowedFields = ["year", "pages"];
//       const allowedOrder = ["asc", "desc"];

//       if (allowedFields.includes(sortField) && allowedOrder.includes(sortOrder)) {
//         query += ` ORDER BY ${sortField} ${sortOrder.toUpperCase()}`;
//       }
//     }

//     // Execute query
//     const result = await pool.query(query, queryParams);
    
//     res.json({ books: result.rows });

//   } catch (error) {
//     console.error("Error retrieving books:", error);
//     res.status(500).json({ error: "Failed to retrieve books" });
//   }
// })
