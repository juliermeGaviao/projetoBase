package com.join.base.query;

public record SectorPageFilterQuery(

	int page,
	int size,
	String orderBy,
	String orderDirect,

	String nome

) {}
