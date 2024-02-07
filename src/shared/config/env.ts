import { plainToInstance } from 'class-transformer';
import { NotEquals, IsNotEmpty, IsString, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  dbUrl: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_token')
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
