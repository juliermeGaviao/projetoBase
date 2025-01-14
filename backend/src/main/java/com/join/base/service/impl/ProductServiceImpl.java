package com.join.base.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.join.base.command.CreateProductCommand;
import com.join.base.dto.ProductDto;
import com.join.base.exception.MessagesUtil;
import com.join.base.exception.ParametrizedMessageException;
import com.join.base.model.Product;
import com.join.base.query.ProductPageFilterQuery;
import com.join.base.repository.ProductRepository;
import com.join.base.repository.SectorRepository;
import com.join.base.service.AbstractService;
import com.join.base.specification.ProductSpecification;

@Service
public class ProductServiceImpl extends AbstractService {

	private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

	private ProductRepository productRepository;

	private SectorRepository sectorRepository;

	private SectorServiceImpl sectorServiceImpl;

	private ModelMapper modelMapper;

	public ProductServiceImpl(ProductRepository productRepository, SectorRepository sectorRepository, SectorServiceImpl sectorServiceImpl, ModelMapper modelMapper) {
		this.productRepository = productRepository;
		this.sectorRepository = sectorRepository;
		this.sectorServiceImpl = sectorServiceImpl;
		this.modelMapper = modelMapper;
	}

	/**
	 *
	 * @param id
	 * @return
	 */
	public Optional<ProductDto> get(Long id) {
		log.debug("Request to get Product : {}", id);

		return productRepository.findById(id).map(this::convertToDto);
	}

	/**
	 *
	 * @return
	 */
	public List<ProductDto> list() {
		List<ProductDto> list = new ArrayList<>();

		productRepository.findAll().forEach(e -> list.add(convertToDto(e)));

		return list;
	}

    /**
     * Return the records by page
     * @return
     */
    public Map<String, Object> list(ProductPageFilterQuery filter) {
        Pageable pageble = getPage(filter.page(), filter.size(), filter.orderBy(), filter.orderDirect(), true);

        Page<Product> pageList = null;
        if (filter.nome() != null || filter.idSetor() != null) {
            Specification<Product> filterQuery = new ProductSpecification(filter);

            pageList = productRepository.findAll(filterQuery, pageble);
        } else {
        	pageList = productRepository.findAll(pageble);
        }

        List<Product> list = pageList.getContent();

        Map<String, Object> response = new HashMap<>();

        response.put("products", list.stream().map(this::convertToDto).toList());
        response.put("currentPage", pageList.getNumber());
        response.put("totalItems", pageList.getTotalElements());
        response.put("totalPages", pageList.getTotalPages());

        return response;
    }

	public ProductDto save(CreateProductCommand command) {
		log.debug("Request to save Product : {}", command);

		checkDuplicationForNew(command);

		Product product = convertToEntity(command);

		product = productRepository.save(product);

		return convertToDto(product);
	}

	/**
	 *
	 * @param productDTO
	 * @return
	 */
	public ProductDto update(ProductDto productDTO) {
		log.debug("Request to update Product : {}", productDTO);

		checkIdValue(productDTO.getId());

		checkDuplicationForUpdate(productDTO);

		Product product = convertToEntity(productDTO);

		product = productRepository.save(product);

		return convertToDto(product);
	}

	/**
	 *
	 * @param id
	 */
	public void delete(Long id) {
		log.debug("Request to delete Product : {}", id);

		var product = getElement(id, productRepository, MessagesUtil.ITEM_INEXISTENTE);

		productRepository.delete(product);
	}

	/**
	 *
	 * @param product
	 * @return
	 */
	public ProductDto convertToDto(Product product) {
		ProductDto result = new ProductDto(product.getId(), product.getNome());

		result.setSetor(this.sectorServiceImpl.convertToDto(product.getSetor()));

		return result;
	}

	/**
	 *
	 * @param product
	 * @return
	 */
	private Product convertToEntity(ProductDto product) {
		return modelMapper.map(product, Product.class);
	}

	/**
	 *
	 * @param CreateProductMeasure command
	 * @return
	 */
	private Product convertToEntity(CreateProductCommand command) {
		var optional = this.sectorRepository.findById(command.idSetor());
		var sector = optional.orElse(null);

		return new Product(sector, command.nome());
	}

	/**
	 * Checks if already exists a product with the same name of the new item
	 * 
	 * @param ProductDTO
	 */
	private void checkDuplicationForNew(CreateProductCommand command) {
		log.debug("Checking name duplication to new Product : {}", command);

		var products = productRepository.findByNomeIgnoreCase(command.nome());

		if (!products.isEmpty()) {
			throw new ParametrizedMessageException(HttpStatus.BAD_REQUEST, MessagesUtil.ITEM_EXISTENTE);
		}

		var sector = sectorRepository.findById(command.idSetor());
		if (sector.isEmpty()) {
			throw new ParametrizedMessageException(HttpStatus.BAD_REQUEST, MessagesUtil.ITEM_INEXISTENTE);
		}

		log.debug("Not found name duplication to new Product.");
	}

	/**
	 * Checks if already exists an another sector with the same name of
	 * the item in edition
	 * 
	 * @param productDTO
	 */
	private void checkDuplicationForUpdate(ProductDto productDTO) {
		log.debug("Checking name duplication to update Product : {}", productDTO);

		var products = productRepository.findByNomeIgnoreCase(productDTO.getNome());

		if (!products.isEmpty()) {
			products.forEach(product -> {
				if (!product.getId().equals(productDTO.getId())) {
					throw new ParametrizedMessageException(HttpStatus.BAD_REQUEST, MessagesUtil.ITEM_EXISTENTE);
				}
			});
		}

		var sector = sectorRepository.findById(productDTO.getSetor().getId());
		if (sector.isEmpty()) {
			throw new ParametrizedMessageException(HttpStatus.BAD_REQUEST, MessagesUtil.ITEM_INEXISTENTE);
		}

		log.debug("Not found name duplication to update Product.");
	}

	/**
	 * Check if is an existent Product
	 * 
	 * @param
	 */
	private void checkIdValue(Long id) {
		if (id <= 0 || !productRepository.existsById(id)) {
			throw new ParametrizedMessageException(HttpStatus.BAD_REQUEST, MessagesUtil.ITEM_INEXISTENTE);
		}
	}

}
