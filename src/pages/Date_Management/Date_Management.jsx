import React, { useState } from 'react';
import styles from "../../styles/Date_Management.module.css";
import Search from '../../assets/icons/search.svg?react';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderCalendar = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const calendarDays = [];

        // 요일 헤더 추가
        calendarDays.push(
            ...daysOfWeek.map((day, index) => (
                <div key={`day-${index}`} className={styles.weekday}>
                    {day}
                </div>
            ))
        );

        // 빈칸 채우기
        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(<div key={`empty-${i}`} className={styles.empty}></div>);
        }

        // 날짜 채우기
        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected = day === selectedDate.getDate();
            calendarDays.push(
                <div
                    key={day}
                    className={`${styles.day} ${isSelected ? styles.selected : ''}`}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                >
                    <span className={styles.dayNumber}>{day}</span>
                    {/* 일정이 있는 경우 표시 */}
                    <div className={styles.eventDot}></div>
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
                <button className={styles.navButton} onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}>◀</button>
                <span>{selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월</span>
                <button className={styles.navButton} onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}>▶</button>
            </div>
            <div className={styles.calendarGrid}>
                {renderCalendar()}
            </div>
        </div>
    );
};

const ImportantEvents = () => {
    const events = [
        { date: "2025.01.16 - 2024.03.13", title: "SW 이론", description: "SW이론 교육 및 실습교육 기간입니다." },
        { date: "2024.03.14 ~ 2025.04.03", title: "공통PJT 및 개인PJT", description: "공통 주제 프로젝트 교육 / SW이론 교육과 동시에 병행" },
        { date: "2024.03.28", title: "특강 일정", description: "AI 산업 동향 특강이 예정되어 있습니다." },
        { date: "2024.03.25", title: "학과 설명회", description: "신입생을 위한 학과 설명회가 진행됩니다." },
    ];

    return (
        <div className={styles.eventList}>
            {events.map((event, index) => (
                <div key={index} className={styles.eventItem}>
                    <div className={styles.eventDate}>{event.date}</div>
                    <div className={styles.eventTitle}>{event.title}</div>
                    <div className={styles.eventDescription}>{event.description}</div>
                </div>
            ))}
        </div>
    );
};

const Root = () => {
    const [modals, setModals] = useState(false);
    const [form, setForm] = useState({ title: "", startDate: "", endDate: "", content: "" });

    const toggleModal = (state) => {
        setModals(state);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
        toggleModal(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.h2Wrap}>
                    <h2 className={styles.h2Text}>일정관리</h2>
                </div>
                <div className={styles.calendarWrap}>
                    <Calendar />
                </div>
                <div className={styles.calendarWrap}>
                    <button className={styles.addEventButton} onClick={() => toggleModal(true)}>일정 추가</button>
                </div>
                <div className={styles.importantEventsWrap}>
                    <ImportantEvents />
                </div>
            </div>

            {modals && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={() => toggleModal(false)}>&times;</span>
                        <h2>새로운 일정</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="title">제목</label>
                                <input type="text" id="title" value={form.title} onChange={handleChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="date">날짜</label>
                                <div className={styles.dateRange}>
                                    <input type="date" id="startDate" value={form.startDate} onChange={handleChange} required />
                                    <span>~</span>
                                    <input type="date" id="endDate" value={form.endDate} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="content">내용</label>
                                <textarea id="content" value={form.content} onChange={handleChange} required></textarea>
                            </div>
                            <button type="submit" className={styles.submitButton}>등록</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Root;
