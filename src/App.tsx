import React, { ButtonHTMLAttributes, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const publicANONKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTk4MjE1OCwiZXhwIjoxOTQ1NTU4MTU4fQ.qSjDq7FvSLsQStU2uI-fxaClQCr1yStEpJz_h5xKlKg";
function App() {
  const supabaseClient = useRef<any>();
  useEffect(() => {
    supabaseClient.current = createClient(
      "https://tzybddpxkidxkbpyonmv.supabase.co",
      publicANONKey
    );
  });
  const loginWithGithub = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    const { user, session, error } = await supabaseClient.current.auth.signIn({
      provider: "github",
    });
  };
  const loginWithGoogle = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    const { user, session, error } = await supabaseClient.current.auth.signIn({
      provider: "twitch",
    });
  };
  return (
    <div>
      <form>
        <button onClick={loginWithGithub}>Login with Github</button>
      </form>
      <form>
        <button onClick={loginWithGoogle}>Login with Twitch</button>
      </form>
    </div>
  );
}
export default App;
