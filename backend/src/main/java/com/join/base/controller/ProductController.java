package com.join.base.controller;

import static com.join.base.configuration.ResponseUtil.wrapOrNotFound;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.join.base.command.CreateProductCommand;
import com.join.base.dto.ProductDto;
import com.join.base.query.ProductPageFilterQuery;
import com.join.base.service.impl.ProductServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/product")
public class ProductController {

	private ProductServiceImpl productServiceImpl;

	public ProductController(ProductServiceImpl productServiceImpl) {
		this.productServiceImpl = productServiceImpl;
	}

	@Operation(summary = "Get a product by its id")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found product", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = ProductDto.class)) }),
			@ApiResponse(responseCode = "404", description = "Product not found", content = @Content) })
	@GetMapping("/{id}")
	public ResponseEntity<ProductDto> get(@PathVariable Long id) {
		Optional<ProductDto> result = productServiceImpl.get(id);

		return wrapOrNotFound(result);
	}

	@Operation(summary = "Get all products")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "All finded products", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ProductDto.class)) }) })
	@GetMapping("/all")
	public ResponseEntity<List<ProductDto>> get() {
		List<ProductDto> result = productServiceImpl.list();

		return ResponseEntity.ok(result);
	}

	/**
	 *
	 * @return
	 */
	@Operation(summary = "Get a list of paginated products")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "All products of requested page", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = ProductDto.class)) }) })
	@GetMapping("/page")
	public ResponseEntity<Map<String, Object>> getPage(ProductPageFilterQuery filter) {
		return ResponseEntity.ok(productServiceImpl.list(filter));
	}

	/**
	 *
	 * @param
	 * @return
	 */
	@Operation(summary = "Add an product")
	@PostMapping
	public ResponseEntity<ProductDto> post(@RequestBody CreateProductCommand command) {
		ProductDto result = productServiceImpl.save(command);

		return ResponseEntity.ok(result);
	}

	/**
	 *
	 * @param productDto
	 * @return
	 */
	@Operation(summary = "Update an product")
	@PutMapping
	public ResponseEntity<ProductDto> update(@RequestBody ProductDto productDto) {
		ProductDto result = productServiceImpl.update(productDto);

		return ResponseEntity.ok(result);
	}

	/**
	 *
	 * @param id
	 * @return
	 */
	@Operation(summary = "Delete an product")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		productServiceImpl.delete(id);

		return ResponseEntity.ok().build();
	}

}
