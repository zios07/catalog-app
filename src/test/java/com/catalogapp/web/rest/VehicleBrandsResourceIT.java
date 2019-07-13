package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.VehicleBrands;
import com.catalogapp.repository.VehicleBrandsRepository;
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
 * Integration tests for the {@Link VehicleBrandsResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class VehicleBrandsResourceIT {

    private static final String DEFAULT_VEHICLE_BRAND_NAME = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE_BRAND_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VEHICLE_BRAND_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE_BRAND_IMAGE = "BBBBBBBBBB";

    @Autowired
    private VehicleBrandsRepository vehicleBrandsRepository;

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

    private MockMvc restVehicleBrandsMockMvc;

    private VehicleBrands vehicleBrands;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VehicleBrandsResource vehicleBrandsResource = new VehicleBrandsResource(vehicleBrandsRepository);
        this.restVehicleBrandsMockMvc = MockMvcBuilders.standaloneSetup(vehicleBrandsResource)
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
    public static VehicleBrands createEntity(EntityManager em) {
        VehicleBrands vehicleBrands = new VehicleBrands()
            .vehicleBrandName(DEFAULT_VEHICLE_BRAND_NAME)
            .vehicleBrandImage(DEFAULT_VEHICLE_BRAND_IMAGE);
        return vehicleBrands;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleBrands createUpdatedEntity(EntityManager em) {
        VehicleBrands vehicleBrands = new VehicleBrands()
            .vehicleBrandName(UPDATED_VEHICLE_BRAND_NAME)
            .vehicleBrandImage(UPDATED_VEHICLE_BRAND_IMAGE);
        return vehicleBrands;
    }

    @BeforeEach
    public void initTest() {
        vehicleBrands = createEntity(em);
    }

    @Test
    @Transactional
    public void createVehicleBrands() throws Exception {
        int databaseSizeBeforeCreate = vehicleBrandsRepository.findAll().size();

        // Create the VehicleBrands
        restVehicleBrandsMockMvc.perform(post("/api/vehicle-brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleBrands)))
            .andExpect(status().isCreated());

        // Validate the VehicleBrands in the database
        List<VehicleBrands> vehicleBrandsList = vehicleBrandsRepository.findAll();
        assertThat(vehicleBrandsList).hasSize(databaseSizeBeforeCreate + 1);
        VehicleBrands testVehicleBrands = vehicleBrandsList.get(vehicleBrandsList.size() - 1);
        assertThat(testVehicleBrands.getVehicleBrandName()).isEqualTo(DEFAULT_VEHICLE_BRAND_NAME);
        assertThat(testVehicleBrands.getVehicleBrandImage()).isEqualTo(DEFAULT_VEHICLE_BRAND_IMAGE);
    }

    @Test
    @Transactional
    public void createVehicleBrandsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehicleBrandsRepository.findAll().size();

        // Create the VehicleBrands with an existing ID
        vehicleBrands.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehicleBrandsMockMvc.perform(post("/api/vehicle-brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleBrands)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleBrands in the database
        List<VehicleBrands> vehicleBrandsList = vehicleBrandsRepository.findAll();
        assertThat(vehicleBrandsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkVehicleBrandNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleBrandsRepository.findAll().size();
        // set the field null
        vehicleBrands.setVehicleBrandName(null);

        // Create the VehicleBrands, which fails.

        restVehicleBrandsMockMvc.perform(post("/api/vehicle-brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleBrands)))
            .andExpect(status().isBadRequest());

        List<VehicleBrands> vehicleBrandsList = vehicleBrandsRepository.findAll();
        assertThat(vehicleBrandsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVehicleBrands() throws Exception {
        // Initialize the database
        vehicleBrandsRepository.saveAndFlush(vehicleBrands);

        // Get all the vehicleBrandsList
        restVehicleBrandsMockMvc.perform(get("/api/vehicle-brands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicleBrands.getId().intValue())))
            .andExpect(jsonPath("$.[*].vehicleBrandName").value(hasItem(DEFAULT_VEHICLE_BRAND_NAME.toString())))
            .andExpect(jsonPath("$.[*].vehicleBrandImage").value(hasItem(DEFAULT_VEHICLE_BRAND_IMAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getVehicleBrands() throws Exception {
        // Initialize the database
        vehicleBrandsRepository.saveAndFlush(vehicleBrands);

        // Get the vehicleBrands
        restVehicleBrandsMockMvc.perform(get("/api/vehicle-brands/{id}", vehicleBrands.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vehicleBrands.getId().intValue()))
            .andExpect(jsonPath("$.vehicleBrandName").value(DEFAULT_VEHICLE_BRAND_NAME.toString()))
            .andExpect(jsonPath("$.vehicleBrandImage").value(DEFAULT_VEHICLE_BRAND_IMAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVehicleBrands() throws Exception {
        // Get the vehicleBrands
        restVehicleBrandsMockMvc.perform(get("/api/vehicle-brands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVehicleBrands() throws Exception {
        // Initialize the database
        vehicleBrandsRepository.saveAndFlush(vehicleBrands);

        int databaseSizeBeforeUpdate = vehicleBrandsRepository.findAll().size();

        // Update the vehicleBrands
        VehicleBrands updatedVehicleBrands = vehicleBrandsRepository.findById(vehicleBrands.getId()).get();
        // Disconnect from session so that the updates on updatedVehicleBrands are not directly saved in db
        em.detach(updatedVehicleBrands);
        updatedVehicleBrands
            .vehicleBrandName(UPDATED_VEHICLE_BRAND_NAME)
            .vehicleBrandImage(UPDATED_VEHICLE_BRAND_IMAGE);

        restVehicleBrandsMockMvc.perform(put("/api/vehicle-brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicleBrands)))
            .andExpect(status().isOk());

        // Validate the VehicleBrands in the database
        List<VehicleBrands> vehicleBrandsList = vehicleBrandsRepository.findAll();
        assertThat(vehicleBrandsList).hasSize(databaseSizeBeforeUpdate);
        VehicleBrands testVehicleBrands = vehicleBrandsList.get(vehicleBrandsList.size() - 1);
        assertThat(testVehicleBrands.getVehicleBrandName()).isEqualTo(UPDATED_VEHICLE_BRAND_NAME);
        assertThat(testVehicleBrands.getVehicleBrandImage()).isEqualTo(UPDATED_VEHICLE_BRAND_IMAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingVehicleBrands() throws Exception {
        int databaseSizeBeforeUpdate = vehicleBrandsRepository.findAll().size();

        // Create the VehicleBrands

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVehicleBrandsMockMvc.perform(put("/api/vehicle-brands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleBrands)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleBrands in the database
        List<VehicleBrands> vehicleBrandsList = vehicleBrandsRepository.findAll();
        assertThat(vehicleBrandsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVehicleBrands() throws Exception {
        // Initialize the database
        vehicleBrandsRepository.saveAndFlush(vehicleBrands);

        int databaseSizeBeforeDelete = vehicleBrandsRepository.findAll().size();

        // Delete the vehicleBrands
        restVehicleBrandsMockMvc.perform(delete("/api/vehicle-brands/{id}", vehicleBrands.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VehicleBrands> vehicleBrandsList = vehicleBrandsRepository.findAll();
        assertThat(vehicleBrandsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VehicleBrands.class);
        VehicleBrands vehicleBrands1 = new VehicleBrands();
        vehicleBrands1.setId(1L);
        VehicleBrands vehicleBrands2 = new VehicleBrands();
        vehicleBrands2.setId(vehicleBrands1.getId());
        assertThat(vehicleBrands1).isEqualTo(vehicleBrands2);
        vehicleBrands2.setId(2L);
        assertThat(vehicleBrands1).isNotEqualTo(vehicleBrands2);
        vehicleBrands1.setId(null);
        assertThat(vehicleBrands1).isNotEqualTo(vehicleBrands2);
    }
}
