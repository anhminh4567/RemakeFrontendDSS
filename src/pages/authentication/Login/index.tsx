import MyInput from "@/components/form/MyInput";
import MyButton, { MyButtonSize } from "@/components/ui/MyButton";
import { FiMail, FiLock } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { FormEvent, useEffect, useState } from "react";
import { LoginCustomer } from "@/services/authentication/Login";
import { LoginRequest } from "@/types/HttpRequests/LoginRequest";
import { ToastFunction } from "@/components/toaster/myToast";
import { useAuthContext } from "@/context/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  function cleanParam() {
    setEmail("");
    setPassword("");
    setErrorMessage(null);
  }
  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!email) {
      setErrorMessage("empty email");
      return;
    } else if (false) {
    }
    if (!password) {
      setErrorMessage("empty password");
      return;
    } else if (false) {
    }
    let request: LoginRequest = {
      Email: email,
      Password: password,
      IsExternalRegister: false,
      IsStaffLogin: false,
    };
    const result = await LoginCustomer(request);
    if (result.isSuccess) {
      console.log(result.data);
      ToastFunction.success({ message: "yea login good" });
      login(result.data.accessToken, result.data.refreshToken);
    } else {
      console.error(result.error);
      ToastFunction.fail({ message: "login not so good" });
    }
    cleanParam();
    navigate("/");
  }

  useEffect(() => {}, []);
  return (
    <div className="flex flex-row justify-center  ">
      <div className=" flex flex-col items-center justify-around p-10 sm:min-w-[80%] md:min-w-[50%] h-[400px] bg-white shadow-lg border border-main-gray border-opacity-35 my-10">
        <div>
          <h4>LOGIN</h4>
        </div>
        <div className="flex flex-col w-full">
          <form>
            {errorMessage && (
              <div className="text-small text-white bg-error px-2 py-1 rounded-md mb-1 text-wrap">
                {errorMessage}
              </div>
            )}

            <div className="flex flex-col justify-start text-small gap-2 ">
              <div className="flex flex-col justify-start">
                <MyInput
                  type="text"
                  IconsElement={<FiMail />}
                  placeholder="abc@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={() => setErrorMessage(null)}
                  value={email}
                />
              </div>
              <div>
                <MyInput
                  type="password"
                  IconsElement={<FiLock />}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={() => setErrorMessage(null)}
                  value={password}
                />
              </div>

              <a className="text-small font-extralight text-center hover:font-bold">
                forget password ?
              </a>
              <hr className="m-0 p-0"></hr>
              <MyButton
                type="submit"
                Content="Login"
                Size={MyButtonSize.MD}
                className=""
                onClick={handleLogin}
              />
            </div>
          </form>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-row justify-center items-center">
            <div className="w-full h-[1px] bg-main-gray"></div>
            <p className="w-[50%] text-small mx-1 text-center">
              or sign in with
            </p>
            <div className="w-full h-[1px] bg-main-gray"> </div>
          </div>
          <FaGoogle className="mt-2 hover:scale-110 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Login;
