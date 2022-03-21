import { Auth } from "aws-amplify";
import { useState } from "react";
import { Layout } from "../components/layout";
import { useAuthGuard } from "../hooks/use-auth-guard";

const UpdatePassword = () => {
  const { user, refetch } = useAuthGuard();
  const [formValues, setFormValues] = useState({
    code: "",
  });
  const [isPending, setIsPending] = useState(false);

  return (
    user && (
      <Layout>
        <button onClick={() => Auth.verifyUserAttribute(user, "email")}>
          resend code
        </button>
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();
            setIsPending(true);
            try {
              await Auth.verifyUserAttributeSubmit(
                user,
                "email",
                formValues.code
              );
              refetch();
            } finally {
              setIsPending(false);
            }
          }}
        >
          <input
            type="code"
            name="code"
            value={formValues.code}
            onChange={(e) =>
              setFormValues((s) => ({ ...s, code: e.target.value }))
            }
          />

          <button type="submit" disabled={isPending}>
            コードを送信
          </button>
        </form>
      </Layout>
    )
  );
};

export default UpdatePassword;
