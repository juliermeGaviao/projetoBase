package com.join.base.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.join.base.command.CreateSectorCommand;
import com.join.base.dto.PageableDto;
import com.join.base.dto.SectorDto;
import com.join.base.exception.MessagesUtil;
import com.join.base.exception.ParametrizedMessageException;
import com.join.base.model.Sector;
import com.join.base.query.SectorPageFilterQuery;
import com.join.base.repository.SectorRepository;
import com.join.base.service.AbstractService;
import com.join.base.specification.SectorSpecification;

@Service
public class SectorServiceImpl extends AbstractService {

	private SectorRepository sectorRepository;

	private ModelMapper modelMapper;

	private final Logger log = LoggerFactory.getLogger(SectorServiceImpl.class);

	public SectorServiceImpl(SectorRepository sectorRepository, ModelMapper modelMapper) {
		this.sectorRepository = sectorRepository;
		this.modelMapper = modelMapper;
	}

	/**
	 *
	 * @param id
	 * @return
	 */
	public Optional<SectorDto> get(Long id) {
		log.debug("Request to get Sector : {}", id);

		return sectorRepository.findById(id).map(this::convertToDto);
	}

	/**
	 *
	 * @return
	 */
	public List<SectorDto> list() {
		List<SectorDto> list = new ArrayList<>();

		sectorRepository.findAll().forEach(e -> list.add(convertToDto(e)));

		return list;
	}

    /**
     * Return the records by page
     * @return
     */
    public Map<String, Object> list(SectorPageFilterQuery filter) {
        return this.list(filter, true);
    }

    /**
     * Return the records by page
     * @return
     */
    public Map<String, Object> list(SectorPageFilterQuery filter, boolean defaultSorter) {
        Pageable pageble = getPage(filter.page(), filter.size(), filter.orderBy(), filter.orderDirect(), defaultSorter);

        Page<Sector> pageList = null;
        if (filter.nome() != null) {
            Specification<Sector> filterQuery = SectorSpecification.createQuery(filter);

            pageList = sectorRepository.findAll(filterQuery, pageble);
        } else {
        	pageList = sectorRepository.findAll(pageble);
        }

        List<Sector> list = pageList.getContent();

        Map<String, Object> response = new HashMap<>();

        response.put("sectors", list.stream().map(this::convertToDto).toList());
        response.put("currentPage", pageList.getNumber());
        response.put("totalItems", pageList.getTotalElements());
        response.put("totalPages", pageList.getTotalPages());

        return response;
    }

    /**
     * @param filter
     * @return
     */
    public PageableDto<SectorDto> listPageFilter(SectorPageFilterQuery filter) {
		Page<Sector> pageList = sectorRepository.findAll(SectorSpecification.createQuery(filter),
				getPage(filter.page(), filter.size(), filter.orderBy(), filter.orderDirect(), true));

		return loadPage(pageList, pageList.getContent().stream().map(this::convertToDto).toList());
    }

	public SectorDto save(CreateSectorCommand command) {
		log.debug("Request to save Sector : {}", command);

		checkDuplicationForNew(command);

		Sector sector = convertToEntity(command);

		sector = sectorRepository.save(sector);

		return convertToDto(sector);
	}

	/**
	 *
	 * @param sectorDTO
	 * @return
	 */
	public SectorDto update(SectorDto sectorDTO) {
		checkNull(sectorDTO, "Sector is null");

		log.debug("Request to update Sector : {}", sectorDTO);

		checkIdValue(sectorDTO.getId(), this.sectorRepository);

		checkDuplicationForUpdate(sectorDTO);

		Sector sector = convertToEntity(sectorDTO);

		sector = sectorRepository.save(sector);

		return convertToDto(sector);
	}

	/**
	 *
	 * @param id
	 */
	public void delete(Long id) {
		log.debug("Request to delete Sector : {}", id);

		var sector = getElement(id, sectorRepository, MessagesUtil.ITEM_INEXISTENTE);

		sectorRepository.delete(sector);
	}

	/**
	 *
	 * @param sector
	 * @return
	 */
	public SectorDto convertToDto(Sector sector) {
		return new SectorDto(sector.getId(), sector.getNome());
	}

	/**
	 *
	 * @param sector
	 * @return
	 */
	private Sector convertToEntity(SectorDto sector) {
		return modelMapper.map(sector, Sector.class);
	}

	/**
	 *
	 * @param CreateSectorMeasure command
	 * @return
	 */
	private Sector convertToEntity(CreateSectorCommand command) {
		return new Sector(command.nome());
	}

	/**
	 * Checks if already exists a sector with the same name of the new item
	 * 
	 * @param SectorDTO
	 */
	private void checkDuplicationForNew(CreateSectorCommand command) {
		log.debug("Checking name duplication to new Sector : {}", command);

		var sectors = sectorRepository.findByNomeIgnoreCase(command.nome());

		if (!sectors.isEmpty()) {
			throw new ParametrizedMessageException(HttpStatus.BAD_REQUEST, MessagesUtil.ITEM_EXISTENTE);
		}

		log.debug("Not found name duplication to new Sector.");
	}

	/**
	 * Checks if already exists an another sector measure with the same name of
	 * the item in edition
	 * 
	 * @param sectorDTO
	 */
	private void checkDuplicationForUpdate(SectorDto sectorDTO) {
		log.debug("Checking name duplication to update Sector : {}", sectorDTO);

		var sectors = sectorRepository.findByNomeIgnoreCase(sectorDTO.getNome());

		sectors.forEach(sector -> {
			if (!sector.getId().equals(sectorDTO.getId())) {
				throw new ParametrizedMessageException(HttpStatus.BAD_REQUEST, MessagesUtil.ITEM_EXISTENTE);
			}
		});

		log.debug("Not found name duplication to update Sector.");
	}

}
