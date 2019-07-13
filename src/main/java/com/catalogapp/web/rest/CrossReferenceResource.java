package com.catalogapp.web.rest;

import com.catalogapp.domain.CrossReference;
import com.catalogapp.repository.CrossReferenceRepository;
import com.catalogapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.catalogapp.domain.CrossReference}.
 */
@RestController
@RequestMapping("/api")
public class CrossReferenceResource {

    private final Logger log = LoggerFactory.getLogger(CrossReferenceResource.class);

    private static final String ENTITY_NAME = "crossReference";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CrossReferenceRepository crossReferenceRepository;

    public CrossReferenceResource(CrossReferenceRepository crossReferenceRepository) {
        this.crossReferenceRepository = crossReferenceRepository;
    }

    /**
     * {@code POST  /cross-references} : Create a new crossReference.
     *
     * @param crossReference the crossReference to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new crossReference, or with status {@code 400 (Bad Request)} if the crossReference has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cross-references")
    public ResponseEntity<CrossReference> createCrossReference(@Valid @RequestBody CrossReference crossReference) throws URISyntaxException {
        log.debug("REST request to save CrossReference : {}", crossReference);
        if (crossReference.getId() != null) {
            throw new BadRequestAlertException("A new crossReference cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CrossReference result = crossReferenceRepository.save(crossReference);
        return ResponseEntity.created(new URI("/api/cross-references/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cross-references} : Updates an existing crossReference.
     *
     * @param crossReference the crossReference to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crossReference,
     * or with status {@code 400 (Bad Request)} if the crossReference is not valid,
     * or with status {@code 500 (Internal Server Error)} if the crossReference couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cross-references")
    public ResponseEntity<CrossReference> updateCrossReference(@Valid @RequestBody CrossReference crossReference) throws URISyntaxException {
        log.debug("REST request to update CrossReference : {}", crossReference);
        if (crossReference.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CrossReference result = crossReferenceRepository.save(crossReference);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, crossReference.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cross-references} : get all the crossReferences.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crossReferences in body.
     */
    @GetMapping("/cross-references")
    public ResponseEntity<List<CrossReference>> getAllCrossReferences(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of CrossReferences");
        Page<CrossReference> page = crossReferenceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /cross-references/:id} : get the "id" crossReference.
     *
     * @param id the id of the crossReference to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the crossReference, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cross-references/{id}")
    public ResponseEntity<CrossReference> getCrossReference(@PathVariable Long id) {
        log.debug("REST request to get CrossReference : {}", id);
        Optional<CrossReference> crossReference = crossReferenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(crossReference);
    }

    /**
     * {@code DELETE  /cross-references/:id} : delete the "id" crossReference.
     *
     * @param id the id of the crossReference to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cross-references/{id}")
    public ResponseEntity<Void> deleteCrossReference(@PathVariable Long id) {
        log.debug("REST request to delete CrossReference : {}", id);
        crossReferenceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
