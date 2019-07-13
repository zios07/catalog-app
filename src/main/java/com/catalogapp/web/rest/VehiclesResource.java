package com.catalogapp.web.rest;

import com.catalogapp.domain.Vehicles;
import com.catalogapp.repository.VehiclesRepository;
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
 * REST controller for managing {@link com.catalogapp.domain.Vehicles}.
 */
@RestController
@RequestMapping("/api")
public class VehiclesResource {

    private final Logger log = LoggerFactory.getLogger(VehiclesResource.class);

    private static final String ENTITY_NAME = "vehicles";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VehiclesRepository vehiclesRepository;

    public VehiclesResource(VehiclesRepository vehiclesRepository) {
        this.vehiclesRepository = vehiclesRepository;
    }

    /**
     * {@code POST  /vehicles} : Create a new vehicles.
     *
     * @param vehicles the vehicles to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vehicles, or with status {@code 400 (Bad Request)} if the vehicles has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vehicles")
    public ResponseEntity<Vehicles> createVehicles(@Valid @RequestBody Vehicles vehicles) throws URISyntaxException {
        log.debug("REST request to save Vehicles : {}", vehicles);
        if (vehicles.getId() != null) {
            throw new BadRequestAlertException("A new vehicles cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vehicles result = vehiclesRepository.save(vehicles);
        return ResponseEntity.created(new URI("/api/vehicles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vehicles} : Updates an existing vehicles.
     *
     * @param vehicles the vehicles to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vehicles,
     * or with status {@code 400 (Bad Request)} if the vehicles is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vehicles couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vehicles")
    public ResponseEntity<Vehicles> updateVehicles(@Valid @RequestBody Vehicles vehicles) throws URISyntaxException {
        log.debug("REST request to update Vehicles : {}", vehicles);
        if (vehicles.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vehicles result = vehiclesRepository.save(vehicles);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vehicles.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vehicles} : get all the vehicles.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vehicles in body.
     */
    @GetMapping("/vehicles")
    public ResponseEntity<List<Vehicles>> getAllVehicles(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Vehicles");
        Page<Vehicles> page = vehiclesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /vehicles/:id} : get the "id" vehicles.
     *
     * @param id the id of the vehicles to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vehicles, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vehicles/{id}")
    public ResponseEntity<Vehicles> getVehicles(@PathVariable Long id) {
        log.debug("REST request to get Vehicles : {}", id);
        Optional<Vehicles> vehicles = vehiclesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vehicles);
    }

    /**
     * {@code DELETE  /vehicles/:id} : delete the "id" vehicles.
     *
     * @param id the id of the vehicles to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vehicles/{id}")
    public ResponseEntity<Void> deleteVehicles(@PathVariable Long id) {
        log.debug("REST request to delete Vehicles : {}", id);
        vehiclesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
