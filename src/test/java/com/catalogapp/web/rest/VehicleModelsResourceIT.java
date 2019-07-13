package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.VehicleModels;
import com.catalogapp.repository.VehicleModelsRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.catalogapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link VehicleModelsResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class VehicleModelsResourceIT {

    private static final String DEFAULT_VEHICLE_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE_MODEL = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_PRODUCTION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_PRODUCTION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FINISH_PRODUCTION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FINISH_PRODUCTION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_START_CHASSI = "AAAAAAAAAAAAAAAAA";
    private static final String UPDATED_START_CHASSI = "BBBBBBBBBBBBBBBBB";

    private static final String DEFAULT_FINESH_CHASSI = "AAAAAAAAAAAAAAAAA";
    private static final String UPDATED_FINESH_CHASSI = "BBBBBBBBBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Integer DEFAULT_FLEET_QUANTITY = 1;
    private static final Integer UPDATED_FLEET_QUANTITY = 2;

    @Autowired
    private VehicleModelsRepository vehicleModelsRepository;

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

    private MockMvc restVehicleModelsMockMvc;

    private VehicleModels vehicleModels;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VehicleModelsResource vehicleModelsResource = new VehicleModelsResource(vehicleModelsRepository);
        this.restVehicleModelsMockMvc = MockMvcBuilders.standaloneSetup(vehicleModelsResource)
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
    public static VehicleModels createEntity(EntityManager em) {
        VehicleModels vehicleModels = new VehicleModels()
            .vehicleModel(DEFAULT_VEHICLE_MODEL)
            .startProduction(DEFAULT_START_PRODUCTION)
            .finishProduction(DEFAULT_FINISH_PRODUCTION)
            .startChassi(DEFAULT_START_CHASSI)
            .fineshChassi(DEFAULT_FINESH_CHASSI)
            .code(DEFAULT_CODE)
            .fleetQuantity(DEFAULT_FLEET_QUANTITY);
        return vehicleModels;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleModels createUpdatedEntity(EntityManager em) {
        VehicleModels vehicleModels = new VehicleModels()
            .vehicleModel(UPDATED_VEHICLE_MODEL)
            .startProduction(UPDATED_START_PRODUCTION)
            .finishProduction(UPDATED_FINISH_PRODUCTION)
            .startChassi(UPDATED_START_CHASSI)
            .fineshChassi(UPDATED_FINESH_CHASSI)
            .code(UPDATED_CODE)
            .fleetQuantity(UPDATED_FLEET_QUANTITY);
        return vehicleModels;
    }

    @BeforeEach
    public void initTest() {
        vehicleModels = createEntity(em);
    }

    @Test
    @Transactional
    public void createVehicleModels() throws Exception {
        int databaseSizeBeforeCreate = vehicleModelsRepository.findAll().size();

        // Create the VehicleModels
        restVehicleModelsMockMvc.perform(post("/api/vehicle-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleModels)))
            .andExpect(status().isCreated());

        // Validate the VehicleModels in the database
        List<VehicleModels> vehicleModelsList = vehicleModelsRepository.findAll();
        assertThat(vehicleModelsList).hasSize(databaseSizeBeforeCreate + 1);
        VehicleModels testVehicleModels = vehicleModelsList.get(vehicleModelsList.size() - 1);
        assertThat(testVehicleModels.getVehicleModel()).isEqualTo(DEFAULT_VEHICLE_MODEL);
        assertThat(testVehicleModels.getStartProduction()).isEqualTo(DEFAULT_START_PRODUCTION);
        assertThat(testVehicleModels.getFinishProduction()).isEqualTo(DEFAULT_FINISH_PRODUCTION);
        assertThat(testVehicleModels.getStartChassi()).isEqualTo(DEFAULT_START_CHASSI);
        assertThat(testVehicleModels.getFineshChassi()).isEqualTo(DEFAULT_FINESH_CHASSI);
        assertThat(testVehicleModels.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testVehicleModels.getFleetQuantity()).isEqualTo(DEFAULT_FLEET_QUANTITY);
    }

    @Test
    @Transactional
    public void createVehicleModelsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehicleModelsRepository.findAll().size();

        // Create the VehicleModels with an existing ID
        vehicleModels.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehicleModelsMockMvc.perform(post("/api/vehicle-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleModels)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleModels in the database
        List<VehicleModels> vehicleModelsList = vehicleModelsRepository.findAll();
        assertThat(vehicleModelsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkVehicleModelIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleModelsRepository.findAll().size();
        // set the field null
        vehicleModels.setVehicleModel(null);

        // Create the VehicleModels, which fails.

        restVehicleModelsMockMvc.perform(post("/api/vehicle-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleModels)))
            .andExpect(status().isBadRequest());

        List<VehicleModels> vehicleModelsList = vehicleModelsRepository.findAll();
        assertThat(vehicleModelsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVehicleModels() throws Exception {
        // Initialize the database
        vehicleModelsRepository.saveAndFlush(vehicleModels);

        // Get all the vehicleModelsList
        restVehicleModelsMockMvc.perform(get("/api/vehicle-models?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicleModels.getId().intValue())))
            .andExpect(jsonPath("$.[*].vehicleModel").value(hasItem(DEFAULT_VEHICLE_MODEL.toString())))
            .andExpect(jsonPath("$.[*].startProduction").value(hasItem(DEFAULT_START_PRODUCTION.toString())))
            .andExpect(jsonPath("$.[*].finishProduction").value(hasItem(DEFAULT_FINISH_PRODUCTION.toString())))
            .andExpect(jsonPath("$.[*].startChassi").value(hasItem(DEFAULT_START_CHASSI.toString())))
            .andExpect(jsonPath("$.[*].fineshChassi").value(hasItem(DEFAULT_FINESH_CHASSI.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].fleetQuantity").value(hasItem(DEFAULT_FLEET_QUANTITY)));
    }
    
    @Test
    @Transactional
    public void getVehicleModels() throws Exception {
        // Initialize the database
        vehicleModelsRepository.saveAndFlush(vehicleModels);

        // Get the vehicleModels
        restVehicleModelsMockMvc.perform(get("/api/vehicle-models/{id}", vehicleModels.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vehicleModels.getId().intValue()))
            .andExpect(jsonPath("$.vehicleModel").value(DEFAULT_VEHICLE_MODEL.toString()))
            .andExpect(jsonPath("$.startProduction").value(DEFAULT_START_PRODUCTION.toString()))
            .andExpect(jsonPath("$.finishProduction").value(DEFAULT_FINISH_PRODUCTION.toString()))
            .andExpect(jsonPath("$.startChassi").value(DEFAULT_START_CHASSI.toString()))
            .andExpect(jsonPath("$.fineshChassi").value(DEFAULT_FINESH_CHASSI.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.fleetQuantity").value(DEFAULT_FLEET_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingVehicleModels() throws Exception {
        // Get the vehicleModels
        restVehicleModelsMockMvc.perform(get("/api/vehicle-models/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVehicleModels() throws Exception {
        // Initialize the database
        vehicleModelsRepository.saveAndFlush(vehicleModels);

        int databaseSizeBeforeUpdate = vehicleModelsRepository.findAll().size();

        // Update the vehicleModels
        VehicleModels updatedVehicleModels = vehicleModelsRepository.findById(vehicleModels.getId()).get();
        // Disconnect from session so that the updates on updatedVehicleModels are not directly saved in db
        em.detach(updatedVehicleModels);
        updatedVehicleModels
            .vehicleModel(UPDATED_VEHICLE_MODEL)
            .startProduction(UPDATED_START_PRODUCTION)
            .finishProduction(UPDATED_FINISH_PRODUCTION)
            .startChassi(UPDATED_START_CHASSI)
            .fineshChassi(UPDATED_FINESH_CHASSI)
            .code(UPDATED_CODE)
            .fleetQuantity(UPDATED_FLEET_QUANTITY);

        restVehicleModelsMockMvc.perform(put("/api/vehicle-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicleModels)))
            .andExpect(status().isOk());

        // Validate the VehicleModels in the database
        List<VehicleModels> vehicleModelsList = vehicleModelsRepository.findAll();
        assertThat(vehicleModelsList).hasSize(databaseSizeBeforeUpdate);
        VehicleModels testVehicleModels = vehicleModelsList.get(vehicleModelsList.size() - 1);
        assertThat(testVehicleModels.getVehicleModel()).isEqualTo(UPDATED_VEHICLE_MODEL);
        assertThat(testVehicleModels.getStartProduction()).isEqualTo(UPDATED_START_PRODUCTION);
        assertThat(testVehicleModels.getFinishProduction()).isEqualTo(UPDATED_FINISH_PRODUCTION);
        assertThat(testVehicleModels.getStartChassi()).isEqualTo(UPDATED_START_CHASSI);
        assertThat(testVehicleModels.getFineshChassi()).isEqualTo(UPDATED_FINESH_CHASSI);
        assertThat(testVehicleModels.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testVehicleModels.getFleetQuantity()).isEqualTo(UPDATED_FLEET_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingVehicleModels() throws Exception {
        int databaseSizeBeforeUpdate = vehicleModelsRepository.findAll().size();

        // Create the VehicleModels

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVehicleModelsMockMvc.perform(put("/api/vehicle-models")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleModels)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleModels in the database
        List<VehicleModels> vehicleModelsList = vehicleModelsRepository.findAll();
        assertThat(vehicleModelsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVehicleModels() throws Exception {
        // Initialize the database
        vehicleModelsRepository.saveAndFlush(vehicleModels);

        int databaseSizeBeforeDelete = vehicleModelsRepository.findAll().size();

        // Delete the vehicleModels
        restVehicleModelsMockMvc.perform(delete("/api/vehicle-models/{id}", vehicleModels.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VehicleModels> vehicleModelsList = vehicleModelsRepository.findAll();
        assertThat(vehicleModelsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VehicleModels.class);
        VehicleModels vehicleModels1 = new VehicleModels();
        vehicleModels1.setId(1L);
        VehicleModels vehicleModels2 = new VehicleModels();
        vehicleModels2.setId(vehicleModels1.getId());
        assertThat(vehicleModels1).isEqualTo(vehicleModels2);
        vehicleModels2.setId(2L);
        assertThat(vehicleModels1).isNotEqualTo(vehicleModels2);
        vehicleModels1.setId(null);
        assertThat(vehicleModels1).isNotEqualTo(vehicleModels2);
    }
}
