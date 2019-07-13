package com.catalogapp.repository;

import com.catalogapp.domain.Steering;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Steering entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SteeringRepository extends JpaRepository<Steering, Long> {

}
