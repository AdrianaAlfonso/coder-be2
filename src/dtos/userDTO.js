class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.age = user.age;
    this.email = user.email;
    this.role = user.role;
  }

  get() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      email: this.email,
      role: this.role,
    };
  }
}

export default UserDTO;
