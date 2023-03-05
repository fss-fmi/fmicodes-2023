import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import nextConnect from 'next-connect';
import multer from 'multer';
import { onError } from '../../../lib/api-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import { hashPassword } from '../../../lib/password';
import { S3Client } from '../../../lib/s3-client';
import multerS3 from 'multer-s3';

interface UserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  university: string;
  universityDegree: string;
  universityMajor: string;
  universityYear: string;
  universityFacultyNumber: string;
  userTechnologies: string;
}

const handler = nextConnect(onError);

const storage = multerS3({
  s3: S3Client,
  acl: 'public-read',
  bucket: process.env.DIGITALOCEAN_SPACE_BUCKET,
  key: function (req, file, cb) {
    cb(
      null,
      'university-proof-image/' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const uploadFile = upload.single('universityProofImage');

handler.use(bodyParser.json());
handler.use(bodyParser.urlencoded({ extended: true }));
handler.use(uploadFile);

// POST /api/users
handler.post(
  async (
    req: NextApiRequest & { [key: string]: string },
    res: NextApiResponse
  ) => {
    const userDto: UserDto = req.body;
    const user = await createUser(userDto, req.files);
    res.status(201).json(user);
  }
);

export async function createUser(userDto: UserDto, universityProofImage) {
  // TODO: Validate input form
  const hashedPassword = await hashPassword(userDto.password);

  let discordVerificationCode = Math.floor(Math.random() * Math.pow(10, 8));
  while (
    await prisma.user.findUnique({
      where: { discordVerificationCode: discordVerificationCode },
    })
  ) {
    discordVerificationCode = Math.floor(Math.random() * Math.pow(10, 8));
  }

  if (await prisma.user.findUnique({ where: { email: userDto.email } })) {
    throw new Error('User with this email already exists.');
  }

  if (await prisma.user.findUnique({ where: { phone: userDto.phone } })) {
    throw new Error('User with this phone already exists.');
  }

  if (
    await prisma.user.findUnique({
      where: { universityFacultyNumber: userDto.universityFacultyNumber },
    })
  ) {
    throw new Error('User with this university faculty number already exists.');
  }

  const { password, ...userDtoWithoutPassword } = userDto;

  const userTechnologies = userDto.userTechnologies
    ? userDto.userTechnologies.split(',').map((t) => {
        return { technology: { connect: { id: parseInt(t) } } };
      })
    : [];

  const userInformation = {
    ...userDtoWithoutPassword,
    passwordHash: hashedPassword,
    universityProofImage: universityProofImage.location,
    discordVerificationCode: discordVerificationCode,
    userTechnologies: {
      create: userTechnologies,
    },
  };

  const user = await prisma.user.create({
    data: userInformation,
  });

  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
