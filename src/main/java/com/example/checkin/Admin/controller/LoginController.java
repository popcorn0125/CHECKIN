package com.example.checkin.Admin.controller;

import com.example.checkin.Admin.service.LoginService;
import com.example.checkin.DefaultRes;
import com.example.checkin.ResponseMessage;
import com.example.checkin.StatusCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/*******************
 * 날짜 : 2025.04.03
 * 이름 : 김준식
 * 내용 : Login 컨트롤러
 * *****************/
@RestController
@RequestMapping("/admin")
public class LoginController {
    @Autowired
    LoginService loginService;

    /*******************
     * 날짜 : 2025.11.11
     * 이름 : 김준식
     * 내용 : 아이디와 비밀번호를 서비스에 넘겨주고 존재 여부를 확인 후 존재한다면 세션 생성
     * *****************/
    @PostMapping("/login")
    public ResponseEntity loginAdmin(@RequestBody HashMap<String, String> params, HttpServletRequest request) {
        System.out.println("login Controller 실행");
        System.out.println("전달 받은 params : " + params.get("id") + ", " + params.get("pw"));

        // 사용자 존재 여부에 따라 서비스로부터 pk를 받아옴
        Long loginAdminId = loginService.loginAdmin(params);

        // 세션 생성
        HttpSession session = request.getSession(true); // 없으면 새로 만들고, 있으면 기존 것을 가져옴

        session.setAttribute("loginAdminId", loginAdminId);
        session.setMaxInactiveInterval(8 * 60 * 60); // 시간 x 분 x 초 = 시간 -> 8시간

        return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResponseMessage.LOGIN_SUCCESS, null), HttpStatus.valueOf(StatusCode.OK));
    }

}
