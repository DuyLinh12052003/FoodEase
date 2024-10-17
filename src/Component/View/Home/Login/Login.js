import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../../Config/CustomAlert';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [alert, setAlert] = useState(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resToken = await axios.post('http://localhost:8080/api/authenticate', { username, password });
            console.log(resToken.data.data);
            if (resToken) {
                localStorage.setItem('jwtToken', resToken.data.data.jwtToken);
                localStorage.setItem('userIdLogin', resToken.data.data.userId);
                localStorage.setItem('userNameLogin', resToken.data.data.username);
                localStorage.setItem('rolesLogin', JSON.stringify(resToken.data.data.roles));
                setAlert({ type: 'success', message: 'Login Success!' });
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 3000); 
    
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Login Failed!' });
            console.error('Error in login', error);
        }
    };
    
    return (
        <div id="body">
            {alert && (
                <CustomAlert 
                    type={alert.type} 
                    message={alert.message} 
                    onClose={() => setAlert(null)} 
                />
            )}
            <div className="templatemo-bg-image-1">
                <div className="container">
                    <div className="col-md-12">
                        <form className="form-horizontal templatemo-login-form-2" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <h1>Login Form</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="templatemo-one-signin col-md-6">
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label className="control-label">
                                                <span><i className="fa-solid fa-user"></i></span> Username
                                            </label>
                                            <div className="templatemo-input-icon-container">
                                                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label className="control-label">
                                                <span><i className="fa-solid fa-lock"></i></span> Password
                                            </label>
                                            <div className="templatemo-input-icon-container">
                                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                style={{ width: '20px', height: '20px' }}
                                                checked={remember}
                                                onChange={(e) => setRemember(e.target.checked)}
                                            />
                                            <label>
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <input type="submit" value="LOG IN" className="btn btn-warning" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <a href="forgot-password.html" className="text-center">Cannot login?</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
