import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { createProject } from "@/backend/controllers/projectController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).post(createProject);

export default handler;
