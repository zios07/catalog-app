package com.catalogapp.repository;

import com.catalogapp.domain.PartsCharacteristics;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PartsCharacteristics entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartsCharacteristicsRepository extends JpaRepository<PartsCharacteristics, Long> {

}
