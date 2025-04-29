import React, { useEffect, useState } from 'react';
import styles from "../../styles/Student.module.css";
import Search from '../../assets/icons/search.svg?react';
import axios from 'axios';

const Root = ({}) => {
    const [selectedButton, setSelectedButton] = useState('전체 학생');
    const [isStudentAddSelected, setIsStudentAddSelected] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCondition, setSearchCondition] = useState('이름');
    const [updateStudentInfo, setUpdateStudentInfo] = useState({id: '', schoolName: '', department: '', classNumber: '', name: '', phoneNumber: '', email: '', grade: '', pw: '', teamName: '' })

    const [students, setStudents] = useState([]);
    // const students = [
    //     {schoolName: '대구가톨릭대학교', department: '소프트웨어학과', classNumber: '2024001', name: '고정윤', phoneNumber: '010-1234-5678', email: 'jyko@email.com', grade: '1학년', pw: '1234', teamName: '세미콜론' },
    //     
    // ];

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        setIsStudentAddSelected(false);
    };

    const handleStudentAddClick = () => {
        setUpdateStudentInfo({id: '', schoolName: '',department: '', classNumber: '', name: '', phoneNumber: '', email: '', grade: '' , pw: '', teamName: ''})
        setIsStudentAddSelected(true);
        setIsModalOpen(true);
    };

    const handleStudentUpdateClick = (student) => {
        setUpdateStudentInfo({id: student.id,schoolName: student.schoolName, department: student.department, classNumber: student.classNumber, name: student.name, phoneNumber: student.phoneNumber, email: student.email, grade: student.grade, pw: student.pw, teamName: student.teamName})
        setIsStudentAddSelected(false);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchConditionChange = (event) => {
        setSearchCondition(event.target.value);
    };

    // 모달창 저장 or 수정 버튼 클릭시 실행되는 함수
    const clickModalBtn = () => {
        console.log('학생 정보 : ', updateStudentInfo);
        const data = {
            id: updateStudentInfo.id,
            classNumber: updateStudentInfo.classNumber,
            department: updateStudentInfo.department,
            name: updateStudentInfo.name,
            phoneNumber: updateStudentInfo.phoneNumber,
            email: updateStudentInfo.email,
            grade: updateStudentInfo.grade,
            pw: updateStudentInfo.pw,
            teamName: updateStudentInfo.teamName,
            schoolName: updateStudentInfo.schoolName
        }
        if(isStudentAddSelected) {
            axios.post('/admin/store-students',{
                data: data
            })
            .then((response) => {
                console.log('저장 요청 성공', response);
                if(response.data.statusCode == 200) {
                    setUpdateStudentInfo({id: '', schoolName: '', department: '', classNumber: '', name: '', phoneNumber: '', email: '', grade: '' , pw: '', teamName: ''});
                    closeModal();
                    alert(response.data.responseMessage);
                    infoStudentsList();
                } else {
                    alert("저장 실패");
                }
                
            })
            .catch((error) => {
                console.log("예기치 못한 오류가 발생했습니다.",error);
            })
        } else {
            axios.post('/admin/update-students',{
                data
            })
            .then((response) => {
                console.log('수정 요청 성공', response);
                if(response.data.statusCode == 200) {
                    setUpdateStudentInfo({id: '', schoolName: '', department: '', classNumber: '', name: '', phoneNumber: '', email: '', grade: '' , pw: '', teamName: ''});
                    closeModal();
                    alert(response.data.responseMessage);
                    infoStudentsList();
                } else {
                    alert("수정 실패");
                }
                
            })
            .catch((error) => {
                console.log("예기치 못한 오류가 발생했습니다.",error);
            })
        }
    }

    const handleInputChange = (e) => {
        console.log('실행 1')
        const { name, value } = e.target;
        console.log('실행 2')
        setUpdateStudentInfo(prevState => ({
            ...prevState,
            [name]: value // 기존 상태를 유지하면서 변경된 값만 업데이트
        }));
        console.log('실행 3')

    };

    const filteredStudents = students.filter(student => {
        if (selectedButton === '전체 학생') {
            return true;
        } else if (selectedButton === '학년별') {
            return student.grade.includes(searchTerm);
        } else if (selectedButton === '학과별') {
            return student.department.includes(searchTerm);
        }
        return false;
    });

    const sortedStudents = selectedButton === '학년별'
        ? filteredStudents.sort((a, b) => parseInt(a.grade) - parseInt(b.grade))
        : selectedButton === '학과별'
        ? filteredStudents.sort((a, b) => a.department.localeCompare(b.department))
        : filteredStudents;


    useEffect(() => {
        console.log("mounted 실행");
        infoStudentsList();
    }, [])

    // 학생 정보 리스트 불러오기
    const infoStudentsList = () => {
        axios.post('/admin/loading-students',{
            id : "hoho"
        })
        .then((response) => {
            console.log('학생 정보 불러오기 성공', response);
            if(response.data.statusCode == 200) {
                setStudents(response.data.data);
            } else {
                alert("불러오기 실패");
            }
            
        })
        .catch((error) => {
            console.log("예기치 못한 오류가 발생했습니다.",error);
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.h2Wrap}>
                    <h2 className={styles.h2Text}>학생 관리</h2>
                </div>
                <div className={styles.buttonWrap}>
                    <button
                        className={selectedButton === '전체 학생' ? styles.selectButton : styles.nonSelectButton}
                        onClick={() => handleButtonClick('전체 학생')}
                    >
                        전체 학생
                    </button>
                    <button
                        className={selectedButton === '학년별' ? styles.selectButton : styles.nonSelectButton}
                        onClick={() => handleButtonClick('학년별')}
                    >
                        학년별
                    </button>
                    <button
                        className={selectedButton === '학과별' ? styles.selectButton : styles.nonSelectButton}
                        onClick={() => handleButtonClick('학과별')}
                    >
                        학과별
                    </button>
                    <button
                        className={styles.isStudentAddSelected}
                        onClick={handleStudentAddClick}
                        style={{ marginLeft: 'auto' }}
                    >
                        학생추가
                    </button>
                </div>
                <div className={styles.selectboxWrap}>
                    <select id={'search'} value={searchCondition} onChange={handleSearchConditionChange}>
                        <option value="이름">이름</option>
                        <option value="학과">학과</option>
                        <option value="학년">학년</option>
                    </select>
                    <div className={styles.inputWrap}>
                        <Search id="12:02916" className={styles.svg} />
                        {/* <img src="https://image-resource.creatie.ai/140826466779355/140826466779357/ef0d5f9b0dd3ddc582782e4f4b44dd00.png" className={styles.svg}/> */}
                        <div className={styles.input}>
                            <input 
                                type='text' 
                                className={styles.text3} 
                                placeholder='검색어를 입력하세요'
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>
                
                <div className={styles.table}>
                    <div className={styles.thead}>
                        <div className={styles.tr}>
                            <div className={styles.th}>
                                <div className={styles.classNumber}>학번</div>
                            </div>
                            <div className={styles.th}>
                                <div className={styles.name}>이름</div>
                            </div>
                            <div className={styles.th}>
                                <div className={styles.grade}>학년</div>
                            </div>
                            <div className={styles.th}>
                                <div className={styles.department}>학과</div>
                            </div>
                            <div className={styles.th}>
                                <div className={styles.phoneNumber}>전화번호</div>
                            </div>
                            <div className={styles.th}>
                                <div className={styles.email}>이메일</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tbody}>
                        {sortedStudents.map((student, index) => (
                            <div className={styles.tr} key={index}>
                                <div className={styles.td}>
                                    <div className={styles.classnumber}>{student.classNumber}</div>
                                </div>
                                <div className={styles.td}>
                                    <div className={styles.name} onClick={() => handleStudentUpdateClick(student)}>{student.name}</div>
                                </div>
                                <div className={styles.td}>
                                    <div className={styles.grade}>{student.grade}</div>
                                </div>
                                <div className={styles.td}>
                                    <div className={styles.department}>{student.department}</div>
                                </div>
                                <div className={styles.td}>
                                    <div className={styles.phonenumber}>{student.phoneNumber}</div>
                                </div>
                                <div className={styles.td}>
                                    <div className={styles.email}>{student.email}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                        <h2>{isStudentAddSelected ? "학생 정보 입력" : "학생 정보 수정"}</h2>
                        <form>
                            <label>
                                이름:
                                <input type="text" name="name" value={updateStudentInfo.name} onChange={handleInputChange}/>
                            </label>
                            <br />
                            <label>
                                학교명:
                                <input type="text" name="schoolName" value={updateStudentInfo.schoolName} onChange={handleInputChange}/>
                            </label>
                            <br />
                            <label>
                                학번:
                                <input type="text" name="classNumber" value={updateStudentInfo.classNumber} onChange={handleInputChange}/>
                            </label>
                            <br />
                            <label>
                                학년:
                                <input type="text" name="grade" value={updateStudentInfo.grade} onChange={handleInputChange}/>
                            </label>
                            <br />
                            <label>
                                학과:
                                <input type="text" name="department" value={updateStudentInfo.department} onChange={handleInputChange}/>
                            </label>
                            <br />
                            <label>
                                전화번호:
                                <input type="text" name="phoneNumber" value={updateStudentInfo.phoneNumber} onChange={handleInputChange}/>
                            </label>
                            <br />
                            <label>
                                이메일:
                                <input type="email" name="email" value={updateStudentInfo.email} onChange={handleInputChange}/>
                            </label>
                            <br />
                            <label>
                                비빌번호:
                                <input type="password" name="pw" value={updateStudentInfo.pw} onChange={handleInputChange}/>
                            </label>
                            <br />
                            <label>
                                팀명:
                                <input type="text" name="teamName" value={updateStudentInfo.teamName} onChange={handleInputChange}/>
                            </label>
                            <br />
                            <button className={styles.submitBtn} type="button" onClick={()=> clickModalBtn()}>
                                {isStudentAddSelected ? "저장" : "수정"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Root;