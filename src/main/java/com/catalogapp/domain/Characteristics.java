package com.catalogapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Characteristics.
 */
@Entity
@Table(name = "characteristics")
public class Characteristics implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 30)
    @Column(name = "characteristics_name", length = 30, nullable = false)
    private String characteristicsName;

    @Column(name = "view_catalog")
    private Boolean viewCatalog;

    @Column(name = "view_special_client")
    private Boolean viewSpecialClient;

    @ManyToOne
    @JsonIgnoreProperties("characteristics")
    private Families families;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCharacteristicsName() {
        return characteristicsName;
    }

    public Characteristics characteristicsName(String characteristicsName) {
        this.characteristicsName = characteristicsName;
        return this;
    }

    public void setCharacteristicsName(String characteristicsName) {
        this.characteristicsName = characteristicsName;
    }

    public Boolean isViewCatalog() {
        return viewCatalog;
    }

    public Characteristics viewCatalog(Boolean viewCatalog) {
        this.viewCatalog = viewCatalog;
        return this;
    }

    public void setViewCatalog(Boolean viewCatalog) {
        this.viewCatalog = viewCatalog;
    }

    public Boolean isViewSpecialClient() {
        return viewSpecialClient;
    }

    public Characteristics viewSpecialClient(Boolean viewSpecialClient) {
        this.viewSpecialClient = viewSpecialClient;
        return this;
    }

    public void setViewSpecialClient(Boolean viewSpecialClient) {
        this.viewSpecialClient = viewSpecialClient;
    }

    public Families getFamilies() {
        return families;
    }

    public Characteristics families(Families families) {
        this.families = families;
        return this;
    }

    public void setFamilies(Families families) {
        this.families = families;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Characteristics)) {
            return false;
        }
        return id != null && id.equals(((Characteristics) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Characteristics{" +
            "id=" + getId() +
            ", characteristicsName='" + getCharacteristicsName() + "'" +
            ", viewCatalog='" + isViewCatalog() + "'" +
            ", viewSpecialClient='" + isViewSpecialClient() + "'" +
            "}";
    }
}
