import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import sha256 from 'crypto-js/sha256';
import nextConnect from 'next-connect';
import multer from 'multer';
import { onError } from '../../../lib/api-middleware';
import path from 'path';
import bodyParser from 'body-parser';

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
}

const handler = nextConnect(onError);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/university-proof-images');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const uploadFile = upload.single('universityProofImage');

handler.use(bodyParser());
handler.use(uploadFile);

// POST /api/user
handler.post(
  async (
    req: NextApiRequest & { [key: string]: any },
    res: NextApiResponse
  ) => {
    const userDto: UserDto = req.body;
    const user = await createUser(userDto, req.file);
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

  const userInformation = {
    ...userDtoWithoutPassword,
    passwordHash: hashedPassword,
    universityProofImage: universityProofImage.path,
    discordVerificationCode: discordVerificationCode,
  };

  const user = await prisma.user.create({
    data: userInformation,
  });

  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function hashPassword(password: string): Promise<string> {
  return await sha256(password).toString();
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
