package com.join.base.specification;

import org.springframework.data.jpa.domain.Specification;

import com.join.base.model.Sector;
import com.join.base.query.SectorPageFilterQuery;

public class SectorSpecification {

	private SectorSpecification() {
	}

	public static Specification<Sector> createQuery(SectorPageFilterQuery filterDto) {
		return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.<String>get("nome")), "%" + filterDto.nome().toLowerCase() + "%");
	}

}
