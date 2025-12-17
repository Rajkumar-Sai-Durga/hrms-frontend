import { useState } from "react"
import "./forgetPassword.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    interface formValue{
        email: string
    }

    const {register, handleSubmit, formState:{errors}} = useForm<formValue>();

    const onSubmit = async(formValue: formValue) =>{
        setLoad(true);
        try {
            let response = await axios.post("http://localhost:8080/api/employee/forget-password", formValue);
            toast.success(response.data.message);
            console.log(response);
            
            if(response.data.response == "OTP sent"){
                navigate("/reset-password/"+formValue.email)
            }
        } catch (error) {
            console.log(error);
            toast.success("Server issues please try again later");
        }
        setLoad(false);
    }

  return (
    <div className="back_color d-flex justify-content-center align-items-center">
        <div className="bg-light p-5 d-flex flex-column gap-3">
            <h1 className="color">Forget Password</h1>
            <p className="text-secondary">Enter valid email address to get the OTP</p>
            <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email" className="form-label color">Eamil address</label>
                    <input type="email" className="form-control" id="email" {...register("email",{
                        required: "Email is required.",
                        pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format"}
                    })}/>
                    {errors.email?.message && (<p className="text-danger">{errors.email?.message}</p>)}
                </div>
                <div className="pt-1">
                    <button type="submit" className="btn btn-primary btn_bg container-fluid d-flex justify-content-center align-items-center" disabled={load}>
                        {load? <Loader></Loader> : "Get OTP"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ForgetPassword