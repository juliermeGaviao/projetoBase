package com.join.base.specification;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.domain.Specification;

import com.join.base.model.Product;
import com.join.base.query.ProductPageFilterQuery;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@SpringBootTest
class ProductSpecificationTest {

	@Mock
	private Root<Product> root;

	@Mock
	private CriteriaQuery<?> query;

	@Mock
	private CriteriaBuilder criteriaBuilder;

	@Mock
	private Predicate predicate;

	@Mock Join<Object, Object> join;

    @Test
    void testNomeAndSector() {
    	when(root.<String>get(anyString())).thenReturn(null);
    	when(criteriaBuilder.lower(any())).thenReturn(null);
    	when(criteriaBuilder.like(any(), anyString())).thenReturn(predicate);

    	when(root.join(anyString())).thenReturn(join);
    	when(join.get(anyString())).thenReturn(join);
    	when(criteriaBuilder.equal(any(), anyLong())).thenReturn(predicate);

    	when(criteriaBuilder.and(any(), any())).thenReturn(predicate);

    	when(predicate.isCompoundSelection()).thenReturn(Boolean.TRUE);
    	
    	ProductPageFilterQuery filter = new ProductPageFilterQuery(0, 10, "nome", "asc", "Iogurte", 1L);
        Specification<Product> specification = new ProductSpecification(filter);
        Predicate result = specification.toPredicate(root, query, criteriaBuilder);

        assertTrue(result.isCompoundSelection());
    }

    @Test
    void testNome() {
    	when(root.<String>get(anyString())).thenReturn(null);
    	when(criteriaBuilder.lower(any())).thenReturn(null);
    	when(criteriaBuilder.like(any(), anyString())).thenReturn(predicate);

    	when(predicate.isCompoundSelection()).thenReturn(Boolean.TRUE);
    	
    	ProductPageFilterQuery filter = new ProductPageFilterQuery(0, 10, "nome", "asc", "Iogurte", null);
        Specification<Product> specification = new ProductSpecification(filter);
        Predicate result = specification.toPredicate(root, query, criteriaBuilder);

        assertTrue(result.isCompoundSelection());
    }

    @Test
    void testSector() {
    	when(root.join(anyString())).thenReturn(join);
    	when(join.get(anyString())).thenReturn(join);
    	when(criteriaBuilder.equal(any(), anyLong())).thenReturn(predicate);

    	when(predicate.isCompoundSelection()).thenReturn(Boolean.TRUE);
    	
    	ProductPageFilterQuery filter = new ProductPageFilterQuery(0, 10, "nome", "asc", null, 1L);
        Specification<Product> specification = new ProductSpecification(filter);
        Predicate result = specification.toPredicate(root, query, criteriaBuilder);

        assertTrue(result.isCompoundSelection());
    }

    @Test
    void testNegativeIdSector() {
    	when(root.join(anyString())).thenReturn(join);
    	when(join.get(anyString())).thenReturn(join);
    	when(criteriaBuilder.equal(any(), anyLong())).thenReturn(predicate);

    	when(predicate.isCompoundSelection()).thenReturn(Boolean.FALSE);
    	
    	ProductPageFilterQuery filter = new ProductPageFilterQuery(0, 10, "nome", "asc", null, -1L);
        Specification<Product> specification = new ProductSpecification(filter);
        Predicate result = specification.toPredicate(root, query, criteriaBuilder);

        assertNull(result);
    }

}
