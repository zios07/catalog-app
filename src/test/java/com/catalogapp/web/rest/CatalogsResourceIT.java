package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Catalogs;
import com.catalogapp.repository.CatalogsRepository;
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
 * Integration tests for the {@Link CatalogsResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class CatalogsResourceIT {

    private static final String DEFAULT_CATALOG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CATALOG_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CATALOGO_IMAGEM_COVER_1 = "AAAAAAAAAA";
    private static final String UPDATED_CATALOGO_IMAGEM_COVER_1 = "BBBBBBBBBB";

    private static final String DEFAULT_CATALOGO_IMAGEM_COVER_2 = "AAAAAAAAAA";
    private static final String UPDATED_CATALOGO_IMAGEM_COVER_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CATALOGO_IMAGEM_COVER_3 = "AAAAAAAAAA";
    private static final String UPDATED_CATALOGO_IMAGEM_COVER_3 = "BBBBBBBBBB";

    private static final String DEFAULT_CATALOGO_IMAGEM_COVER_4 = "AAAAAAAAAA";
    private static final String UPDATED_CATALOGO_IMAGEM_COVER_4 = "BBBBBBBBBB";

    @Autowired
    private CatalogsRepository catalogsRepository;

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

    private MockMvc restCatalogsMockMvc;

    private Catalogs catalogs;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CatalogsResource catalogsResource = new CatalogsResource(catalogsRepository);
        this.restCatalogsMockMvc = MockMvcBuilders.standaloneSetup(catalogsResource)
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
    public static Catalogs createEntity(EntityManager em) {
        Catalogs catalogs = new Catalogs()
            .catalogName(DEFAULT_CATALOG_NAME)
            .catalogoImagemCover1(DEFAULT_CATALOGO_IMAGEM_COVER_1)
            .catalogoImagemCover2(DEFAULT_CATALOGO_IMAGEM_COVER_2)
            .catalogoImagemCover3(DEFAULT_CATALOGO_IMAGEM_COVER_3)
            .catalogoImagemCover4(DEFAULT_CATALOGO_IMAGEM_COVER_4);
        return catalogs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Catalogs createUpdatedEntity(EntityManager em) {
        Catalogs catalogs = new Catalogs()
            .catalogName(UPDATED_CATALOG_NAME)
            .catalogoImagemCover1(UPDATED_CATALOGO_IMAGEM_COVER_1)
            .catalogoImagemCover2(UPDATED_CATALOGO_IMAGEM_COVER_2)
            .catalogoImagemCover3(UPDATED_CATALOGO_IMAGEM_COVER_3)
            .catalogoImagemCover4(UPDATED_CATALOGO_IMAGEM_COVER_4);
        return catalogs;
    }

    @BeforeEach
    public void initTest() {
        catalogs = createEntity(em);
    }

    @Test
    @Transactional
    public void createCatalogs() throws Exception {
        int databaseSizeBeforeCreate = catalogsRepository.findAll().size();

        // Create the Catalogs
        restCatalogsMockMvc.perform(post("/api/catalogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(catalogs)))
            .andExpect(status().isCreated());

        // Validate the Catalogs in the database
        List<Catalogs> catalogsList = catalogsRepository.findAll();
        assertThat(catalogsList).hasSize(databaseSizeBeforeCreate + 1);
        Catalogs testCatalogs = catalogsList.get(catalogsList.size() - 1);
        assertThat(testCatalogs.getCatalogName()).isEqualTo(DEFAULT_CATALOG_NAME);
        assertThat(testCatalogs.getCatalogoImagemCover1()).isEqualTo(DEFAULT_CATALOGO_IMAGEM_COVER_1);
        assertThat(testCatalogs.getCatalogoImagemCover2()).isEqualTo(DEFAULT_CATALOGO_IMAGEM_COVER_2);
        assertThat(testCatalogs.getCatalogoImagemCover3()).isEqualTo(DEFAULT_CATALOGO_IMAGEM_COVER_3);
        assertThat(testCatalogs.getCatalogoImagemCover4()).isEqualTo(DEFAULT_CATALOGO_IMAGEM_COVER_4);
    }

    @Test
    @Transactional
    public void createCatalogsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = catalogsRepository.findAll().size();

        // Create the Catalogs with an existing ID
        catalogs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCatalogsMockMvc.perform(post("/api/catalogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(catalogs)))
            .andExpect(status().isBadRequest());

        // Validate the Catalogs in the database
        List<Catalogs> catalogsList = catalogsRepository.findAll();
        assertThat(catalogsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCatalogNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = catalogsRepository.findAll().size();
        // set the field null
        catalogs.setCatalogName(null);

        // Create the Catalogs, which fails.

        restCatalogsMockMvc.perform(post("/api/catalogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(catalogs)))
            .andExpect(status().isBadRequest());

        List<Catalogs> catalogsList = catalogsRepository.findAll();
        assertThat(catalogsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCatalogs() throws Exception {
        // Initialize the database
        catalogsRepository.saveAndFlush(catalogs);

        // Get all the catalogsList
        restCatalogsMockMvc.perform(get("/api/catalogs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(catalogs.getId().intValue())))
            .andExpect(jsonPath("$.[*].catalogName").value(hasItem(DEFAULT_CATALOG_NAME.toString())))
            .andExpect(jsonPath("$.[*].catalogoImagemCover1").value(hasItem(DEFAULT_CATALOGO_IMAGEM_COVER_1.toString())))
            .andExpect(jsonPath("$.[*].catalogoImagemCover2").value(hasItem(DEFAULT_CATALOGO_IMAGEM_COVER_2.toString())))
            .andExpect(jsonPath("$.[*].catalogoImagemCover3").value(hasItem(DEFAULT_CATALOGO_IMAGEM_COVER_3.toString())))
            .andExpect(jsonPath("$.[*].catalogoImagemCover4").value(hasItem(DEFAULT_CATALOGO_IMAGEM_COVER_4.toString())));
    }
    
    @Test
    @Transactional
    public void getCatalogs() throws Exception {
        // Initialize the database
        catalogsRepository.saveAndFlush(catalogs);

        // Get the catalogs
        restCatalogsMockMvc.perform(get("/api/catalogs/{id}", catalogs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(catalogs.getId().intValue()))
            .andExpect(jsonPath("$.catalogName").value(DEFAULT_CATALOG_NAME.toString()))
            .andExpect(jsonPath("$.catalogoImagemCover1").value(DEFAULT_CATALOGO_IMAGEM_COVER_1.toString()))
            .andExpect(jsonPath("$.catalogoImagemCover2").value(DEFAULT_CATALOGO_IMAGEM_COVER_2.toString()))
            .andExpect(jsonPath("$.catalogoImagemCover3").value(DEFAULT_CATALOGO_IMAGEM_COVER_3.toString()))
            .andExpect(jsonPath("$.catalogoImagemCover4").value(DEFAULT_CATALOGO_IMAGEM_COVER_4.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCatalogs() throws Exception {
        // Get the catalogs
        restCatalogsMockMvc.perform(get("/api/catalogs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCatalogs() throws Exception {
        // Initialize the database
        catalogsRepository.saveAndFlush(catalogs);

        int databaseSizeBeforeUpdate = catalogsRepository.findAll().size();

        // Update the catalogs
        Catalogs updatedCatalogs = catalogsRepository.findById(catalogs.getId()).get();
        // Disconnect from session so that the updates on updatedCatalogs are not directly saved in db
        em.detach(updatedCatalogs);
        updatedCatalogs
            .catalogName(UPDATED_CATALOG_NAME)
            .catalogoImagemCover1(UPDATED_CATALOGO_IMAGEM_COVER_1)
            .catalogoImagemCover2(UPDATED_CATALOGO_IMAGEM_COVER_2)
            .catalogoImagemCover3(UPDATED_CATALOGO_IMAGEM_COVER_3)
            .catalogoImagemCover4(UPDATED_CATALOGO_IMAGEM_COVER_4);

        restCatalogsMockMvc.perform(put("/api/catalogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCatalogs)))
            .andExpect(status().isOk());

        // Validate the Catalogs in the database
        List<Catalogs> catalogsList = catalogsRepository.findAll();
        assertThat(catalogsList).hasSize(databaseSizeBeforeUpdate);
        Catalogs testCatalogs = catalogsList.get(catalogsList.size() - 1);
        assertThat(testCatalogs.getCatalogName()).isEqualTo(UPDATED_CATALOG_NAME);
        assertThat(testCatalogs.getCatalogoImagemCover1()).isEqualTo(UPDATED_CATALOGO_IMAGEM_COVER_1);
        assertThat(testCatalogs.getCatalogoImagemCover2()).isEqualTo(UPDATED_CATALOGO_IMAGEM_COVER_2);
        assertThat(testCatalogs.getCatalogoImagemCover3()).isEqualTo(UPDATED_CATALOGO_IMAGEM_COVER_3);
        assertThat(testCatalogs.getCatalogoImagemCover4()).isEqualTo(UPDATED_CATALOGO_IMAGEM_COVER_4);
    }

    @Test
    @Transactional
    public void updateNonExistingCatalogs() throws Exception {
        int databaseSizeBeforeUpdate = catalogsRepository.findAll().size();

        // Create the Catalogs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCatalogsMockMvc.perform(put("/api/catalogs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(catalogs)))
            .andExpect(status().isBadRequest());

        // Validate the Catalogs in the database
        List<Catalogs> catalogsList = catalogsRepository.findAll();
        assertThat(catalogsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCatalogs() throws Exception {
        // Initialize the database
        catalogsRepository.saveAndFlush(catalogs);

        int databaseSizeBeforeDelete = catalogsRepository.findAll().size();

        // Delete the catalogs
        restCatalogsMockMvc.perform(delete("/api/catalogs/{id}", catalogs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Catalogs> catalogsList = catalogsRepository.findAll();
        assertThat(catalogsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Catalogs.class);
        Catalogs catalogs1 = new Catalogs();
        catalogs1.setId(1L);
        Catalogs catalogs2 = new Catalogs();
        catalogs2.setId(catalogs1.getId());
        assertThat(catalogs1).isEqualTo(catalogs2);
        catalogs2.setId(2L);
        assertThat(catalogs1).isNotEqualTo(catalogs2);
        catalogs1.setId(null);
        assertThat(catalogs1).isNotEqualTo(catalogs2);
    }
}
