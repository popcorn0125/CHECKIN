package com.example.checkin.Admin.service;

import com.example.checkin.Admin.repository.AdminRepository;
import com.example.checkin.Exception.custom.AuthenticationFailedException;
import com.example.checkin.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class LoginService {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    /*******************
     * 날짜 : 2025.11.11
     * 이름 : 김준식
     * 내용 : 아이디가 존재하는지, 비밀번호가 서로 일치하는 지 확인
     * *****************/
    public Long loginAdmin(HashMap<String, String> params) {
        Admin admin = adminRepository.findByUserId(params.get("id")).orElseThrow(() ->
            new AuthenticationFailedException("아이디 또는 비밀번호가 일치하지 않습니다.")
        );
        System.out.println("admin : " + passwordEncoder.matches(params.get("pw"), admin.getPw()));
        if(!(passwordEncoder.matches(params.get("pw"), admin.getPw()))) {
            throw new AuthenticationFailedException("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        return admin.getId();
    }



}
