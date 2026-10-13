import type { User } from "@/types/auth.types";

const USERS_KEY = "users";

export function getUsers(): User[] {
  const storedUsers = localStorage.getItem(USERS_KEY);

  if (!storedUsers) {
    return [];
  }

  try {
    const users: unknown = JSON.parse(storedUsers);

    if (!Array.isArray(users)) {
      localStorage.removeItem(USERS_KEY);
      return [];
    }

    return users as User[];
  } catch {
    localStorage.removeItem(USERS_KEY);
    return [];
  }
}

export function registerUser(user: User): boolean {
  const users = getUsers();

  const userExists = users.some(
    (item) => item.id.toLowerCase() === user.id.toLowerCase(),
  );

  if (userExists) {
    return false;
  }

  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return true;
}

export function validateUser(id: string, password: string): User | null {
  const users = getUsers();

  return (
    users.find(
      (user) =>
        user.id.toLowerCase() === id.trim().toLowerCase() &&
        user.password === password,
    ) ?? null
  );
}
