import { useState, useContext } from "react";
import { API } from "../services/api";
import { DataContext } from "../context/dataProvider";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";

export default function Login({ isUserAuthenticated }) {
  const signupInitialValues = {
    name: "",
    username: "",
    password: "",
  };

  const loginInitialValues = {
    username: "",
    password: "",
  };

  const { setAccount } = useContext(DataContext);

  const [account, ToggleAccount] = useState(false);
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [isVisible, ToggleVisiblity] = useState(false);

  const navigate = useNavigate();

  const toggleAccount = () => {
    account == true ? ToggleAccount(false) : ToggleAccount(true);
  };

  const toggleVisiblity = () => {
    isVisible == true ? ToggleVisiblity(false) : ToggleVisiblity(true);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response;
    try {
      response = await API.userLogin(login);

      if (response.isSuccess) {
        isUserAuthenticated(true);

        document.cookie = `accessToken=${response.data.accessToken}; path=/`;
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/`;

        setAccount({
          _id: response.data._id,
          username: response.data.username,
          name: response.data.name,
        });
        toast.success("LoggedIn Successfully !!")
        navigate("/");
      } else {
      }
    } catch (err) {
      toast.error(err.msg);
    }
  };

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        setSignup(signupInitialValues);
        toggleAccount();
        toast.success("User Registered Successfully !!")
      }
    } catch (err) {
      toast.error(err.msg);
    }
  };

  return (
    <div
      className="bg-gradient-to-r from-stone-50 to-gray-300 h-full w-full"
    >
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter" && account) loginUser();
          else if(e.key === "Enter" && !account) signupUser();
        }}
        className="h-full flex min-h-full flex-1 flex-col justify-center mx-3 py-14 lg:px-8"
      >
        {account ? (
          <div className="my-16 sm:mx-auto sm:w-full sm:max-w-[30rem] h-auto bg-white 
          bg-white/35 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[12px] rounded-[10px] border border-[rgba(255,255,255,0.18)]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-8 px-8 sm:px-0">
              <img
                className="mx-auto h-20 w-auto"
                src={`${process.env.PUBLIC_URL}/images/image.png`}
                alt="TaskTrek"
              />
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-serif mt-5">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-8 sm:px-0">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={login.username}
                      onChange={(e) => onValueChange(e)}
                      className="block w-full rounded-md border outline-none py-1.5 text-gray-900  sm:text-sm sm:leading-6 p-2 font-serif"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 flex rounded-md border px-2 items-center bg-white">
                    <input
                      id="password"
                      name="password"
                      type={isVisible ? "text" : "password"}
                      value={login.password}
                      autoComplete="current-password"
                      required
                      onChange={(e) => onValueChange(e)}
                      className="block w-full outline-none py-1.5 text-gray-900 sm:text-sm sm:leading-6 p-2 font-serif"
                    />
                    {isVisible ? (
                      <VisibilityOffIcon
                        onClick={toggleVisiblity}
                        className="text-gray-400 cursor-pointer"
                      />
                    ) : (
                      <VisibilityIcon
                        onClick={toggleVisiblity}
                        className="text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    onClick={() => loginUser()}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </div>

              <p className="my-6 text-center text-sm text-gray-500 font-serif">
                Don't have An Account?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 no-underline"
                  onClick={toggleAccount}
                >
                  Register Here
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="my-12 sm:mx-auto sm:w-full sm:max-w-[30rem] h-auto bg-white 
          bg-white/35 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[12px] rounded-[10px] border border-[rgba(255,255,255,0.18)]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center px-8 sm:px-0 mt-5">
              <img
                className="mx-auto h-20 w-auto"
                src={`${process.env.PUBLIC_URL}/images/image.png`}
                alt="Your Company"
              />
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-serif mt-3">
                Create An Account
              </h2>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm px-8 sm:px-0">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      onChange={(e) => onInputChange(e)}
                      className="block w-full rounded-md border outline-none py-1.5 text-gray-900  sm:text-sm sm:leading-6 p-2 font-serif"
                    />
                  </div>

                  <label
                    htmlFor="email"
                    className="mt-2 block text-sm font-medium leading-6 text-gray-900 "
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      onChange={(e) => onInputChange(e)}
                      className="block w-full rounded-md border outline-none py-1.5 text-gray-900  sm:text-sm sm:leading-6 p-2 font-serif"
                    />
                  </div>

                  <label
                    htmlFor="password"
                    className="mt-2 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>

                  <div className="mt-2 flex rounded-md border px-2 items-center bg-white">
                    <input
                      id="password"
                      name="password"
                      type={isVisible ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      onChange={(e) => onInputChange(e)}
                      className="block w-full outline-none py-1.5 text-gray-900
                       sm:text-sm sm:leading-6 p-2 font-serif"
                    />
                    {isVisible ? (
                      <VisibilityOffIcon
                        onClick={toggleVisiblity}
                        className="text-gray-400 cursor-pointer"
                      />
                    ) : (
                      <VisibilityIcon
                        onClick={toggleVisiblity}
                        className="text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                </div>


                <div>
                  <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => signupUser()}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <p className="px-2 my-4 text-center text-sm text-gray-500 font-serif">
                Already Have An Account?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 no-underline"
                  onClick={toggleAccount}
                >
                  Login Here
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
