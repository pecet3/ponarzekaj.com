export const isUserThing = (idToCheck: string, secondId: string) => {
  if (idToCheck === secondId) {
    return true;
  } else {
    return false;
  }
};
