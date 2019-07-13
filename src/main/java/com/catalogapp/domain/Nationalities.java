package com.catalogapp.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Nationalities.
 */
@Entity
@Table(name = "nationalities")
public class Nationalities implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "nationality_name", length = 40, nullable = false)
    private String nationalityName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNationalityName() {
        return nationalityName;
    }

    public Nationalities nationalityName(String nationalityName) {
        this.nationalityName = nationalityName;
        return this;
    }

    public void setNationalityName(String nationalityName) {
        this.nationalityName = nationalityName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Nationalities)) {
            return false;
        }
        return id != null && id.equals(((Nationalities) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Nationalities{" +
            "id=" + getId() +
            ", nationalityName='" + getNationalityName() + "'" +
            "}";
    }
}
