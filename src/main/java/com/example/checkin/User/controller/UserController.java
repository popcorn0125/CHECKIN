package com.example.checkin.User.controller;

import com.example.checkin.DefaultRes;
import com.example.checkin.ResponseMessage;
import com.example.checkin.StatusCode;
import com.example.checkin.User.dto.UserDto;
import com.example.checkin.User.service.UserServices;
import com.fasterxml.jackson.core.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;

/*******************
 * 날짜 : 2025.04.09
 * 이름 : 김준식
 * 내용 : 학생관리 Controller
 * *****************/
@RestController
@RequestMapping("/admin")
public class UserController {
    @Autowired
    UserServices userServices;

    /*******************
     * 날짜 : 2025.04.09
     * 이름 : 김준식
     * 내용 : 학생정보 저장(학교명, 학과, 학번, 이름, 전화번호, 이메일, 비밀번호, 학년, 팀명)
     * *****************/
    @PostMapping("/store-students")
    public ResponseEntity storedStudents(@RequestBody HashMap<String, Object> params) {
        UserDto userDto = changeDto(params);

        System.out.println("storedStudents 실행 + " + userDto.toString());

        boolean result = userServices.storedStudents(userDto);

        if(result) {
            return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResponseMessage.CREATED_USER, null), HttpStatus.valueOf(StatusCode.OK));
        }
        else {
            return new ResponseEntity(DefaultRes.res(StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR, null), HttpStatus.valueOf(StatusCode.INTERNAL_SERVER_ERROR));
        }
    }

    /*******************
     * 날짜 : 2025.04.10
     * 이름 : 김준식
     * 내용 : 학생정보 수정(학교명, 학과, 학번, 이름, 전화번호, 이메일, 비밀번호, 학년, 팀명)
     * *****************/
    @PostMapping("/update-students")
    public ResponseEntity updatedStudents(@RequestBody HashMap<String, Object> params) {
        System.out.println("updatedStuents 실행");
        HashMap<String, Object> data = (HashMap<String, Object>)params.get("data");
        UserDto userDto = changeDto(data);

        boolean result = userServices.updatedStudents(userDto);

        if(result) {
            return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResponseMessage.UPDATE_USER, null), HttpStatus.valueOf(StatusCode.OK));
        }
        else {
            return new ResponseEntity(DefaultRes.res(StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR, null), HttpStatus.valueOf(StatusCode.INTERNAL_SERVER_ERROR));
        }

    }
    /*******************
     * 날짜 : 2025.04.29
     * 이름 : 김준식
     * 내용 : 학생 정보 리스트 불러오기
     * *****************/
    @PostMapping("/loading-students")
    public ResponseEntity getStudents(@RequestBody HashMap<String, Object> params) {
        System.out.println("getStudents 실행 : " + params);
        try {
            return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResponseMessage.READ_USER, userServices.getStudents()), HttpStatus.valueOf(StatusCode.OK));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(DefaultRes.res(StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR, null), HttpStatus.valueOf(StatusCode.INTERNAL_SERVER_ERROR));
        }
    }

    /*******************
     * 날짜 : 2025.04.10
     * 이름 : 김준식
     * 내용 : @Request HashMap을 DTO로 변환
     * *****************/
    public UserDto changeDto(HashMap<String, Object> params) {
        UserDto result = new UserDto();
        // 값이 존재하면만 대입 (null 또는 빈 값 체크)
        if(params.get("id") != null && !params.get("id").toString().isEmpty()) {
            result.setId( Long.valueOf(params.get("id").toString()));
        }
        if (params.get("schoolName") != null && !params.get("schoolName").toString().isEmpty()) {
            result.setSchoolName(params.get("schoolName").toString());
        }

        if (params.get("department") != null && !params.get("department").toString().isEmpty()) {
            result.setDepartment(params.get("department").toString());
        }

        if (params.get("classNumber") != null && !params.get("classNumber").toString().isEmpty()) {
            result.setClassNumber(params.get("classNumber").toString());
        }

        if (params.get("name") != null && !params.get("name").toString().isEmpty()) {
            result.setName(params.get("name").toString());
        }

        if (params.get("phoneNumber") != null && !params.get("phoneNumber").toString().isEmpty()) {
            result.setPhoneNumber(params.get("phoneNumber").toString());
        }

        if (params.get("email") != null && !params.get("email").toString().isEmpty()) {
            result.setEmail(params.get("email").toString());
        }

        if (params.get("pw") != null && !params.get("pw").toString().isEmpty()) {
            result.setPw(params.get("pw").toString());
        } else {
            // 비밀번호가 null이면 빈 문자열로 설정
            result.setPw("");
        }
        // 숫자형 값 처리 시 예외처리 추가
        if (params.get("grade") != null && !params.get("grade").toString().isEmpty()) {
            try {
                result.setGrade(Integer.parseInt(params.get("grade").toString()));
            } catch (NumberFormatException e) {
                // 예외 처리
                result.setGrade(0);  // 예시로 기본값 0을 설정
            }
        }

        if (params.get("teamName") != null && !params.get("teamName").toString().isEmpty()) {
            result.setTeamName(params.get("teamName").toString());
        }

        return result;
    }
}
