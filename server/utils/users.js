class Users {

  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var newUser = { id, name: name.toLowerCase(), room: room.toLowerCase() };
    var match = this.users.filter(user => user.name === newUser.name);
    if (match.length > 0) {
      return;
    }
    this.users.push(newUser);
    console.log('userlist:', this.users);
    return newUser;
  }

  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id); 
    } 
    return user; // return user that was removed
  }

  getUser(id) {
    var [ user ] = this.users.filter(user => user.id === id);
    return user;
  }

  getUserList(room) {
    var users = this.users.filter(user => user.room === room);
    var namesArray = users.map(user => user.name);
    return namesArray;
  }

  getRoomList() {
    var roomList = this.users.reduce((arr, user) => {
      var roomName = user.room;
      if (arr.indexOf(roomName) === -1) arr.push(roomName);
      return arr;
    }, [] );
    return roomList;
  }
}

module.exports = { Users };