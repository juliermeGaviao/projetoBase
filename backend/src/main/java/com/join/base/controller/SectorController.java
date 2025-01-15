package com.join.base.controller;

import static com.join.base.configuration.ResponseUtil.wrapOrNotFound;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.join.base.command.CreateSectorCommand;
import com.join.base.dto.SectorDto;
import com.join.base.query.SectorPageFilterQuery;
import com.join.base.service.impl.SectorServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/sector")
public class SectorController {

	private SectorServiceImpl sectorServiceImpl;

	public SectorController(SectorServiceImpl sectorServiceImpl) {
		this.sectorServiceImpl = sectorServiceImpl;
	}

	@Operation(summary = "Get a sector by its id")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found sector", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = SectorDto.class)) }),
			@ApiResponse(responseCode = "404", description = "Sector not found", content = @Content) })
    @PreAuthorize("hasRole('ROLE_BASE_VIS_FUNC_VIS_ACESSAR')")
	@GetMapping("/{id}")
	public ResponseEntity<SectorDto> get(@PathVariable Long id) {
		Optional<SectorDto> result = sectorServiceImpl.get(id);

		return wrapOrNotFound(result);
	}

	@Operation(summary = "Get all sectors")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "All finded sectors", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = SectorDto.class)) }) })
    @PreAuthorize("hasRole('ROLE_BASE_VIS_FUNC_VIS_ACESSAR')")
	@GetMapping("/all")
	public ResponseEntity<List<SectorDto>> get() {
		List<SectorDto> result = sectorServiceImpl.list();

		return ResponseEntity.ok(result);
	}

	/**
	 *
	 * @return
	 */
	@Operation(summary = "Get a list of paginated sectors")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "All sectors of requested page", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = SectorDto.class)) }) })
    @PreAuthorize("hasRole('ROLE_BASE_VIS_FUNC_VIS_ACESSAR')")
	@GetMapping("/page")
	public ResponseEntity<Map<String, Object>> getPage(SectorPageFilterQuery filter) {
		return ResponseEntity.ok(sectorServiceImpl.list(filter));
	}

	/**
	 *
	 * @param
	 * @return
	 */
	@Operation(summary = "Add an sector")
    @PreAuthorize("hasRole('ROLE_BASE_ADM_FUNC_CAD_CADASTRAR')")
	@PostMapping
	public ResponseEntity<SectorDto> post(@RequestBody CreateSectorCommand command) {
		SectorDto result = sectorServiceImpl.save(command);

		return ResponseEntity.ok(result);
	}

	/**
	 *
	 * @param sectorDto
	 * @return
	 */
	@Operation(summary = "Update an sector")
    @PreAuthorize("hasRole('ROLE_BASE_ADM_FUNC_CAD_CADASTRAR')")
	@PutMapping
	public ResponseEntity<SectorDto> update(@RequestBody SectorDto sectorDto) {
		SectorDto result = sectorServiceImpl.update(sectorDto);

		return ResponseEntity.ok(result);
	}

	/**
	 *
	 * @param id
	 * @return
	 */
	@Operation(summary = "Delete an sector")
    @PreAuthorize("hasRole('ROLE_BASE_ADM_FUNC_CAD_CADASTRAR')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		sectorServiceImpl.delete(id);

		return ResponseEntity.ok().build();
	}

}
