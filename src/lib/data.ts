export type AppUser = {
  id: string;
  name: string;
  email: string;
};

export async function getUser(id: string): Promise<AppUser> {
  // fejk tills vidare
  return { id, name: "Victoria", email: "victoriafingal@hotmail.se" };
}
