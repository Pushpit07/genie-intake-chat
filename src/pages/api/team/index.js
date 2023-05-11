import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { getMyTeams, createTeam } from "@/backend/controllers/teamController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).get(getMyTeams);
handler.use(isAuthenticatedUser).post(createTeam);

export default handler;
