package com.join.base.specification;

import org.springframework.data.jpa.domain.Specification;

import com.join.base.model.Product;
import com.join.base.query.ProductPageFilterQuery;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class ProductSpecification implements Specification<Product> {

	private static final long serialVersionUID = 6055107623384576376L;

	private transient ProductPageFilterQuery filterDto;

	public ProductSpecification(ProductPageFilterQuery filterDto) {
		this.filterDto = filterDto;
	}

	@Override
	public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		Long idSector = filterDto.idSetor() != null && filterDto.idSetor() > 0 ? filterDto.idSetor() : null;

		Predicate nameFilter = filterDto.nome() != null ? criteriaBuilder.like(criteriaBuilder.lower(root.<String>get("nome")), "%" + filterDto.nome().toLowerCase() + "%") : null;
		Predicate sectorFilter = idSector != null ? criteriaBuilder.equal(root.join("setor").get("id"), idSector) : null;

		Predicate result = null;

		if (nameFilter != null && sectorFilter != null) {
			result = criteriaBuilder.and(nameFilter, sectorFilter);
		} else if (nameFilter != null) {
			result = nameFilter;
		} else {
			result = sectorFilter;
		}

		return result;
	}

}
