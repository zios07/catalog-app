package com.catalogapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PartsImages.
 */
@Entity
@Table(name = "parts_images")
public class PartsImages implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "part_image")
    private String partImage;

    @ManyToOne
    @JsonIgnoreProperties("partsImages")
    private Parts parts;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPartImage() {
        return partImage;
    }

    public PartsImages partImage(String partImage) {
        this.partImage = partImage;
        return this;
    }

    public void setPartImage(String partImage) {
        this.partImage = partImage;
    }

    public Parts getParts() {
        return parts;
    }

    public PartsImages parts(Parts parts) {
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
        if (!(o instanceof PartsImages)) {
            return false;
        }
        return id != null && id.equals(((PartsImages) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PartsImages{" +
            "id=" + getId() +
            ", partImage='" + getPartImage() + "'" +
            "}";
    }
}
