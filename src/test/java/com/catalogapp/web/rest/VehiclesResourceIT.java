package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Vehicles;
import com.catalogapp.repository.VehiclesRepository;
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
 * Integration tests for the {@Link VehiclesResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class VehiclesResourceIT {

    private static final String DEFAULT_VEHICLE = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private VehiclesRepository vehiclesRepository;

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

    private MockMvc restVehiclesMockMvc;

    private Vehicles vehicles;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VehiclesResource vehiclesResource = new VehiclesResource(vehiclesRepository);
        this.restVehiclesMockMvc = MockMvcBuilders.standaloneSetup(vehiclesResource)
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
    public static Vehicles createEntity(EntityManager em) {
        Vehicles vehicles = new Vehicles()
            .vehicle(DEFAULT_VEHICLE)
            .code(DEFAULT_CODE);
        return vehicles;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vehicles createUpdatedEntity(EntityManager em) {
        Vehicles vehicles = new Vehicles()
            .vehicle(UPDATED_VEHICLE)
            .code(UPDATED_CODE);
        return vehicles;
    }

    @BeforeEach
    public void initTest() {
        vehicles = createEntity(em);
    }

    @Test
    @Transactional
    public void createVehicles() throws Exception {
        int databaseSizeBeforeCreate = vehiclesRepository.findAll().size();

        // Create the Vehicles
        restVehiclesMockMvc.perform(post("/api/vehicles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicles)))
            .andExpect(status().isCreated());

        // Validate the Vehicles in the database
        List<Vehicles> vehiclesList = vehiclesRepository.findAll();
        assertThat(vehiclesList).hasSize(databaseSizeBeforeCreate + 1);
        Vehicles testVehicles = vehiclesList.get(vehiclesList.size() - 1);
        assertThat(testVehicles.getVehicle()).isEqualTo(DEFAULT_VEHICLE);
        assertThat(testVehicles.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createVehiclesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehiclesRepository.findAll().size();

        // Create the Vehicles with an existing ID
        vehicles.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehiclesMockMvc.perform(post("/api/vehicles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicles)))
            .andExpect(status().isBadRequest());

        // Validate the Vehicles in the database
        List<Vehicles> vehiclesList = vehiclesRepository.findAll();
        assertThat(vehiclesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkVehicleIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehiclesRepository.findAll().size();
        // set the field null
        vehicles.setVehicle(null);

        // Create the Vehicles, which fails.

        restVehiclesMockMvc.perform(post("/api/vehicles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicles)))
            .andExpect(status().isBadRequest());

        List<Vehicles> vehiclesList = vehiclesRepository.findAll();
        assertThat(vehiclesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVehicles() throws Exception {
        // Initialize the database
        vehiclesRepository.saveAndFlush(vehicles);

        // Get all the vehiclesList
        restVehiclesMockMvc.perform(get("/api/vehicles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicles.getId().intValue())))
            .andExpect(jsonPath("$.[*].vehicle").value(hasItem(DEFAULT_VEHICLE.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }
    
    @Test
    @Transactional
    public void getVehicles() throws Exception {
        // Initialize the database
        vehiclesRepository.saveAndFlush(vehicles);

        // Get the vehicles
        restVehiclesMockMvc.perform(get("/api/vehicles/{id}", vehicles.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vehicles.getId().intValue()))
            .andExpect(jsonPath("$.vehicle").value(DEFAULT_VEHICLE.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVehicles() throws Exception {
        // Get the vehicles
        restVehiclesMockMvc.perform(get("/api/vehicles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVehicles() throws Exception {
        // Initialize the database
        vehiclesRepository.saveAndFlush(vehicles);

        int databaseSizeBeforeUpdate = vehiclesRepository.findAll().size();

        // Update the vehicles
        Vehicles updatedVehicles = vehiclesRepository.findById(vehicles.getId()).get();
        // Disconnect from session so that the updates on updatedVehicles are not directly saved in db
        em.detach(updatedVehicles);
        updatedVehicles
            .vehicle(UPDATED_VEHICLE)
            .code(UPDATED_CODE);

        restVehiclesMockMvc.perform(put("/api/vehicles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicles)))
            .andExpect(status().isOk());

        // Validate the Vehicles in the database
        List<Vehicles> vehiclesList = vehiclesRepository.findAll();
        assertThat(vehiclesList).hasSize(databaseSizeBeforeUpdate);
        Vehicles testVehicles = vehiclesList.get(vehiclesList.size() - 1);
        assertThat(testVehicles.getVehicle()).isEqualTo(UPDATED_VEHICLE);
        assertThat(testVehicles.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingVehicles() throws Exception {
        int databaseSizeBeforeUpdate = vehiclesRepository.findAll().size();

        // Create the Vehicles

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVehiclesMockMvc.perform(put("/api/vehicles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicles)))
            .andExpect(status().isBadRequest());

        // Validate the Vehicles in the database
        List<Vehicles> vehiclesList = vehiclesRepository.findAll();
        assertThat(vehiclesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVehicles() throws Exception {
        // Initialize the database
        vehiclesRepository.saveAndFlush(vehicles);

        int databaseSizeBeforeDelete = vehiclesRepository.findAll().size();

        // Delete the vehicles
        restVehiclesMockMvc.perform(delete("/api/vehicles/{id}", vehicles.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Vehicles> vehiclesList = vehiclesRepository.findAll();
        assertThat(vehiclesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vehicles.class);
        Vehicles vehicles1 = new Vehicles();
        vehicles1.setId(1L);
        Vehicles vehicles2 = new Vehicles();
        vehicles2.setId(vehicles1.getId());
        assertThat(vehicles1).isEqualTo(vehicles2);
        vehicles2.setId(2L);
        assertThat(vehicles1).isNotEqualTo(vehicles2);
        vehicles1.setId(null);
        assertThat(vehicles1).isNotEqualTo(vehicles2);
    }
}
