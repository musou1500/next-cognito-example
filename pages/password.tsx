import { Auth } from "aws-amplify";
import { useState } from "react";
import { Layout } from "../components/layout";
import { useAuthGuard } from "../hooks/use-auth-guard";

const UpdatePassword = () => {
  const { user } = useAuthGuard();
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassowrd: "",
  });

  return (
    user && (
      <Layout>
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await Auth.changePassword(
              user,
              formValues.oldPassword,
              formValues.newPassowrd
            );
          }}
        >
          <input
            type="text"
            placeholder="old_password"
            onChange={(e) => {
              setFormValues((s) => ({ ...s, oldPassword: e.target.value }));
            }}
          />
          <input
            type="text"
            placeholder="new_password"
            onChange={(e) => {
              setFormValues((s) => ({ ...s, newPassowrd: e.target.value }));
            }}
          />

          <button type="submit">パスワードを変更</button>
        </form>
      </Layout>
    )
  );
};

export default UpdatePassword;
