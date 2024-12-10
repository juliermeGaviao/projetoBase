package com.join.base.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageableDto<T> {
	List<T> records;
	Long currentPage;
	Long totalItems;
	Long totalPages;
}