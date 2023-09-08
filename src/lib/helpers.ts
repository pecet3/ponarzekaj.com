export const isUserThing = (firstId: string, secondId: string) => {
  if(!firstId || !secondId) reutrn false
  if (firstId === secondId) {
    return true;
  } else {
    return false;
  }
};
