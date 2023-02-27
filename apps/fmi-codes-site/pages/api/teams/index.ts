import { NextApiRequest, NextApiResponse } from 'next';

import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { getUserBySession } from '../users/self';
import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import prisma from '../../../lib/prismadb';

const handler = nextConnect(onError);

interface TeamDto {
  name: string;
  projectName?: string;
  projectDescription?: string;
  projectRepository?: string;
  projectLink?: string;
  teamProjectTechnologies: string[];
}

// GET /api/teams
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const teams = await getTeams();
  res.json(teams);
});

export async function getTeams() {
  return await prisma.team.findMany({
    include: {
      members: true,
      teamProjectTechnologies: { include: { technology: true } },
    },
  });
}

// POST /api/teams
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }

  const teamDto: TeamDto = req.body;
  const team = await createTeam(teamDto);

  const user = await getUserBySession(session);
  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }
  await assignPlayerToTeam(team.id, user.id);

  res.status(201).json(team);
});

export async function createTeam(teamDto: TeamDto) {
  const projectTechnologies = teamDto.teamProjectTechnologies
    ? teamDto.teamProjectTechnologies.map((t) => {
        return { technology: { connect: { id: parseInt(t) } } };
      })
    : [];

  const teamInformation = {
    ...teamDto,
    acceptsNewMembers: true,
    teamProjectTechnologies: {
      create: projectTechnologies,
    },
  };
  return await prisma.team.create({ data: teamInformation });
}

export async function assignPlayerToTeam(teamId: number, playerId: string) {
  await prisma.user.update({
    where: { id: playerId },
    data: { teamId: teamId },
  });
}

export default handler;
