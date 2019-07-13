package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Steering;
import com.catalogapp.repository.SteeringRepository;
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
 * Integration tests for the {@Link SteeringResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class SteeringResourceIT {

    private static final String DEFAULT_STEERING_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STEERING_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STEERING_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_STEERING_IMAGE = "BBBBBBBBBB";

    @Autowired
    private SteeringRepository steeringRepository;

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

    private MockMvc restSteeringMockMvc;

    private Steering steering;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SteeringResource steeringResource = new SteeringResource(steeringRepository);
        this.restSteeringMockMvc = MockMvcBuilders.standaloneSetup(steeringResource)
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
    public static Steering createEntity(EntityManager em) {
        Steering steering = new Steering()
            .steeringName(DEFAULT_STEERING_NAME)
            .steeringImage(DEFAULT_STEERING_IMAGE);
        return steering;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Steering createUpdatedEntity(EntityManager em) {
        Steering steering = new Steering()
            .steeringName(UPDATED_STEERING_NAME)
            .steeringImage(UPDATED_STEERING_IMAGE);
        return steering;
    }

    @BeforeEach
    public void initTest() {
        steering = createEntity(em);
    }

    @Test
    @Transactional
    public void createSteering() throws Exception {
        int databaseSizeBeforeCreate = steeringRepository.findAll().size();

        // Create the Steering
        restSteeringMockMvc.perform(post("/api/steerings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(steering)))
            .andExpect(status().isCreated());

        // Validate the Steering in the database
        List<Steering> steeringList = steeringRepository.findAll();
        assertThat(steeringList).hasSize(databaseSizeBeforeCreate + 1);
        Steering testSteering = steeringList.get(steeringList.size() - 1);
        assertThat(testSteering.getSteeringName()).isEqualTo(DEFAULT_STEERING_NAME);
        assertThat(testSteering.getSteeringImage()).isEqualTo(DEFAULT_STEERING_IMAGE);
    }

    @Test
    @Transactional
    public void createSteeringWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = steeringRepository.findAll().size();

        // Create the Steering with an existing ID
        steering.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSteeringMockMvc.perform(post("/api/steerings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(steering)))
            .andExpect(status().isBadRequest());

        // Validate the Steering in the database
        List<Steering> steeringList = steeringRepository.findAll();
        assertThat(steeringList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSteeringNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = steeringRepository.findAll().size();
        // set the field null
        steering.setSteeringName(null);

        // Create the Steering, which fails.

        restSteeringMockMvc.perform(post("/api/steerings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(steering)))
            .andExpect(status().isBadRequest());

        List<Steering> steeringList = steeringRepository.findAll();
        assertThat(steeringList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSteerings() throws Exception {
        // Initialize the database
        steeringRepository.saveAndFlush(steering);

        // Get all the steeringList
        restSteeringMockMvc.perform(get("/api/steerings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(steering.getId().intValue())))
            .andExpect(jsonPath("$.[*].steeringName").value(hasItem(DEFAULT_STEERING_NAME.toString())))
            .andExpect(jsonPath("$.[*].steeringImage").value(hasItem(DEFAULT_STEERING_IMAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getSteering() throws Exception {
        // Initialize the database
        steeringRepository.saveAndFlush(steering);

        // Get the steering
        restSteeringMockMvc.perform(get("/api/steerings/{id}", steering.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(steering.getId().intValue()))
            .andExpect(jsonPath("$.steeringName").value(DEFAULT_STEERING_NAME.toString()))
            .andExpect(jsonPath("$.steeringImage").value(DEFAULT_STEERING_IMAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSteering() throws Exception {
        // Get the steering
        restSteeringMockMvc.perform(get("/api/steerings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSteering() throws Exception {
        // Initialize the database
        steeringRepository.saveAndFlush(steering);

        int databaseSizeBeforeUpdate = steeringRepository.findAll().size();

        // Update the steering
        Steering updatedSteering = steeringRepository.findById(steering.getId()).get();
        // Disconnect from session so that the updates on updatedSteering are not directly saved in db
        em.detach(updatedSteering);
        updatedSteering
            .steeringName(UPDATED_STEERING_NAME)
            .steeringImage(UPDATED_STEERING_IMAGE);

        restSteeringMockMvc.perform(put("/api/steerings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSteering)))
            .andExpect(status().isOk());

        // Validate the Steering in the database
        List<Steering> steeringList = steeringRepository.findAll();
        assertThat(steeringList).hasSize(databaseSizeBeforeUpdate);
        Steering testSteering = steeringList.get(steeringList.size() - 1);
        assertThat(testSteering.getSteeringName()).isEqualTo(UPDATED_STEERING_NAME);
        assertThat(testSteering.getSteeringImage()).isEqualTo(UPDATED_STEERING_IMAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingSteering() throws Exception {
        int databaseSizeBeforeUpdate = steeringRepository.findAll().size();

        // Create the Steering

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSteeringMockMvc.perform(put("/api/steerings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(steering)))
            .andExpect(status().isBadRequest());

        // Validate the Steering in the database
        List<Steering> steeringList = steeringRepository.findAll();
        assertThat(steeringList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSteering() throws Exception {
        // Initialize the database
        steeringRepository.saveAndFlush(steering);

        int databaseSizeBeforeDelete = steeringRepository.findAll().size();

        // Delete the steering
        restSteeringMockMvc.perform(delete("/api/steerings/{id}", steering.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Steering> steeringList = steeringRepository.findAll();
        assertThat(steeringList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Steering.class);
        Steering steering1 = new Steering();
        steering1.setId(1L);
        Steering steering2 = new Steering();
        steering2.setId(steering1.getId());
        assertThat(steering1).isEqualTo(steering2);
        steering2.setId(2L);
        assertThat(steering1).isNotEqualTo(steering2);
        steering1.setId(null);
        assertThat(steering1).isNotEqualTo(steering2);
    }
}
