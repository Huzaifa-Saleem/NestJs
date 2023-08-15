import { Role } from 'src/enum/role.enum';

export class User {
  id: number;
  isAdmin: boolean;
  roles: Role[];
}
