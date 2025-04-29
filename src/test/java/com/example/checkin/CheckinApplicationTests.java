package com.example.checkin;

import com.example.checkin.User.dto.UserDto;
import com.example.checkin.User.repository.UserRepository;
import com.example.checkin.User.service.UserServices;
import com.example.checkin.entity.Students;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
class CheckinApplicationTests {
	@Autowired
	private UserServices userService;
	@Autowired
	private UserRepository userRepository;
	@Test
	void contextLoads() {
	}

	/*******************
	 * 날짜 : 2025.04.27
	 * 이름 : 김준식
	 * 내용 : 학생 정보 수정 테스트
	 * *****************/
	@Test
	@DisplayName(value = "학생 정보 수정 테스트")
	public void updateStudentInfoTest() {
		// given
		UserDto userDto = new UserDto(2L, "대구가톨릭대학교", "컴퓨터공학", "20123456", "이순신", "010-1111-1222", "abc@abc.com", 3, "123", "동에 번쩍 서에 번쩍");

		// when
		boolean result = userService.updatedStudents(userDto);  // 수정 메소드 호출

		// then
		Assertions.assertThat(result).isTrue();  // 수정이 성공했는지 확인

		// 학생 정보가 실제로 업데이트 되었는지 확인
		Optional<Students> updatedStudent = userRepository.findById(userDto.getId());
		Assertions.assertThat(updatedStudent).isPresent();  // 학생이 존재하는지 확인
		Assertions.assertThat(updatedStudent.get().getName()).isEqualTo("이순신");  // 이름이 수정되었는지 확인
		Assertions.assertThat(updatedStudent.get().getMajor()).isEqualTo("컴퓨터공학");  // 학과가 수정되었는지 확인
		Assertions.assertThat(updatedStudent.get().getPhoneNumber()).isEqualTo("010-1111-1222");  // 전화번호가 수정되었는지 확인
		// 추가적인 필드에 대한 검증도 할 수 있습니다.
	}



}
