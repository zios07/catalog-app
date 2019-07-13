package com.catalogapp.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Transmission.
 */
@Entity
@Table(name = "transmission")
public class Transmission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "transmission_name", length = 40, nullable = false)
    private String transmissionName;

    @Column(name = "transmissao_image")
    private String transmissaoImage;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransmissionName() {
        return transmissionName;
    }

    public Transmission transmissionName(String transmissionName) {
        this.transmissionName = transmissionName;
        return this;
    }

    public void setTransmissionName(String transmissionName) {
        this.transmissionName = transmissionName;
    }

    public String getTransmissaoImage() {
        return transmissaoImage;
    }

    public Transmission transmissaoImage(String transmissaoImage) {
        this.transmissaoImage = transmissaoImage;
        return this;
    }

    public void setTransmissaoImage(String transmissaoImage) {
        this.transmissaoImage = transmissaoImage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transmission)) {
            return false;
        }
        return id != null && id.equals(((Transmission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Transmission{" +
            "id=" + getId() +
            ", transmissionName='" + getTransmissionName() + "'" +
            ", transmissaoImage='" + getTransmissaoImage() + "'" +
            "}";
    }
}
