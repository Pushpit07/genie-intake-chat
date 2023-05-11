import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { acceptTeamInvite } from "@/backend/controllers/invitesController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).post(acceptTeamInvite);

export default handler;
