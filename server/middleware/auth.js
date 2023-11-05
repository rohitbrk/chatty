import bcrypt from "bcrypt";

const auth = (room, name, password) => {
  const newMembers = room.members.map((item) => item["name"]);

  if (newMembers.includes(name)) {
    let result;
    for (const member in room.members) {
      if (name === room.members[member].name)
        result = bcrypt.compareSync(password, room.members[member].password);
    }
    return result;
  }
  return true;
};

export { auth };
