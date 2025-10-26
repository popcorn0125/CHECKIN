import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Account.css";
import titleImage from '../../assets/images/titleImage.png';
import axios from 'axios';

const Account = () => {
    const [adminInfo, setAdminInfo] = useState({userid: '', username: '', password: ''});
    const [isSignUpOpen, setIsSignUpOpen] = useState(false); // 관리자 등록 클릭 여부
    const navigate = useNavigate(); // useNavigate 훅 추가
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("로그인 시도:", username, password);
    };

    // 관리자 등록 함수
    const adminRegister = () => {
        console.log('admin Register');
        const isEmptyData = isEmpty();
        if(isEmptyData === false) return false;

        axios.post('/admin-info/register', {
            username : adminInfo.username,
            id : adminInfo.userid,
            pw : adminInfo.password
        })
        .then((response) => {
            console.log('응답완료',response);
            if(response.data.statusCode == 200) {
                setAdminInfo({userid: '', username: '', password: ''});
                setIsSignUpOpen(false);
                alert(response.data.responseMessage);
            } else {
                console.log('다시 시도해주세요', response);
                alert('관리자 등록에 실패했습니다. 다시 시도해주세요.');
            }
        })
        .catch((error) => {
            console.log('요청 실패', error);
            return false;
        })
    }

    // 관리자 로그인 함수
    const goToHome = () => {
        sessionStorage.removeItem('menu');
        // axios,post 부분은 테스트용으로 작성한거라 수정해도 괜찮아요
        // axios.post('/admin/login',{
        //     id: adminInfo.userid,
        //     pw: adminInfo.password,
        //     // name : adminInfo.username,
        // })
        // .then((response) => {
        //     console.log('시큐리티 설정으로 인해 요청 성공', response);
        //     navigate('/home');
        // })
        // .catch((error) => {
        //     console.log("요청 실패",error);
        // })
        navigate('/home');
    }

    // 아무것도 입력하지 않고 회원가입 클릭했을 경우
    const isEmpty = () => {
        if(adminInfo.userid == '') {
            alert('아이디를 입력하세요.');
            return false;
        } else if(onlyEnglishAndNumber === false) {
            alert('아이디를 다시 입력해주세요. (조건 : 영어 또는 숫자 또는 영어+숫자만 입력 가능)');
            return false;
        }
        if(adminInfo.username == '') {
            alert('이름을 입력하세요');
            return false;
        } else if(validateUserName === false) {
            alert('이름을 다시 입력해주세요.(한글만 입력 가능합니다)');
            return false;
        }
        if(adminInfo.password == '') {
            alert('비밀번호를 입력하세요');
            return false;
        } else if(strongPassword === false) {
            alert('8글자 이상(8글자 이상, 영문, 숫자, 특수문자 사용) 비밀번호를 다시 입력해주세요.');
            return false;
        }

        return true;
    }

    // 회원가입을 클릭했을 때 이름 입력하는 입력창 보이게 하기
    const clickSignUp = () => {
        setAdminInfo({userid: '', username: '', password: ''})
        isSignUpOpen ? setIsSignUpOpen(false) : setIsSignUpOpen(true);
    }

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setAdminInfo(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    // 아이디 유효성 검사 (영어 또는 숫자 또는 영어+숫자만 입력 가능)
    const onlyEnglishAndNumber = (id) => {
        return /^[A-Za-z0-9][A-Za-z0-9]{4,20}$/.test(id);
    }

    // 이름 유효성 검사(한글만 입력 가능)
    const validateUserName = (name) => {
        return /^[가-힣]{2,20}$/.test(name);
    }

    // 비밀번호 유효성 검사 (8글자 이상, 영문, 숫자, 특수문자 사용)
    const strongPassword = (password) => {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(password);
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
                            id="userid" 
                            value={adminInfo.userid} 
                            onChange={handleInputChange} 
                            required 
                            className="input-field"
                        />
                    </div>
                    {isSignUpOpen && (
                        <div className="input-group">
                            <label htmlFor="username">이름</label>
                            <input 
                                type="text" 
                                id="username" 
                                value={adminInfo.username} 
                                onChange={handleInputChange} 
                                required 
                                className="input-field"
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={adminInfo.password} 
                            onChange={handleInputChange} 
                            required 
                            className="input-field"
                        />
                    </div>
                    <div className="action-buttons">
                        <button type="submit" className="login-button" onClick={() => {isSignUpOpen ? adminRegister() : goToHome()}}>{isSignUpOpen ? "관리자 등록" : "로그인"}</button>
                        <div className="extra-links">
                            <button type="button" className="registerButton" onClick={clickSignUp}>{ isSignUpOpen ? "로그인" : "관리자 등록"}</button>
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
