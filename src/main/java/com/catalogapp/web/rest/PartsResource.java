package com.catalogapp.web.rest;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.catalogapp.domain.Attachment;
import com.catalogapp.domain.Parts;
import com.catalogapp.repository.AttachmentRepository;
import com.catalogapp.repository.PartsRepository;
import com.catalogapp.web.rest.errors.BadRequestAlertException;
import com.google.gson.Gson;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.catalogapp.domain.Parts}.
 */
@RestController
@RequestMapping("/api")
public class PartsResource {

    private final Logger log = LoggerFactory.getLogger(PartsResource.class);

    private static final String ENTITY_NAME = "parts";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PartsRepository partsRepository;
    private final AttachmentRepository attachmentRepository;

    public PartsResource(PartsRepository partsRepository, AttachmentRepository attachmentRepository) {
        this.partsRepository = partsRepository;
        this.attachmentRepository = attachmentRepository;
    }

    /**
     * {@code POST  /parts} : Create a new parts.
     *
     * @param parts the parts to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new parts, or with status {@code 400 (Bad Request)} if the
     *         parts has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     * @throws IOException
     */
    @PostMapping("/parts")
    public ResponseEntity<Parts> createParts(@RequestParam("parts") String srtParts,
            @RequestParam("image") MultipartFile image, @RequestParam("technicalManual") MultipartFile technicalManual)
            throws URISyntaxException, IOException {
        Parts parts = new Gson().fromJson(srtParts, Parts.class);
        log.debug("REST request to save Parts : {}", parts);
        if (parts.getId() != null) {
            throw new BadRequestAlertException("A new parts cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if (technicalManual != null) {
            Attachment attachment = new Attachment();
            attachment.setContent(technicalManual.getBytes());
            attachment.setDate(new Date());
            attachment.setName(technicalManual.getOriginalFilename());
            attachment.setMime(technicalManual.getContentType());
            parts.setTechnicalManual(attachment);
        }
        if (image != null) {
            Attachment attachment = new Attachment();
            attachment.setContent(image.getBytes());
            attachment.setDate(new Date());
            attachment.setName(image.getOriginalFilename());
            attachment.setMime(image.getContentType());
            parts.setImage(attachment);
        }
        Parts result = partsRepository.save(parts);
        return ResponseEntity
                .created(new URI("/api/parts/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /parts} : Updates an existing parts.
     *
     * @param parts the parts to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated parts, or with status {@code 400 (Bad Request)} if the
     *         parts is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the parts couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parts")
    public ResponseEntity<Parts> updateParts(@Valid @RequestBody Parts parts) throws URISyntaxException {
        log.debug("REST request to update Parts : {}", parts);
        if (parts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Parts result = partsRepository.save(parts);
        return ResponseEntity.ok().headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, parts.getId().toString()))
                .body(result);
    }

    /**
     * {@code GET  /parts} : get all the parts.
     *
     * @param pageable    the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder  a {@link UriComponentsBuilder} URI builder.
     * @param eagerload   flag to eager load entities from relationships (This is
     *                    applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of parts in body.
     */
    @GetMapping("/parts")
    public ResponseEntity<List<Parts>> getAllParts(Pageable pageable,
            @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder,
            @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Parts");
        Page<Parts> page;
        if (eagerload) {
            page = partsRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = partsRepository.findAll(pageable);
        }

        log.debug("REST request to get all Catalogs");
        page.getContent().stream().forEach(e -> {
            e.setImage(null);
            e.setTechnicalManual(null);
        });
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping(value = "parts/download/manual/{id}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable long id) {
        Attachment document = attachmentRepository.findById(id).get();
        byte[] file = document.getContent();
        String mimeType = document.getMime();

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf(mimeType));

        String disposition = "document";

        if ("application/pdf".equalsIgnoreCase(mimeType)) {
            disposition = "inline";
        }
        headers.add("content-disposition", disposition + "; filename=\"" + document.getName() + "\"");
        return new ResponseEntity<>(file, headers, HttpStatus.OK);
    }

    /**
     * {@code GET  /parts/:id} : get the "id" parts.
     *
     * @param id the id of the parts to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the parts, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parts/{id}")
    public ResponseEntity<Parts> getParts(@PathVariable Long id) {
        log.debug("REST request to get Parts : {}", id);
        Optional<Parts> parts = partsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(parts);
    }

    /**
     * {@code DELETE  /parts/:id} : delete the "id" parts.
     *
     * @param id the id of the parts to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parts/{id}")
    public ResponseEntity<Void> deleteParts(@PathVariable Long id) {
        log.debug("REST request to delete Parts : {}", id);
        partsRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
                .build();
    }
}
