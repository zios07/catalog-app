package com.catalogapp.repository;

import com.catalogapp.domain.Catalogs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Catalogs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CatalogsRepository extends JpaRepository<Catalogs, Long> {

    @Query("select catalogs from Catalogs catalogs where catalogs.user.login = ?#{principal.username}")
    List<Catalogs> findByUserIsCurrentUser();

}
