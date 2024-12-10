package com.join.base;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;

import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootTest
class ApplicationTests {

	@Test
	void contextLoads() {
		try (MockedStatic<SpringApplication> springApplicationMock = mockStatic(SpringApplication.class)) {
            ConfigurableApplicationContext mockContext = mock(ConfigurableApplicationContext.class);
            springApplicationMock.when(() -> SpringApplication.run(Application.class, new String[] {})).thenReturn(mockContext);

            Application.main(new String[] {});

            springApplicationMock.verify(() -> SpringApplication.run(Application.class, new String[] {}));
        }
	}

}
