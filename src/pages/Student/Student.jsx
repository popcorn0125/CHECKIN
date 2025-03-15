import React, { useState } from 'react';
import styles from "../../styles/Student.module.css";
import Search from '../../assets/icons/search.svg?react';


const Root = ({}) => {
    const [selectedButton, setSelectedButton] = useState('전체 학생');
    const [isStudentAddSelected, setIsStudentAddSelected] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCondition, setSearchCondition] = useState('이름');
    const [updateStudentInfo, setUpdateStudentInfo] = useState({ department: '', classnumber: '', name: '', phonenumber: '', email: '', grade: '' })

    const students = [
        { department: '소프트웨어학과', classnumber: '2024001', name: '고정윤', phonenumber: '010-1234-5678', email: 'jyko@email.com', grade: '1학년' },
        { department: '컴퓨터공학과', classnumber: '2023015', name: '김준식', phonenumber: '010-9876-5432', email: 'jskim@email.com', grade: '2학년' },
        { department: '정보통신학과', classnumber: '2024003', name: '박민지', phonenumber: '010-2345-6789', email: 'mjpark@email.com', grade: '1학년' },
        { department: '소프트웨어학과', classnumber: '2024002', name: '이수민', phonenumber: '010-3456-7890', email: 'suminlee@email.com', grade: '1학년' },
        { department: '컴퓨터공학과', classnumber: '2023016', name: '최영수', phonenumber: '010-4567-8901', email: 'youngsoochoi@email.com', grade: '2학년' },
        { department: '정보통신학과', classnumber: '2024004', name: '한지민', phonenumber: '010-5678-9012', email: 'jiminhan@email.com', grade: '1학년' },
        { department: '소프트웨어학과', classnumber: '2024005', name: '박지훈', phonenumber: '010-6789-0123', email: 'jihunpark@email.com', grade: '1학년' },
        { department: '컴퓨터공학과', classnumber: '2023017', name: '김민수', phonenumber: '010-7890-1234', email: 'minsookim@email.com', grade: '2학년' },
        { department: '정보통신학과', classnumber: '2024006', name: '정예린', phonenumber: '010-8901-2345', email: 'yerinjeong@email.com', grade: '1학년' },
        { department: '소프트웨어학과', classnumber: '2024007', name: '홍길동', phonenumber: '010-9012-3456', email: 'gildonghong@email.com', grade: '1학년' },
        { department: '소프트웨어학과', classnumber: '2023001', name: '김영희', phonenumber: '010-1111-2222', email: 'younghee.kim@email.com', grade: '3학년' },
        { department: '컴퓨터공학과', classnumber: '2023002', name: '이철수', phonenumber: '010-3333-4444', email: 'chulsoo.lee@email.com', grade: '3학년' },
        { department: '정보통신학과', classnumber: '2022001', name: '박영수', phonenumber: '010-5555-6666', email: 'youngsoo.park@email.com', grade: '4학년' },
        { department: '소프트웨어학과', classnumber: '2022002', name: '최민지', phonenumber: '010-7777-8888', email: 'minji.choi@email.com', grade: '4학년' },
    ];

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        setIsStudentAddSelected(false);
    };

    const handleStudentAddClick = () => {
        setUpdateStudentInfo({ department: '', classnumber: '', name: '', phonenumber: '', email: '', grade: '' })
        setIsStudentAddSelected(true);
        setIsModalOpen(true);
    };

    const handleStudentUpdateClick = (student) => {
        setUpdateStudentInfo({department: student.department, classnumber: student.classnumber, name: student.name, phonenumber: student.phonenumber, email: student.email, grade: student.grade})
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
                                <div className={styles.classnumber}>학번</div>
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
                                <div className={styles.phonenumber}>전화번호</div>
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
                                    <div className={styles.classnumber}>{student.classnumber}</div>
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
                                    <div className={styles.phonenumber}>{student.phonenumber}</div>
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
                                <input type="text" name="name" value={updateStudentInfo.name} />
                            </label>
                            <br />
                            <label>
                                학번:
                                <input type="text" name="classnumber" value={updateStudentInfo.classnumber} />
                            </label>
                            <br />
                            <label>
                                학년:
                                <input type="text" name="grade" value={updateStudentInfo.grade} />
                            </label>
                            <br />
                            <label>
                                학과:
                                <input type="text" name="department" value={updateStudentInfo.department} />
                            </label>
                            <br />
                            <label>
                                전화번호:
                                <input type="text" name="phonenumber" value={updateStudentInfo.phonenumber} />
                            </label>
                            <br />
                            <label>
                                이메일:
                                <input type="email" name="email" value={updateStudentInfo.email} />
                            </label>
                            <br />
                            <button className={styles.submitBtn} type="submit">
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