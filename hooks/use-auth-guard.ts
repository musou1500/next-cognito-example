import { useCallback, useEffect, useState } from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

export const useAuthGuard = () => {
  const [user, setUser] = useState<
    | (CognitoUser & {
        attributes: {
          email: string;
          email_verified: boolean;
          nickname: string;
        };
      })
    | null
  >(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch (e) {
        router.push("/");
      }
    })();
  }, [router]);

  return {
    user,
    refetch: useCallback(async () => {
      // キャッシュからユーザデータを更新する
      // `updateUserAttributes` や `verifyUserAttribute` はキャッシュの更新は行うが
      // `user` オブジェクト内のデータは更新しないので，キャッシュからユーザデータを再取得する必要がある
      setUser(await Auth.currentAuthenticatedUser());
    }, []),
  };
};
