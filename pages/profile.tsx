import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { useAuthGuard } from "../hooks/use-auth-guard";

const UpdatePassword = () => {
  const { user, refetch } = useAuthGuard();
  const [formValues, setFormValues] = useState({
    nickname: "",
    email: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(
    () =>
      setFormValues((s) => ({
        ...s,
        nickname: user?.attributes.nickname || "",
        email: user?.attributes.email || "",
      })),
    [user?.attributes.nickname, user?.attributes.email]
  );

  return (
    user && (
      <Layout>
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();
            setIsUpdating(true);
            try {
              await Auth.updateUserAttributes(user, formValues);
              await refetch();
            } finally {
              setIsUpdating(false);
            }
          }}
        >
          <input
            type="text"
            name="nickname"
            value={formValues.nickname}
            onChange={(e) =>
              setFormValues((s) => ({ ...s, nickname: e.target.value }))
            }
          />

          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues((s) => ({ ...s, email: e.target.value }))
            }
          />

          <button type="submit" disabled={isUpdating}>
            プロフィールを変更
          </button>
        </form>
      </Layout>
    )
  );
};

export default UpdatePassword;
