const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  // seed data to run tests against
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'May',
        room: 'Node Course'
      },
      {
        id: 2,
        name: 'Zen',
        room: 'React Course'
      },
      {
        id: 3,
        name: 'Julia',
        room: 'Node Course'
      }
    ];
  });

  it('should add new user', () => {
    var newUsers = new Users();
    var user = {
      id: '123',
      name: 'Sophia',
      room: 'The Office Fans'
    };

    var response = newUsers.addUser(user.id, user.name, user.room);
    expect(response).toEqual(user);
    expect(newUsers.users).toEqual([ user ]);
  });

  it('should remove a user', () => {
    var user = users.users[0];
    var length = users.users.length;

    var response = users.removeUser(user.id);
    expect(response).toEqual(user)
    expect(users.users.length).toBe(length - 1);
  });

  it('should not remove a user', () => {
    var user = users.users[0];
    users.removeUser('1');
    var userList = users.getUserList('Node Course');
    expect(userList).toContain(user.name);
  })

  it('should find a user', () => {
    var user = users.users[0];    
    var response = users.getUser(user.id);
    expect(response).toEqual(user);
  });

  it('should not find a user', () => {
    var invalidId = 'hey';
    var response = users.getUser(invalidId);
    expect(response).not.toBeDefined();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['May', 'Julia']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Zen']);
  });
})