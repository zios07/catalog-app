package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Parts;
import com.catalogapp.repository.AttachmentRepository;
import com.catalogapp.repository.PartsRepository;
import com.catalogapp.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.catalogapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PartsResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class PartsResourceIT {

    private static final String DEFAULT_CODE_PARTS = "AAAAAAAAAA";
    private static final String UPDATED_CODE_PARTS = "BBBBBBBBBB";

    private static final String DEFAULT_PARTS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARTS_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PART_IMAGE_LINK_PIC_360 = "AAAAAAAAAA";
    private static final String UPDATED_PART_IMAGE_LINK_PIC_360 = "BBBBBBBBBB";

    private static final String DEFAULT_PART_VIDEO = "AAAAAAAAAA";
    private static final String UPDATED_PART_VIDEO = "BBBBBBBBBB";

    private static final String DEFAULT_PART_TECHNICAL_MANUAL = "AAAAAAAAAA";
    private static final String UPDATED_PART_TECHNICAL_MANUAL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_UNDER_DEVELOPMENT = false;
    private static final Boolean UPDATED_UNDER_DEVELOPMENT = true;

    private static final Boolean DEFAULT_INACTIVE = false;
    private static final Boolean UPDATED_INACTIVE = true;

    private static final String DEFAULT_EAN = "AAAAAAAAAAAAA";
    private static final String UPDATED_EAN = "BBBBBBBBBBBBB";

    private static final String DEFAULT_SKU = "AAAAAAAAAA";
    private static final String UPDATED_SKU = "BBBBBBBBBB";

    @Autowired
    private PartsRepository partsRepository;

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Mock
    private PartsRepository partsRepositoryMock;


    @Mock
    private AttachmentRepository attachmentRepositoryMock;

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

    private MockMvc restPartsMockMvc;

    private Parts parts;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartsResource partsResource = new PartsResource(partsRepository, attachmentRepository);
        this.restPartsMockMvc = MockMvcBuilders.standaloneSetup(partsResource)
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
    public static Parts createEntity(EntityManager em) {
        Parts parts = new Parts()
            .codeParts(DEFAULT_CODE_PARTS)
            .partsName(DEFAULT_PARTS_NAME)
            .partImageLinkPic360(DEFAULT_PART_IMAGE_LINK_PIC_360)
            .partVideo(DEFAULT_PART_VIDEO)
            .partTechnicalManual(DEFAULT_PART_TECHNICAL_MANUAL)
            .underDevelopment(DEFAULT_UNDER_DEVELOPMENT)
            .inactive(DEFAULT_INACTIVE)
            .ean(DEFAULT_EAN)
            .sku(DEFAULT_SKU);
        return parts;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parts createUpdatedEntity(EntityManager em) {
        Parts parts = new Parts()
            .codeParts(UPDATED_CODE_PARTS)
            .partsName(UPDATED_PARTS_NAME)
            .partImageLinkPic360(UPDATED_PART_IMAGE_LINK_PIC_360)
            .partVideo(UPDATED_PART_VIDEO)
            .partTechnicalManual(UPDATED_PART_TECHNICAL_MANUAL)
            .underDevelopment(UPDATED_UNDER_DEVELOPMENT)
            .inactive(UPDATED_INACTIVE)
            .ean(UPDATED_EAN)
            .sku(UPDATED_SKU);
        return parts;
    }

    @BeforeEach
    public void initTest() {
        parts = createEntity(em);
    }

    @Test
    @Transactional
    public void createParts() throws Exception {
        int databaseSizeBeforeCreate = partsRepository.findAll().size();

        // Create the Parts
        restPartsMockMvc.perform(post("/api/parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parts)))
            .andExpect(status().isCreated());

        // Validate the Parts in the database
        List<Parts> partsList = partsRepository.findAll();
        assertThat(partsList).hasSize(databaseSizeBeforeCreate + 1);
        Parts testParts = partsList.get(partsList.size() - 1);
        assertThat(testParts.getCodeParts()).isEqualTo(DEFAULT_CODE_PARTS);
        assertThat(testParts.getPartsName()).isEqualTo(DEFAULT_PARTS_NAME);
        assertThat(testParts.getPartImageLinkPic360()).isEqualTo(DEFAULT_PART_IMAGE_LINK_PIC_360);
        assertThat(testParts.getPartVideo()).isEqualTo(DEFAULT_PART_VIDEO);
        assertThat(testParts.getPartTechnicalManual()).isEqualTo(DEFAULT_PART_TECHNICAL_MANUAL);
        assertThat(testParts.isUnderDevelopment()).isEqualTo(DEFAULT_UNDER_DEVELOPMENT);
        assertThat(testParts.isInactive()).isEqualTo(DEFAULT_INACTIVE);
        assertThat(testParts.getEan()).isEqualTo(DEFAULT_EAN);
        assertThat(testParts.getSku()).isEqualTo(DEFAULT_SKU);
    }

    @Test
    @Transactional
    public void createPartsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partsRepository.findAll().size();

        // Create the Parts with an existing ID
        parts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartsMockMvc.perform(post("/api/parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parts)))
            .andExpect(status().isBadRequest());

        // Validate the Parts in the database
        List<Parts> partsList = partsRepository.findAll();
        assertThat(partsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCodePartsIsRequired() throws Exception {
        int databaseSizeBeforeTest = partsRepository.findAll().size();
        // set the field null
        parts.setCodeParts(null);

        // Create the Parts, which fails.

        restPartsMockMvc.perform(post("/api/parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parts)))
            .andExpect(status().isBadRequest());

        List<Parts> partsList = partsRepository.findAll();
        assertThat(partsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPartsNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = partsRepository.findAll().size();
        // set the field null
        parts.setPartsName(null);

        // Create the Parts, which fails.

        restPartsMockMvc.perform(post("/api/parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parts)))
            .andExpect(status().isBadRequest());

        List<Parts> partsList = partsRepository.findAll();
        assertThat(partsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllParts() throws Exception {
        // Initialize the database
        partsRepository.saveAndFlush(parts);

        // Get all the partsList
        restPartsMockMvc.perform(get("/api/parts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parts.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeParts").value(hasItem(DEFAULT_CODE_PARTS.toString())))
            .andExpect(jsonPath("$.[*].partsName").value(hasItem(DEFAULT_PARTS_NAME.toString())))
            .andExpect(jsonPath("$.[*].partImageLinkPic360").value(hasItem(DEFAULT_PART_IMAGE_LINK_PIC_360.toString())))
            .andExpect(jsonPath("$.[*].partVideo").value(hasItem(DEFAULT_PART_VIDEO.toString())))
            .andExpect(jsonPath("$.[*].partTechnicalManual").value(hasItem(DEFAULT_PART_TECHNICAL_MANUAL.toString())))
            .andExpect(jsonPath("$.[*].underDevelopment").value(hasItem(DEFAULT_UNDER_DEVELOPMENT.booleanValue())))
            .andExpect(jsonPath("$.[*].inactive").value(hasItem(DEFAULT_INACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].ean").value(hasItem(DEFAULT_EAN.toString())))
            .andExpect(jsonPath("$.[*].sku").value(hasItem(DEFAULT_SKU.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPartsWithEagerRelationshipsIsEnabled() throws Exception {
        PartsResource partsResource = new PartsResource(partsRepositoryMock, attachmentRepositoryMock);
        when(partsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPartsMockMvc = MockMvcBuilders.standaloneSetup(partsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPartsMockMvc.perform(get("/api/parts?eagerload=true"))
        .andExpect(status().isOk());

        verify(partsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPartsWithEagerRelationshipsIsNotEnabled() throws Exception {
        PartsResource partsResource = new PartsResource(partsRepositoryMock, attachmentRepositoryMock);
            when(partsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPartsMockMvc = MockMvcBuilders.standaloneSetup(partsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPartsMockMvc.perform(get("/api/parts?eagerload=true"))
        .andExpect(status().isOk());

            verify(partsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getParts() throws Exception {
        // Initialize the database
        partsRepository.saveAndFlush(parts);

        // Get the parts
        restPartsMockMvc.perform(get("/api/parts/{id}", parts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parts.getId().intValue()))
            .andExpect(jsonPath("$.codeParts").value(DEFAULT_CODE_PARTS.toString()))
            .andExpect(jsonPath("$.partsName").value(DEFAULT_PARTS_NAME.toString()))
            .andExpect(jsonPath("$.partImageLinkPic360").value(DEFAULT_PART_IMAGE_LINK_PIC_360.toString()))
            .andExpect(jsonPath("$.partVideo").value(DEFAULT_PART_VIDEO.toString()))
            .andExpect(jsonPath("$.partTechnicalManual").value(DEFAULT_PART_TECHNICAL_MANUAL.toString()))
            .andExpect(jsonPath("$.underDevelopment").value(DEFAULT_UNDER_DEVELOPMENT.booleanValue()))
            .andExpect(jsonPath("$.inactive").value(DEFAULT_INACTIVE.booleanValue()))
            .andExpect(jsonPath("$.ean").value(DEFAULT_EAN.toString()))
            .andExpect(jsonPath("$.sku").value(DEFAULT_SKU.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParts() throws Exception {
        // Get the parts
        restPartsMockMvc.perform(get("/api/parts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParts() throws Exception {
        // Initialize the database
        partsRepository.saveAndFlush(parts);

        int databaseSizeBeforeUpdate = partsRepository.findAll().size();

        // Update the parts
        Parts updatedParts = partsRepository.findById(parts.getId()).get();
        // Disconnect from session so that the updates on updatedParts are not directly saved in db
        em.detach(updatedParts);
        updatedParts
            .codeParts(UPDATED_CODE_PARTS)
            .partsName(UPDATED_PARTS_NAME)
            .partImageLinkPic360(UPDATED_PART_IMAGE_LINK_PIC_360)
            .partVideo(UPDATED_PART_VIDEO)
            .partTechnicalManual(UPDATED_PART_TECHNICAL_MANUAL)
            .underDevelopment(UPDATED_UNDER_DEVELOPMENT)
            .inactive(UPDATED_INACTIVE)
            .ean(UPDATED_EAN)
            .sku(UPDATED_SKU);

        restPartsMockMvc.perform(put("/api/parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParts)))
            .andExpect(status().isOk());

        // Validate the Parts in the database
        List<Parts> partsList = partsRepository.findAll();
        assertThat(partsList).hasSize(databaseSizeBeforeUpdate);
        Parts testParts = partsList.get(partsList.size() - 1);
        assertThat(testParts.getCodeParts()).isEqualTo(UPDATED_CODE_PARTS);
        assertThat(testParts.getPartsName()).isEqualTo(UPDATED_PARTS_NAME);
        assertThat(testParts.getPartImageLinkPic360()).isEqualTo(UPDATED_PART_IMAGE_LINK_PIC_360);
        assertThat(testParts.getPartVideo()).isEqualTo(UPDATED_PART_VIDEO);
        assertThat(testParts.getPartTechnicalManual()).isEqualTo(UPDATED_PART_TECHNICAL_MANUAL);
        assertThat(testParts.isUnderDevelopment()).isEqualTo(UPDATED_UNDER_DEVELOPMENT);
        assertThat(testParts.isInactive()).isEqualTo(UPDATED_INACTIVE);
        assertThat(testParts.getEan()).isEqualTo(UPDATED_EAN);
        assertThat(testParts.getSku()).isEqualTo(UPDATED_SKU);
    }

    @Test
    @Transactional
    public void updateNonExistingParts() throws Exception {
        int databaseSizeBeforeUpdate = partsRepository.findAll().size();

        // Create the Parts

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartsMockMvc.perform(put("/api/parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parts)))
            .andExpect(status().isBadRequest());

        // Validate the Parts in the database
        List<Parts> partsList = partsRepository.findAll();
        assertThat(partsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParts() throws Exception {
        // Initialize the database
        partsRepository.saveAndFlush(parts);

        int databaseSizeBeforeDelete = partsRepository.findAll().size();

        // Delete the parts
        restPartsMockMvc.perform(delete("/api/parts/{id}", parts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Parts> partsList = partsRepository.findAll();
        assertThat(partsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parts.class);
        Parts parts1 = new Parts();
        parts1.setId(1L);
        Parts parts2 = new Parts();
        parts2.setId(parts1.getId());
        assertThat(parts1).isEqualTo(parts2);
        parts2.setId(2L);
        assertThat(parts1).isNotEqualTo(parts2);
        parts1.setId(null);
        assertThat(parts1).isNotEqualTo(parts2);
    }
}
