package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Families;
import com.catalogapp.repository.FamiliesRepository;
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
 * Integration tests for the {@Link FamiliesResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class FamiliesResourceIT {

    private static final String DEFAULT_FAMILY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FAMILY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FAMILY_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_FAMILY_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_FAMILY_ICON = "AAAAAAAAAA";
    private static final String UPDATED_FAMILY_ICON = "BBBBBBBBBB";

    @Autowired
    private FamiliesRepository familiesRepository;

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

    private MockMvc restFamiliesMockMvc;

    private Families families;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FamiliesResource familiesResource = new FamiliesResource(familiesRepository);
        this.restFamiliesMockMvc = MockMvcBuilders.standaloneSetup(familiesResource)
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
    public static Families createEntity(EntityManager em) {
        Families families = new Families()
            .familyName(DEFAULT_FAMILY_NAME)
            .familyImage(DEFAULT_FAMILY_IMAGE)
            .familyIcon(DEFAULT_FAMILY_ICON);
        return families;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Families createUpdatedEntity(EntityManager em) {
        Families families = new Families()
            .familyName(UPDATED_FAMILY_NAME)
            .familyImage(UPDATED_FAMILY_IMAGE)
            .familyIcon(UPDATED_FAMILY_ICON);
        return families;
    }

    @BeforeEach
    public void initTest() {
        families = createEntity(em);
    }

    @Test
    @Transactional
    public void createFamilies() throws Exception {
        int databaseSizeBeforeCreate = familiesRepository.findAll().size();

        // Create the Families
        restFamiliesMockMvc.perform(post("/api/families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(families)))
            .andExpect(status().isCreated());

        // Validate the Families in the database
        List<Families> familiesList = familiesRepository.findAll();
        assertThat(familiesList).hasSize(databaseSizeBeforeCreate + 1);
        Families testFamilies = familiesList.get(familiesList.size() - 1);
        assertThat(testFamilies.getFamilyName()).isEqualTo(DEFAULT_FAMILY_NAME);
        assertThat(testFamilies.getFamilyImage()).isEqualTo(DEFAULT_FAMILY_IMAGE);
        assertThat(testFamilies.getFamilyIcon()).isEqualTo(DEFAULT_FAMILY_ICON);
    }

    @Test
    @Transactional
    public void createFamiliesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = familiesRepository.findAll().size();

        // Create the Families with an existing ID
        families.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFamiliesMockMvc.perform(post("/api/families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(families)))
            .andExpect(status().isBadRequest());

        // Validate the Families in the database
        List<Families> familiesList = familiesRepository.findAll();
        assertThat(familiesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFamilyNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = familiesRepository.findAll().size();
        // set the field null
        families.setFamilyName(null);

        // Create the Families, which fails.

        restFamiliesMockMvc.perform(post("/api/families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(families)))
            .andExpect(status().isBadRequest());

        List<Families> familiesList = familiesRepository.findAll();
        assertThat(familiesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFamilies() throws Exception {
        // Initialize the database
        familiesRepository.saveAndFlush(families);

        // Get all the familiesList
        restFamiliesMockMvc.perform(get("/api/families?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(families.getId().intValue())))
            .andExpect(jsonPath("$.[*].familyName").value(hasItem(DEFAULT_FAMILY_NAME.toString())))
            .andExpect(jsonPath("$.[*].familyImage").value(hasItem(DEFAULT_FAMILY_IMAGE.toString())))
            .andExpect(jsonPath("$.[*].familyIcon").value(hasItem(DEFAULT_FAMILY_ICON.toString())));
    }
    
    @Test
    @Transactional
    public void getFamilies() throws Exception {
        // Initialize the database
        familiesRepository.saveAndFlush(families);

        // Get the families
        restFamiliesMockMvc.perform(get("/api/families/{id}", families.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(families.getId().intValue()))
            .andExpect(jsonPath("$.familyName").value(DEFAULT_FAMILY_NAME.toString()))
            .andExpect(jsonPath("$.familyImage").value(DEFAULT_FAMILY_IMAGE.toString()))
            .andExpect(jsonPath("$.familyIcon").value(DEFAULT_FAMILY_ICON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFamilies() throws Exception {
        // Get the families
        restFamiliesMockMvc.perform(get("/api/families/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFamilies() throws Exception {
        // Initialize the database
        familiesRepository.saveAndFlush(families);

        int databaseSizeBeforeUpdate = familiesRepository.findAll().size();

        // Update the families
        Families updatedFamilies = familiesRepository.findById(families.getId()).get();
        // Disconnect from session so that the updates on updatedFamilies are not directly saved in db
        em.detach(updatedFamilies);
        updatedFamilies
            .familyName(UPDATED_FAMILY_NAME)
            .familyImage(UPDATED_FAMILY_IMAGE)
            .familyIcon(UPDATED_FAMILY_ICON);

        restFamiliesMockMvc.perform(put("/api/families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFamilies)))
            .andExpect(status().isOk());

        // Validate the Families in the database
        List<Families> familiesList = familiesRepository.findAll();
        assertThat(familiesList).hasSize(databaseSizeBeforeUpdate);
        Families testFamilies = familiesList.get(familiesList.size() - 1);
        assertThat(testFamilies.getFamilyName()).isEqualTo(UPDATED_FAMILY_NAME);
        assertThat(testFamilies.getFamilyImage()).isEqualTo(UPDATED_FAMILY_IMAGE);
        assertThat(testFamilies.getFamilyIcon()).isEqualTo(UPDATED_FAMILY_ICON);
    }

    @Test
    @Transactional
    public void updateNonExistingFamilies() throws Exception {
        int databaseSizeBeforeUpdate = familiesRepository.findAll().size();

        // Create the Families

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFamiliesMockMvc.perform(put("/api/families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(families)))
            .andExpect(status().isBadRequest());

        // Validate the Families in the database
        List<Families> familiesList = familiesRepository.findAll();
        assertThat(familiesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFamilies() throws Exception {
        // Initialize the database
        familiesRepository.saveAndFlush(families);

        int databaseSizeBeforeDelete = familiesRepository.findAll().size();

        // Delete the families
        restFamiliesMockMvc.perform(delete("/api/families/{id}", families.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Families> familiesList = familiesRepository.findAll();
        assertThat(familiesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Families.class);
        Families families1 = new Families();
        families1.setId(1L);
        Families families2 = new Families();
        families2.setId(families1.getId());
        assertThat(families1).isEqualTo(families2);
        families2.setId(2L);
        assertThat(families1).isNotEqualTo(families2);
        families1.setId(null);
        assertThat(families1).isNotEqualTo(families2);
    }
}
