-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema folyou
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema folyou
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `folyou` DEFAULT CHARACTER SET utf8 ;
USE `folyou` ;

-- -----------------------------------------------------
-- Table `folyou`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `folyou`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `nameUser` VARCHAR(50) NOT NULL,
  `emailUser` VARCHAR(100) NOT NULL,
  `passwordUser` VARCHAR(256) NOT NULL,
  `isAdmin` TINYINT NOT NULL DEFAULT 0,
  `countryUser` VARCHAR(100) NOT NULL,
  `regionUser` VARCHAR(100) NULL,
  `languageUser` VARCHAR(5) NOT NULL DEFAULT 'pt',
  `isActivated` TINYINT NOT NULL DEFAULT 1,
  `createdTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `imageUser` VARCHAR(100) NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `nameUser_UNIQUE` (`nameUser` ASC),
  UNIQUE INDEX `emailUser_UNIQUE` (`emailUser` ASC))
ENGINE = InnoDB;


INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`,  
`languageUser`, `isActivated`, `createdTimestamp`,`imageUser`) 
VALUES (NULL, "Andre", "andre@outlook.pt", SHA2("1234",256), 1, "Potugal", "Lisboa", 
 "pt", 1, CURRENT_TIMESTAMP,null);

-- -----------------------------------------------------
-- Table `folyou`.`Portfolio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `folyou`.`Portfolio` (
  `idPortfolio` INT NOT NULL,
  `_idUser` INT NULL,
  PRIMARY KEY (`idPortfolio`),
  INDEX `Portfolio_User_idx` (`_idUser` ASC),
  CONSTRAINT `Portfolio_User`
    FOREIGN KEY (`_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Sheet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `folyou`.`Sheet` (
  `idSheet` INT NOT NULL,
  `nameSheet` VARCHAR(100) NOT NULL,
  `descriptionSheet` TEXT NULL,
  `createdTimestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `wasProposalCreated` TINYINT NULL DEFAULT 0,
  `imageSheet` VARCHAR(100) NULL,
  PRIMARY KEY (`idSheet`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`SheetTeam`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `folyou`.`SheetTeam` (
  `idSheetTeam` INT NOT NULL,
  `_idSheet` INT NULL,
  `nameSheetTeam` VARCHAR(45) NULL,
  PRIMARY KEY (`idSheetTeam`),
  INDEX `SheetTeam-Sheet_idx` (`_idSheet` ASC),
  CONSTRAINT `SheetTeam-Sheet`
    FOREIGN KEY (`_idSheet`)
    REFERENCES `folyou`.`Sheet` (`idSheet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`SheetTeamUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `folyou`.`SheetTeamUser` (
  `idSheetTeamUser` INT NOT NULL,
  `_idUser` INT NOT NULL,
  `namePosition` VARCHAR(100) NOT NULL,
  `_idSheetTeam` INT NOT NULL,
  `isInTeam` TINYINT NULL DEFAULT 1,
  `addedTimestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idSheetTeamUser`),
  INDEX `User_SheetTeamUser_idx` (`_idUser` ASC),
  INDEX `SheetTeam_SheetTeamUser_idx` (`_idSheetTeam` ASC),
  CONSTRAINT `SheetTeamUser-User`
    FOREIGN KEY (`_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `SheetTeamUser-SheetTeam`
    FOREIGN KEY (`_idSheetTeam`)
    REFERENCES `folyou`.`SheetTeam` (`idSheetTeam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`UserLoginHistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `folyou`.`UserLoginHistory` (
  `idUserLoginHistory` INT NOT NULL,
  `_idUser` INT NOT NULL,
  `loginTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expireTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `loginKey` VARCHAR(256) NULL,
  PRIMARY KEY (`idUserLoginHistory`),
  INDEX `ULH-User_idx` (`_idUser` ASC),
  CONSTRAINT `ULH-User`
    FOREIGN KEY (`_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`TalentArea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `folyou`.`TalentArea` (
  `idTalentArea` INT NOT NULL,
  `_idUser` INT NULL,
  `nameTalentArea` VARCHAR(50) NULL,
  `descriptionTalentArea` TEXT NULL,
  `isVisible` TINYINT NULL,
  PRIMARY KEY (`idTalentArea`),
  INDEX `TA-User_idx` (`_idUser` ASC),
  CONSTRAINT `TA-User`
    FOREIGN KEY (`_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`SheetPortfolio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `folyou`.`SheetPortfolio` (
  `idSheetPortfolio` INT NOT NULL,
  `_idSheet` INT NULL,
  `_idPortfolio` INT NULL,
  PRIMARY KEY (`idSheetPortfolio`),
  INDEX `SheetPortfolio-Sheet_idx` (`_idSheet` ASC),
  INDEX `SheetPortfolio-Portfolio_idx` (`_idPortfolio` ASC),
  CONSTRAINT `SheetPortfolio-Sheet`
    FOREIGN KEY (`_idSheet`)
    REFERENCES `folyou`.`Sheet` (`idSheet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `SheetPortfolio-Portfolio`
    FOREIGN KEY (`_idPortfolio`)
    REFERENCES `folyou`.`Portfolio` (`idPortfolio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
