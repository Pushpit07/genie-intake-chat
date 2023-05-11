import nc from "next-connect";
import dbConnect from "@/lib/dbConnect";
import { getMember, updateMember, deleteMember } from "@/backend/controllers/memberController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";

const handler = nc({ onError });
dbConnect();

handler.get(getMember);
handler.use(isAuthenticatedUser).put(updateMember);
handler.use(isAuthenticatedUser).delete(deleteMember);

export default handler;
