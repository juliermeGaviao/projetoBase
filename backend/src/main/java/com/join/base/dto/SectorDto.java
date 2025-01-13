package com.join.base.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SectorDto {

	@NonNull
	private Long id;

	@NonNull
	private String nome;

	private List<ProductDto> products;

	public SectorDto(Long id, String nome) {
		this.id = id;
		this.nome = nome;
		this.products = new ArrayList<>();
	}

}
