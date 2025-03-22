import { Response, Request } from "express";
import pool from "../db/db";
import asyncHandler from "../middlewares/asyncHandler";

// Use UserRequest instead of Request.
// Ensure Admins manage users (using adminGuard in userRoutes.ts).
// Return only safe user details (excluding password).
// ✅ Ensures Admins can manage users (CRUD).
// ✅ Returns safe user details (excludes password).
// ✅ New users default to the Attendee role.

//getting all the users
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.users ORDER BY id ASC "
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error the users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}) 

//get a single user
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM public.users WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting user by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}) 

//get user roles
export const getUserRoles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const roles = await pool.query("SELECT * FROM user_roles");
    res.status(200).json({ roles: roles.rows });
  } catch (error) {
    console.error("Error fetching roles", error);
    res.status(500).json({ message: "Internal server error" });
  }
}) 


//updating a user
export const updateUser = asyncHandler( async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, role_id } = req.body;

    // Check if the user already exists
    const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [
      id,
    ]);
    if (userCheck.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // update the user
    const userResult = await pool.query(
      "UPDATE users set name=$1, email=$2, password=$3, role_id=$4 WHERE id = $5 RETURNING *",
      [name, email, password, role_id, id]
    );

    res.status(201).json({
      message: "User successfully updated",
      user: userResult.rows[0],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

//delete a user
export const deleteUser = asyncHandler( async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM public.users WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const resultDelete = await pool.query(
      "DELETE FROM public.users WHERE id=$1",
      [id]
    );

    res.status(400).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error getting user by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
