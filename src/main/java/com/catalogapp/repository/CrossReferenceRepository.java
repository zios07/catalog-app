package com.catalogapp.repository;

import com.catalogapp.domain.CrossReference;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CrossReference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CrossReferenceRepository extends JpaRepository<CrossReference, Long> {

}
