package com.join.base.command;

import lombok.NonNull;

public record CreateSectorCommand(

	@NonNull
	String nome

) {}