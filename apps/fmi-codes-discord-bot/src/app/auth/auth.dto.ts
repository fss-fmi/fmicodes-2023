import {Param, ParamType} from '@discord-nestjs/core';

export class AuthDto {
  @Param({
    name: 'code',
    description: `8-цифрен верификация код от профил в сайта на събитието`,
    required: true,
    type: ParamType.INTEGER,
  })
  code: number;
}
