import axios, { AxiosError } from "axios";
import useProfileStore from "../store/profileStore.js";
import { Input } from "@/components/ui/input.js";
import { Button } from "@/components/ui/button.js";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import getErrorFromAxios from "@/utils/getErrorFromAxios.js";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import toast, { Toaster } from "react-hot-toast";
import appName from "@/constants/appName.js";

const LoginPage = () => {
  const { setProfile } = useProfileStore();
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormData>();
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const emailReg =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const usernameReg = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/;

  const userLogin = async (data: {
    text: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const userCredentials = {
        password: data.password,
        email: "",
        username: "",
        rememberMe,
      };

      if (emailReg.test(data.text)) {
        userCredentials.email = data.text;
      } else if (usernameReg.test(data.text)) {
        userCredentials.username = data.text;
      } else {
        toast.error("Invalid email or username");
        setLoading(false);
        return;
      }

      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_API_URL}/users/login`,
        data: userCredentials,
        withCredentials: true,
        headers: {
          "Access-control-Allow-Origin": import.meta.env
            .VITE_ACCESS_CONTROL_ORIGIN,
          "Content-Type": "application/json",
        },
      });

      if (!response.data.success) {
        toast.error("Failed to login");
        return;
      }

      setProfile(response.data.data); navigate("/");

    } catch (err) {
      const errorMsg = getErrorFromAxios(err as AxiosError);
      if (errorMsg !== undefined) {
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  type LoginFormData = {
    text: string;
    password: string;
  };

  return (
    <div className="min-h-screen select-none bg-zinc-900 flex justify-center items-center">
      <div className="text-white bg-zinc-950 flex flex-col space-y-8 justify-center items-center sm:p-8 p-6 rounded-xl">
        <h1 className="font-semibold text-4xl">Login to {appName}</h1>
        <form
          action="post"
          className="h-4/5 flex flex-col space-y-6 sm:w-96 w-72 justify-center items-center"
          onSubmit={handleSubmit(userLogin)}
        >
          <div className="w-full space-y-2">
            <label htmlFor="username-or-email">Username or Email</label>
            <Input
              id="username-or-email"
              type="text"
              placeholder="Enter Username or Email"
              {...register("text", {
                required: true,
              })}
            />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="password">Password</label>
            <div className="w-full flex relative">
              <Input
                id="password"
                type={isPasswordShowing ? "text" : "password"}
                placeholder="Enter Password"
                {...register("password", {
                  required: true,
                })}
              />
              <div
                className="w-12 absolute right-0 flex justify-center items-center h-full cursor-pointer"
                onClick={() => {
                  setIsPasswordShowing((prev) => !prev);
                }}
              >
                {isPasswordShowing ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
            </div>
            <div className="flex justify-between pt-1 items-center w-full">
              <div className="space-x-1 flex justify-center items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    if (typeof checked == "boolean") {
                      setRememberMe(checked);
                    }
                  }}
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <label htmlFor="remember-me" className="cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link
                to="/password-recovery"
                className="hover:underline text-blue-500 cursor-pointer"
              >
                Forgot password
              </Link>
            </div>
          </div>
          {loading ? (
            <Button
              disabled
              className="bg-slate-800 hover:bg-slate-700 w-full cursor-wait"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="bg-slate-800 text-white hover:bg-slate-700 w-full">
              Login
            </Button>
          )}
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="hover:underline text-blue-500 cursor-pointer"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
      <Toaster
        position={window.innerWidth >= 1024 ? "bottom-right" : "top-center"}
      />
    </div>
  );
};

export default LoginPage;
