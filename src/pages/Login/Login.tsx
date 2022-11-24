/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { login } from 'src/Service/auth-service';

interface IFormLogin {
  emailAddress: string;
  password: string;
}

interface IPassword {
  password: string;
  showPassword: boolean;
}

const schema = yup
  .object({
    emailAddress: yup.string().max(20).required(),
    password: yup.string().min(6).max(20).required()
  })
  .required();

const Login = () => {
  const navigate: NavigateFunction = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema)
  });

  const formSubmitHandler: SubmitHandler<IFormLogin> = (data: IFormLogin) => {
    login({
      emailAddress: data.emailAddress,
      password: data.password
    }).then(() => {
      navigate('/home');
    });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [localStorage.getItem('token')]);
  return (
    <React.Fragment>
      <section className="mb-5">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form action="" onSubmit={handleSubmit(formSubmitHandler)}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <FontAwesomeIcon icon={faFacebook} />
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <FontAwesomeIcon icon={faTwitter} />
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    {...register('emailAddress')}
                  />
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    {...register('password')}
                  />
                  {/* <div>{errors.password ? errors.password?.message : ''}</div> */}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label">Remember me</label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Dont have an account?{' '}
                    <a href="#!" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
