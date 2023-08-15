import { InferSubjects } from '@casl/ability';
import { User } from 'src/entities/user.entity';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Action } from 'src/enum/actions.enum';
import {
  Ability,
  AbilityClass,
  AbilityBuilder,
  ExtractSubjectType,
} from '@casl/ability';
// import { User } from 'src/user/user.schema';

type Subjects = InferSubjects<typeof User | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    // can(Action.Update, User, { role: user.isAdmin });
    cannot(Action.Delete, User, { isAdmin: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
