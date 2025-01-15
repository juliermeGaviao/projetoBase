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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.join.base.command.CreateProductCommand;
import com.join.base.dto.ProductDto;
import com.join.base.dto.SectorDto;
import com.join.base.exception.ParametrizedMessageException;
import com.join.base.service.impl.ProductServiceImpl;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(roles={"BASE_ADM_FUNC_CAD_CADASTRAR", "BASE_VIS_FUNC_VIS_ACESSAR"})
class ProductControllerTest {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	ProductServiceImpl productServiceImpl;

	@InjectMocks
	ProductController controller = new ProductController(productServiceImpl);

	static final String API = "/product";
	SectorDto sector = new SectorDto(1L, "Laticínio");
	ProductDto product = new ProductDto(1L, "Iogurte", sector);
	CreateProductCommand command = new CreateProductCommand(1L, "Iogurte");
	private static ObjectMapper mapper = new ObjectMapper();

	@Test
	void getAllProductsTest() throws Exception {

		when(productServiceImpl.list()).thenReturn(List.of(product));

		mockMvc.perform(get(API + "/all")).andExpect(status().isOk()).andExpect(content()
				.json("[{ \"id\":1, \"nome\":\"Iogurte\", \"setor\": { \"id\": 1, \"nome\": \"Laticínio\" }}]"));
	}

	@Test
	void getOneProductTest() throws Exception {

		when(productServiceImpl.get(anyLong())).thenReturn(Optional.of(product));

		mockMvc.perform(get(API + "/1")).andExpect(status().isOk()).andExpect(
				content().json("{ \"id\":1, \"nome\":\"Iogurte\", \"setor\": { \"id\": 1, \"nome\": \"Laticínio\" }}"));
	}

	@Test
	void createNewProductTest() throws Exception {
		when(productServiceImpl.save(any())).thenReturn(product);
		String jsonBody = mapper.writeValueAsString(command);

		mockMvc.perform(post(API).contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonBody).accept(MediaType.ALL))
				.andExpect(status().isOk()).andExpect(content()
						.json("{ \"id\":1, \"nome\":\"Iogurte\", \"setor\": { \"id\": 1, \"nome\": \"Laticínio\" }}"));
	}

	@Test
	void updateProductTest() throws Exception {
		String jsonBody = mapper.writeValueAsString(product);

		when(productServiceImpl.update(any())).thenReturn(product);

		mockMvc.perform(put(API).contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonBody).accept(MediaType.ALL))
				.andExpect(status().isOk()).andExpect(content()
						.json("{ \"id\":1, \"nome\":\"Iogurte\", \"setor\": { \"id\": 1, \"nome\": \"Laticínio\" }}"));
	}

	@Test
	void deleteProductTest() throws Exception {
		doNothing().when(productServiceImpl).delete(any());

		mockMvc.perform(delete(API + "/1")).andExpect(status().isOk());
	}

	@Test
	void getProductPageableTest() throws Exception {
        Map<String, Object> response = new HashMap<>();

        response.put("products", List.of(product));
        response.put("currentPage", 0);
        response.put("totalItems", 1);
        response.put("totalPages", 1);

        when(productServiceImpl.list(any())).thenReturn(response);

		mockMvc.perform(get(API + "/page?page=0&size=10")).andExpect(status().isOk()).andExpect(content()
				.json("{\"totalItems\":1,\"totalPages\":1,\"currentPage\":0,\"products\":[{\"id\":1,\"nome\":\"Iogurte\",\"setor\":{\"id\":1,\"nome\":\"Laticínio\"}}]}"));
	}

	@Test
	void getProductRaiseDataIntegrityViolationException() throws Exception {
		when(productServiceImpl.list()).thenThrow(DataIntegrityViolationException.class);

		mockMvc.perform(get(API + "/all")).andExpect(status().is4xxClientError());
	}

	@Test
	void getProductRaiseException() throws Exception {
		when(productServiceImpl.list()).thenThrow(RuntimeException.class);

		mockMvc.perform(get(API + "/all")).andExpect(status().is5xxServerError());
	}

	@Test
	void updateProductRaiseParametrizedMessageException() throws Exception {
		String jsonBody = mapper.writeValueAsString(product);
		ParametrizedMessageException e = new ParametrizedMessageException(HttpStatus.BAD_REQUEST, "Teste de exceção");

		when(productServiceImpl.update(any())).thenThrow(e);

		mockMvc.perform(put(API).contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonBody).accept(MediaType.ALL)).andExpect(status().is4xxClientError());
	}

}
