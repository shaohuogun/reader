package org.shaohuogun.reader.portal.catalog.service;

import java.util.List;

import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.shaohuogun.reader.portal.catalog.dao.CatalogDao;
import org.shaohuogun.reader.portal.catalog.model.Catalog;

@Service
public class CatalogService {

	@Autowired
	private CatalogDao catalogDao;

	@Transactional
	public Catalog createCatalog(Catalog catalog) throws Exception {
		if (catalog == null) {
			throw new NullPointerException("Catalog cann't be null.");
		}

		catalogDao.insert(catalog);
		return catalogDao.selectById(catalog.getId());
	}
	
	public Catalog getCatalog(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Catalog's id cann't be null or empty.");
		}

		return catalogDao.selectById(id);
	}
	
	public int getCatalogCountOfCreator(String creator) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}
		
		return catalogDao.countByCreator(creator);
	}
	
	public Pagination getCatalogsOfCreator(String creator, Pagination pagination) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}
		
		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}
		
		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> catalogs = catalogDao.selectByCreator(creator, offset, limit);
		pagination.setObjects(catalogs);
		return pagination;
	}

	@Transactional
	public Catalog modifyCatalog(Catalog catalog) throws Exception {
		if (catalog == null) {
			throw new NullPointerException("Catalog cann't be null.");
		}

		catalogDao.update(catalog);
		return catalogDao.selectById(catalog.getId());
	}
	
}
