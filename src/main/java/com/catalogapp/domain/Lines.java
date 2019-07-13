package com.catalogapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Lines.
 */
@Entity
@Table(name = "jhi_lines")
public class Lines implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "line_name", length = 40, nullable = false)
    private String lineName;

    @Column(name = "line_image")
    private String lineImage;

    @Column(name = "line_icon")
    private String lineIcon;

    @OneToMany(mappedBy = "lines")
    private Set<Families> families = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("lines")
    private Catalogs catalogs;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLineName() {
        return lineName;
    }

    public Lines lineName(String lineName) {
        this.lineName = lineName;
        return this;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getLineImage() {
        return lineImage;
    }

    public Lines lineImage(String lineImage) {
        this.lineImage = lineImage;
        return this;
    }

    public void setLineImage(String lineImage) {
        this.lineImage = lineImage;
    }

    public String getLineIcon() {
        return lineIcon;
    }

    public Lines lineIcon(String lineIcon) {
        this.lineIcon = lineIcon;
        return this;
    }

    public void setLineIcon(String lineIcon) {
        this.lineIcon = lineIcon;
    }

    public Set<Families> getFamilies() {
        return families;
    }

    public Lines families(Set<Families> families) {
        this.families = families;
        return this;
    }

    public Lines addFamilies(Families families) {
        this.families.add(families);
        families.setLines(this);
        return this;
    }

    public Lines removeFamilies(Families families) {
        this.families.remove(families);
        families.setLines(null);
        return this;
    }

    public void setFamilies(Set<Families> families) {
        this.families = families;
    }

    public Catalogs getCatalogs() {
        return catalogs;
    }

    public Lines catalogs(Catalogs catalogs) {
        this.catalogs = catalogs;
        return this;
    }

    public void setCatalogs(Catalogs catalogs) {
        this.catalogs = catalogs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lines)) {
            return false;
        }
        return id != null && id.equals(((Lines) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Lines{" +
            "id=" + getId() +
            ", lineName='" + getLineName() + "'" +
            ", lineImage='" + getLineImage() + "'" +
            ", lineIcon='" + getLineIcon() + "'" +
            "}";
    }
}
