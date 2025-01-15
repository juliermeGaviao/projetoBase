package com.join.base.configuration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.join.base.dto.ProductDto;
import com.join.base.dto.SectorDto;
import com.join.base.model.Product;
import com.join.base.model.Sector;

@SpringBootTest
class MapperConfigTest {

	@Autowired
    private ModelMapper modelMapperBean;

    @Test
    void testProductMapping() {
    	SectorDto sectorDto = new SectorDto(1L, "Laticínio");
    	ProductDto productDto = new ProductDto(1L, "Iogurte", sectorDto);

    	Product product = modelMapperBean.map(productDto, Product.class);

    	assertEquals("Laticínio", product.getSetor().getNome());

    	productDto = modelMapperBean.map(product, ProductDto.class);

    	assertEquals("Iogurte", productDto.getNome());
    }

    @Test
    void testSectorMapping() {
    	Sector sector = new Sector(1L, "Laticínio");

    	sector.getProducts().add(new Product(1L, sector, "Iogurte"));

    	SectorDto sectorDto = modelMapperBean.map(sector, SectorDto.class);

    	assertEquals("Laticínio", sectorDto.getNome());

    	sector = modelMapperBean.map(sectorDto, Sector.class);

    	assertEquals("Laticínio", sector.getNome());
    }

}
