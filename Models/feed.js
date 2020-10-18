class feed {
  constructor(
    createdBy,
    title,
    description,
    techStack,
    lookingFor,
    media,
    createdAt,
    feedId,
    interestedPeople
  ) {
    this.createdBy = createdBy;
    this.title = title;
    this.description = description;
    this.techStack = techStack;
    this.lookingFor = lookingFor;
    this.media = media;
    this.createdAt = createdAt;
    this.feedId = feedId;
    this.interestedPeople = interestedPeople;
  }
}

export default feed;
