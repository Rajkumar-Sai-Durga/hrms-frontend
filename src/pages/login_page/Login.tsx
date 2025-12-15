import LogoImg from '../../assets/WhatsApp Image 2025-12-14 at 17.21.26_8738a792 1.png';
import './login.css';

const Login = () => {
  return (
    <div className='background_image'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-5 bg-white height-100 p-5">
                    <img src={LogoImg} alt="logo" className='pb-5'/>
                    <form className='mt-5'>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label color">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label color">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Remenber me</label>
                            </div>
                            <div>
                                <p className='btn btn-link color'>Forget password?</p>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn_bg container-fluid">Submit</button>
                    </form>
                    <div className='d-flex align-items-center justify-content-center mt-5'>
                        <p>Don't you have an account?</p>
                        <p className='btn btn-link color'>Join now.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login