package com.join.base.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.CrudRepository;

import com.join.base.model.Sector;

public interface SectorRepository extends CrudRepository<Sector, Long> {

	List<Sector> findByNomeIgnoreCase(String nome);

	Page<Sector> findAll(Pageable pageable);

	Page<Sector> findAll(Specification<Sector> filter, Pageable pageable);

}
