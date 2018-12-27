[
  {
    id: "",
    room: "",
    name: ""
  }
];

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUsersList(room)

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
      const user = this.getUser(id);
      if(user){
        this.users = this.users.filter((user)=> user.id != id);
      };
      return user;
  }

  getUser(id) {
    const user = this.users.find((user) => user.id == id);
    return user;
  }

  getUserList(room){
    let users = this.users.filter((user)=> user.room == room);
    let names = users.map((user)=> user.name);

    return names;
  }

}

module.exports = {Users};
