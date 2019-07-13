package com.catalogapp.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Steering.
 */
@Entity
@Table(name = "steering")
public class Steering implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "steering_name", length = 40, nullable = false)
    private String steeringName;

    @Column(name = "steering_image")
    private String steeringImage;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSteeringName() {
        return steeringName;
    }

    public Steering steeringName(String steeringName) {
        this.steeringName = steeringName;
        return this;
    }

    public void setSteeringName(String steeringName) {
        this.steeringName = steeringName;
    }

    public String getSteeringImage() {
        return steeringImage;
    }

    public Steering steeringImage(String steeringImage) {
        this.steeringImage = steeringImage;
        return this;
    }

    public void setSteeringImage(String steeringImage) {
        this.steeringImage = steeringImage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Steering)) {
            return false;
        }
        return id != null && id.equals(((Steering) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Steering{" +
            "id=" + getId() +
            ", steeringName='" + getSteeringName() + "'" +
            ", steeringImage='" + getSteeringImage() + "'" +
            "}";
    }
}
