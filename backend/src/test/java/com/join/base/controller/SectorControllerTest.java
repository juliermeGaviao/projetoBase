package com.join.base.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.join.base.command.CreateSectorCommand;
import com.join.base.dto.SectorDto;
import com.join.base.service.impl.SectorServiceImpl;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(roles={"BASE_ADM_FUNC_CAD_CADASTRAR", "BASE_VIS_FUNC_VIS_ACESSAR"})
class SectorControllerTest {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	SectorServiceImpl sectorServiceImpl;

	@InjectMocks
	SectorController controller = new SectorController(sectorServiceImpl);

	static final String API = "/sector";
	SectorDto sector = new SectorDto(1L, "Laticínio");
	CreateSectorCommand command = new CreateSectorCommand("Laticínio");
	private static ObjectMapper mapper = new ObjectMapper();

	@Test
	void getAllSectorsTest() throws Exception {

		when(sectorServiceImpl.list()).thenReturn(List.of(sector));

		mockMvc.perform(get(API + "/all")).andExpect(status().isOk()).andExpect(content()
				.json("[{\"id\":1,\"nome\":\"Laticínio\"}]"));

	}

	@Test
	void getOneProductTest() throws Exception {

		when(sectorServiceImpl.get(anyLong())).thenReturn(Optional.of(sector));

		mockMvc.perform(get(API + "/1")).andExpect(status().isOk()).andExpect(
				content().json("{\"id\":1,\"nome\":\"Laticínio\"}"));
	}

	@Test
	void createNewProductTest() throws Exception {
		when(sectorServiceImpl.save(any())).thenReturn(sector);
		String jsonBody = mapper.writeValueAsString(command);

		mockMvc.perform(post(API).contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonBody).accept(MediaType.ALL))
				.andExpect(status().isOk()).andExpect(content()
						.json("{\"id\":1,\"nome\":\"Laticínio\"}"));
	}

	@Test
	void updateProductTest() throws Exception {
		String jsonBody = mapper.writeValueAsString(sector);

		when(sectorServiceImpl.update(any())).thenReturn(sector);

		mockMvc.perform(put(API).contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonBody).accept(MediaType.ALL))
				.andExpect(status().isOk()).andExpect(content()
						.json("{\"id\":1,\"nome\":\"Laticínio\"}"));
	}

	@Test
	void deleteSectorTest() throws Exception {
		doNothing().when(sectorServiceImpl).delete(any());

		mockMvc.perform(delete(API + "/1")).andExpect(status().isOk());
	}

	@Test
	@WithMockUser(roles="BASE_VIS_FUNC_VIS_ACESSAR")
	void getProductPageableTest() throws Exception {
        Map<String, Object> response = new HashMap<>();

        response.put("sectors", List.of(sector));
        response.put("currentPage", 0);
        response.put("totalItems", 1);
        response.put("totalPages", 1);

        when(sectorServiceImpl.list(any())).thenReturn(response);

		mockMvc.perform(get(API + "/page?page=0&size=10")).andExpect(status().isOk()).andExpect(content()
				.json("{\"totalItems\":1,\"totalPages\":1,\"currentPage\":0,\"sectors\":[{\"id\":1,\"nome\":\"Laticínio\"}]}"));
	}

}
