package com.catalogapp.repository;

import com.catalogapp.domain.Families;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Families entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FamiliesRepository extends JpaRepository<Families, Long> {

}
