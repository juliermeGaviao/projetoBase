package com.join.base.specification;

import org.springframework.data.jpa.domain.Specification;

import com.join.base.model.Product;
import com.join.base.query.ProductPageFilterQuery;

import jakarta.persistence.criteria.Predicate;

public class ProductSpecification {

	private ProductSpecification() {
	}

	public static Specification<Product> createQuery(ProductPageFilterQuery filterDto) {
		Specification<Product> result = null;

		result = (root, query, criteriaBuilder) -> {
			Long idSector = filterDto.idSetor() != null && filterDto.idSetor() > 0 ? filterDto.idSetor() : null;

			Predicate nameFilter = filterDto.nome() != null ? criteriaBuilder.like(criteriaBuilder.lower(root.<String>get("nome")), "%" + filterDto.nome().toLowerCase() + "%") : null;
			Predicate sectorFilter = idSector != null ? criteriaBuilder.equal(root.join("setor").get("id"), idSector) : null;

			if (nameFilter != null && sectorFilter != null) {
				return criteriaBuilder.and(nameFilter, sectorFilter);
			} else if (nameFilter != null) {
				return nameFilter;
			} else {
				return sectorFilter;
			}
		};

		return result;
	}

}
