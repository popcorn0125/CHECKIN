package com.example.checkin.User.repository;

import com.example.checkin.User.dto.UserDto;
import com.example.checkin.entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Students, Long> {

    @Modifying
    @Query("UPDATE Students s SET s.schoolName = :schoolName, s.major = :major, s.studentId = :studentId, s.name = :name, s.phoneNumber = :phoneNumber, s.email = :email, s.grade = :grade, s.pw = :pw, s.teamName = :teamName WHERE s.id = :id")
    int updateStudentInfo(Long id, String schoolName, String major, String studentId, String name, String phoneNumber, String email, int grade, String pw, String teamName);

//    @Query(
//            "SELECT s.id, s.schoolName, s.major as department, s.studentId as classNumber, s.name, s.phoneNumber, s.email, s.grade, s.teamName FROM Students s WHERE s.isDeleted = :check"
//    )
//    List<Tuple> findAllByIsDeleted(char check);

    @Query("SELECT new com.example.checkin.User.dto.UserDto(s.id, s.schoolName, s.major, s.studentId, s.name, s.phoneNumber, s.email, s.grade, s.teamName) FROM Students s WHERE s.isDeleted = :check")
    List<UserDto> findAllByIsDeleted(char check);

    @Query("SELECT s.pw FROM Students s WHERE s.id = :id")
    String getPw(Long id);
}
