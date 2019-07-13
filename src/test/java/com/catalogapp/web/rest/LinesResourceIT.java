package com.catalogapp.web.rest;

import com.catalogapp.CatalogappApp;
import com.catalogapp.domain.Lines;
import com.catalogapp.repository.LinesRepository;
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
 * Integration tests for the {@Link LinesResource} REST controller.
 */
@SpringBootTest(classes = CatalogappApp.class)
public class LinesResourceIT {

    private static final String DEFAULT_LINE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LINE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LINE_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_LINE_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_LINE_ICON = "AAAAAAAAAA";
    private static final String UPDATED_LINE_ICON = "BBBBBBBBBB";

    @Autowired
    private LinesRepository linesRepository;

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

    private MockMvc restLinesMockMvc;

    private Lines lines;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LinesResource linesResource = new LinesResource(linesRepository);
        this.restLinesMockMvc = MockMvcBuilders.standaloneSetup(linesResource)
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
    public static Lines createEntity(EntityManager em) {
        Lines lines = new Lines()
            .lineName(DEFAULT_LINE_NAME)
            .lineImage(DEFAULT_LINE_IMAGE)
            .lineIcon(DEFAULT_LINE_ICON);
        return lines;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lines createUpdatedEntity(EntityManager em) {
        Lines lines = new Lines()
            .lineName(UPDATED_LINE_NAME)
            .lineImage(UPDATED_LINE_IMAGE)
            .lineIcon(UPDATED_LINE_ICON);
        return lines;
    }

    @BeforeEach
    public void initTest() {
        lines = createEntity(em);
    }

    @Test
    @Transactional
    public void createLines() throws Exception {
        int databaseSizeBeforeCreate = linesRepository.findAll().size();

        // Create the Lines
        restLinesMockMvc.perform(post("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lines)))
            .andExpect(status().isCreated());

        // Validate the Lines in the database
        List<Lines> linesList = linesRepository.findAll();
        assertThat(linesList).hasSize(databaseSizeBeforeCreate + 1);
        Lines testLines = linesList.get(linesList.size() - 1);
        assertThat(testLines.getLineName()).isEqualTo(DEFAULT_LINE_NAME);
        assertThat(testLines.getLineImage()).isEqualTo(DEFAULT_LINE_IMAGE);
        assertThat(testLines.getLineIcon()).isEqualTo(DEFAULT_LINE_ICON);
    }

    @Test
    @Transactional
    public void createLinesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = linesRepository.findAll().size();

        // Create the Lines with an existing ID
        lines.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLinesMockMvc.perform(post("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lines)))
            .andExpect(status().isBadRequest());

        // Validate the Lines in the database
        List<Lines> linesList = linesRepository.findAll();
        assertThat(linesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLineNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = linesRepository.findAll().size();
        // set the field null
        lines.setLineName(null);

        // Create the Lines, which fails.

        restLinesMockMvc.perform(post("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lines)))
            .andExpect(status().isBadRequest());

        List<Lines> linesList = linesRepository.findAll();
        assertThat(linesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLines() throws Exception {
        // Initialize the database
        linesRepository.saveAndFlush(lines);

        // Get all the linesList
        restLinesMockMvc.perform(get("/api/lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lines.getId().intValue())))
            .andExpect(jsonPath("$.[*].lineName").value(hasItem(DEFAULT_LINE_NAME.toString())))
            .andExpect(jsonPath("$.[*].lineImage").value(hasItem(DEFAULT_LINE_IMAGE.toString())))
            .andExpect(jsonPath("$.[*].lineIcon").value(hasItem(DEFAULT_LINE_ICON.toString())));
    }
    
    @Test
    @Transactional
    public void getLines() throws Exception {
        // Initialize the database
        linesRepository.saveAndFlush(lines);

        // Get the lines
        restLinesMockMvc.perform(get("/api/lines/{id}", lines.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lines.getId().intValue()))
            .andExpect(jsonPath("$.lineName").value(DEFAULT_LINE_NAME.toString()))
            .andExpect(jsonPath("$.lineImage").value(DEFAULT_LINE_IMAGE.toString()))
            .andExpect(jsonPath("$.lineIcon").value(DEFAULT_LINE_ICON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLines() throws Exception {
        // Get the lines
        restLinesMockMvc.perform(get("/api/lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLines() throws Exception {
        // Initialize the database
        linesRepository.saveAndFlush(lines);

        int databaseSizeBeforeUpdate = linesRepository.findAll().size();

        // Update the lines
        Lines updatedLines = linesRepository.findById(lines.getId()).get();
        // Disconnect from session so that the updates on updatedLines are not directly saved in db
        em.detach(updatedLines);
        updatedLines
            .lineName(UPDATED_LINE_NAME)
            .lineImage(UPDATED_LINE_IMAGE)
            .lineIcon(UPDATED_LINE_ICON);

        restLinesMockMvc.perform(put("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLines)))
            .andExpect(status().isOk());

        // Validate the Lines in the database
        List<Lines> linesList = linesRepository.findAll();
        assertThat(linesList).hasSize(databaseSizeBeforeUpdate);
        Lines testLines = linesList.get(linesList.size() - 1);
        assertThat(testLines.getLineName()).isEqualTo(UPDATED_LINE_NAME);
        assertThat(testLines.getLineImage()).isEqualTo(UPDATED_LINE_IMAGE);
        assertThat(testLines.getLineIcon()).isEqualTo(UPDATED_LINE_ICON);
    }

    @Test
    @Transactional
    public void updateNonExistingLines() throws Exception {
        int databaseSizeBeforeUpdate = linesRepository.findAll().size();

        // Create the Lines

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLinesMockMvc.perform(put("/api/lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lines)))
            .andExpect(status().isBadRequest());

        // Validate the Lines in the database
        List<Lines> linesList = linesRepository.findAll();
        assertThat(linesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLines() throws Exception {
        // Initialize the database
        linesRepository.saveAndFlush(lines);

        int databaseSizeBeforeDelete = linesRepository.findAll().size();

        // Delete the lines
        restLinesMockMvc.perform(delete("/api/lines/{id}", lines.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Lines> linesList = linesRepository.findAll();
        assertThat(linesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lines.class);
        Lines lines1 = new Lines();
        lines1.setId(1L);
        Lines lines2 = new Lines();
        lines2.setId(lines1.getId());
        assertThat(lines1).isEqualTo(lines2);
        lines2.setId(2L);
        assertThat(lines1).isNotEqualTo(lines2);
        lines1.setId(null);
        assertThat(lines1).isNotEqualTo(lines2);
    }
}
