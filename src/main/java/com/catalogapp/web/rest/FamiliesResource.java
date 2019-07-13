package com.catalogapp.web.rest;

import com.catalogapp.domain.Families;
import com.catalogapp.repository.FamiliesRepository;
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
 * REST controller for managing {@link com.catalogapp.domain.Families}.
 */
@RestController
@RequestMapping("/api")
public class FamiliesResource {

    private final Logger log = LoggerFactory.getLogger(FamiliesResource.class);

    private static final String ENTITY_NAME = "families";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FamiliesRepository familiesRepository;

    public FamiliesResource(FamiliesRepository familiesRepository) {
        this.familiesRepository = familiesRepository;
    }

    /**
     * {@code POST  /families} : Create a new families.
     *
     * @param families the families to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new families, or with status {@code 400 (Bad Request)} if the families has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/families")
    public ResponseEntity<Families> createFamilies(@Valid @RequestBody Families families) throws URISyntaxException {
        log.debug("REST request to save Families : {}", families);
        if (families.getId() != null) {
            throw new BadRequestAlertException("A new families cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Families result = familiesRepository.save(families);
        return ResponseEntity.created(new URI("/api/families/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /families} : Updates an existing families.
     *
     * @param families the families to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated families,
     * or with status {@code 400 (Bad Request)} if the families is not valid,
     * or with status {@code 500 (Internal Server Error)} if the families couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/families")
    public ResponseEntity<Families> updateFamilies(@Valid @RequestBody Families families) throws URISyntaxException {
        log.debug("REST request to update Families : {}", families);
        if (families.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Families result = familiesRepository.save(families);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, families.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /families} : get all the families.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of families in body.
     */
    @GetMapping("/families")
    public ResponseEntity<List<Families>> getAllFamilies(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Families");
        Page<Families> page = familiesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /families/:id} : get the "id" families.
     *
     * @param id the id of the families to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the families, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/families/{id}")
    public ResponseEntity<Families> getFamilies(@PathVariable Long id) {
        log.debug("REST request to get Families : {}", id);
        Optional<Families> families = familiesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(families);
    }

    /**
     * {@code DELETE  /families/:id} : delete the "id" families.
     *
     * @param id the id of the families to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/families/{id}")
    public ResponseEntity<Void> deleteFamilies(@PathVariable Long id) {
        log.debug("REST request to delete Families : {}", id);
        familiesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
