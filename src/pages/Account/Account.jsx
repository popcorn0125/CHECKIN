import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Account.css";
import titleImage from '../../assets/images/titleImage.png';
import axios from 'axios';

const Account = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // useNavigate 훅 추가
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("로그인 시도:", username, password);
    };

    const goToHome = () => {
        sessionStorage.removeItem('menu');
        // axios,post 부분은 테스트용으로 작성한거라 수정해도 괜찮아요
        axios.post('/admin/login',{
            id: 'hahoho',
            pw: "12221"
        })
        .then((response) => {
            console.log('시큐리티 설정으로 인해 요청 성공', response);
            navigate('/home');
        })
        .catch((error) => {
            console.log("요청 실패",error);
        })
        // navigate('/home');
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <form onSubmit={handleLogin}>
                    <div className='loginTitle'>
                        <img src={titleImage} alt="title" height='70px' width='240px'/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">아이디</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="input-field"
                        />
                    </div>
                    <div className="action-buttons">
                        <button type="submit" className="login-button" onClick={() => {goToHome()}}>로그인</button>
                        <div className="extra-links">
                            <button type="button" className="loginButton">아이디 찾기</button>
                            <button type="button" className="passButton">비밀번호 찾기</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;
