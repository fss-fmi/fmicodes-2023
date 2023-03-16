import { NextApiRequest, NextApiResponse } from 'next';

import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { getUserBySession } from '../users/self';
import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import prisma from '../../../lib/prismadb';
import { getTeamsCount } from './count';
import { UserWithoutPasswordWithJoins } from '../../../lib/types';

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

  const user = await getUserBySession(session);
  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }

  const teamDto: TeamDto = req.body;
  const team = await createTeam(teamDto, user.id);

  await assignPlayerToTeam(team.id, user.id);

  res.status(201).json(team);
});

export async function createTeam(teamDto: TeamDto, userId: string) {
  const teamsCount = await getTeamsCount();

  if (teamsCount >= 22) {
    throw new Error('Достигнат е лимита на отборите.');
  }

  const projectTechnologies = teamDto.teamProjectTechnologies
    ? teamDto.teamProjectTechnologies.map((t) => {
        return { technology: { connect: { id: parseInt(t) } } };
      })
    : [];

  const teamInformation = {
    ...teamDto,
    acceptsNewMembers: true,
    captainId: userId,
    teamProjectTechnologies: {
      create: projectTechnologies,
    },
  };
  return await prisma.team.create({ data: teamInformation });
}

export async function assignPlayerToTeam(teamId: number, userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { teamId: teamId },
  });
}

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }

  const user = await getUserBySession(session);
  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    const teamDto: TeamDto = req.body;
    const team = await updateTeam(teamDto, user);

    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export async function updateTeam(
  teamDto: TeamDto,
  user: UserWithoutPasswordWithJoins
) {
  if (!user.teamCaptain) {
    throw new Error('Нямате право да редактирате този отбор.');
  }

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
  return await prisma.team.update({
    where: { id: user.teamId },
    data: teamInformation,
  });
}

export default handler;
