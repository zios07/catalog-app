package com.catalogapp.repository;

import com.catalogapp.domain.Characteristics;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Characteristics entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CharacteristicsRepository extends JpaRepository<Characteristics, Long> {

}
