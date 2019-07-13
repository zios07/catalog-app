package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Providers;
import com.catalogapp.repository.ProvidersRepository;
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
 * Integration tests for the {@Link ProvidersResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class ProvidersResourceIT {

    private static final String DEFAULT_PROVIDER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROVIDER_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_MANUFACTURER = false;
    private static final Boolean UPDATED_MANUFACTURER = true;

    @Autowired
    private ProvidersRepository providersRepository;

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

    private MockMvc restProvidersMockMvc;

    private Providers providers;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProvidersResource providersResource = new ProvidersResource(providersRepository);
        this.restProvidersMockMvc = MockMvcBuilders.standaloneSetup(providersResource)
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
    public static Providers createEntity(EntityManager em) {
        Providers providers = new Providers()
            .providerName(DEFAULT_PROVIDER_NAME)
            .manufacturer(DEFAULT_MANUFACTURER);
        return providers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Providers createUpdatedEntity(EntityManager em) {
        Providers providers = new Providers()
            .providerName(UPDATED_PROVIDER_NAME)
            .manufacturer(UPDATED_MANUFACTURER);
        return providers;
    }

    @BeforeEach
    public void initTest() {
        providers = createEntity(em);
    }

    @Test
    @Transactional
    public void createProviders() throws Exception {
        int databaseSizeBeforeCreate = providersRepository.findAll().size();

        // Create the Providers
        restProvidersMockMvc.perform(post("/api/providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providers)))
            .andExpect(status().isCreated());

        // Validate the Providers in the database
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeCreate + 1);
        Providers testProviders = providersList.get(providersList.size() - 1);
        assertThat(testProviders.getProviderName()).isEqualTo(DEFAULT_PROVIDER_NAME);
        assertThat(testProviders.isManufacturer()).isEqualTo(DEFAULT_MANUFACTURER);
    }

    @Test
    @Transactional
    public void createProvidersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = providersRepository.findAll().size();

        // Create the Providers with an existing ID
        providers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProvidersMockMvc.perform(post("/api/providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providers)))
            .andExpect(status().isBadRequest());

        // Validate the Providers in the database
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkProviderNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = providersRepository.findAll().size();
        // set the field null
        providers.setProviderName(null);

        // Create the Providers, which fails.

        restProvidersMockMvc.perform(post("/api/providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providers)))
            .andExpect(status().isBadRequest());

        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProviders() throws Exception {
        // Initialize the database
        providersRepository.saveAndFlush(providers);

        // Get all the providersList
        restProvidersMockMvc.perform(get("/api/providers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(providers.getId().intValue())))
            .andExpect(jsonPath("$.[*].providerName").value(hasItem(DEFAULT_PROVIDER_NAME.toString())))
            .andExpect(jsonPath("$.[*].manufacturer").value(hasItem(DEFAULT_MANUFACTURER.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getProviders() throws Exception {
        // Initialize the database
        providersRepository.saveAndFlush(providers);

        // Get the providers
        restProvidersMockMvc.perform(get("/api/providers/{id}", providers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(providers.getId().intValue()))
            .andExpect(jsonPath("$.providerName").value(DEFAULT_PROVIDER_NAME.toString()))
            .andExpect(jsonPath("$.manufacturer").value(DEFAULT_MANUFACTURER.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProviders() throws Exception {
        // Get the providers
        restProvidersMockMvc.perform(get("/api/providers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProviders() throws Exception {
        // Initialize the database
        providersRepository.saveAndFlush(providers);

        int databaseSizeBeforeUpdate = providersRepository.findAll().size();

        // Update the providers
        Providers updatedProviders = providersRepository.findById(providers.getId()).get();
        // Disconnect from session so that the updates on updatedProviders are not directly saved in db
        em.detach(updatedProviders);
        updatedProviders
            .providerName(UPDATED_PROVIDER_NAME)
            .manufacturer(UPDATED_MANUFACTURER);

        restProvidersMockMvc.perform(put("/api/providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProviders)))
            .andExpect(status().isOk());

        // Validate the Providers in the database
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeUpdate);
        Providers testProviders = providersList.get(providersList.size() - 1);
        assertThat(testProviders.getProviderName()).isEqualTo(UPDATED_PROVIDER_NAME);
        assertThat(testProviders.isManufacturer()).isEqualTo(UPDATED_MANUFACTURER);
    }

    @Test
    @Transactional
    public void updateNonExistingProviders() throws Exception {
        int databaseSizeBeforeUpdate = providersRepository.findAll().size();

        // Create the Providers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProvidersMockMvc.perform(put("/api/providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providers)))
            .andExpect(status().isBadRequest());

        // Validate the Providers in the database
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProviders() throws Exception {
        // Initialize the database
        providersRepository.saveAndFlush(providers);

        int databaseSizeBeforeDelete = providersRepository.findAll().size();

        // Delete the providers
        restProvidersMockMvc.perform(delete("/api/providers/{id}", providers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Providers.class);
        Providers providers1 = new Providers();
        providers1.setId(1L);
        Providers providers2 = new Providers();
        providers2.setId(providers1.getId());
        assertThat(providers1).isEqualTo(providers2);
        providers2.setId(2L);
        assertThat(providers1).isNotEqualTo(providers2);
        providers1.setId(null);
        assertThat(providers1).isNotEqualTo(providers2);
    }
}
