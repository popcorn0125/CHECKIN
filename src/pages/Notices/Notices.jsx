import React, { useState } from 'react';
import styles from '../../styles/Notices.module.css';

const notices = [
    { date: "2025.01.16 - 2024.03.13", title: "SW 이론", content: "SW이론 교육 및 실습교육 기간입니다." },
    { date: "2024.03.14 ~ 2025.04.03", title: "공통PJT 및 개인PJT", content: "공통 주제 프로젝트 교육 / SW이론 교육과 동시에 병행" },
    { date: "2024.03.28", title: "특강 일정", content: "AI 산업 동향 특강이 예정되어 있습니다." },
    { date: "2024.03.25", title: "학과 설명회", content: "신입생을 위한 학과 설명회가 진행됩니다." },
];

const surveys = [
    { title: "2024학년도 학생 만족도 조사", date: "~2024.03.31", description: "학교 생활 및 교육과정에 대한 학생들의 의견을 수렴하고자 합니다. 많은 참여 부탁드립니다." },
    { title: "급식 메뉴 선호도 조사", date: "~2024.03.25", description: "다음 학기 급식 메뉴 구성을 위한 선호도 조사를 진행합니다." },
    { title: "학교 행사 개선 의견 조사", date: "~2024.04.05", description: "학교 행사 운영 방식에 대한 개선 의견을 듣고자 합니다." },
    { title: "교내 시설 만족도 조사", date: "~2024.04.10", description: "학교 내 시설에 대한 학생들의 만족도를 조사합니다." }
];

const Root = () => {
    const [modals, setModals] = useState({ notice: false, survey: false });
    const [form, setForm] = useState({ title: "", date: "", content: "" });


    const toggleModal = (type) => setModals(prev => ({ ...prev, [type]: !prev[type] }));
    const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });
    const handleSubmit = (e, type) => {
        e.preventDefault();
        console.log(`${type === 'notice' ? "공지사항" : "설문조사"} 제출:`, form);
        toggleModal(type);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.h2Wrap}>
                    <h2 className={styles.h2Text}>공지사항</h2>
                </div>

                <div className={styles.buttonWrap}>
                    <div className={styles.button} onClick={() => toggleModal('notice')}>
                        <div className={styles.buttonText}>공지작성</div>
                    </div>
                </div>

                <div className={styles.noticeSection}>
                    {notices.map((notice, i) => (
                        <div key={i} className={styles.noticeItem}>
                            <div className={styles.noticeDate}>{notice.date}</div>
                            <div className={styles.noticeTitle}>{notice.title}</div>
                            <div className={styles.noticeContent}>{notice.content}</div>
                        </div>
                    ))}
                </div>

                <div className={styles.pagination}>
                    <div className={styles.paginationButtons}>
                        {[1, 2, 3, 4, 5].map(num => (
                            <div key={num} className={styles.button}>
                                <div className={styles.buttonText}>{num}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.wrap}>
                <div className={styles.surveySection}>
                    <div className={styles.surveyHeader}>
                        <div className={styles.surveyTitle}>설문조사</div>
                        <div className={styles.surveyWriteWrap}>
                            <div className={styles.surveyWriteBtn} onClick={() => toggleModal('survey')}>
                                설문작성
                            </div>
                        </div>
                    </div>

                    <div className={styles.surveyContent} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {surveys.map((survey, i) => (
                            <div key={i} className={styles.surveyItem}>
                                <div className={styles.surveyDate}>{survey.date}</div>
                                <div className={styles.surveyTitle}>{survey.title}</div>
                                <div className={styles.surveyDescription}>{survey.description}</div>
                                <div className={styles.surveyButton}><div className={styles.buttonText}>설문현황</div></div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.pagination}>
                        <div className={styles.paginationButtons}>
                            {[1, 2, 3, 4, 5].map(num => (
                                <div key={num} className={styles.button}>
                                    <div className={styles.buttonText}>{num}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {["notice", "survey"].map(type => (
                 modals[type] && (
                     <div key={type} className={styles.modal}>
                         <div className={styles.modalContent}>
                             <span className={styles.close} onClick={() => toggleModal(type)}>&times;</span>
                             <h2>{type === "notice" ? "공지작성" : "설문작성"}</h2>
                             <form onSubmit={(e) => handleSubmit(e, type)}>
                                 <div className={styles.formGroup}>
                                     <label htmlFor="title">제목</label>
                                     <input type="text" id="title" value={form.title} onChange={handleChange} required />
                                 </div>
                                 <div className={styles.formGroup}>
                                     <label htmlFor="date">날짜</label>
                                     <input type="date" id="date" value={form.date} onChange={handleChange} required />
                                 </div>
                                 <div className={styles.formGroup}>
                                     <label htmlFor="content">내용</label>
                                     <textarea id="content" value={form.content} onChange={handleChange} required></textarea>
                                 </div>
                                 <button type="submit" className={styles.submitButton}>제출</button>
                             </form>
                         </div>
                     </div>
                 )
             ))}
        </div>
    );
};

export default Root;