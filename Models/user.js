class user {
  constructor(
    userId,
    name,
    firstName,
    lastName,
    bio,
    github,
    linkedin,
    gmail,
    profile_picture,
    created_at
  ) {
    this.userId = userId;
    this.name = name;
    this.firstName = firstName;
    this.lastName = lastName;
    this.bio = bio;
    this.github = github;
    this.linkedin = linkedin;
    this.gmail = gmail;
    this.profile_picture = profile_picture;
    this.created_at = created_at;
  }
}

export default user;
