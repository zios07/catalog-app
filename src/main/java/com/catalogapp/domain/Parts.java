package com.catalogapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Parts.
 */
@Entity
@Table(name = "parts")
public class Parts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 30)
    @Column(name = "code_parts", length = 30, nullable = false)
    private String codeParts;

    @NotNull
    @Column(name = "parts_name", nullable = false)
    private String partsName;

    @Column(name = "part_image_link_pic_360")
    private String partImageLinkPic360;

    @Column(name = "part_video")
    private String partVideo;

    @Column(name = "part_technical_manual")
    private String partTechnicalManual;

    @Column(name = "under_development")
    private Boolean underDevelopment;

    @Column(name = "inactive")
    private Boolean inactive;

    @Size(min = 13)
    @Column(name = "ean")
    private String ean;

    @Column(name = "sku")
    private String sku;

    @ManyToMany
    @JoinTable(name = "parts_vehicle_models",
               joinColumns = @JoinColumn(name = "parts_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "vehicle_models_id", referencedColumnName = "id"))
    private Set<VehicleModels> vehicleModels = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("parts")
    private Families families;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeParts() {
        return codeParts;
    }

    public Parts codeParts(String codeParts) {
        this.codeParts = codeParts;
        return this;
    }

    public void setCodeParts(String codeParts) {
        this.codeParts = codeParts;
    }

    public String getPartsName() {
        return partsName;
    }

    public Parts partsName(String partsName) {
        this.partsName = partsName;
        return this;
    }

    public void setPartsName(String partsName) {
        this.partsName = partsName;
    }

    public String getPartImageLinkPic360() {
        return partImageLinkPic360;
    }

    public Parts partImageLinkPic360(String partImageLinkPic360) {
        this.partImageLinkPic360 = partImageLinkPic360;
        return this;
    }

    public void setPartImageLinkPic360(String partImageLinkPic360) {
        this.partImageLinkPic360 = partImageLinkPic360;
    }

    public String getPartVideo() {
        return partVideo;
    }

    public Parts partVideo(String partVideo) {
        this.partVideo = partVideo;
        return this;
    }

    public void setPartVideo(String partVideo) {
        this.partVideo = partVideo;
    }

    public String getPartTechnicalManual() {
        return partTechnicalManual;
    }

    public Parts partTechnicalManual(String partTechnicalManual) {
        this.partTechnicalManual = partTechnicalManual;
        return this;
    }

    public void setPartTechnicalManual(String partTechnicalManual) {
        this.partTechnicalManual = partTechnicalManual;
    }

    public Boolean isUnderDevelopment() {
        return underDevelopment;
    }

    public Parts underDevelopment(Boolean underDevelopment) {
        this.underDevelopment = underDevelopment;
        return this;
    }

    public void setUnderDevelopment(Boolean underDevelopment) {
        this.underDevelopment = underDevelopment;
    }

    public Boolean isInactive() {
        return inactive;
    }

    public Parts inactive(Boolean inactive) {
        this.inactive = inactive;
        return this;
    }

    public void setInactive(Boolean inactive) {
        this.inactive = inactive;
    }

    public String getEan() {
        return ean;
    }

    public Parts ean(String ean) {
        this.ean = ean;
        return this;
    }

    public void setEan(String ean) {
        this.ean = ean;
    }

    public String getSku() {
        return sku;
    }

    public Parts sku(String sku) {
        this.sku = sku;
        return this;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public Set<VehicleModels> getVehicleModels() {
        return vehicleModels;
    }

    public Parts vehicleModels(Set<VehicleModels> vehicleModels) {
        this.vehicleModels = vehicleModels;
        return this;
    }

    public Parts addVehicleModels(VehicleModels vehicleModels) {
        this.vehicleModels.add(vehicleModels);
        vehicleModels.getParts().add(this);
        return this;
    }

    public Parts removeVehicleModels(VehicleModels vehicleModels) {
        this.vehicleModels.remove(vehicleModels);
        vehicleModels.getParts().remove(this);
        return this;
    }

    public void setVehicleModels(Set<VehicleModels> vehicleModels) {
        this.vehicleModels = vehicleModels;
    }

    public Families getFamilies() {
        return families;
    }

    public Parts families(Families families) {
        this.families = families;
        return this;
    }

    public void setFamilies(Families families) {
        this.families = families;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parts)) {
            return false;
        }
        return id != null && id.equals(((Parts) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Parts{" +
            "id=" + getId() +
            ", codeParts='" + getCodeParts() + "'" +
            ", partsName='" + getPartsName() + "'" +
            ", partImageLinkPic360='" + getPartImageLinkPic360() + "'" +
            ", partVideo='" + getPartVideo() + "'" +
            ", partTechnicalManual='" + getPartTechnicalManual() + "'" +
            ", underDevelopment='" + isUnderDevelopment() + "'" +
            ", inactive='" + isInactive() + "'" +
            ", ean='" + getEan() + "'" +
            ", sku='" + getSku() + "'" +
            "}";
    }
}
