import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { getTeam, updateTeam, deleteTeam } from "@/backend/controllers/teamController";
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(getTeam);
handler.use(isAuthenticatedUser).put(updateTeam);
handler.use(isAuthenticatedUser).delete(deleteTeam);

export default handler;
