import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      role: 'admin',
    },
    {
      id: 2,
      username: 'user',
      password: 'user',
      role: 'user',
    },
  ];

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
