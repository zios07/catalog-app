package com.catalogapp.web.rest;

import com.catalogapp.domain.VehicleBrands;
import com.catalogapp.repository.VehicleBrandsRepository;
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
 * REST controller for managing {@link com.catalogapp.domain.VehicleBrands}.
 */
@RestController
@RequestMapping("/api")
public class VehicleBrandsResource {

    private final Logger log = LoggerFactory.getLogger(VehicleBrandsResource.class);

    private static final String ENTITY_NAME = "vehicleBrands";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VehicleBrandsRepository vehicleBrandsRepository;

    public VehicleBrandsResource(VehicleBrandsRepository vehicleBrandsRepository) {
        this.vehicleBrandsRepository = vehicleBrandsRepository;
    }

    /**
     * {@code POST  /vehicle-brands} : Create a new vehicleBrands.
     *
     * @param vehicleBrands the vehicleBrands to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vehicleBrands, or with status {@code 400 (Bad Request)} if the vehicleBrands has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vehicle-brands")
    public ResponseEntity<VehicleBrands> createVehicleBrands(@Valid @RequestBody VehicleBrands vehicleBrands) throws URISyntaxException {
        log.debug("REST request to save VehicleBrands : {}", vehicleBrands);
        if (vehicleBrands.getId() != null) {
            throw new BadRequestAlertException("A new vehicleBrands cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleBrands result = vehicleBrandsRepository.save(vehicleBrands);
        return ResponseEntity.created(new URI("/api/vehicle-brands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vehicle-brands} : Updates an existing vehicleBrands.
     *
     * @param vehicleBrands the vehicleBrands to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vehicleBrands,
     * or with status {@code 400 (Bad Request)} if the vehicleBrands is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vehicleBrands couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vehicle-brands")
    public ResponseEntity<VehicleBrands> updateVehicleBrands(@Valid @RequestBody VehicleBrands vehicleBrands) throws URISyntaxException {
        log.debug("REST request to update VehicleBrands : {}", vehicleBrands);
        if (vehicleBrands.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VehicleBrands result = vehicleBrandsRepository.save(vehicleBrands);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vehicleBrands.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vehicle-brands} : get all the vehicleBrands.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vehicleBrands in body.
     */
    @GetMapping("/vehicle-brands")
    public ResponseEntity<List<VehicleBrands>> getAllVehicleBrands(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of VehicleBrands");
        Page<VehicleBrands> page = vehicleBrandsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /vehicle-brands/:id} : get the "id" vehicleBrands.
     *
     * @param id the id of the vehicleBrands to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vehicleBrands, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vehicle-brands/{id}")
    public ResponseEntity<VehicleBrands> getVehicleBrands(@PathVariable Long id) {
        log.debug("REST request to get VehicleBrands : {}", id);
        Optional<VehicleBrands> vehicleBrands = vehicleBrandsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vehicleBrands);
    }

    /**
     * {@code DELETE  /vehicle-brands/:id} : delete the "id" vehicleBrands.
     *
     * @param id the id of the vehicleBrands to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vehicle-brands/{id}")
    public ResponseEntity<Void> deleteVehicleBrands(@PathVariable Long id) {
        log.debug("REST request to delete VehicleBrands : {}", id);
        vehicleBrandsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
