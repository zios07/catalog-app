package com.catalogapp.web.rest;

import com.catalogapp.domain.VehicleModels;
import com.catalogapp.repository.VehicleModelsRepository;
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
 * REST controller for managing {@link com.catalogapp.domain.VehicleModels}.
 */
@RestController
@RequestMapping("/api")
public class VehicleModelsResource {

    private final Logger log = LoggerFactory.getLogger(VehicleModelsResource.class);

    private static final String ENTITY_NAME = "vehicleModels";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VehicleModelsRepository vehicleModelsRepository;

    public VehicleModelsResource(VehicleModelsRepository vehicleModelsRepository) {
        this.vehicleModelsRepository = vehicleModelsRepository;
    }

    /**
     * {@code POST  /vehicle-models} : Create a new vehicleModels.
     *
     * @param vehicleModels the vehicleModels to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vehicleModels, or with status {@code 400 (Bad Request)} if the vehicleModels has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vehicle-models")
    public ResponseEntity<VehicleModels> createVehicleModels(@Valid @RequestBody VehicleModels vehicleModels) throws URISyntaxException {
        log.debug("REST request to save VehicleModels : {}", vehicleModels);
        if (vehicleModels.getId() != null) {
            throw new BadRequestAlertException("A new vehicleModels cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleModels result = vehicleModelsRepository.save(vehicleModels);
        return ResponseEntity.created(new URI("/api/vehicle-models/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vehicle-models} : Updates an existing vehicleModels.
     *
     * @param vehicleModels the vehicleModels to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vehicleModels,
     * or with status {@code 400 (Bad Request)} if the vehicleModels is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vehicleModels couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vehicle-models")
    public ResponseEntity<VehicleModels> updateVehicleModels(@Valid @RequestBody VehicleModels vehicleModels) throws URISyntaxException {
        log.debug("REST request to update VehicleModels : {}", vehicleModels);
        if (vehicleModels.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VehicleModels result = vehicleModelsRepository.save(vehicleModels);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vehicleModels.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vehicle-models} : get all the vehicleModels.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vehicleModels in body.
     */
    @GetMapping("/vehicle-models")
    public ResponseEntity<List<VehicleModels>> getAllVehicleModels(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of VehicleModels");
        Page<VehicleModels> page = vehicleModelsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /vehicle-models/:id} : get the "id" vehicleModels.
     *
     * @param id the id of the vehicleModels to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vehicleModels, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vehicle-models/{id}")
    public ResponseEntity<VehicleModels> getVehicleModels(@PathVariable Long id) {
        log.debug("REST request to get VehicleModels : {}", id);
        Optional<VehicleModels> vehicleModels = vehicleModelsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vehicleModels);
    }

    /**
     * {@code DELETE  /vehicle-models/:id} : delete the "id" vehicleModels.
     *
     * @param id the id of the vehicleModels to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vehicle-models/{id}")
    public ResponseEntity<Void> deleteVehicleModels(@PathVariable Long id) {
        log.debug("REST request to delete VehicleModels : {}", id);
        vehicleModelsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
