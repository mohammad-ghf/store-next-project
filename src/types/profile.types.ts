export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const defaultProfile: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};
