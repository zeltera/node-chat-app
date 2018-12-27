const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(()=>{
    users = new Users();
    users.addUser('1', 'Ady', 'Room One');
    users.addUser('2', 'Jen', 'Room Two');
    users.addUser('3', 'Hen', 'Room One');
  });

  it('should create a new user', ()=>{
    const users = new Users();

    const user = {
      id: '123',
      name: 'Ady',
      room: 'Room Name'
    };
    let createdUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', ()=>{
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should NOT remove a user', ()=>{
    var userId = '1123';
    var user = users.removeUser(userId);

    expect(user).toBe(undefined);
  });

  it('should find user', ()=>{
    const user = users.getUser('2');
    expect(user.name).toBe('Jen')
  });

  it('should NOT find user', ()=>{
    const user = users.getUser('122');
    expect(user).toBe(undefined);
  });

  it('should return users in room one', ()=>{
    let userList = users.getUserList('Room One');
    expect(userList).toEqual(['Ady','Hen']);
  });

  it('should return users in room two', ()=>{
    let userList = users.getUserList('Room Two');
    expect(userList).toEqual(['Jen']);
  })
});
