import Link from "next/link";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link passHref href="/">
              <a>Home</a>
            </Link>
          </li>

          <li>
            <Link passHref href="/profile">
              <a>Profile</a>
            </Link>
          </li>

          <li>
            <Link passHref href="/password">
              <a>Password</a>
            </Link>
          </li>

          <li>
            <Link passHref href="/email">
              <a>Enter Email Verification Code</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};
