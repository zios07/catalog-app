package com.catalogapp.web.rest;

import com.catalogapp.domain.Lines;
import com.catalogapp.repository.LinesRepository;
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
 * REST controller for managing {@link com.catalogapp.domain.Lines}.
 */
@RestController
@RequestMapping("/api")
public class LinesResource {

    private final Logger log = LoggerFactory.getLogger(LinesResource.class);

    private static final String ENTITY_NAME = "lines";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LinesRepository linesRepository;

    public LinesResource(LinesRepository linesRepository) {
        this.linesRepository = linesRepository;
    }

    /**
     * {@code POST  /lines} : Create a new lines.
     *
     * @param lines the lines to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lines, or with status {@code 400 (Bad Request)} if the lines has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lines")
    public ResponseEntity<Lines> createLines(@Valid @RequestBody Lines lines) throws URISyntaxException {
        log.debug("REST request to save Lines : {}", lines);
        if (lines.getId() != null) {
            throw new BadRequestAlertException("A new lines cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lines result = linesRepository.save(lines);
        return ResponseEntity.created(new URI("/api/lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lines} : Updates an existing lines.
     *
     * @param lines the lines to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lines,
     * or with status {@code 400 (Bad Request)} if the lines is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lines couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lines")
    public ResponseEntity<Lines> updateLines(@Valid @RequestBody Lines lines) throws URISyntaxException {
        log.debug("REST request to update Lines : {}", lines);
        if (lines.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Lines result = linesRepository.save(lines);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lines.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /lines} : get all the lines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lines in body.
     */
    @GetMapping("/lines")
    public List<Lines> getAllLines() {
        log.debug("REST request to get all Lines");
        return linesRepository.findAll();
    }

    /**
     * {@code GET  /lines/:id} : get the "id" lines.
     *
     * @param id the id of the lines to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lines, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lines/{id}")
    public ResponseEntity<Lines> getLines(@PathVariable Long id) {
        log.debug("REST request to get Lines : {}", id);
        Optional<Lines> lines = linesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lines);
    }

    /**
     * {@code DELETE  /lines/:id} : delete the "id" lines.
     *
     * @param id the id of the lines to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lines/{id}")
    public ResponseEntity<Void> deleteLines(@PathVariable Long id) {
        log.debug("REST request to delete Lines : {}", id);
        linesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
