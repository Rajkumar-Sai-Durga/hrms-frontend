import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import "./resetPassword.css"

const ResetPassword = () => {
    const [load, setLoad] = useState(false);
    const [lock, setLock] = useState<boolean>(true)
    const [conLock, setConLock] = useState<boolean>(true)
    const {email} = useParams()
    const navigate = useNavigate();

    interface formValue{
        otp: string,
        password: string,
        confirmPassword: string
    }

    const {register, handleSubmit, formState:{errors}, watch} = useForm<formValue>();
    let password = watch("password");

    const onSubmit = (formValue: formValue) =>{
        console.log(formValue);
        
        let obj = {
            email: email,
            otp: formValue.otp,
            newPassword:  formValue.password
        }
        ivokeApi(obj)
    }
    const ivokeApi = async(obj: any)=>{
        setLoad(true);
        try {
            let response = await axios.post("http://localhost:8080/api/employee/reset-password", obj);
            if(response.data.message= "Password updated successful"){
                toast.success(response.data.message);
                navigate("/");
            }else{
                toast.warning(response.data.message);
            }
        } catch (error) {
            toast.warning("Server issues please try again later");
        }
        setLoad(false);
    }
  return (
    <div className="back_color d-flex justify-content-center align-items-center">
        <div className="bg-light p-5 d-flex flex-column gap-3">
            <h1 className="color">Reset Password Password</h1>
            <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label color">OTP</label>
                    <div >
                        <input type="text" className="form-control" id="otp" {...register("otp",{
                            required:{ value: true, message: "OTP must required."},
                            minLength:{ value: 6, message: "OTP has minimum six digits"}
                        })}/>
                    </div>
                    {errors.otp?.message && (<p className='text-danger'>{errors.otp?.message}</p>)}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label color">Password</label>
                    <div className='password-container'>
                        <input type={lock? "password": "text"} className="form-control" id="exampleInputPassword1" {...register("password",{
                            required:{ value: true, message: "Password must required."},
                            pattern:{ value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Invalid password"}
                        })}/>
                        {lock? <i className="bi bi-shield-lock-fill child" onClick={()=> setLock(false)}></i> : <i className="bi bi-shield-lock child" onClick={()=> setLock(true)}></i>}
                    </div>
                    {errors.password?.message && (<p className='text-danger'>{errors.password?.message}</p>)}
                    <p className='text-secondary'>Eg. Password@1234</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label color">Confirm Password</label>
                    <div className='password-container'>
                        <input type={conLock? "password": "text"} className="form-control" id="exampleInputPassword2" {...register("confirmPassword",{
                            required:{ value: true, message: "Confirm password must required."},
                            validate: (value) => value == password || "Password does not matched."
                        })}/>
                        {conLock? <i className="bi bi-shield-lock-fill child" onClick={()=> setConLock(false)}></i> : <i className="bi bi-shield-lock child" onClick={()=> setConLock(true)}></i>}
                    </div>
                    {errors.confirmPassword?.message && (<p className='text-danger'>{errors.confirmPassword?.message}</p>)}
                </div>
                <div className="pt-1">
                    <button type="submit" className="btn btn-primary btn_bg container-fluid d-flex justify-content-center align-items-center" disabled={load}>
                        {load? <Loader></Loader> : "RESET PASSWORD"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword