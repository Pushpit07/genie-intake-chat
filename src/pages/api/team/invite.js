import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { sendTeamInviteEmail } from "@/backend/controllers/invitesController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).post(sendTeamInviteEmail);

export default handler;
