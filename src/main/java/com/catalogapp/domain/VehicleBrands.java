package com.catalogapp.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A VehicleBrands.
 */
@Entity
@Table(name = "vehicle_brands")
public class VehicleBrands implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "vehicle_brand_name", length = 40, nullable = false)
    private String vehicleBrandName;

    @Column(name = "vehicle_brand_image")
    private String vehicleBrandImage;

    @OneToMany(mappedBy = "vehicleBrands")
    private Set<Vehicles> vehicles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleBrandName() {
        return vehicleBrandName;
    }

    public VehicleBrands vehicleBrandName(String vehicleBrandName) {
        this.vehicleBrandName = vehicleBrandName;
        return this;
    }

    public void setVehicleBrandName(String vehicleBrandName) {
        this.vehicleBrandName = vehicleBrandName;
    }

    public String getVehicleBrandImage() {
        return vehicleBrandImage;
    }

    public VehicleBrands vehicleBrandImage(String vehicleBrandImage) {
        this.vehicleBrandImage = vehicleBrandImage;
        return this;
    }

    public void setVehicleBrandImage(String vehicleBrandImage) {
        this.vehicleBrandImage = vehicleBrandImage;
    }

    public Set<Vehicles> getVehicles() {
        return vehicles;
    }

    public VehicleBrands vehicles(Set<Vehicles> vehicles) {
        this.vehicles = vehicles;
        return this;
    }

    public VehicleBrands addVehicles(Vehicles vehicles) {
        this.vehicles.add(vehicles);
        vehicles.setVehicleBrands(this);
        return this;
    }

    public VehicleBrands removeVehicles(Vehicles vehicles) {
        this.vehicles.remove(vehicles);
        vehicles.setVehicleBrands(null);
        return this;
    }

    public void setVehicles(Set<Vehicles> vehicles) {
        this.vehicles = vehicles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VehicleBrands)) {
            return false;
        }
        return id != null && id.equals(((VehicleBrands) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "VehicleBrands{" +
            "id=" + getId() +
            ", vehicleBrandName='" + getVehicleBrandName() + "'" +
            ", vehicleBrandImage='" + getVehicleBrandImage() + "'" +
            "}";
    }
}
