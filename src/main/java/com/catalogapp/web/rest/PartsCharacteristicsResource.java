package com.catalogapp.web.rest;

import com.catalogapp.domain.PartsCharacteristics;
import com.catalogapp.repository.PartsCharacteristicsRepository;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.catalogapp.domain.PartsCharacteristics}.
 */
@RestController
@RequestMapping("/api")
public class PartsCharacteristicsResource {

    private final Logger log = LoggerFactory.getLogger(PartsCharacteristicsResource.class);

    private static final String ENTITY_NAME = "partsCharacteristics";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PartsCharacteristicsRepository partsCharacteristicsRepository;

    public PartsCharacteristicsResource(PartsCharacteristicsRepository partsCharacteristicsRepository) {
        this.partsCharacteristicsRepository = partsCharacteristicsRepository;
    }

    /**
     * {@code POST  /parts-characteristics} : Create a new partsCharacteristics.
     *
     * @param partsCharacteristics the partsCharacteristics to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new partsCharacteristics, or with status {@code 400 (Bad Request)} if the partsCharacteristics has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/parts-characteristics")
    public ResponseEntity<PartsCharacteristics> createPartsCharacteristics(@RequestBody PartsCharacteristics partsCharacteristics) throws URISyntaxException {
        log.debug("REST request to save PartsCharacteristics : {}", partsCharacteristics);
        if (partsCharacteristics.getId() != null) {
            throw new BadRequestAlertException("A new partsCharacteristics cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PartsCharacteristics result = partsCharacteristicsRepository.save(partsCharacteristics);
        return ResponseEntity.created(new URI("/api/parts-characteristics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parts-characteristics} : Updates an existing partsCharacteristics.
     *
     * @param partsCharacteristics the partsCharacteristics to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated partsCharacteristics,
     * or with status {@code 400 (Bad Request)} if the partsCharacteristics is not valid,
     * or with status {@code 500 (Internal Server Error)} if the partsCharacteristics couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parts-characteristics")
    public ResponseEntity<PartsCharacteristics> updatePartsCharacteristics(@RequestBody PartsCharacteristics partsCharacteristics) throws URISyntaxException {
        log.debug("REST request to update PartsCharacteristics : {}", partsCharacteristics);
        if (partsCharacteristics.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PartsCharacteristics result = partsCharacteristicsRepository.save(partsCharacteristics);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, partsCharacteristics.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /parts-characteristics} : get all the partsCharacteristics.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of partsCharacteristics in body.
     */
    @GetMapping("/parts-characteristics")
    public ResponseEntity<List<PartsCharacteristics>> getAllPartsCharacteristics(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of PartsCharacteristics");
        Page<PartsCharacteristics> page = partsCharacteristicsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /parts-characteristics/:id} : get the "id" partsCharacteristics.
     *
     * @param id the id of the partsCharacteristics to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the partsCharacteristics, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parts-characteristics/{id}")
    public ResponseEntity<PartsCharacteristics> getPartsCharacteristics(@PathVariable Long id) {
        log.debug("REST request to get PartsCharacteristics : {}", id);
        Optional<PartsCharacteristics> partsCharacteristics = partsCharacteristicsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(partsCharacteristics);
    }

    /**
     * {@code DELETE  /parts-characteristics/:id} : delete the "id" partsCharacteristics.
     *
     * @param id the id of the partsCharacteristics to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parts-characteristics/{id}")
    public ResponseEntity<Void> deletePartsCharacteristics(@PathVariable Long id) {
        log.debug("REST request to delete PartsCharacteristics : {}", id);
        partsCharacteristicsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
