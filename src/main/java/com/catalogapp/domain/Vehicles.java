package com.catalogapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Vehicles.
 */
@Entity
@Table(name = "vehicles")
public class Vehicles implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "vehicle", length = 40, nullable = false)
    private String vehicle;

    @Size(max = 10)
    @Column(name = "code", length = 10)
    private String code;

    @ManyToOne
    @JsonIgnoreProperties("vehicles")
    private VehicleBrands vehicleBrands;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicle() {
        return vehicle;
    }

    public Vehicles vehicle(String vehicle) {
        this.vehicle = vehicle;
        return this;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }

    public String getCode() {
        return code;
    }

    public Vehicles code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public VehicleBrands getVehicleBrands() {
        return vehicleBrands;
    }

    public Vehicles vehicleBrands(VehicleBrands vehicleBrands) {
        this.vehicleBrands = vehicleBrands;
        return this;
    }

    public void setVehicleBrands(VehicleBrands vehicleBrands) {
        this.vehicleBrands = vehicleBrands;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vehicles)) {
            return false;
        }
        return id != null && id.equals(((Vehicles) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Vehicles{" +
            "id=" + getId() +
            ", vehicle='" + getVehicle() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }
}
