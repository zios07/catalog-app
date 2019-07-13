package com.catalogapp.web.rest;

import com.catalogapp.domain.Motors;
import com.catalogapp.repository.MotorsRepository;
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
 * REST controller for managing {@link com.catalogapp.domain.Motors}.
 */
@RestController
@RequestMapping("/api")
public class MotorsResource {

    private final Logger log = LoggerFactory.getLogger(MotorsResource.class);

    private static final String ENTITY_NAME = "motors";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MotorsRepository motorsRepository;

    public MotorsResource(MotorsRepository motorsRepository) {
        this.motorsRepository = motorsRepository;
    }

    /**
     * {@code POST  /motors} : Create a new motors.
     *
     * @param motors the motors to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new motors, or with status {@code 400 (Bad Request)} if the motors has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/motors")
    public ResponseEntity<Motors> createMotors(@Valid @RequestBody Motors motors) throws URISyntaxException {
        log.debug("REST request to save Motors : {}", motors);
        if (motors.getId() != null) {
            throw new BadRequestAlertException("A new motors cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Motors result = motorsRepository.save(motors);
        return ResponseEntity.created(new URI("/api/motors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /motors} : Updates an existing motors.
     *
     * @param motors the motors to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated motors,
     * or with status {@code 400 (Bad Request)} if the motors is not valid,
     * or with status {@code 500 (Internal Server Error)} if the motors couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/motors")
    public ResponseEntity<Motors> updateMotors(@Valid @RequestBody Motors motors) throws URISyntaxException {
        log.debug("REST request to update Motors : {}", motors);
        if (motors.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Motors result = motorsRepository.save(motors);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, motors.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /motors} : get all the motors.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of motors in body.
     */
    @GetMapping("/motors")
    public ResponseEntity<List<Motors>> getAllMotors(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Motors");
        Page<Motors> page = motorsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /motors/:id} : get the "id" motors.
     *
     * @param id the id of the motors to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the motors, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/motors/{id}")
    public ResponseEntity<Motors> getMotors(@PathVariable Long id) {
        log.debug("REST request to get Motors : {}", id);
        Optional<Motors> motors = motorsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(motors);
    }

    /**
     * {@code DELETE  /motors/:id} : delete the "id" motors.
     *
     * @param id the id of the motors to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/motors/{id}")
    public ResponseEntity<Void> deleteMotors(@PathVariable Long id) {
        log.debug("REST request to delete Motors : {}", id);
        motorsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
