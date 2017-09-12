package org.shaohuogun.reader.portal.catalog.controller;

import java.util.List;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.portal.catalog.model.Catalog;
import org.shaohuogun.reader.portal.catalog.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CatalogController extends Controller {

	@Autowired
	private CatalogService catalogService;
	
	@RequestMapping(value = "/api/catalog", method = RequestMethod.POST)
	public Catalog createCatalog(@RequestBody @Validated Catalog catalog) throws Exception {		
		catalog.setId(Utility.getUUID());
		catalog.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");	
		return catalogService.createCatalog(catalog);
	}

	@RequestMapping(value = "/api/catalog/{id}", method = RequestMethod.GET)
	public Catalog getCatalog(@PathVariable String id) throws Exception {
		return catalogService.getCatalog(id);
	}

	@RequestMapping(value = "/api/mycatalogs", method = RequestMethod.GET)
	public List<Catalog> getMyCatalogs() throws Exception {
		String creator = "a11039eb-4ba1-441a-bfdb-0d40f61a53dd";
		return catalogService.getCatalogsByCreator(creator);
	}

}
