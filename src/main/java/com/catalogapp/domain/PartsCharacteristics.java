package com.catalogapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PartsCharacteristics.
 */
@Entity
@Table(name = "parts_characteristics")
public class PartsCharacteristics implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "information")
    private String information;

    @ManyToOne
    @JsonIgnoreProperties("partsCharacteristics")
    private Parts parts;

    @ManyToOne
    @JsonIgnoreProperties("partsCharacteristics")
    private Characteristics characteristics;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInformation() {
        return information;
    }

    public PartsCharacteristics information(String information) {
        this.information = information;
        return this;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public Parts getParts() {
        return parts;
    }

    public PartsCharacteristics parts(Parts parts) {
        this.parts = parts;
        return this;
    }

    public void setParts(Parts parts) {
        this.parts = parts;
    }

    public Characteristics getCharacteristics() {
        return characteristics;
    }

    public PartsCharacteristics characteristics(Characteristics characteristics) {
        this.characteristics = characteristics;
        return this;
    }

    public void setCharacteristics(Characteristics characteristics) {
        this.characteristics = characteristics;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PartsCharacteristics)) {
            return false;
        }
        return id != null && id.equals(((PartsCharacteristics) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PartsCharacteristics{" +
            "id=" + getId() +
            ", information='" + getInformation() + "'" +
            "}";
    }
}
