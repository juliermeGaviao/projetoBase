package com.join.base.query;

public record ProductPageFilterQuery(

	int page,
	int size,
	String orderBy,
	String orderDirect,

	String nome,
	Long idSetor

) {}
