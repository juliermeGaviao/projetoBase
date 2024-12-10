package com.join.base.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;

import com.join.base.dto.PageableDto;
import com.join.base.exception.MessagesUtil;
import com.join.base.exception.ParametrizedMessageException;

public abstract class AbstractService {

	/**
	 * @param pageList
	 * @param list
	 * @param <T>
	 * @return
	 */
	public <T, X> PageableDto<T> loadPage(Page<X> pageList, List<T> list) {

		PageableDto<T> pageable = new PageableDto<>();

		pageable.setRecords(list);
		pageable.setCurrentPage(Long.valueOf(pageList.getNumber()));
		pageable.setTotalItems(pageList.getTotalElements());
		pageable.setTotalPages(Long.valueOf(pageList.getTotalPages()));

		return pageable;
	}

	/**
	 * @param orderBy
	 * @param orderDirect
	 * @return
	 */
	public Sort getSort(String orderBy, String orderDirect, boolean defaultSorter) {
		if (orderBy != null && !orderBy.isEmpty()) {
			return Sort.by(new Sort.Order("DESC".equalsIgnoreCase(orderDirect) ? Sort.Direction.DESC : Sort.Direction.ASC, orderBy, true, Sort.NullHandling.NULLS_FIRST));
		} else if (defaultSorter) {
			return Sort.by(new Sort.Order(Sort.Direction.ASC, "id", true, Sort.NullHandling.NULLS_FIRST));
		}

		return null;
	}

	/**
	 * @param page
	 * @param size
	 * @param orderBy
	 * @param orderDirect
	 * @return
	 */
	public Pageable getPage(int page, int size, String orderBy, String orderDirect, boolean defaultSorter) {
		Sort sort = getSort(orderBy, orderDirect, defaultSorter);

		return sort != null ? PageRequest.of(page, size, sort) : PageRequest.of(page, size);
	}

	public <T> void checkIdValue(Long id, CrudRepository<T, Long> repository) {
		if (id == null || id <= 0 || !repository.existsById(id)) {
			throw new ParametrizedMessageException(HttpStatus.BAD_REQUEST, MessagesUtil.ITEM_INEXISTENTE);
		}
	}

	public <T> T getElement(Long id, CrudRepository<T, Long> repository, String errorMsg) {
		var entity = repository.findById(id).orElse(null);

		if (entity == null) {
			throw new ParametrizedMessageException(HttpStatus.NOT_FOUND, errorMsg + " - ID: " + id);
		}

		return entity;
	}

	public void checkNull(Object obj, String errorMsg) {
		if (obj == null) {
			throw new ParametrizedMessageException(HttpStatus.BAD_REQUEST, errorMsg);
		}
	}

}
