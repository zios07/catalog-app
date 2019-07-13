package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.PartsCharacteristics;
import com.catalogapp.repository.PartsCharacteristicsRepository;
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
 * Integration tests for the {@Link PartsCharacteristicsResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class PartsCharacteristicsResourceIT {

    private static final String DEFAULT_INFORMATION = "AAAAAAAAAA";
    private static final String UPDATED_INFORMATION = "BBBBBBBBBB";

    @Autowired
    private PartsCharacteristicsRepository partsCharacteristicsRepository;

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

    private MockMvc restPartsCharacteristicsMockMvc;

    private PartsCharacteristics partsCharacteristics;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartsCharacteristicsResource partsCharacteristicsResource = new PartsCharacteristicsResource(partsCharacteristicsRepository);
        this.restPartsCharacteristicsMockMvc = MockMvcBuilders.standaloneSetup(partsCharacteristicsResource)
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
    public static PartsCharacteristics createEntity(EntityManager em) {
        PartsCharacteristics partsCharacteristics = new PartsCharacteristics()
            .information(DEFAULT_INFORMATION);
        return partsCharacteristics;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PartsCharacteristics createUpdatedEntity(EntityManager em) {
        PartsCharacteristics partsCharacteristics = new PartsCharacteristics()
            .information(UPDATED_INFORMATION);
        return partsCharacteristics;
    }

    @BeforeEach
    public void initTest() {
        partsCharacteristics = createEntity(em);
    }

    @Test
    @Transactional
    public void createPartsCharacteristics() throws Exception {
        int databaseSizeBeforeCreate = partsCharacteristicsRepository.findAll().size();

        // Create the PartsCharacteristics
        restPartsCharacteristicsMockMvc.perform(post("/api/parts-characteristics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partsCharacteristics)))
            .andExpect(status().isCreated());

        // Validate the PartsCharacteristics in the database
        List<PartsCharacteristics> partsCharacteristicsList = partsCharacteristicsRepository.findAll();
        assertThat(partsCharacteristicsList).hasSize(databaseSizeBeforeCreate + 1);
        PartsCharacteristics testPartsCharacteristics = partsCharacteristicsList.get(partsCharacteristicsList.size() - 1);
        assertThat(testPartsCharacteristics.getInformation()).isEqualTo(DEFAULT_INFORMATION);
    }

    @Test
    @Transactional
    public void createPartsCharacteristicsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partsCharacteristicsRepository.findAll().size();

        // Create the PartsCharacteristics with an existing ID
        partsCharacteristics.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartsCharacteristicsMockMvc.perform(post("/api/parts-characteristics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partsCharacteristics)))
            .andExpect(status().isBadRequest());

        // Validate the PartsCharacteristics in the database
        List<PartsCharacteristics> partsCharacteristicsList = partsCharacteristicsRepository.findAll();
        assertThat(partsCharacteristicsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPartsCharacteristics() throws Exception {
        // Initialize the database
        partsCharacteristicsRepository.saveAndFlush(partsCharacteristics);

        // Get all the partsCharacteristicsList
        restPartsCharacteristicsMockMvc.perform(get("/api/parts-characteristics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partsCharacteristics.getId().intValue())))
            .andExpect(jsonPath("$.[*].information").value(hasItem(DEFAULT_INFORMATION.toString())));
    }
    
    @Test
    @Transactional
    public void getPartsCharacteristics() throws Exception {
        // Initialize the database
        partsCharacteristicsRepository.saveAndFlush(partsCharacteristics);

        // Get the partsCharacteristics
        restPartsCharacteristicsMockMvc.perform(get("/api/parts-characteristics/{id}", partsCharacteristics.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(partsCharacteristics.getId().intValue()))
            .andExpect(jsonPath("$.information").value(DEFAULT_INFORMATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPartsCharacteristics() throws Exception {
        // Get the partsCharacteristics
        restPartsCharacteristicsMockMvc.perform(get("/api/parts-characteristics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartsCharacteristics() throws Exception {
        // Initialize the database
        partsCharacteristicsRepository.saveAndFlush(partsCharacteristics);

        int databaseSizeBeforeUpdate = partsCharacteristicsRepository.findAll().size();

        // Update the partsCharacteristics
        PartsCharacteristics updatedPartsCharacteristics = partsCharacteristicsRepository.findById(partsCharacteristics.getId()).get();
        // Disconnect from session so that the updates on updatedPartsCharacteristics are not directly saved in db
        em.detach(updatedPartsCharacteristics);
        updatedPartsCharacteristics
            .information(UPDATED_INFORMATION);

        restPartsCharacteristicsMockMvc.perform(put("/api/parts-characteristics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPartsCharacteristics)))
            .andExpect(status().isOk());

        // Validate the PartsCharacteristics in the database
        List<PartsCharacteristics> partsCharacteristicsList = partsCharacteristicsRepository.findAll();
        assertThat(partsCharacteristicsList).hasSize(databaseSizeBeforeUpdate);
        PartsCharacteristics testPartsCharacteristics = partsCharacteristicsList.get(partsCharacteristicsList.size() - 1);
        assertThat(testPartsCharacteristics.getInformation()).isEqualTo(UPDATED_INFORMATION);
    }

    @Test
    @Transactional
    public void updateNonExistingPartsCharacteristics() throws Exception {
        int databaseSizeBeforeUpdate = partsCharacteristicsRepository.findAll().size();

        // Create the PartsCharacteristics

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartsCharacteristicsMockMvc.perform(put("/api/parts-characteristics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partsCharacteristics)))
            .andExpect(status().isBadRequest());

        // Validate the PartsCharacteristics in the database
        List<PartsCharacteristics> partsCharacteristicsList = partsCharacteristicsRepository.findAll();
        assertThat(partsCharacteristicsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePartsCharacteristics() throws Exception {
        // Initialize the database
        partsCharacteristicsRepository.saveAndFlush(partsCharacteristics);

        int databaseSizeBeforeDelete = partsCharacteristicsRepository.findAll().size();

        // Delete the partsCharacteristics
        restPartsCharacteristicsMockMvc.perform(delete("/api/parts-characteristics/{id}", partsCharacteristics.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PartsCharacteristics> partsCharacteristicsList = partsCharacteristicsRepository.findAll();
        assertThat(partsCharacteristicsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PartsCharacteristics.class);
        PartsCharacteristics partsCharacteristics1 = new PartsCharacteristics();
        partsCharacteristics1.setId(1L);
        PartsCharacteristics partsCharacteristics2 = new PartsCharacteristics();
        partsCharacteristics2.setId(partsCharacteristics1.getId());
        assertThat(partsCharacteristics1).isEqualTo(partsCharacteristics2);
        partsCharacteristics2.setId(2L);
        assertThat(partsCharacteristics1).isNotEqualTo(partsCharacteristics2);
        partsCharacteristics1.setId(null);
        assertThat(partsCharacteristics1).isNotEqualTo(partsCharacteristics2);
    }
}
