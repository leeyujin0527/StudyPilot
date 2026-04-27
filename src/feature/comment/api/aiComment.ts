import { http } from "@/src/shared/api/http";
import { getAuth } from "firebase/auth";

export const aiComment = async (): Promise<string> => {
  const auth = getAuth();

  if (!auth.currentUser) {
    throw new Error("User not logged in");
  }

  const token = await auth.currentUser.getIdToken();

  const { data } = await http.post<{ comment: string }>(
    "/api/ai/comment",
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data.comment)

  return data.comment;
};