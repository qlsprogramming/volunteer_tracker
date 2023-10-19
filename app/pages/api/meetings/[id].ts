import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import  prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method !== "POST") return res.status(400).json({ message: "Oops" });
  
  const meeting_id = req.query.id as string
  const submitted_code = req.body.code
  
  const meeting = await prisma.meeting.findFirst({
    where: {
        id: meeting_id
    }
  })
  if (meeting == null) return res.status(400).json({message: "Incorrect Meeting Code"})
  if (meeting?.code !== submitted_code) return res.status(400).json({ message: "Bad code"})
  
  const user = await prisma.user.update({
    where: {
        id: session.user!.id
    },
    data: {
      meetings: {
        connect: {
          id: meeting.id
        }
      }
    }
  })
  return res.json({ message: "Meeting added" });
}
