import { useState } from "react"
import "./registration.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const Registration = () => {

  const [check, setCheck] = useState<boolean>();
  let [load, setLoad] = useState<boolean>(false);

  interface formValues{
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
    confirmPass: string
  }
  const {register, handleSubmit, formState: {errors}, watch} = useForm<formValues>()
  const password = watch("password");

  const onsubmit = (formValues: formValues)=>{
    let obj = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      role: "EMPLOYEE"
    }
    ivokeApi(obj)
  }

  const ivokeApi = async (obj: any)=>{
    setLoad(true)
    try {
      console.log(check, load);
      
      let response = await axios.post("http://localhost:8080/api/employee/register", obj);
      console.log(response);
      if(response.status){
        toast.success(response.data.response);
      }
      else{
        toast.success(response.data.response);
      }
    } catch (error) {
      toast.warning("Employee with this email already exists");
    }
    setLoad(false)
  }
  
  return (
    <div className="p-3">
      <div className="row height">
        <div className="col-sm-6 bg-image d-flex justify-content-center align-items-center">
          <div className="text-light blur">
            <h1>HR Management Platform</h1>
            <p>manage all the emloyees and other HR operatons.</p>
            <div className="d-flex gap-3">
              <button className="btn btn-warning text-light">Learn More</button>
              <button className="btn btn-outline-warning ">Our Features</button>
            </div>
          </div>
        </div>
        <div className="col-sm-6 d-flex flex-column justify-content-center align-items-start min-vh-100">
          <form className="d-flex flex-column gap-3 px-5" onSubmit={handleSubmit(onsubmit)}>
            <h1 className=" color">Welcome To HRMs</h1>
            <p>Register your account.</p>
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="first-name" className="form-label color">First Name</label>
                <input type="text" className="form-control" id="first-name" {...register("firstName",{
                  required: {value: true, message: "firstname must required"},
                  minLength: {value: 3, message: "first name must be minimun 3 characters"}
                })}/>
                {errors.firstName?.message && (<p className="text-danger">{errors.firstName?.message}</p>)}
              </div>
              <div className="col-sm-6">
                <label htmlFor="last-name" className="form-label color">Last Name</label>
                <input type="text" className="form-control" id="last-name" {...register("lastName",{
                  required: {value: true, message: "lastname must required"}
                })}/>
                {errors.lastName?.message && (<p className="text-danger">{errors.lastName?.message}</p>)}
              </div>
            </div>
            <div>
              <label htmlFor="username" className="form-label color">Username</label>
              <input type="text" className="form-control" id="username" {...register("username",{
                  required: {value: true, message: "Username must required"},
                  minLength: {value: 3, message: "Username must be minimun 3 characters"}
                })}/>
                {errors.username?.message && (<p className="text-danger">{errors.username?.message}</p>)}
            </div>
            <div>
              <label htmlFor="email" className="form-label color">E-mail address</label>
              <input type="text" className="form-control" id="email" {...register("email",{
                  required:{value: true, message: "Email must required"},
                  pattern:{ value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email id."}
              })}/>
              {errors.email?.message && (<p className="text-danger">{errors.email?.message}</p>)}
            </div>
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="password" className="form-label color">Password</label>
                <input type="password" className="form-control" id="password" {...register("password",{
                    required:{ value: true, message: "Passwrd must required."},
                    pattern:{ value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Invalid password format"}
                })}/>
                {errors.password?.message && (<p className='text-danger'>{errors.password?.message}</p>)}
                <p className='text-secondary'>Eg. Password@1234</p>
              </div>
              <div className="col-sm-6">
                <label htmlFor="confirm-password" className="form-label color">Confirm Password</label>
                <input type="password" className="form-control" id="confirm-password" {...register("confirmPass",{
                  required: "confirm password is required",
                  validate: (value)=> value === password || "password must match"
                })}/>
                {errors.confirmPass?.message && (<p className="text-danger">{errors.confirmPass?.message}</p>)}
              </div>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e)=>setCheck(e.target.checked)}/>
              <label className="form-check-label" htmlFor="exampleCheck1">I agree to all the <span className="text-primary">Terms, Privacy policy.</span></label>
            </div>
            {check? <p></p> :<p className="text-danger">Agree to Terms, Privacy policy</p>}
            <button type="submit" className="btn btn-primary btn_bg container-fluid d-flex justify-content-center align-items-center" disabled={!check && !load} >
              {load? <Loader></Loader> : "Register"}
            </button>
            <p>Already have an account? <Link to="/">Login here</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration