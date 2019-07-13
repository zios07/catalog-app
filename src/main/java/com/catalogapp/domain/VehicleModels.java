package com.catalogapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A VehicleModels.
 */
@Entity
@Table(name = "vehicle_models")
public class VehicleModels implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "vehicle_model", length = 40, nullable = false)
    private String vehicleModel;

    @Column(name = "start_production")
    private LocalDate startProduction;

    @Column(name = "finish_production")
    private LocalDate finishProduction;

    @Size(min = 17)
    @Column(name = "start_chassi")
    private String startChassi;

    @Size(min = 17)
    @Column(name = "finesh_chassi")
    private String fineshChassi;

    @Size(max = 10)
    @Column(name = "code", length = 10)
    private String code;

    @Column(name = "fleet_quantity")
    private Integer fleetQuantity;

    @ManyToOne
    @JsonIgnoreProperties("vehicleModels")
    private Vehicles vehicles;

    @ManyToOne
    @JsonIgnoreProperties("vehicleModels")
    private Motors motors;

    @ManyToOne
    @JsonIgnoreProperties("vehicleModels")
    private Transmission transmission;

    @ManyToOne
    @JsonIgnoreProperties("vehicleModels")
    private Steering steering;

    @ManyToOne
    @JsonIgnoreProperties("vehicleModels")
    private Nationalities nationalities;

    @ManyToMany(mappedBy = "vehicleModels")
    @JsonIgnore
    private Set<Parts> parts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public VehicleModels vehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
        return this;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public LocalDate getStartProduction() {
        return startProduction;
    }

    public VehicleModels startProduction(LocalDate startProduction) {
        this.startProduction = startProduction;
        return this;
    }

    public void setStartProduction(LocalDate startProduction) {
        this.startProduction = startProduction;
    }

    public LocalDate getFinishProduction() {
        return finishProduction;
    }

    public VehicleModels finishProduction(LocalDate finishProduction) {
        this.finishProduction = finishProduction;
        return this;
    }

    public void setFinishProduction(LocalDate finishProduction) {
        this.finishProduction = finishProduction;
    }

    public String getStartChassi() {
        return startChassi;
    }

    public VehicleModels startChassi(String startChassi) {
        this.startChassi = startChassi;
        return this;
    }

    public void setStartChassi(String startChassi) {
        this.startChassi = startChassi;
    }

    public String getFineshChassi() {
        return fineshChassi;
    }

    public VehicleModels fineshChassi(String fineshChassi) {
        this.fineshChassi = fineshChassi;
        return this;
    }

    public void setFineshChassi(String fineshChassi) {
        this.fineshChassi = fineshChassi;
    }

    public String getCode() {
        return code;
    }

    public VehicleModels code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getFleetQuantity() {
        return fleetQuantity;
    }

    public VehicleModels fleetQuantity(Integer fleetQuantity) {
        this.fleetQuantity = fleetQuantity;
        return this;
    }

    public void setFleetQuantity(Integer fleetQuantity) {
        this.fleetQuantity = fleetQuantity;
    }

    public Vehicles getVehicles() {
        return vehicles;
    }

    public VehicleModels vehicles(Vehicles vehicles) {
        this.vehicles = vehicles;
        return this;
    }

    public void setVehicles(Vehicles vehicles) {
        this.vehicles = vehicles;
    }

    public Motors getMotors() {
        return motors;
    }

    public VehicleModels motors(Motors motors) {
        this.motors = motors;
        return this;
    }

    public void setMotors(Motors motors) {
        this.motors = motors;
    }

    public Transmission getTransmission() {
        return transmission;
    }

    public VehicleModels transmission(Transmission transmission) {
        this.transmission = transmission;
        return this;
    }

    public void setTransmission(Transmission transmission) {
        this.transmission = transmission;
    }

    public Steering getSteering() {
        return steering;
    }

    public VehicleModels steering(Steering steering) {
        this.steering = steering;
        return this;
    }

    public void setSteering(Steering steering) {
        this.steering = steering;
    }

    public Nationalities getNationalities() {
        return nationalities;
    }

    public VehicleModels nationalities(Nationalities nationalities) {
        this.nationalities = nationalities;
        return this;
    }

    public void setNationalities(Nationalities nationalities) {
        this.nationalities = nationalities;
    }

    public Set<Parts> getParts() {
        return parts;
    }

    public VehicleModels parts(Set<Parts> parts) {
        this.parts = parts;
        return this;
    }

    public VehicleModels addParts(Parts parts) {
        this.parts.add(parts);
        parts.getVehicleModels().add(this);
        return this;
    }

    public VehicleModels removeParts(Parts parts) {
        this.parts.remove(parts);
        parts.getVehicleModels().remove(this);
        return this;
    }

    public void setParts(Set<Parts> parts) {
        this.parts = parts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VehicleModels)) {
            return false;
        }
        return id != null && id.equals(((VehicleModels) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "VehicleModels{" +
            "id=" + getId() +
            ", vehicleModel='" + getVehicleModel() + "'" +
            ", startProduction='" + getStartProduction() + "'" +
            ", finishProduction='" + getFinishProduction() + "'" +
            ", startChassi='" + getStartChassi() + "'" +
            ", fineshChassi='" + getFineshChassi() + "'" +
            ", code='" + getCode() + "'" +
            ", fleetQuantity=" + getFleetQuantity() +
            "}";
    }
}
