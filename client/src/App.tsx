<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useProfileStore from "./store/profileStore";
import axios, { AxiosError } from "axios";
import { Header, HorizontalTabs, Loading } from "@/components/general";
import { handleAxiosError } from "./utils/handlerAxiosError";
import { initializeSocket } from "./utils/initializeSocket";
import { syncRootTheme } from "./utils/themeMethods";

const App = () => {

  const { setProfile, profile } = useProfileStore();

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const socket = initializeSocket(profile._id);

    socket.on("userConnected", () => {
      console.log("Socket connected");
    });

    socket.on("userDisconnected", (data) => {
      console.log(`User ${data.userId} is offline`);
    });

    return () => {
      socket.disconnect();
    };
  }, [profile._id]);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_SERVER_API_URL}/users/current-user`,
          withCredentials: true,
        });

        if (currentUser.data.data) {
          setProfile(currentUser.data.data);
        }
      } catch (error) {
        handleAxiosError(error as AxiosError, navigate);
      } finally {
        setLoading(false);
      }
    })();

    // If you have a theme preference in user schema then fetch theme from user and then sync it with root element
    // syncRootTheme(theme)

    // or just sync system preference with root element each time user visits the site
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      syncRootTheme("dark")
      // setTheme("dark");  // and then set that theme in profile state also
    }

  }, [navigate, setProfile]);

  const showBars =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup") ||
    location.pathname.includes("/password-recovery");

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  return (
    <div className="min-h-screen w-screen text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-900">
      <div
        className={`p-0 w-full min-h-[calc(100vh-env(safe-area-inset-top))]`}
      >
        <div
          className={`w-full ${showBars ? "hidden" : ""}`}
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <Header />
        </div>
        <Outlet />
      </div>
      <div
        className={`fixed z-30 bottom-0 px-0 dark:text-zinc-400 sm:!bg-transparent justify-center items-center flex w-screen h-16 ${showBars ? "hidden" : ""
          } lg:hidden`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <HorizontalTabs />
      </div>
      <Toaster
        position={window.innerWidth >= 1024 ? "bottom-right" : "top-center"}
        toastOptions={{
          style: {
            // sync profile theme with toast or you also fetch root theme by calling getThemeModeAtRootElem()
            // background: `${theme !== "light" ? "#333" : "#fff"}`,
            // color: `${theme !== "light" ? "#fff" : "#333"}`,
          },
        }}
      />
    </div>
  );
};

export default App;
>>>>>>> aaac6c0b52ce9581a65756c3aed17707be1ce66f
