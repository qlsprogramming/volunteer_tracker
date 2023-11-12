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
  const meetings = await prisma.meeting.findMany({
    where: {
      attendees: {
        none: {
          id: session.user!.id,
        },
      },
    },
  })

  // TODO: fix filter and remove code
//   const filtered_meetings = meetings.filter((m) => m.date)
  return res.status(200).json(meetings);
}
