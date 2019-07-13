package com.catalogapp.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Motors.
 */
@Entity
@Table(name = "motors")
public class Motors implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "motor_name", length = 40, nullable = false)
    private String motorName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMotorName() {
        return motorName;
    }

    public Motors motorName(String motorName) {
        this.motorName = motorName;
        return this;
    }

    public void setMotorName(String motorName) {
        this.motorName = motorName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Motors)) {
            return false;
        }
        return id != null && id.equals(((Motors) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Motors{" +
            "id=" + getId() +
            ", motorName='" + getMotorName() + "'" +
            "}";
    }
}
