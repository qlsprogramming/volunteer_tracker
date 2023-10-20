import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const { user_id, type_meeting } = req.body;
  const user = await prisma.user.findOne({
    where: {
      id: user_id,
    },
  });

  let meetings;
  if (type_meeting === "notattended") {
    meetings = await prisma.meeting.findMany({
      where: {
        attendees: {
          none: {
            id: user_id,
          },
        },
      },
    });
    return res.status(200).json({ meetings });
  } else {
    meetings = await prisma.meeting.findMany({
      where: {
        attendees: {
          some: {
            id: user_id,
          },
        },
      },
    });
    return res.status(200).json({ meetings });
  }
}
