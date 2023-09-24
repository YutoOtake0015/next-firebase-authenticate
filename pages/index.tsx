import Head from "next/head";
import { useUser, login, logout } from "../lib/auth";

export default function Home() {
  const user = useUser();
  console.log("user: ", user);

  const handleLogin = (): void => {
    login();
    // login().catch((error) => console.error(error));
  };

  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };

  return (
    <div>
      <Head>
        <title>Auth Example</title>
      </Head>

      <div>
        <h1>Auth Example</h1>
        {user !== null ? <h2>ログイン中</h2> : <h2>非ログイン</h2>}
        <button onClick={handleLogin}>ログイン</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    </div>
  );
}
