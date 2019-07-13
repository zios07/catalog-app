package com.catalogapp.repository;

import com.catalogapp.domain.Vehicles;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Vehicles entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehiclesRepository extends JpaRepository<Vehicles, Long> {

}
