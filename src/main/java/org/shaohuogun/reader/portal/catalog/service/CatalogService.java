package org.shaohuogun.reader.portal.catalog.service;

import java.util.List;

import org.shaohuogun.reader.portal.catalog.dao.CatalogDao;
import org.shaohuogun.reader.portal.catalog.model.Catalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	public List<Catalog> getCatalogsByCreator(String creator) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}

		return catalogDao.selectByCreator(creator);
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
