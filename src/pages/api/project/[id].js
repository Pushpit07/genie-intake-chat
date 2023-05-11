import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { getProject, updateProject, deleteProject } from "@/backend/controllers/projectController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(getProject);
handler.use(isAuthenticatedUser).put(updateProject);
handler.use(isAuthenticatedUser).delete(deleteProject);

export default handler;
