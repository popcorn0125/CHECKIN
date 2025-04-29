package com.example.checkin.User.dto;


import lombok.*;

/*******************
 * 날짜 : 2025.04.09
 * 이름 : 김준식
 * 내용 : 학생관리 DTO
 * *****************/
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;            // ID
    private String schoolName;  // 학교명
    private String department;  // 학과
    private String classNumber; // 학번
    private String name;        // 이름
    private String phoneNumber; // 전화번호
    private String email;       // 이메일
    private int grade;          // 학년
    private String pw;          // 비밀번호
    private String teamName;    // 팀명

    public UserDto(Long id, String schoolName, String major, String studentId, String name, String phoneNumber, String email, int grade, String teamName) {
        this.id = id;
        this.schoolName = schoolName;
        this.department = major;
        this.classNumber = studentId;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.grade = grade;
        this.teamName = teamName;
    }

}
