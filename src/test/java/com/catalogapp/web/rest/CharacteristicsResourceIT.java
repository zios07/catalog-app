package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Characteristics;
import com.catalogapp.repository.CharacteristicsRepository;
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
 * Integration tests for the {@Link CharacteristicsResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class CharacteristicsResourceIT {

    private static final String DEFAULT_CHARACTERISTICS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CHARACTERISTICS_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VIEW_CATALOG = false;
    private static final Boolean UPDATED_VIEW_CATALOG = true;

    private static final Boolean DEFAULT_VIEW_SPECIAL_CLIENT = false;
    private static final Boolean UPDATED_VIEW_SPECIAL_CLIENT = true;

    @Autowired
    private CharacteristicsRepository characteristicsRepository;

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

    private MockMvc restCharacteristicsMockMvc;

    private Characteristics characteristics;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CharacteristicsResource characteristicsResource = new CharacteristicsResource(characteristicsRepository);
        this.restCharacteristicsMockMvc = MockMvcBuilders.standaloneSetup(characteristicsResource)
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
    public static Characteristics createEntity(EntityManager em) {
        Characteristics characteristics = new Characteristics()
            .characteristicsName(DEFAULT_CHARACTERISTICS_NAME)
            .viewCatalog(DEFAULT_VIEW_CATALOG)
            .viewSpecialClient(DEFAULT_VIEW_SPECIAL_CLIENT);
        return characteristics;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Characteristics createUpdatedEntity(EntityManager em) {
        Characteristics characteristics = new Characteristics()
            .characteristicsName(UPDATED_CHARACTERISTICS_NAME)
            .viewCatalog(UPDATED_VIEW_CATALOG)
            .viewSpecialClient(UPDATED_VIEW_SPECIAL_CLIENT);
        return characteristics;
    }

    @BeforeEach
    public void initTest() {
        characteristics = createEntity(em);
    }

    @Test
    @Transactional
    public void createCharacteristics() throws Exception {
        int databaseSizeBeforeCreate = characteristicsRepository.findAll().size();

        // Create the Characteristics
        restCharacteristicsMockMvc.perform(post("/api/characteristics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(characteristics)))
            .andExpect(status().isCreated());

        // Validate the Characteristics in the database
        List<Characteristics> characteristicsList = characteristicsRepository.findAll();
        assertThat(characteristicsList).hasSize(databaseSizeBeforeCreate + 1);
        Characteristics testCharacteristics = characteristicsList.get(characteristicsList.size() - 1);
        assertThat(testCharacteristics.getCharacteristicsName()).isEqualTo(DEFAULT_CHARACTERISTICS_NAME);
        assertThat(testCharacteristics.isViewCatalog()).isEqualTo(DEFAULT_VIEW_CATALOG);
        assertThat(testCharacteristics.isViewSpecialClient()).isEqualTo(DEFAULT_VIEW_SPECIAL_CLIENT);
    }

    @Test
    @Transactional
    public void createCharacteristicsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = characteristicsRepository.findAll().size();

        // Create the Characteristics with an existing ID
        characteristics.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCharacteristicsMockMvc.perform(post("/api/characteristics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(characteristics)))
            .andExpect(status().isBadRequest());

        // Validate the Characteristics in the database
        List<Characteristics> characteristicsList = characteristicsRepository.findAll();
        assertThat(characteristicsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCharacteristicsNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = characteristicsRepository.findAll().size();
        // set the field null
        characteristics.setCharacteristicsName(null);

        // Create the Characteristics, which fails.

        restCharacteristicsMockMvc.perform(post("/api/characteristics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(characteristics)))
            .andExpect(status().isBadRequest());

        List<Characteristics> characteristicsList = characteristicsRepository.findAll();
        assertThat(characteristicsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCharacteristics() throws Exception {
        // Initialize the database
        characteristicsRepository.saveAndFlush(characteristics);

        // Get all the characteristicsList
        restCharacteristicsMockMvc.perform(get("/api/characteristics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(characteristics.getId().intValue())))
            .andExpect(jsonPath("$.[*].characteristicsName").value(hasItem(DEFAULT_CHARACTERISTICS_NAME.toString())))
            .andExpect(jsonPath("$.[*].viewCatalog").value(hasItem(DEFAULT_VIEW_CATALOG.booleanValue())))
            .andExpect(jsonPath("$.[*].viewSpecialClient").value(hasItem(DEFAULT_VIEW_SPECIAL_CLIENT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCharacteristics() throws Exception {
        // Initialize the database
        characteristicsRepository.saveAndFlush(characteristics);

        // Get the characteristics
        restCharacteristicsMockMvc.perform(get("/api/characteristics/{id}", characteristics.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(characteristics.getId().intValue()))
            .andExpect(jsonPath("$.characteristicsName").value(DEFAULT_CHARACTERISTICS_NAME.toString()))
            .andExpect(jsonPath("$.viewCatalog").value(DEFAULT_VIEW_CATALOG.booleanValue()))
            .andExpect(jsonPath("$.viewSpecialClient").value(DEFAULT_VIEW_SPECIAL_CLIENT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCharacteristics() throws Exception {
        // Get the characteristics
        restCharacteristicsMockMvc.perform(get("/api/characteristics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCharacteristics() throws Exception {
        // Initialize the database
        characteristicsRepository.saveAndFlush(characteristics);

        int databaseSizeBeforeUpdate = characteristicsRepository.findAll().size();

        // Update the characteristics
        Characteristics updatedCharacteristics = characteristicsRepository.findById(characteristics.getId()).get();
        // Disconnect from session so that the updates on updatedCharacteristics are not directly saved in db
        em.detach(updatedCharacteristics);
        updatedCharacteristics
            .characteristicsName(UPDATED_CHARACTERISTICS_NAME)
            .viewCatalog(UPDATED_VIEW_CATALOG)
            .viewSpecialClient(UPDATED_VIEW_SPECIAL_CLIENT);

        restCharacteristicsMockMvc.perform(put("/api/characteristics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCharacteristics)))
            .andExpect(status().isOk());

        // Validate the Characteristics in the database
        List<Characteristics> characteristicsList = characteristicsRepository.findAll();
        assertThat(characteristicsList).hasSize(databaseSizeBeforeUpdate);
        Characteristics testCharacteristics = characteristicsList.get(characteristicsList.size() - 1);
        assertThat(testCharacteristics.getCharacteristicsName()).isEqualTo(UPDATED_CHARACTERISTICS_NAME);
        assertThat(testCharacteristics.isViewCatalog()).isEqualTo(UPDATED_VIEW_CATALOG);
        assertThat(testCharacteristics.isViewSpecialClient()).isEqualTo(UPDATED_VIEW_SPECIAL_CLIENT);
    }

    @Test
    @Transactional
    public void updateNonExistingCharacteristics() throws Exception {
        int databaseSizeBeforeUpdate = characteristicsRepository.findAll().size();

        // Create the Characteristics

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCharacteristicsMockMvc.perform(put("/api/characteristics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(characteristics)))
            .andExpect(status().isBadRequest());

        // Validate the Characteristics in the database
        List<Characteristics> characteristicsList = characteristicsRepository.findAll();
        assertThat(characteristicsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCharacteristics() throws Exception {
        // Initialize the database
        characteristicsRepository.saveAndFlush(characteristics);

        int databaseSizeBeforeDelete = characteristicsRepository.findAll().size();

        // Delete the characteristics
        restCharacteristicsMockMvc.perform(delete("/api/characteristics/{id}", characteristics.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Characteristics> characteristicsList = characteristicsRepository.findAll();
        assertThat(characteristicsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Characteristics.class);
        Characteristics characteristics1 = new Characteristics();
        characteristics1.setId(1L);
        Characteristics characteristics2 = new Characteristics();
        characteristics2.setId(characteristics1.getId());
        assertThat(characteristics1).isEqualTo(characteristics2);
        characteristics2.setId(2L);
        assertThat(characteristics1).isNotEqualTo(characteristics2);
        characteristics1.setId(null);
        assertThat(characteristics1).isNotEqualTo(characteristics2);
    }
}
