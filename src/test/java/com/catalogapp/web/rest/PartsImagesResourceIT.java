package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.PartsImages;
import com.catalogapp.repository.PartsImagesRepository;
import com.catalogapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.catalogapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PartsImagesResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class PartsImagesResourceIT {

    private static final String DEFAULT_PART_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_PART_IMAGE = "BBBBBBBBBB";

    @Autowired
    private PartsImagesRepository partsImagesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPartsImagesMockMvc;

    private PartsImages partsImages;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartsImagesResource partsImagesResource = new PartsImagesResource(partsImagesRepository);
        this.restPartsImagesMockMvc = MockMvcBuilders.standaloneSetup(partsImagesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PartsImages createEntity(EntityManager em) {
        PartsImages partsImages = new PartsImages()
            .partImage(DEFAULT_PART_IMAGE);
        return partsImages;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PartsImages createUpdatedEntity(EntityManager em) {
        PartsImages partsImages = new PartsImages()
            .partImage(UPDATED_PART_IMAGE);
        return partsImages;
    }

    @BeforeEach
    public void initTest() {
        partsImages = createEntity(em);
    }

    @Test
    @Transactional
    public void createPartsImages() throws Exception {
        int databaseSizeBeforeCreate = partsImagesRepository.findAll().size();

        // Create the PartsImages
        restPartsImagesMockMvc.perform(post("/api/parts-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partsImages)))
            .andExpect(status().isCreated());

        // Validate the PartsImages in the database
        List<PartsImages> partsImagesList = partsImagesRepository.findAll();
        assertThat(partsImagesList).hasSize(databaseSizeBeforeCreate + 1);
        PartsImages testPartsImages = partsImagesList.get(partsImagesList.size() - 1);
        assertThat(testPartsImages.getPartImage()).isEqualTo(DEFAULT_PART_IMAGE);
    }

    @Test
    @Transactional
    public void createPartsImagesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partsImagesRepository.findAll().size();

        // Create the PartsImages with an existing ID
        partsImages.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartsImagesMockMvc.perform(post("/api/parts-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partsImages)))
            .andExpect(status().isBadRequest());

        // Validate the PartsImages in the database
        List<PartsImages> partsImagesList = partsImagesRepository.findAll();
        assertThat(partsImagesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPartsImages() throws Exception {
        // Initialize the database
        partsImagesRepository.saveAndFlush(partsImages);

        // Get all the partsImagesList
        restPartsImagesMockMvc.perform(get("/api/parts-images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partsImages.getId().intValue())))
            .andExpect(jsonPath("$.[*].partImage").value(hasItem(DEFAULT_PART_IMAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getPartsImages() throws Exception {
        // Initialize the database
        partsImagesRepository.saveAndFlush(partsImages);

        // Get the partsImages
        restPartsImagesMockMvc.perform(get("/api/parts-images/{id}", partsImages.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(partsImages.getId().intValue()))
            .andExpect(jsonPath("$.partImage").value(DEFAULT_PART_IMAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPartsImages() throws Exception {
        // Get the partsImages
        restPartsImagesMockMvc.perform(get("/api/parts-images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartsImages() throws Exception {
        // Initialize the database
        partsImagesRepository.saveAndFlush(partsImages);

        int databaseSizeBeforeUpdate = partsImagesRepository.findAll().size();

        // Update the partsImages
        PartsImages updatedPartsImages = partsImagesRepository.findById(partsImages.getId()).get();
        // Disconnect from session so that the updates on updatedPartsImages are not directly saved in db
        em.detach(updatedPartsImages);
        updatedPartsImages
            .partImage(UPDATED_PART_IMAGE);

        restPartsImagesMockMvc.perform(put("/api/parts-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPartsImages)))
            .andExpect(status().isOk());

        // Validate the PartsImages in the database
        List<PartsImages> partsImagesList = partsImagesRepository.findAll();
        assertThat(partsImagesList).hasSize(databaseSizeBeforeUpdate);
        PartsImages testPartsImages = partsImagesList.get(partsImagesList.size() - 1);
        assertThat(testPartsImages.getPartImage()).isEqualTo(UPDATED_PART_IMAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingPartsImages() throws Exception {
        int databaseSizeBeforeUpdate = partsImagesRepository.findAll().size();

        // Create the PartsImages

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartsImagesMockMvc.perform(put("/api/parts-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partsImages)))
            .andExpect(status().isBadRequest());

        // Validate the PartsImages in the database
        List<PartsImages> partsImagesList = partsImagesRepository.findAll();
        assertThat(partsImagesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePartsImages() throws Exception {
        // Initialize the database
        partsImagesRepository.saveAndFlush(partsImages);

        int databaseSizeBeforeDelete = partsImagesRepository.findAll().size();

        // Delete the partsImages
        restPartsImagesMockMvc.perform(delete("/api/parts-images/{id}", partsImages.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PartsImages> partsImagesList = partsImagesRepository.findAll();
        assertThat(partsImagesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PartsImages.class);
        PartsImages partsImages1 = new PartsImages();
        partsImages1.setId(1L);
        PartsImages partsImages2 = new PartsImages();
        partsImages2.setId(partsImages1.getId());
        assertThat(partsImages1).isEqualTo(partsImages2);
        partsImages2.setId(2L);
        assertThat(partsImages1).isNotEqualTo(partsImages2);
        partsImages1.setId(null);
        assertThat(partsImages1).isNotEqualTo(partsImages2);
    }
}
