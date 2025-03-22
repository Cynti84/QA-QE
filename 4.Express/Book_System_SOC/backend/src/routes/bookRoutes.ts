import express from "express";
import { Router } from "express";
import { getAllBooks, postBook, getBookById, changeBook, updateBook, deleteBook  } from "../controllers/booksController";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", postBook);
router.get("/:id", getBookById)
router.patch("/:id", updateBook)
router.put("/:id", changeBook)
router.delete("/:id", deleteBook)
//router.get("/", bookFilter)


export default router;
