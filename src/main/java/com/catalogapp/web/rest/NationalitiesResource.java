package com.catalogapp.web.rest;

import com.catalogapp.domain.Nationalities;
import com.catalogapp.repository.NationalitiesRepository;
import com.catalogapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.catalogapp.domain.Nationalities}.
 */
@RestController
@RequestMapping("/api")
public class NationalitiesResource {

    private final Logger log = LoggerFactory.getLogger(NationalitiesResource.class);

    private static final String ENTITY_NAME = "nationalities";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NationalitiesRepository nationalitiesRepository;

    public NationalitiesResource(NationalitiesRepository nationalitiesRepository) {
        this.nationalitiesRepository = nationalitiesRepository;
    }

    /**
     * {@code POST  /nationalities} : Create a new nationalities.
     *
     * @param nationalities the nationalities to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nationalities, or with status {@code 400 (Bad Request)} if the nationalities has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nationalities")
    public ResponseEntity<Nationalities> createNationalities(@Valid @RequestBody Nationalities nationalities) throws URISyntaxException {
        log.debug("REST request to save Nationalities : {}", nationalities);
        if (nationalities.getId() != null) {
            throw new BadRequestAlertException("A new nationalities cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nationalities result = nationalitiesRepository.save(nationalities);
        return ResponseEntity.created(new URI("/api/nationalities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nationalities} : Updates an existing nationalities.
     *
     * @param nationalities the nationalities to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nationalities,
     * or with status {@code 400 (Bad Request)} if the nationalities is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nationalities couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nationalities")
    public ResponseEntity<Nationalities> updateNationalities(@Valid @RequestBody Nationalities nationalities) throws URISyntaxException {
        log.debug("REST request to update Nationalities : {}", nationalities);
        if (nationalities.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Nationalities result = nationalitiesRepository.save(nationalities);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nationalities.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nationalities} : get all the nationalities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nationalities in body.
     */
    @GetMapping("/nationalities")
    public List<Nationalities> getAllNationalities() {
        log.debug("REST request to get all Nationalities");
        return nationalitiesRepository.findAll();
    }

    /**
     * {@code GET  /nationalities/:id} : get the "id" nationalities.
     *
     * @param id the id of the nationalities to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nationalities, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nationalities/{id}")
    public ResponseEntity<Nationalities> getNationalities(@PathVariable Long id) {
        log.debug("REST request to get Nationalities : {}", id);
        Optional<Nationalities> nationalities = nationalitiesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nationalities);
    }

    /**
     * {@code DELETE  /nationalities/:id} : delete the "id" nationalities.
     *
     * @param id the id of the nationalities to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nationalities/{id}")
    public ResponseEntity<Void> deleteNationalities(@PathVariable Long id) {
        log.debug("REST request to delete Nationalities : {}", id);
        nationalitiesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
