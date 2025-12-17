import { useForm } from 'react-hook-form';
import LogoImg from '../../assets/WhatsApp Image 2025-12-14 at 17.21.26_8738a792 1.png';
import './login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Loader from "../../components/loader/Loader";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    let [load, setLoad] = useState<boolean>(false);
    const navigate = useNavigate();
    const [lock, setLock] = useState<boolean>(true)

    interface loginDto{
        email:string,
        password:string
    }
    const {register, handleSubmit, formState: {errors}} = useForm<loginDto>();

    let onsubmit = async(formValues: loginDto) =>{
        setLoad(true)
        try {
            const response = await axios.post("http://localhost:8080/api/employee/login", formValues)
            console.log(response)
            if(response.data.accessToken.length){
                toast.success(response.data.message);
                localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo))
                localStorage.setItem("accessToken", response.data.accessToken)
                navigate('/dashboard')
            }else{
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.warning("Bad credentails");
        }
        setLoad(false)
    }

    const navigateTo = () =>{
        navigate("/registration")
    }
  return (
    <div className='background_image'>
        <div className="container-fluid">
            <div className="row d-flex align-items-center justify-content-center height-100">
                <div className="col-sm-3"></div>
                <div className="col-md-6 bg-white  pt-3 pb-3 ps-5 pe-5">
                    <img src={LogoImg} alt="logo" className='pb-5'/>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label color">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" {...register("email",{
                                required:{value: true, message: "Email must required"},
                                pattern:{ value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email id."}
                            })}/>
                            {errors.email?.message && (<p className='text-danger'>{errors.email?.message}</p>)}
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
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                            </div>
                            <div>
                                <Link to="/forget-password" className='color'>Forget password?</Link>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn_bg container-fluid d-flex justify-content-center align-items-center" disabled={load}>
                            {load? <Loader></Loader> : "Login"}
                        </button>
                    </form>
                    <div className='d-flex align-items-center justify-content-center mt-5'>
                        <p>Don't you have an account?</p>
                        <p onClick={navigateTo} className='btn btn-link color'>Join now.</p>
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
    </div>
  )
}

export default Login