package com.join.base.specification;

import org.springframework.data.jpa.domain.Specification;

import com.join.base.model.Product;
import com.join.base.query.ProductPageFilterQuery;

public class ProductSpecification {

	private ProductSpecification() {
	}

	public static Specification<Product> createQuery(ProductPageFilterQuery filterDto) {
		Specification<Product> result = null;

		if (filterDto.nome() != null) {
			result = (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.<String>get("nome")), "%" + filterDto.nome().toLowerCase() + "%");
		}

		if (filterDto.idSetor() > 0) {
			if (result != null) {
				result.and(hasSector(filterDto.idSetor()));
			} else {
				result = hasSector(filterDto.idSetor());
			}
		}

		return result;
	}

    /**
     * @param idSector
     * @return
     */
    public static Specification<Product> hasSector(Long idSector) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.join("setor").get("id"), idSector);
    }

}
