import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { createMember } from "@/backend/controllers/memberController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).post(createMember);

export default handler;
