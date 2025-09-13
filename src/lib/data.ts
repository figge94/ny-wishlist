export type AppUser = {
  id: string;
  name: string;
  email: string; // lägg till
};

export async function getUser(id: string): Promise<AppUser> {
  // fejk tills vidare
  return { id, name: "Victoria", email: "victoria@hotmail.se" };
}