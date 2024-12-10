package com.join.base.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;

import com.join.base.command.CreateProductCommand;
import com.join.base.dto.ProductDto;
import com.join.base.dto.SectorDto;
import com.join.base.exception.ParametrizedMessageException;
import com.join.base.model.Product;
import com.join.base.model.Sector;
import com.join.base.query.ProductPageFilterQuery;
import com.join.base.repository.ProductRepository;
import com.join.base.repository.SectorRepository;

@SpringBootTest
@AutoConfigureMockMvc
class ProductServiceImplTest {

	@Mock
	private ProductRepository productRepository;

	@Mock
	private SectorRepository sectorRepository;

	@Mock
	private SectorServiceImpl sectorServiceImpl;

    @Mock
    ModelMapper modelMapper;

	@InjectMocks
	ProductServiceImpl service = new ProductServiceImpl(productRepository, sectorRepository, sectorServiceImpl, modelMapper);

	Sector sector = new Sector(1L, "Laticínio");
	Product product = new Product(1L, sector, "Iogurte");
	SectorDto sectorDto = new SectorDto(1L, "Laticínio");
	ProductDto productDto = new ProductDto(1L, "Iogurte", sectorDto);
	CreateProductCommand command = new CreateProductCommand(1L, "Iogurte");
	static final Integer ONE = 1;

    @Test
	void getTest() {
		when(productRepository.findById(anyLong())).thenReturn(Optional.of(product));
		when(sectorServiceImpl.convertToDto(any())).thenReturn(sectorDto);

		Optional<ProductDto> result = this.service.get(1L);

		assertTrue(result.isPresent());
		assertEquals(1L, result.get().getSetor().getId());
	}

    @Test
    void listTest() {
    	when(productRepository.findAll()).thenReturn(List.of(product));
		when(sectorServiceImpl.convertToDto(any())).thenReturn(sectorDto);

		List<ProductDto> result = this.service.list();

		assertEquals(1L, result.size());
		assertEquals(1L, result.get(0).getSetor().getId());
    }

    @SuppressWarnings("unchecked")
	@Test
    void listPageableNoFilter() {
        ProductPageFilterQuery filter = new ProductPageFilterQuery(0, 10, "nome", "asc", null, null);

        when(productRepository.findAll(any())).thenReturn(new PageImpl<Product>(List.of(product)));

        Map<String, Object> result = this.service.list(filter);
        List<ProductDto> products = (List<ProductDto>) result.get("products");

        assertEquals(1L, products.size());
        assertEquals(1L, products.get(0).getId());
    }

    @SuppressWarnings("unchecked")
	@Test
    void listPageableFilteredBySector() {
        ProductPageFilterQuery filter = new ProductPageFilterQuery(0, 10, "nome", "asc", null, 1L);

        when(productRepository.findAll(any(), any())).thenReturn(new PageImpl<Product>(List.of(product)));

        Map<String, Object> result = this.service.list(filter);
        List<ProductDto> products = (List<ProductDto>) result.get("products");

        assertEquals(1L, products.size());
        assertEquals(1L, products.get(0).getId());

        filter = new ProductPageFilterQuery(0, 10, "nome", "asc", null, 0L);

        when(productRepository.findAll(any(), any())).thenReturn(new PageImpl<Product>(List.of(product)));

        this.service.list(filter);
    }

    @SuppressWarnings("unchecked")
	@Test
    void listPageableFullFiltered() {
        ProductPageFilterQuery filter = new ProductPageFilterQuery(0, 10, "nome", "asc", "Iogurte", 1L);

        when(productRepository.findAll(any(), any())).thenReturn(new PageImpl<Product>(List.of(product)));

        Map<String, Object> result = this.service.list(filter);
        List<ProductDto> products = (List<ProductDto>) result.get("products");

        assertEquals(1L, products.size());
        assertEquals(1L, products.get(0).getId());
    }

    @Test
    void saveTest() {
    	when(productRepository.findByNomeIgnoreCase(anyString())).thenReturn(new ArrayList<Product>());
    	when(sectorRepository.findById(anyLong())).thenReturn(Optional.of(sector));
    	when(productRepository.save(any())).thenReturn(product);
		when(sectorServiceImpl.convertToDto(any())).thenReturn(sectorDto);

		ProductDto result = this.service.save(command);

		assertEquals(1L, result.getId());
    }

    @Test
    void saveTestDuplicatedName() {
    	when(productRepository.findByNomeIgnoreCase(anyString())).thenReturn(List.of(product));

		assertThrows(ParametrizedMessageException.class, () -> service.save(command));
    }

    @Test
    void saveTestNoSector() {
    	when(productRepository.findByNomeIgnoreCase(anyString())).thenReturn(new ArrayList<Product>());
    	when(sectorRepository.findById(anyLong())).thenReturn(Optional.empty());

		assertThrows(ParametrizedMessageException.class, () -> service.save(command));
    }

    @Test
    void updateTest() {
    	when(productRepository.existsById(anyLong())).thenReturn(Boolean.TRUE);
    	when(productRepository.findByNomeIgnoreCase(anyString())).thenReturn(List.of(product));
    	when(sectorRepository.findById(anyLong())).thenReturn(Optional.of(sector));
    	doReturn(product).when(modelMapper).map(product, Product.class);
    	when(productRepository.save(any())).thenReturn(product);
		when(sectorServiceImpl.convertToDto(any())).thenReturn(sectorDto);

		ProductDto result = this.service.update(productDto);

		assertEquals(1L, result.getId());
    }

    @Test
    void updateTestNegativeId() {
    	ProductDto parameter = new ProductDto(-1L, "Iogurte", sectorDto);

    	assertThrows(ParametrizedMessageException.class, () -> this.service.update(parameter));
    }

    @Test
    void updateTestIdNotExists() {
    	ProductDto parameter = new ProductDto(2L, "Iogurte", sectorDto);
    	when(productRepository.existsById(anyLong())).thenReturn(Boolean.FALSE);

    	assertThrows(ParametrizedMessageException.class, () -> this.service.update(parameter));
    }

    @Test
    void updateTestDuplicatedName() {
    	ProductDto parameter = new ProductDto(2L, "Iogurte", sectorDto);

    	when(productRepository.existsById(anyLong())).thenReturn(Boolean.TRUE);
    	when(productRepository.findByNomeIgnoreCase(anyString())).thenReturn(List.of(product));

    	assertThrows(ParametrizedMessageException.class, () -> this.service.update(parameter));
    }

    @Test
    void updateTestNoSector() {
    	when(productRepository.existsById(anyLong())).thenReturn(Boolean.TRUE);
    	when(productRepository.findByNomeIgnoreCase(anyString())).thenReturn(List.of(product));
    	when(sectorRepository.findById(anyLong())).thenReturn(Optional.empty());

    	assertThrows(ParametrizedMessageException.class, () -> this.service.update(productDto));
    }

    @Test
    void updateTestNameUniqueNoSector() {
    	when(productRepository.existsById(anyLong())).thenReturn(Boolean.TRUE);
    	when(productRepository.findByNomeIgnoreCase(anyString())).thenReturn(new ArrayList<Product>());
    	when(sectorRepository.findById(anyLong())).thenReturn(Optional.empty());

    	assertThrows(ParametrizedMessageException.class, () -> this.service.update(productDto));
    }

    @Test
    void deleteTest() {
    	when(productRepository.findById(anyLong())).thenReturn(Optional.of(product));

    	doNothing().when(productRepository).delete(any());

    	this.service.delete(1L);

    	assertEquals(1, ONE);
    }

    @Test
    void deleteTestIdNotFound() {
    	when(productRepository.findById(anyLong())).thenReturn(Optional.empty());

    	assertThrows(ParametrizedMessageException.class, () -> this.service.delete(1L));
    }

}
