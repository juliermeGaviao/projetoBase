package com.join.base.configuration;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

	private ResponseUtil() {
	}

	public static <X> ResponseEntity<X> wrapOrNotFound(Optional<X> maybeResponse) {
		return maybeResponse.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
}
