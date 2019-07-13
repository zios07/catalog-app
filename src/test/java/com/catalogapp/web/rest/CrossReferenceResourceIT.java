package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.CrossReference;
import com.catalogapp.repository.CrossReferenceRepository;
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
 * Integration tests for the {@Link CrossReferenceResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class CrossReferenceResourceIT {

    private static final String DEFAULT_CODE_IN_PROVIDER = "AAAAAAAAAA";
    private static final String UPDATED_CODE_IN_PROVIDER = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VIEW_CATALOG = false;
    private static final Boolean UPDATED_VIEW_CATALOG = true;

    @Autowired
    private CrossReferenceRepository crossReferenceRepository;

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

    private MockMvc restCrossReferenceMockMvc;

    private CrossReference crossReference;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CrossReferenceResource crossReferenceResource = new CrossReferenceResource(crossReferenceRepository);
        this.restCrossReferenceMockMvc = MockMvcBuilders.standaloneSetup(crossReferenceResource)
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
    public static CrossReference createEntity(EntityManager em) {
        CrossReference crossReference = new CrossReference()
            .codeInProvider(DEFAULT_CODE_IN_PROVIDER)
            .viewCatalog(DEFAULT_VIEW_CATALOG);
        return crossReference;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CrossReference createUpdatedEntity(EntityManager em) {
        CrossReference crossReference = new CrossReference()
            .codeInProvider(UPDATED_CODE_IN_PROVIDER)
            .viewCatalog(UPDATED_VIEW_CATALOG);
        return crossReference;
    }

    @BeforeEach
    public void initTest() {
        crossReference = createEntity(em);
    }

    @Test
    @Transactional
    public void createCrossReference() throws Exception {
        int databaseSizeBeforeCreate = crossReferenceRepository.findAll().size();

        // Create the CrossReference
        restCrossReferenceMockMvc.perform(post("/api/cross-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crossReference)))
            .andExpect(status().isCreated());

        // Validate the CrossReference in the database
        List<CrossReference> crossReferenceList = crossReferenceRepository.findAll();
        assertThat(crossReferenceList).hasSize(databaseSizeBeforeCreate + 1);
        CrossReference testCrossReference = crossReferenceList.get(crossReferenceList.size() - 1);
        assertThat(testCrossReference.getCodeInProvider()).isEqualTo(DEFAULT_CODE_IN_PROVIDER);
        assertThat(testCrossReference.isViewCatalog()).isEqualTo(DEFAULT_VIEW_CATALOG);
    }

    @Test
    @Transactional
    public void createCrossReferenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = crossReferenceRepository.findAll().size();

        // Create the CrossReference with an existing ID
        crossReference.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCrossReferenceMockMvc.perform(post("/api/cross-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crossReference)))
            .andExpect(status().isBadRequest());

        // Validate the CrossReference in the database
        List<CrossReference> crossReferenceList = crossReferenceRepository.findAll();
        assertThat(crossReferenceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodeInProviderIsRequired() throws Exception {
        int databaseSizeBeforeTest = crossReferenceRepository.findAll().size();
        // set the field null
        crossReference.setCodeInProvider(null);

        // Create the CrossReference, which fails.

        restCrossReferenceMockMvc.perform(post("/api/cross-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crossReference)))
            .andExpect(status().isBadRequest());

        List<CrossReference> crossReferenceList = crossReferenceRepository.findAll();
        assertThat(crossReferenceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCrossReferences() throws Exception {
        // Initialize the database
        crossReferenceRepository.saveAndFlush(crossReference);

        // Get all the crossReferenceList
        restCrossReferenceMockMvc.perform(get("/api/cross-references?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(crossReference.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeInProvider").value(hasItem(DEFAULT_CODE_IN_PROVIDER.toString())))
            .andExpect(jsonPath("$.[*].viewCatalog").value(hasItem(DEFAULT_VIEW_CATALOG.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCrossReference() throws Exception {
        // Initialize the database
        crossReferenceRepository.saveAndFlush(crossReference);

        // Get the crossReference
        restCrossReferenceMockMvc.perform(get("/api/cross-references/{id}", crossReference.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(crossReference.getId().intValue()))
            .andExpect(jsonPath("$.codeInProvider").value(DEFAULT_CODE_IN_PROVIDER.toString()))
            .andExpect(jsonPath("$.viewCatalog").value(DEFAULT_VIEW_CATALOG.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCrossReference() throws Exception {
        // Get the crossReference
        restCrossReferenceMockMvc.perform(get("/api/cross-references/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCrossReference() throws Exception {
        // Initialize the database
        crossReferenceRepository.saveAndFlush(crossReference);

        int databaseSizeBeforeUpdate = crossReferenceRepository.findAll().size();

        // Update the crossReference
        CrossReference updatedCrossReference = crossReferenceRepository.findById(crossReference.getId()).get();
        // Disconnect from session so that the updates on updatedCrossReference are not directly saved in db
        em.detach(updatedCrossReference);
        updatedCrossReference
            .codeInProvider(UPDATED_CODE_IN_PROVIDER)
            .viewCatalog(UPDATED_VIEW_CATALOG);

        restCrossReferenceMockMvc.perform(put("/api/cross-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCrossReference)))
            .andExpect(status().isOk());

        // Validate the CrossReference in the database
        List<CrossReference> crossReferenceList = crossReferenceRepository.findAll();
        assertThat(crossReferenceList).hasSize(databaseSizeBeforeUpdate);
        CrossReference testCrossReference = crossReferenceList.get(crossReferenceList.size() - 1);
        assertThat(testCrossReference.getCodeInProvider()).isEqualTo(UPDATED_CODE_IN_PROVIDER);
        assertThat(testCrossReference.isViewCatalog()).isEqualTo(UPDATED_VIEW_CATALOG);
    }

    @Test
    @Transactional
    public void updateNonExistingCrossReference() throws Exception {
        int databaseSizeBeforeUpdate = crossReferenceRepository.findAll().size();

        // Create the CrossReference

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCrossReferenceMockMvc.perform(put("/api/cross-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crossReference)))
            .andExpect(status().isBadRequest());

        // Validate the CrossReference in the database
        List<CrossReference> crossReferenceList = crossReferenceRepository.findAll();
        assertThat(crossReferenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCrossReference() throws Exception {
        // Initialize the database
        crossReferenceRepository.saveAndFlush(crossReference);

        int databaseSizeBeforeDelete = crossReferenceRepository.findAll().size();

        // Delete the crossReference
        restCrossReferenceMockMvc.perform(delete("/api/cross-references/{id}", crossReference.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CrossReference> crossReferenceList = crossReferenceRepository.findAll();
        assertThat(crossReferenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CrossReference.class);
        CrossReference crossReference1 = new CrossReference();
        crossReference1.setId(1L);
        CrossReference crossReference2 = new CrossReference();
        crossReference2.setId(crossReference1.getId());
        assertThat(crossReference1).isEqualTo(crossReference2);
        crossReference2.setId(2L);
        assertThat(crossReference1).isNotEqualTo(crossReference2);
        crossReference1.setId(null);
        assertThat(crossReference1).isNotEqualTo(crossReference2);
    }
}
