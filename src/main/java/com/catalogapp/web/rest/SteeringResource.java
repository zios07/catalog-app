package com.catalogapp.web.rest;

import com.catalogapp.domain.Steering;
import com.catalogapp.repository.SteeringRepository;
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
 * REST controller for managing {@link com.catalogapp.domain.Steering}.
 */
@RestController
@RequestMapping("/api")
public class SteeringResource {

    private final Logger log = LoggerFactory.getLogger(SteeringResource.class);

    private static final String ENTITY_NAME = "steering";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SteeringRepository steeringRepository;

    public SteeringResource(SteeringRepository steeringRepository) {
        this.steeringRepository = steeringRepository;
    }

    /**
     * {@code POST  /steerings} : Create a new steering.
     *
     * @param steering the steering to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new steering, or with status {@code 400 (Bad Request)} if the steering has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/steerings")
    public ResponseEntity<Steering> createSteering(@Valid @RequestBody Steering steering) throws URISyntaxException {
        log.debug("REST request to save Steering : {}", steering);
        if (steering.getId() != null) {
            throw new BadRequestAlertException("A new steering cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Steering result = steeringRepository.save(steering);
        return ResponseEntity.created(new URI("/api/steerings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /steerings} : Updates an existing steering.
     *
     * @param steering the steering to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated steering,
     * or with status {@code 400 (Bad Request)} if the steering is not valid,
     * or with status {@code 500 (Internal Server Error)} if the steering couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/steerings")
    public ResponseEntity<Steering> updateSteering(@Valid @RequestBody Steering steering) throws URISyntaxException {
        log.debug("REST request to update Steering : {}", steering);
        if (steering.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Steering result = steeringRepository.save(steering);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, steering.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /steerings} : get all the steerings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of steerings in body.
     */
    @GetMapping("/steerings")
    public List<Steering> getAllSteerings() {
        log.debug("REST request to get all Steerings");
        return steeringRepository.findAll();
    }

    /**
     * {@code GET  /steerings/:id} : get the "id" steering.
     *
     * @param id the id of the steering to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the steering, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/steerings/{id}")
    public ResponseEntity<Steering> getSteering(@PathVariable Long id) {
        log.debug("REST request to get Steering : {}", id);
        Optional<Steering> steering = steeringRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(steering);
    }

    /**
     * {@code DELETE  /steerings/:id} : delete the "id" steering.
     *
     * @param id the id of the steering to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/steerings/{id}")
    public ResponseEntity<Void> deleteSteering(@PathVariable Long id) {
        log.debug("REST request to delete Steering : {}", id);
        steeringRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
