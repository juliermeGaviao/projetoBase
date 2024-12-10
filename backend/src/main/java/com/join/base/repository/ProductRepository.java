package com.join.base.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.CrudRepository;

import com.join.base.model.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

	public List<Product> findByNomeIgnoreCase(String nome);

	Page<Product> findAll(Pageable pageable);

	Page<Product> findAll(Specification<Product> filter, Pageable pageable);

}
