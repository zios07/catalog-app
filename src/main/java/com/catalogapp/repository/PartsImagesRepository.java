package com.catalogapp.repository;

import com.catalogapp.domain.PartsImages;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PartsImages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartsImagesRepository extends JpaRepository<PartsImages, Long> {

}
