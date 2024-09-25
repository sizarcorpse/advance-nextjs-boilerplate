export type UserDTO = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  hasImage: boolean;
  imageUrl: string;
};

export const toUserDTO = (user: any): UserDTO => {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    hasImage: user.hasImage,
    imageUrl: user.imageUrl,
  };
};
