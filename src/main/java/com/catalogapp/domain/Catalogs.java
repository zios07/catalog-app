package com.catalogapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A Catalogs.
 */
@Entity
@Table(name = "catalogs")
public class Catalogs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 40)
    @Column(name = "catalog_name", length = 40, nullable = false)
    private String catalogName;

    @Column(name = "catalogo_imagem_cover_1")
    private String catalogoImagemCover1;

    @Column(name = "catalogo_imagem_cover_2")
    private String catalogoImagemCover2;

    @Column(name = "catalogo_imagem_cover_3")
    private String catalogoImagemCover3;

    @Column(name = "catalogo_imagem_cover_4")
    private String catalogoImagemCover4;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Attachment> coverImages;

    @OneToMany(mappedBy = "catalogs")
    private Set<Lines> lines = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("catalogs")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCatalogName() {
        return catalogName;
    }

    public Catalogs catalogName(String catalogName) {
        this.catalogName = catalogName;
        return this;
    }

    public void setCatalogName(String catalogName) {
        this.catalogName = catalogName;
    }

    public String getCatalogoImagemCover1() {
        return catalogoImagemCover1;
    }

    public Catalogs catalogoImagemCover1(String catalogoImagemCover1) {
        this.catalogoImagemCover1 = catalogoImagemCover1;
        return this;
    }

    public void setCatalogoImagemCover1(String catalogoImagemCover1) {
        this.catalogoImagemCover1 = catalogoImagemCover1;
    }

    public String getCatalogoImagemCover2() {
        return catalogoImagemCover2;
    }

    public Catalogs catalogoImagemCover2(String catalogoImagemCover2) {
        this.catalogoImagemCover2 = catalogoImagemCover2;
        return this;
    }

    public void setCatalogoImagemCover2(String catalogoImagemCover2) {
        this.catalogoImagemCover2 = catalogoImagemCover2;
    }

    public String getCatalogoImagemCover3() {
        return catalogoImagemCover3;
    }

    public Catalogs catalogoImagemCover3(String catalogoImagemCover3) {
        this.catalogoImagemCover3 = catalogoImagemCover3;
        return this;
    }

    public void setCatalogoImagemCover3(String catalogoImagemCover3) {
        this.catalogoImagemCover3 = catalogoImagemCover3;
    }

    public String getCatalogoImagemCover4() {
        return catalogoImagemCover4;
    }

    public Catalogs catalogoImagemCover4(String catalogoImagemCover4) {
        this.catalogoImagemCover4 = catalogoImagemCover4;
        return this;
    }

    public void setCatalogoImagemCover4(String catalogoImagemCover4) {
        this.catalogoImagemCover4 = catalogoImagemCover4;
    }

    public Set<Lines> getLines() {
        return lines;
    }

    public Catalogs lines(Set<Lines> lines) {
        this.lines = lines;
        return this;
    }

    public List<Attachment> getCoverImages() {
        return coverImages;
    }

    public void setCoverImages(List<Attachment> coverImages) {
        this.coverImages = coverImages;
    }

    public Catalogs addLines(Lines lines) {
        this.lines.add(lines);
        lines.setCatalogs(this);
        return this;
    }

    public Catalogs removeLines(Lines lines) {
        this.lines.remove(lines);
        lines.setCatalogs(null);
        return this;
    }

    public void setLines(Set<Lines> lines) {
        this.lines = lines;
    }

    public User getUser() {
        return user;
    }

    public Catalogs user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Catalogs)) {
            return false;
        }
        return id != null && id.equals(((Catalogs) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Catalogs{" +
            "id=" + getId() +
            ", catalogName='" + getCatalogName() + "'" +
            ", catalogoImagemCover1='" + getCatalogoImagemCover1() + "'" +
            ", catalogoImagemCover2='" + getCatalogoImagemCover2() + "'" +
            ", catalogoImagemCover3='" + getCatalogoImagemCover3() + "'" +
            ", catalogoImagemCover4='" + getCatalogoImagemCover4() + "'" +
            "}";
    }
}
