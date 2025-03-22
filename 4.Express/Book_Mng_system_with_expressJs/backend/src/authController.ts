import { Request, Response } from "express";
import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";
import pool from "./db/db"; // Adjust based on your DB setup
import dotenv from "dotenv";

dotenv.config();
