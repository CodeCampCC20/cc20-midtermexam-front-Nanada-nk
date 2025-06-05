/** @format */


import InputForm from "../components/form/InputForm";
import { LoaderCircle } from "lucide-react";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { schemaRegister } from "../validator/schemaRegister";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
import * as Yup from "yup"

const initialInput = {
  username: "",
  password: "",
  confirmPassword: "",
};
function RegisterPage() {

    const [input, setInput] = useState(initialInput);
    const [inputError, setInputError] = useState(initialInput);
    const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };


      const handleSubmit = async (e) => {
        try {
          e.preventDefault();
    
          setIsLoading(true);
    
          //validate
          schemaRegister.validateSync(input,{abortEarly:false})
    
          //api
           const res = await authApi.register(input)
           console.log("res Register",res)
           console.log("res Register",res.data)

           setInput(initialInput)

          // navigate
          navigate("/")
    
          //alert
          toast.success("Login success!!")
        } catch (error) {
          console.log(error);
          toast.error("Login invalid!!")

      if (error instanceof Yup.ValidationError) {
        const err = error.inner.reduce((acc,cur) => {
          acc[cur.path] = cur.message
          return acc
        },{})
        setInputError(err)
      }

        } finally {
          setIsLoading(false);
        }
      };


  return (
    <div className="p-8">
      <div className="mx-auto w-2/4 border border-pink-600 rounded-3xl p-8">
        <h1 className="mb-2">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4 pl-2">
          <InputForm
            name="username"
            placeholder="username"
            handleChange={handleChange}
            error={inputError.username}
            value={input.username}
            type="text"
          />

          <InputForm
            name="password"
            placeholder="password"
            handleChange={handleChange}
            error={inputError.password}
            value={input.password}
            type="password"
          />

          <InputForm
            name="confirmPassword"
            placeholder="confirm password"
            handleChange={handleChange}
            error={inputError.confirmPassword}
            value={input.confirmPassword}
            type="password"
          />

          <button 
           disabled={isLoading}
          className="bg-pink-200 rounded-md hover:bg-pink-400 p-2 w-full flex justify-center items-center gap-1 duration-300 cursor-pointer">
            
          {isLoading ? (
              <>
                <LoaderCircle
                  className="w-5 h-5 animate-spin"
                  strokeWidth={2.5}
                />
                <span>LOADING ...</span>
              </>
            ) : (
              <>
                <SendHorizonal className="w-5 h-5" strokeWidth={2.5} />
                <span>REGISTER</span>
              </>
            )}

          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
