package com.catalogapp.repository;

import com.catalogapp.domain.Motors;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Motors entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MotorsRepository extends JpaRepository<Motors, Long> {

}
