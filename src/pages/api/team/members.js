import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { getTeamMembers } from "@/backend/controllers/memberController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).get(getTeamMembers);

export default handler;
