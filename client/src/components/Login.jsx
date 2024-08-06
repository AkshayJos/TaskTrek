import { useState, useContext, useEffect } from "react";
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
    userPicture: "",
    password: "",
    favouritePosts: [],
  };

  const loginInitialValues = {
    username: "",
    password: "",
  };

  const { setAccount } = useContext(DataContext);

  const [account, ToggleAccount] = useState(false);
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [file, setFile] = useState("");
  let [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isVisible, ToggleVisiblity] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        //API Call
        try {
          const response = await API.uploadProfileFile(data);
          if (response.isSuccess) {
            signup.userPicture = response.data;
            setUrl(response.data);
          }
        } catch (error) {}
      }
    };
    getImage();
  }, [file]);

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
        setError("");

        isUserAuthenticated(true);

        document.cookie = `accessToken=${response.data.accessToken}; path=/`;
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/`;

        setAccount({
          _id: response.data._id,
          username: response.data.username,
          name: response.data.name,
          userPicture: response.data.userPicture,
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
        setError("");
        setSignup(signupInitialValues);
        toggleAccount();
        toast.success("User Registered Successfully !!")
      } else {
        setError("Something went wrong! Please try Again.");
      }
    } catch (err) {
      toast.error(err.msg);
    }
  };

  return (
    <div
      onClick={() => setError("")}
      className="bg-gradient-to-r from-stone-50 to-gray-300 h-full w-full"
    >
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter") loginUser();
        }}
        className="h-full flex min-h-full flex-1 flex-col justify-center px-3 py-14 lg:px-8"
      >
        {account ? (
          <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[30rem] h-auto shadow-sm rounded-xl bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-8 px-8 sm:px-0">
              <img
                className="mx-auto h-20 w-auto"
                src={`${process.env.PUBLIC_URL}/images/image.png`}
                alt="TaskTrek"
              />
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
                      className="block w-full rounded-md border outline-none py-1.5 text-gray-900  sm:text-sm sm:leading-6 p-2"
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
                      className="block w-full outline-none py-1.5 text-gray-900 sm:text-sm sm:leading-6 p-2"
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

                {error && <div className="text-red-500 ">{error}</div>}

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

              <p className="my-5 text-center text-sm text-gray-500">
                Don't have An Account?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  onClick={toggleAccount}
                >
                  Register Here
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="my-8 sm:mx-auto sm:w-full sm:max-w-[30rem] h-auto shadow-sm rounded-xl bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center px-8 sm:px-0 mt-4">
              <img
                className="mx-auto h-20 w-auto"
                src={`${process.env.PUBLIC_URL}/images/image.png`}
                alt="Your Company"
              />
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create An Account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-8 sm:px-0">
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
                      className="block w-full rounded-md border outline-none py-1.5 text-gray-900  sm:text-sm sm:leading-6 p-2"
                    />
                  </div>

                  <label
                    htmlFor="email"
                    className="mt-2 block text-sm font-medium leading-6 text-gray-900"
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
                      className="block w-full rounded-md border outline-none py-1.5 text-gray-900  sm:text-sm sm:leading-6 p-2"
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
                       sm:text-sm sm:leading-6 p-2"
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

                {error && <div className="text-red-500 ">{error}</div>}

                <div>
                  <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => signupUser()}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <p className="px-2 my-4 text-center text-sm text-gray-500 ">
                Already Have An Account?{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
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
