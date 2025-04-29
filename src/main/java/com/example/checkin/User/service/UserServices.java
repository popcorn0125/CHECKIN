package com.example.checkin.User.service;

import com.example.checkin.User.dto.UserDto;
import com.example.checkin.User.repository.UserRepository;
import com.example.checkin.entity.Students;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/*******************
 * 날짜 : 2025.04.09
 * 이름 : 김준식
 * 내용 : 학생관리 Service
 * *****************/
@Service
public class UserServices {
    @Autowired
    UserRepository userRepository;

    /*******************
     * 날짜 : 2025.04.09
     * 이름 : 김준식
     * 내용 : 학생정보 저장(학교명, 학과, 학번, 이름, 전화번호, 이메일, 비밀번호, 학년, 팀명)
     * *****************/
    public boolean storedStudents(UserDto userDto) {
        Students students = Students.builder()
                .name(userDto.getName())
                .schoolName(userDto.getSchoolName())
                .studentId(userDto.getClassNumber())
                .grade(userDto.getGrade())
                .major(userDto.getDepartment())
                .phoneNumber(userDto.getPhoneNumber())
                .email(userDto.getEmail())
                .teamName(userDto.getTeamName())
                .pw(userDto.getPw())
                .isDeleted('Y')
                .build();

        try {
            Students students1 = userRepository.save(students);
            if(students1 != null) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /*******************
     * 날짜 : 2025.04.10
     * 이름 : 김준식
     * 내용 : 학생정보 수정(학교명, 학과, 학번, 이름, 전화번호, 이메일, 비밀번호, 학년, 팀명)
     * *****************/
    @Transactional
    public boolean updatedStudents(UserDto userDto) {
        System.out.println("userDto Service 실행 : " + userDto);
        try {
            if(userDto.getPw() == null || userDto.getPw().replaceAll(" ","").isEmpty()) {
                userDto.setPw(userRepository.getPw(userDto.getId()));
            }
            int result = userRepository.updateStudentInfo(
                    userDto.getId(),
                    userDto.getSchoolName(),
                    userDto.getDepartment(),
                    userDto.getClassNumber(),
                    userDto.getName(),
                    userDto.getPhoneNumber(),
                    userDto.getEmail(),
                    userDto.getGrade(),
                    userDto.getPw(),
                    userDto.getTeamName()
            );

            return result > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    /*******************
     * 날짜 : 2025.04.29
     * 이름 : 김준식
     * 내용 : 학생 정보 리스트 불러오기
     * *****************/
    public List<UserDto> getStudents() {
        System.out.println("getStudents Service 실행");
        try{
            return userRepository.findAllByIsDeleted('Y');
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
