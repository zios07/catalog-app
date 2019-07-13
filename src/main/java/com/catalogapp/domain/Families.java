package com.catalogapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Families.
 */
@Entity
@Table(name = "families")
public class Families implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "family_name", length = 40, nullable = false)
    private String familyName;

    @Column(name = "family_image")
    private String familyImage;

    @Column(name = "family_icon")
    private String familyIcon;

    @OneToMany(mappedBy = "families")
    private Set<Characteristics> characteristics = new HashSet<>();

    @OneToMany(mappedBy = "families")
    private Set<Parts> parts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("families")
    private Lines lines;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFamilyName() {
        return familyName;
    }

    public Families familyName(String familyName) {
        this.familyName = familyName;
        return this;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getFamilyImage() {
        return familyImage;
    }

    public Families familyImage(String familyImage) {
        this.familyImage = familyImage;
        return this;
    }

    public void setFamilyImage(String familyImage) {
        this.familyImage = familyImage;
    }

    public String getFamilyIcon() {
        return familyIcon;
    }

    public Families familyIcon(String familyIcon) {
        this.familyIcon = familyIcon;
        return this;
    }

    public void setFamilyIcon(String familyIcon) {
        this.familyIcon = familyIcon;
    }

    public Set<Characteristics> getCharacteristics() {
        return characteristics;
    }

    public Families characteristics(Set<Characteristics> characteristics) {
        this.characteristics = characteristics;
        return this;
    }

    public Families addCharacteristics(Characteristics characteristics) {
        this.characteristics.add(characteristics);
        characteristics.setFamilies(this);
        return this;
    }

    public Families removeCharacteristics(Characteristics characteristics) {
        this.characteristics.remove(characteristics);
        characteristics.setFamilies(null);
        return this;
    }

    public void setCharacteristics(Set<Characteristics> characteristics) {
        this.characteristics = characteristics;
    }

    public Set<Parts> getParts() {
        return parts;
    }

    public Families parts(Set<Parts> parts) {
        this.parts = parts;
        return this;
    }

    public Families addParts(Parts parts) {
        this.parts.add(parts);
        parts.setFamilies(this);
        return this;
    }

    public Families removeParts(Parts parts) {
        this.parts.remove(parts);
        parts.setFamilies(null);
        return this;
    }

    public void setParts(Set<Parts> parts) {
        this.parts = parts;
    }

    public Lines getLines() {
        return lines;
    }

    public Families lines(Lines lines) {
        this.lines = lines;
        return this;
    }

    public void setLines(Lines lines) {
        this.lines = lines;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Families)) {
            return false;
        }
        return id != null && id.equals(((Families) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Families{" +
            "id=" + getId() +
            ", familyName='" + getFamilyName() + "'" +
            ", familyImage='" + getFamilyImage() + "'" +
            ", familyIcon='" + getFamilyIcon() + "'" +
            "}";
    }
}
