package com.catalogapp.web.rest;

import com.catalogapp.domain.Attachment;
import com.catalogapp.domain.Catalogs;
import com.catalogapp.repository.CatalogsRepository;
import com.catalogapp.service.util.AnnotationExclusionStrategy;
import com.catalogapp.web.rest.errors.BadRequestAlertException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.checkerframework.checker.units.qual.A;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.catalogapp.domain.Catalogs}.
 */
@RestController
@RequestMapping("/api")
public class CatalogsResource {

    private final Logger log = LoggerFactory.getLogger(CatalogsResource.class);

    private static final String ENTITY_NAME = "catalogs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CatalogsRepository catalogsRepository;

    public CatalogsResource(CatalogsRepository catalogsRepository) {
        this.catalogsRepository = catalogsRepository;
    }

    /**
     * {@code POST  /catalogs} : Create a new catalogs.
     *
     * @param strCatalogs the catalogs to create.
     * @param photos      the catalog images.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new catalogs, or with status {@code 400 (Bad Request)} if the catalogs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/catalogs")
    public ResponseEntity<Catalogs> createCatalogs(@RequestParam("catalogs") String strCatalogs, @RequestParam("photos") MultipartFile[] photos) throws URISyntaxException, IOException {
        Gson gson = new GsonBuilder().addDeserializationExclusionStrategy(new AnnotationExclusionStrategy()).create();
        Catalogs catalogs = gson.fromJson(strCatalogs, Catalogs.class);
        log.debug("REST request to save Catalogs : {}", catalogs);
        if (catalogs.getId() != null) {
            throw new BadRequestAlertException("A new catalogs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (photos.length > 0) {
            List<Attachment> attachments = new ArrayList<>();
            for (MultipartFile photo : photos) {
                Attachment attachment = new Attachment();
                attachment.setContent(photo.getBytes());
                attachment.setDate(new Date());
                attachment.setName(photo.getOriginalFilename());
                attachments.add(attachment);
            }
            catalogs.setCoverImages(attachments);
        }
        Catalogs result = catalogsRepository.save(catalogs);
        return ResponseEntity.created(new URI("/api/catalogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /catalogs} : Updates an existing catalogs.
     *
     * @param catalogs the catalogs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated catalogs,
     * or with status {@code 400 (Bad Request)} if the catalogs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the catalogs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/catalogs")
    public ResponseEntity<Catalogs> updateCatalogs(@Valid @RequestBody Catalogs catalogs) throws URISyntaxException {
        log.debug("REST request to update Catalogs : {}", catalogs);
        if (catalogs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Catalogs result = catalogsRepository.save(catalogs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, catalogs.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /catalogs} : get all the catalogs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of catalogs in body.
     */
    @GetMapping("/catalogs")
    public List<Catalogs> getAllCatalogs() {
        log.debug("REST request to get all Catalogs");
        return catalogsRepository.findAll();
    }

    /**
     * {@code GET  /catalogs/:id} : get the "id" catalogs.
     *
     * @param id the id of the catalogs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the catalogs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/catalogs/{id}")
    public ResponseEntity<Catalogs> getCatalogs(@PathVariable Long id) {
        log.debug("REST request to get Catalogs : {}", id);
        Optional<Catalogs> catalogs = catalogsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(catalogs);
    }

    /**
     * {@code DELETE  /catalogs/:id} : delete the "id" catalogs.
     *
     * @param id the id of the catalogs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/catalogs/{id}")
    public ResponseEntity<Void> deleteCatalogs(@PathVariable Long id) {
        log.debug("REST request to delete Catalogs : {}", id);
        catalogsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
