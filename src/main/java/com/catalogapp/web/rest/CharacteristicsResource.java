package com.catalogapp.web.rest;

import com.catalogapp.domain.Characteristics;
import com.catalogapp.repository.CharacteristicsRepository;
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
 * REST controller for managing {@link com.catalogapp.domain.Characteristics}.
 */
@RestController
@RequestMapping("/api")
public class CharacteristicsResource {

    private final Logger log = LoggerFactory.getLogger(CharacteristicsResource.class);

    private static final String ENTITY_NAME = "characteristics";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CharacteristicsRepository characteristicsRepository;

    public CharacteristicsResource(CharacteristicsRepository characteristicsRepository) {
        this.characteristicsRepository = characteristicsRepository;
    }

    /**
     * {@code POST  /characteristics} : Create a new characteristics.
     *
     * @param characteristics the characteristics to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new characteristics, or with status {@code 400 (Bad Request)} if the characteristics has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/characteristics")
    public ResponseEntity<Characteristics> createCharacteristics(@Valid @RequestBody Characteristics characteristics) throws URISyntaxException {
        log.debug("REST request to save Characteristics : {}", characteristics);
        if (characteristics.getId() != null) {
            throw new BadRequestAlertException("A new characteristics cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Characteristics result = characteristicsRepository.save(characteristics);
        return ResponseEntity.created(new URI("/api/characteristics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /characteristics} : Updates an existing characteristics.
     *
     * @param characteristics the characteristics to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated characteristics,
     * or with status {@code 400 (Bad Request)} if the characteristics is not valid,
     * or with status {@code 500 (Internal Server Error)} if the characteristics couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/characteristics")
    public ResponseEntity<Characteristics> updateCharacteristics(@Valid @RequestBody Characteristics characteristics) throws URISyntaxException {
        log.debug("REST request to update Characteristics : {}", characteristics);
        if (characteristics.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Characteristics result = characteristicsRepository.save(characteristics);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, characteristics.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /characteristics} : get all the characteristics.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of characteristics in body.
     */
    @GetMapping("/characteristics")
    public List<Characteristics> getAllCharacteristics() {
        log.debug("REST request to get all Characteristics");
        return characteristicsRepository.findAll();
    }

    /**
     * {@code GET  /characteristics/:id} : get the "id" characteristics.
     *
     * @param id the id of the characteristics to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the characteristics, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/characteristics/{id}")
    public ResponseEntity<Characteristics> getCharacteristics(@PathVariable Long id) {
        log.debug("REST request to get Characteristics : {}", id);
        Optional<Characteristics> characteristics = characteristicsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(characteristics);
    }

    /**
     * {@code DELETE  /characteristics/:id} : delete the "id" characteristics.
     *
     * @param id the id of the characteristics to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/characteristics/{id}")
    public ResponseEntity<Void> deleteCharacteristics(@PathVariable Long id) {
        log.debug("REST request to delete Characteristics : {}", id);
        characteristicsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
