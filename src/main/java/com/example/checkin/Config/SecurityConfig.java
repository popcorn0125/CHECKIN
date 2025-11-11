package com.example.checkin.Config;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

/*******************
 * 날짜 : 2025.04.03
 * 이름 : 김준식
 * 내용 : Security 설정
 * *****************/
@Configuration
public class SecurityConfig {

    /*******************
     * 날짜 : 2025.04.04
     * 이름 : 김준식
     * 내용 :
     * CSRF 보호 비활성화 및 CORS 설정: 모든 도메인에서 오는 요청을 허용하고,
     * GET, POST, PUT, DELETE 메소드만 허용하는 CORS 정책 적용
     *****************/
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
//                .cors(withDefaults());
                .cors(cors -> {
                    CorsConfigurationSource source = request -> {
                        CorsConfiguration configuration = new CorsConfiguration();
                        configuration.setAllowedOrigins(List.of("*")); // 모든 도메인에서 오는 요청을 허용
                        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE")); // GET, POST, PUT, DELETE 메소드만 허용
                        return configuration;
                    };
                    cors.configurationSource(source); // CORS 설정을 사용하여 요청 처리
                });
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
