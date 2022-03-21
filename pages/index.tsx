import type { NextPage } from "next";
import { Authenticator } from "@aws-amplify/ui-react";
import { Layout } from "../components/layout";

const formFields = {
  signUp: {
    nickname: {
      isRequired: true,
      placeholder: "Nickname",
      order: 1,
    },
    email: {
      order: 2,
    },
    password: {
      order: 3,
    },
    confirm_password: {
      order: 4,
    },
  },
};

const Home: NextPage = () => {
  return (
    <Authenticator loginMechanisms={["email"]} formFields={formFields}>
      {({ signOut, user }) => (
        <Layout>
          <h1>Hello {user.attributes!["nickname"]}</h1>
          <button onClick={signOut}>Sign out</button>
        </Layout>
      )}
    </Authenticator>
  );
};

export default Home;
