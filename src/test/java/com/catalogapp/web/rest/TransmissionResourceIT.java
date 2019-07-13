package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Transmission;
import com.catalogapp.repository.TransmissionRepository;
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
 * Integration tests for the {@Link TransmissionResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class TransmissionResourceIT {

    private static final String DEFAULT_TRANSMISSION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TRANSMISSION_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TRANSMISSAO_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_TRANSMISSAO_IMAGE = "BBBBBBBBBB";

    @Autowired
    private TransmissionRepository transmissionRepository;

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

    private MockMvc restTransmissionMockMvc;

    private Transmission transmission;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransmissionResource transmissionResource = new TransmissionResource(transmissionRepository);
        this.restTransmissionMockMvc = MockMvcBuilders.standaloneSetup(transmissionResource)
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
    public static Transmission createEntity(EntityManager em) {
        Transmission transmission = new Transmission()
            .transmissionName(DEFAULT_TRANSMISSION_NAME)
            .transmissaoImage(DEFAULT_TRANSMISSAO_IMAGE);
        return transmission;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transmission createUpdatedEntity(EntityManager em) {
        Transmission transmission = new Transmission()
            .transmissionName(UPDATED_TRANSMISSION_NAME)
            .transmissaoImage(UPDATED_TRANSMISSAO_IMAGE);
        return transmission;
    }

    @BeforeEach
    public void initTest() {
        transmission = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransmission() throws Exception {
        int databaseSizeBeforeCreate = transmissionRepository.findAll().size();

        // Create the Transmission
        restTransmissionMockMvc.perform(post("/api/transmissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transmission)))
            .andExpect(status().isCreated());

        // Validate the Transmission in the database
        List<Transmission> transmissionList = transmissionRepository.findAll();
        assertThat(transmissionList).hasSize(databaseSizeBeforeCreate + 1);
        Transmission testTransmission = transmissionList.get(transmissionList.size() - 1);
        assertThat(testTransmission.getTransmissionName()).isEqualTo(DEFAULT_TRANSMISSION_NAME);
        assertThat(testTransmission.getTransmissaoImage()).isEqualTo(DEFAULT_TRANSMISSAO_IMAGE);
    }

    @Test
    @Transactional
    public void createTransmissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transmissionRepository.findAll().size();

        // Create the Transmission with an existing ID
        transmission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransmissionMockMvc.perform(post("/api/transmissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transmission)))
            .andExpect(status().isBadRequest());

        // Validate the Transmission in the database
        List<Transmission> transmissionList = transmissionRepository.findAll();
        assertThat(transmissionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTransmissionNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = transmissionRepository.findAll().size();
        // set the field null
        transmission.setTransmissionName(null);

        // Create the Transmission, which fails.

        restTransmissionMockMvc.perform(post("/api/transmissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transmission)))
            .andExpect(status().isBadRequest());

        List<Transmission> transmissionList = transmissionRepository.findAll();
        assertThat(transmissionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransmissions() throws Exception {
        // Initialize the database
        transmissionRepository.saveAndFlush(transmission);

        // Get all the transmissionList
        restTransmissionMockMvc.perform(get("/api/transmissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transmission.getId().intValue())))
            .andExpect(jsonPath("$.[*].transmissionName").value(hasItem(DEFAULT_TRANSMISSION_NAME.toString())))
            .andExpect(jsonPath("$.[*].transmissaoImage").value(hasItem(DEFAULT_TRANSMISSAO_IMAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getTransmission() throws Exception {
        // Initialize the database
        transmissionRepository.saveAndFlush(transmission);

        // Get the transmission
        restTransmissionMockMvc.perform(get("/api/transmissions/{id}", transmission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transmission.getId().intValue()))
            .andExpect(jsonPath("$.transmissionName").value(DEFAULT_TRANSMISSION_NAME.toString()))
            .andExpect(jsonPath("$.transmissaoImage").value(DEFAULT_TRANSMISSAO_IMAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransmission() throws Exception {
        // Get the transmission
        restTransmissionMockMvc.perform(get("/api/transmissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransmission() throws Exception {
        // Initialize the database
        transmissionRepository.saveAndFlush(transmission);

        int databaseSizeBeforeUpdate = transmissionRepository.findAll().size();

        // Update the transmission
        Transmission updatedTransmission = transmissionRepository.findById(transmission.getId()).get();
        // Disconnect from session so that the updates on updatedTransmission are not directly saved in db
        em.detach(updatedTransmission);
        updatedTransmission
            .transmissionName(UPDATED_TRANSMISSION_NAME)
            .transmissaoImage(UPDATED_TRANSMISSAO_IMAGE);

        restTransmissionMockMvc.perform(put("/api/transmissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransmission)))
            .andExpect(status().isOk());

        // Validate the Transmission in the database
        List<Transmission> transmissionList = transmissionRepository.findAll();
        assertThat(transmissionList).hasSize(databaseSizeBeforeUpdate);
        Transmission testTransmission = transmissionList.get(transmissionList.size() - 1);
        assertThat(testTransmission.getTransmissionName()).isEqualTo(UPDATED_TRANSMISSION_NAME);
        assertThat(testTransmission.getTransmissaoImage()).isEqualTo(UPDATED_TRANSMISSAO_IMAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransmission() throws Exception {
        int databaseSizeBeforeUpdate = transmissionRepository.findAll().size();

        // Create the Transmission

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransmissionMockMvc.perform(put("/api/transmissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transmission)))
            .andExpect(status().isBadRequest());

        // Validate the Transmission in the database
        List<Transmission> transmissionList = transmissionRepository.findAll();
        assertThat(transmissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransmission() throws Exception {
        // Initialize the database
        transmissionRepository.saveAndFlush(transmission);

        int databaseSizeBeforeDelete = transmissionRepository.findAll().size();

        // Delete the transmission
        restTransmissionMockMvc.perform(delete("/api/transmissions/{id}", transmission.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Transmission> transmissionList = transmissionRepository.findAll();
        assertThat(transmissionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transmission.class);
        Transmission transmission1 = new Transmission();
        transmission1.setId(1L);
        Transmission transmission2 = new Transmission();
        transmission2.setId(transmission1.getId());
        assertThat(transmission1).isEqualTo(transmission2);
        transmission2.setId(2L);
        assertThat(transmission1).isNotEqualTo(transmission2);
        transmission1.setId(null);
        assertThat(transmission1).isNotEqualTo(transmission2);
    }
}
