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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;

import com.join.base.command.CreateSectorCommand;
import com.join.base.dto.PageableDto;
import com.join.base.dto.SectorDto;
import com.join.base.exception.ParametrizedMessageException;
import com.join.base.model.Sector;
import com.join.base.query.SectorPageFilterQuery;
import com.join.base.repository.SectorRepository;

@SpringBootTest
class SectorServiceImplTest {

	@Mock
	private SectorRepository sectorRepository;

	@Mock
	private ModelMapper modelMapper;

	@InjectMocks
	SectorServiceImpl service = new SectorServiceImpl(sectorRepository, modelMapper);

	Sector sector = new Sector(1L, "Laticínio");
	SectorDto sectorDto = new SectorDto(1L, "Laticínio");
	CreateSectorCommand command = new CreateSectorCommand("Laticínio");
	static final Integer ONE = 1;

    @Test
	void getTest() {
		when(sectorRepository.findById(anyLong())).thenReturn(Optional.of(sector));

		Optional<SectorDto> result = this.service.get(1L);

		assertTrue(result.isPresent());
		assertEquals(1L, result.get().getId());
	}

    @Test
    void listTest() {
    	when(sectorRepository.findAll()).thenReturn(List.of(sector));

		List<SectorDto> result = this.service.list();

		assertEquals(1L, result.size());
		assertEquals(1L, result.get(0).getId());
    }

    @SuppressWarnings("unchecked")
	@Test
    void listPageableNoFilter() {
        SectorPageFilterQuery filter = new SectorPageFilterQuery(0, 10, "nome", "asc", null);

        when(sectorRepository.findAll(any())).thenReturn(new PageImpl<Sector>(List.of(sector)));

        Map<String, Object> result = this.service.list(filter);
        List<SectorDto> sectors = (List<SectorDto>) result.get("sectors");

        assertEquals(1L, sectors.size());
        assertEquals(1L, sectors.get(0).getId());
    }

	@Test
    @SuppressWarnings("unchecked")
    void listPageableFullFiltered() {
        SectorPageFilterQuery filter = new SectorPageFilterQuery(0, 10, "nome", "asc", "Laticínio");

        when(sectorRepository.findAll(any(), any())).thenReturn(new PageImpl<Sector>(List.of(sector)));

        Map<String, Object> result = this.service.list(filter);
        List<SectorDto> sectors = (List<SectorDto>) result.get("sectors");

        assertEquals(1L, sectors.size());
        assertEquals(1L, sectors.get(0).getId());

        filter = new SectorPageFilterQuery(0, 10, "nome", "desc", "Laticínio");

        when(sectorRepository.findAll(any(), any())).thenReturn(new PageImpl<Sector>(List.of(sector)));

        result = this.service.list(filter);
        sectors = (List<SectorDto>) result.get("sectors");

        assertEquals(1L, sectors.size());
        assertEquals(1L, sectors.get(0).getId());

        filter = new SectorPageFilterQuery(0, 10, null, null, "Laticínio");

        when(sectorRepository.findAll(any(), any())).thenReturn(new PageImpl<Sector>(List.of(sector)));

        result = this.service.list(filter);
        sectors = (List<SectorDto>) result.get("sectors");

        assertEquals(1L, sectors.size());
        assertEquals(1L, sectors.get(0).getId());

        filter = new SectorPageFilterQuery(0, 10, "", null, "Laticínio");

        when(sectorRepository.findAll(any(), any())).thenReturn(new PageImpl<Sector>(List.of(sector)));

        result = this.service.list(filter);
        sectors = (List<SectorDto>) result.get("sectors");

        assertEquals(1L, sectors.size());
        assertEquals(1L, sectors.get(0).getId());

        filter = new SectorPageFilterQuery(0, 10, "", null, "Laticínio");

        when(sectorRepository.findAll(any(), any())).thenReturn(new PageImpl<Sector>(List.of(sector)));

        result = this.service.list(filter, false);
        sectors = (List<SectorDto>) result.get("sectors");

        assertEquals(1L, sectors.size());
        assertEquals(1L, sectors.get(0).getId());
    }

    @Test
    void listPageFilter() {
        SectorPageFilterQuery filter = new SectorPageFilterQuery(0, 10, "nome", "asc", "Laticínio");

        when(sectorRepository.findAll(any(), any())).thenReturn(new PageImpl<Sector>(List.of(sector)));

        PageableDto<SectorDto> result = this.service.listPageFilter(filter);
        List<SectorDto> sectors = (List<SectorDto>) result.getRecords();

        assertEquals(1L, sectors.size());
        assertEquals(1L, sectors.get(0).getId());
	}

    @Test
    void saveTest() {
    	when(sectorRepository.findByNomeIgnoreCase(anyString())).thenReturn(new ArrayList<Sector>());
    	when(sectorRepository.save(any())).thenReturn(sector);

    	SectorDto result = this.service.save(command);

		assertEquals(1L, result.getId());
    }

    @Test
    void saveTestDuplicatedName() {
    	when(sectorRepository.findByNomeIgnoreCase(anyString())).thenReturn(List.of(sector));

		assertThrows(ParametrizedMessageException.class, () -> service.save(command));
    }

    @Test
    void updateTest() {
    	when(sectorRepository.existsById(anyLong())).thenReturn(Boolean.TRUE);
    	when(sectorRepository.findByNomeIgnoreCase(anyString())).thenReturn(List.of(sector));
    	doReturn(sector).when(modelMapper).map(sector, Sector.class);
    	when(sectorRepository.save(any())).thenReturn(sector);

		SectorDto result = this.service.update(sectorDto);

		assertEquals(1L, result.getId());
    }

    @Test
    void updateTestNegativeId() {
    	SectorDto parameter = new SectorDto(-1L, "Laticínio");

    	assertThrows(ParametrizedMessageException.class, () -> this.service.update(parameter));
    }

    @Test
    void updateTestIdNotExists() {
    	SectorDto parameter = new SectorDto(2L, "Laticínio");
    	when(sectorRepository.existsById(anyLong())).thenReturn(Boolean.FALSE);

    	assertThrows(ParametrizedMessageException.class, () -> this.service.update(parameter));
    }

    @Test
    void updateTestNullSector() {
    	assertThrows(ParametrizedMessageException.class, () -> this.service.update(null));
    }

    @Test
    void updateTestDuplicatedName() {
    	SectorDto parameter = new SectorDto(2L, "Laticínio");

    	when(sectorRepository.existsById(anyLong())).thenReturn(Boolean.TRUE);
    	when(sectorRepository.findByNomeIgnoreCase(anyString())).thenReturn(List.of(sector));

    	assertThrows(ParametrizedMessageException.class, () -> this.service.update(parameter));
    }

    @Test
    void deleteTest() {
    	when(sectorRepository.findById(anyLong())).thenReturn(Optional.of(sector));

    	doNothing().when(sectorRepository).delete(any());

    	this.service.delete(1L);

    	assertEquals(1, ONE);
    }

    @Test
    void deleteTestIdNotFound() {
    	when(sectorRepository.findById(anyLong())).thenReturn(Optional.empty());

    	assertThrows(ParametrizedMessageException.class, () -> this.service.delete(1L));
    }

}
