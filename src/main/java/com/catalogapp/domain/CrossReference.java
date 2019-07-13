package com.catalogapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A CrossReference.
 */
@Entity
@Table(name = "cross_reference")
public class CrossReference implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 30)
    @Column(name = "code_in_provider", length = 30, nullable = false)
    private String codeInProvider;

    @Column(name = "view_catalog")
    private Boolean viewCatalog;

    @ManyToOne
    @JsonIgnoreProperties("crossReferences")
    private Providers providers;

    @ManyToOne
    @JsonIgnoreProperties("crossReferences")
    private Parts parts;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeInProvider() {
        return codeInProvider;
    }

    public CrossReference codeInProvider(String codeInProvider) {
        this.codeInProvider = codeInProvider;
        return this;
    }

    public void setCodeInProvider(String codeInProvider) {
        this.codeInProvider = codeInProvider;
    }

    public Boolean isViewCatalog() {
        return viewCatalog;
    }

    public CrossReference viewCatalog(Boolean viewCatalog) {
        this.viewCatalog = viewCatalog;
        return this;
    }

    public void setViewCatalog(Boolean viewCatalog) {
        this.viewCatalog = viewCatalog;
    }

    public Providers getProviders() {
        return providers;
    }

    public CrossReference providers(Providers providers) {
        this.providers = providers;
        return this;
    }

    public void setProviders(Providers providers) {
        this.providers = providers;
    }

    public Parts getParts() {
        return parts;
    }

    public CrossReference parts(Parts parts) {
        this.parts = parts;
        return this;
    }

    public void setParts(Parts parts) {
        this.parts = parts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CrossReference)) {
            return false;
        }
        return id != null && id.equals(((CrossReference) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CrossReference{" +
            "id=" + getId() +
            ", codeInProvider='" + getCodeInProvider() + "'" +
            ", viewCatalog='" + isViewCatalog() + "'" +
            "}";
    }
}
