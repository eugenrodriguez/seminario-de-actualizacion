-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema actividad-1
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `actividad-1` ;

-- -----------------------------------------------------
-- Schema actividad-1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `actividad-1` DEFAULT CHARACTER SET utf8 ;
USE `actividad-1` ;

-- -----------------------------------------------------
-- Table `actividad-1`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `actividad-1`.`country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `capital` VARCHAR(45) NULL,
  `language` VARCHAR(45) NULL,
  `area` DOUBLE NULL,
  `population` BIGINT(20) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;

USE `actividad-1` ;

-- -----------------------------------------------------
-- procedure CreateCountry
-- -----------------------------------------------------

DELIMITER $$
USE `actividad-1`$$
CREATE PROCEDURE CreateCountry(
  IN p_name VARCHAR(45),
  IN p_capital VARCHAR(45),
  IN p_language VARCHAR(45),
  IN p_area DOUBLE,
  IN p_population BIGINT
)
BEGIN
  INSERT INTO country (name, capital, language, area, population)
  VALUES (p_name, p_capital, p_language, p_area, p_population);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure GetCountryByName
-- -----------------------------------------------------

DELIMITER $$
USE `actividad-1`$$
CREATE PROCEDURE GetCountryByName(IN p_name VARCHAR(45))
BEGIN
  SELECT * FROM country WHERE name = p_name;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure UpdateCountryByName
-- -----------------------------------------------------

DELIMITER $$
USE `actividad-1`$$
CREATE PROCEDURE UpdateCountryByName(
  IN p_name VARCHAR(45),
  IN p_capital VARCHAR(45),
  IN p_language VARCHAR(45),
  IN p_area DOUBLE,
  IN p_population BIGINT
)
BEGIN
  UPDATE country
  SET capital = p_capital,
      language = p_language,
      area = p_area,
      population = p_population
  WHERE name = p_name;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure DeleteCountryByName
-- -----------------------------------------------------

DELIMITER $$
USE `actividad-1`$$
CREATE PROCEDURE DeleteCountryByName(IN p_name VARCHAR(45))
BEGIN
  DELETE FROM country WHERE name = p_name;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
