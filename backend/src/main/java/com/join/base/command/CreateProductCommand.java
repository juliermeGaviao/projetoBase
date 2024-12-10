package com.join.base.command;

import lombok.NonNull;

public record CreateProductCommand(

	@NonNull
	Long idSetor,

	@NonNull
	String nome

) {}
