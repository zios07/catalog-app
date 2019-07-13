package com.catalogapp.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Providers.
 */
@Entity
@Table(name = "providers")
public class Providers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "provider_name", length = 40, nullable = false)
    private String providerName;

    @Column(name = "manufacturer")
    private Boolean manufacturer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProviderName() {
        return providerName;
    }

    public Providers providerName(String providerName) {
        this.providerName = providerName;
        return this;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public Boolean isManufacturer() {
        return manufacturer;
    }

    public Providers manufacturer(Boolean manufacturer) {
        this.manufacturer = manufacturer;
        return this;
    }

    public void setManufacturer(Boolean manufacturer) {
        this.manufacturer = manufacturer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Providers)) {
            return false;
        }
        return id != null && id.equals(((Providers) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Providers{" +
            "id=" + getId() +
            ", providerName='" + getProviderName() + "'" +
            ", manufacturer='" + isManufacturer() + "'" +
            "}";
    }
}
