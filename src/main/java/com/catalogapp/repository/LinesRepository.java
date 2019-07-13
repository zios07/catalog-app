package com.catalogapp.repository;

import com.catalogapp.domain.Lines;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Lines entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LinesRepository extends JpaRepository<Lines, Long> {

}
