package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Motors;
import com.catalogapp.repository.MotorsRepository;
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
 * Integration tests for the {@Link MotorsResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class MotorsResourceIT {

    private static final String DEFAULT_MOTOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MOTOR_NAME = "BBBBBBBBBB";

    @Autowired
    private MotorsRepository motorsRepository;

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

    private MockMvc restMotorsMockMvc;

    private Motors motors;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MotorsResource motorsResource = new MotorsResource(motorsRepository);
        this.restMotorsMockMvc = MockMvcBuilders.standaloneSetup(motorsResource)
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
    public static Motors createEntity(EntityManager em) {
        Motors motors = new Motors()
            .motorName(DEFAULT_MOTOR_NAME);
        return motors;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Motors createUpdatedEntity(EntityManager em) {
        Motors motors = new Motors()
            .motorName(UPDATED_MOTOR_NAME);
        return motors;
    }

    @BeforeEach
    public void initTest() {
        motors = createEntity(em);
    }

    @Test
    @Transactional
    public void createMotors() throws Exception {
        int databaseSizeBeforeCreate = motorsRepository.findAll().size();

        // Create the Motors
        restMotorsMockMvc.perform(post("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(motors)))
            .andExpect(status().isCreated());

        // Validate the Motors in the database
        List<Motors> motorsList = motorsRepository.findAll();
        assertThat(motorsList).hasSize(databaseSizeBeforeCreate + 1);
        Motors testMotors = motorsList.get(motorsList.size() - 1);
        assertThat(testMotors.getMotorName()).isEqualTo(DEFAULT_MOTOR_NAME);
    }

    @Test
    @Transactional
    public void createMotorsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = motorsRepository.findAll().size();

        // Create the Motors with an existing ID
        motors.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMotorsMockMvc.perform(post("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(motors)))
            .andExpect(status().isBadRequest());

        // Validate the Motors in the database
        List<Motors> motorsList = motorsRepository.findAll();
        assertThat(motorsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMotorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = motorsRepository.findAll().size();
        // set the field null
        motors.setMotorName(null);

        // Create the Motors, which fails.

        restMotorsMockMvc.perform(post("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(motors)))
            .andExpect(status().isBadRequest());

        List<Motors> motorsList = motorsRepository.findAll();
        assertThat(motorsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMotors() throws Exception {
        // Initialize the database
        motorsRepository.saveAndFlush(motors);

        // Get all the motorsList
        restMotorsMockMvc.perform(get("/api/motors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(motors.getId().intValue())))
            .andExpect(jsonPath("$.[*].motorName").value(hasItem(DEFAULT_MOTOR_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getMotors() throws Exception {
        // Initialize the database
        motorsRepository.saveAndFlush(motors);

        // Get the motors
        restMotorsMockMvc.perform(get("/api/motors/{id}", motors.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(motors.getId().intValue()))
            .andExpect(jsonPath("$.motorName").value(DEFAULT_MOTOR_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMotors() throws Exception {
        // Get the motors
        restMotorsMockMvc.perform(get("/api/motors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMotors() throws Exception {
        // Initialize the database
        motorsRepository.saveAndFlush(motors);

        int databaseSizeBeforeUpdate = motorsRepository.findAll().size();

        // Update the motors
        Motors updatedMotors = motorsRepository.findById(motors.getId()).get();
        // Disconnect from session so that the updates on updatedMotors are not directly saved in db
        em.detach(updatedMotors);
        updatedMotors
            .motorName(UPDATED_MOTOR_NAME);

        restMotorsMockMvc.perform(put("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMotors)))
            .andExpect(status().isOk());

        // Validate the Motors in the database
        List<Motors> motorsList = motorsRepository.findAll();
        assertThat(motorsList).hasSize(databaseSizeBeforeUpdate);
        Motors testMotors = motorsList.get(motorsList.size() - 1);
        assertThat(testMotors.getMotorName()).isEqualTo(UPDATED_MOTOR_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingMotors() throws Exception {
        int databaseSizeBeforeUpdate = motorsRepository.findAll().size();

        // Create the Motors

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMotorsMockMvc.perform(put("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(motors)))
            .andExpect(status().isBadRequest());

        // Validate the Motors in the database
        List<Motors> motorsList = motorsRepository.findAll();
        assertThat(motorsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMotors() throws Exception {
        // Initialize the database
        motorsRepository.saveAndFlush(motors);

        int databaseSizeBeforeDelete = motorsRepository.findAll().size();

        // Delete the motors
        restMotorsMockMvc.perform(delete("/api/motors/{id}", motors.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Motors> motorsList = motorsRepository.findAll();
        assertThat(motorsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Motors.class);
        Motors motors1 = new Motors();
        motors1.setId(1L);
        Motors motors2 = new Motors();
        motors2.setId(motors1.getId());
        assertThat(motors1).isEqualTo(motors2);
        motors2.setId(2L);
        assertThat(motors1).isNotEqualTo(motors2);
        motors1.setId(null);
        assertThat(motors1).isNotEqualTo(motors2);
    }
}
