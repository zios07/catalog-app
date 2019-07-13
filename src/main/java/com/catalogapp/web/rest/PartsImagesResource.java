package com.catalogapp.web.rest;

import com.catalogapp.domain.PartsImages;
import com.catalogapp.repository.PartsImagesRepository;
import com.catalogapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.catalogapp.domain.PartsImages}.
 */
@RestController
@RequestMapping("/api")
public class PartsImagesResource {

    private final Logger log = LoggerFactory.getLogger(PartsImagesResource.class);

    private static final String ENTITY_NAME = "partsImages";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PartsImagesRepository partsImagesRepository;

    public PartsImagesResource(PartsImagesRepository partsImagesRepository) {
        this.partsImagesRepository = partsImagesRepository;
    }

    /**
     * {@code POST  /parts-images} : Create a new partsImages.
     *
     * @param partsImages the partsImages to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new partsImages, or with status {@code 400 (Bad Request)} if the partsImages has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/parts-images")
    public ResponseEntity<PartsImages> createPartsImages(@RequestBody PartsImages partsImages) throws URISyntaxException {
        log.debug("REST request to save PartsImages : {}", partsImages);
        if (partsImages.getId() != null) {
            throw new BadRequestAlertException("A new partsImages cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PartsImages result = partsImagesRepository.save(partsImages);
        return ResponseEntity.created(new URI("/api/parts-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parts-images} : Updates an existing partsImages.
     *
     * @param partsImages the partsImages to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated partsImages,
     * or with status {@code 400 (Bad Request)} if the partsImages is not valid,
     * or with status {@code 500 (Internal Server Error)} if the partsImages couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parts-images")
    public ResponseEntity<PartsImages> updatePartsImages(@RequestBody PartsImages partsImages) throws URISyntaxException {
        log.debug("REST request to update PartsImages : {}", partsImages);
        if (partsImages.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PartsImages result = partsImagesRepository.save(partsImages);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, partsImages.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /parts-images} : get all the partsImages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of partsImages in body.
     */
    @GetMapping("/parts-images")
    public List<PartsImages> getAllPartsImages() {
        log.debug("REST request to get all PartsImages");
        return partsImagesRepository.findAll();
    }

    /**
     * {@code GET  /parts-images/:id} : get the "id" partsImages.
     *
     * @param id the id of the partsImages to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the partsImages, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parts-images/{id}")
    public ResponseEntity<PartsImages> getPartsImages(@PathVariable Long id) {
        log.debug("REST request to get PartsImages : {}", id);
        Optional<PartsImages> partsImages = partsImagesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(partsImages);
    }

    /**
     * {@code DELETE  /parts-images/:id} : delete the "id" partsImages.
     *
     * @param id the id of the partsImages to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parts-images/{id}")
    public ResponseEntity<Void> deletePartsImages(@PathVariable Long id) {
        log.debug("REST request to delete PartsImages : {}", id);
        partsImagesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
