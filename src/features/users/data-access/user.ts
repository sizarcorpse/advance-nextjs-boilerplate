import { clerkClient } from "@clerk/nextjs/server";

export async function getUserById(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserByIds(userIds: string[], limit: number) {
  try {
    const { data: users } = await clerkClient.users.getUserList({
      userId: userIds,
      limit,
    });

    return users;
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsername(username: string) {
  try {
    const { data: user } = await clerkClient.users.getUserList({
      username: [username],
      limit: 1,
    });

    return user[0];
  } catch (error) {
    throw error;
  }
}
