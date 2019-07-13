package com.catalogapp.web.rest;

import com.catalogapp.domain.Transmission;
import com.catalogapp.repository.TransmissionRepository;
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
 * REST controller for managing {@link com.catalogapp.domain.Transmission}.
 */
@RestController
@RequestMapping("/api")
public class TransmissionResource {

    private final Logger log = LoggerFactory.getLogger(TransmissionResource.class);

    private static final String ENTITY_NAME = "transmission";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransmissionRepository transmissionRepository;

    public TransmissionResource(TransmissionRepository transmissionRepository) {
        this.transmissionRepository = transmissionRepository;
    }

    /**
     * {@code POST  /transmissions} : Create a new transmission.
     *
     * @param transmission the transmission to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transmission, or with status {@code 400 (Bad Request)} if the transmission has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transmissions")
    public ResponseEntity<Transmission> createTransmission(@Valid @RequestBody Transmission transmission) throws URISyntaxException {
        log.debug("REST request to save Transmission : {}", transmission);
        if (transmission.getId() != null) {
            throw new BadRequestAlertException("A new transmission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Transmission result = transmissionRepository.save(transmission);
        return ResponseEntity.created(new URI("/api/transmissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transmissions} : Updates an existing transmission.
     *
     * @param transmission the transmission to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transmission,
     * or with status {@code 400 (Bad Request)} if the transmission is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transmission couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transmissions")
    public ResponseEntity<Transmission> updateTransmission(@Valid @RequestBody Transmission transmission) throws URISyntaxException {
        log.debug("REST request to update Transmission : {}", transmission);
        if (transmission.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Transmission result = transmissionRepository.save(transmission);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, transmission.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transmissions} : get all the transmissions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transmissions in body.
     */
    @GetMapping("/transmissions")
    public List<Transmission> getAllTransmissions() {
        log.debug("REST request to get all Transmissions");
        return transmissionRepository.findAll();
    }

    /**
     * {@code GET  /transmissions/:id} : get the "id" transmission.
     *
     * @param id the id of the transmission to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transmission, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transmissions/{id}")
    public ResponseEntity<Transmission> getTransmission(@PathVariable Long id) {
        log.debug("REST request to get Transmission : {}", id);
        Optional<Transmission> transmission = transmissionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transmission);
    }

    /**
     * {@code DELETE  /transmissions/:id} : delete the "id" transmission.
     *
     * @param id the id of the transmission to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transmissions/{id}")
    public ResponseEntity<Void> deleteTransmission(@PathVariable Long id) {
        log.debug("REST request to delete Transmission : {}", id);
        transmissionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
