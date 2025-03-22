import express from "express";
import { Router } from "express";
import { getAllUsers, getUserById, getUserRoles, updateUser, deleteUser } from "../controllers/userControllers";
import { protect } from "../middlewares/auth/protect";
import { adminGuard } from "../middlewares/auth/roleMiddleWare";
const router = express.Router();


//public routes
//  - go the route of api.v1/users
// - then check if they are logged in
// -  check if they are admin then
// - get the users - controller
// Modify userRoutes.ts to: ✅ Require authentication (protect) before accessing routes.
// ✅ Use role-based guards (adminGuard) to limit access.
// ✅ Admins can manage users (CRUD).
// ✅ Regular users (Organizers & Attendees) cannot modify users.
// ✅ Public registration remains open (POST /users).

router.get("/", protect, adminGuard, getAllUsers); //only admins can do these
router.get("/:id", getUserById);
router.get("/", getUserRoles);
//router.post("/", postUser); // handled in the auth routes
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
