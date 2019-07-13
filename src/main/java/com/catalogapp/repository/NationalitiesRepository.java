package com.catalogapp.repository;

import com.catalogapp.domain.Nationalities;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Nationalities entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NationalitiesRepository extends JpaRepository<Nationalities, Long> {

}
