package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Nationalities;
import com.catalogapp.repository.NationalitiesRepository;
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
 * Integration tests for the {@Link NationalitiesResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class NationalitiesResourceIT {

    private static final String DEFAULT_NATIONALITY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NATIONALITY_NAME = "BBBBBBBBBB";

    @Autowired
    private NationalitiesRepository nationalitiesRepository;

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

    private MockMvc restNationalitiesMockMvc;

    private Nationalities nationalities;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NationalitiesResource nationalitiesResource = new NationalitiesResource(nationalitiesRepository);
        this.restNationalitiesMockMvc = MockMvcBuilders.standaloneSetup(nationalitiesResource)
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
    public static Nationalities createEntity(EntityManager em) {
        Nationalities nationalities = new Nationalities()
            .nationalityName(DEFAULT_NATIONALITY_NAME);
        return nationalities;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nationalities createUpdatedEntity(EntityManager em) {
        Nationalities nationalities = new Nationalities()
            .nationalityName(UPDATED_NATIONALITY_NAME);
        return nationalities;
    }

    @BeforeEach
    public void initTest() {
        nationalities = createEntity(em);
    }

    @Test
    @Transactional
    public void createNationalities() throws Exception {
        int databaseSizeBeforeCreate = nationalitiesRepository.findAll().size();

        // Create the Nationalities
        restNationalitiesMockMvc.perform(post("/api/nationalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nationalities)))
            .andExpect(status().isCreated());

        // Validate the Nationalities in the database
        List<Nationalities> nationalitiesList = nationalitiesRepository.findAll();
        assertThat(nationalitiesList).hasSize(databaseSizeBeforeCreate + 1);
        Nationalities testNationalities = nationalitiesList.get(nationalitiesList.size() - 1);
        assertThat(testNationalities.getNationalityName()).isEqualTo(DEFAULT_NATIONALITY_NAME);
    }

    @Test
    @Transactional
    public void createNationalitiesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nationalitiesRepository.findAll().size();

        // Create the Nationalities with an existing ID
        nationalities.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNationalitiesMockMvc.perform(post("/api/nationalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nationalities)))
            .andExpect(status().isBadRequest());

        // Validate the Nationalities in the database
        List<Nationalities> nationalitiesList = nationalitiesRepository.findAll();
        assertThat(nationalitiesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNationalityNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = nationalitiesRepository.findAll().size();
        // set the field null
        nationalities.setNationalityName(null);

        // Create the Nationalities, which fails.

        restNationalitiesMockMvc.perform(post("/api/nationalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nationalities)))
            .andExpect(status().isBadRequest());

        List<Nationalities> nationalitiesList = nationalitiesRepository.findAll();
        assertThat(nationalitiesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNationalities() throws Exception {
        // Initialize the database
        nationalitiesRepository.saveAndFlush(nationalities);

        // Get all the nationalitiesList
        restNationalitiesMockMvc.perform(get("/api/nationalities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nationalities.getId().intValue())))
            .andExpect(jsonPath("$.[*].nationalityName").value(hasItem(DEFAULT_NATIONALITY_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getNationalities() throws Exception {
        // Initialize the database
        nationalitiesRepository.saveAndFlush(nationalities);

        // Get the nationalities
        restNationalitiesMockMvc.perform(get("/api/nationalities/{id}", nationalities.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nationalities.getId().intValue()))
            .andExpect(jsonPath("$.nationalityName").value(DEFAULT_NATIONALITY_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNationalities() throws Exception {
        // Get the nationalities
        restNationalitiesMockMvc.perform(get("/api/nationalities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNationalities() throws Exception {
        // Initialize the database
        nationalitiesRepository.saveAndFlush(nationalities);

        int databaseSizeBeforeUpdate = nationalitiesRepository.findAll().size();

        // Update the nationalities
        Nationalities updatedNationalities = nationalitiesRepository.findById(nationalities.getId()).get();
        // Disconnect from session so that the updates on updatedNationalities are not directly saved in db
        em.detach(updatedNationalities);
        updatedNationalities
            .nationalityName(UPDATED_NATIONALITY_NAME);

        restNationalitiesMockMvc.perform(put("/api/nationalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNationalities)))
            .andExpect(status().isOk());

        // Validate the Nationalities in the database
        List<Nationalities> nationalitiesList = nationalitiesRepository.findAll();
        assertThat(nationalitiesList).hasSize(databaseSizeBeforeUpdate);
        Nationalities testNationalities = nationalitiesList.get(nationalitiesList.size() - 1);
        assertThat(testNationalities.getNationalityName()).isEqualTo(UPDATED_NATIONALITY_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingNationalities() throws Exception {
        int databaseSizeBeforeUpdate = nationalitiesRepository.findAll().size();

        // Create the Nationalities

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNationalitiesMockMvc.perform(put("/api/nationalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nationalities)))
            .andExpect(status().isBadRequest());

        // Validate the Nationalities in the database
        List<Nationalities> nationalitiesList = nationalitiesRepository.findAll();
        assertThat(nationalitiesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNationalities() throws Exception {
        // Initialize the database
        nationalitiesRepository.saveAndFlush(nationalities);

        int databaseSizeBeforeDelete = nationalitiesRepository.findAll().size();

        // Delete the nationalities
        restNationalitiesMockMvc.perform(delete("/api/nationalities/{id}", nationalities.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Nationalities> nationalitiesList = nationalitiesRepository.findAll();
        assertThat(nationalitiesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nationalities.class);
        Nationalities nationalities1 = new Nationalities();
        nationalities1.setId(1L);
        Nationalities nationalities2 = new Nationalities();
        nationalities2.setId(nationalities1.getId());
        assertThat(nationalities1).isEqualTo(nationalities2);
        nationalities2.setId(2L);
        assertThat(nationalities1).isNotEqualTo(nationalities2);
        nationalities1.setId(null);
        assertThat(nationalities1).isNotEqualTo(nationalities2);
    }
}
