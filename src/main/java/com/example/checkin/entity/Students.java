package com.example.checkin.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(schema = "checkin")
public class Students {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 30)
    private String name;

    @Column(name = "school_name", length = 100)
    private String schoolName;

    @Column(name = "student_id", length = 20 )
    private String studentId;

    @Column(name = "grade")
    private int grade;

    @Column(name = "major", length = 50)
    private String major;

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "team_name", length = 50)
    private String teamName;

    @Column(name = "pw", nullable = false, length = 255)
    private String pw;

    @Column(name = "is_deleted", length = 1)
    private char isDeleted;

}
