package com.catalogapp.repository;

import com.catalogapp.domain.Transmission;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Transmission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransmissionRepository extends JpaRepository<Transmission, Long> {

}
