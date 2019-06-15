-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema folyou
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `folyou` ;

-- -----------------------------------------------------
-- Schema folyou
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `folyou` DEFAULT CHARACTER SET utf8 ;
USE `folyou` ;

-- -----------------------------------------------------
-- Table `folyou`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`User` ;

CREATE TABLE IF NOT EXISTS `folyou`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `nameUser` VARCHAR(50) NOT NULL,
  `emailUser` VARCHAR(100) NOT NULL,
  `passwordUser` VARCHAR(256) NOT NULL,
  `isAdmin` TINYINT NOT NULL DEFAULT 0,
  `countryUser` VARCHAR(20) NOT NULL DEFAULT 'pt',
  `regionUser` VARCHAR(100) NULL,
  `languageUser` VARCHAR(5) NOT NULL DEFAULT 'pt',
  `isActivated` TINYINT NOT NULL DEFAULT 1,
  `createdTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descriptionUser` VARCHAR(500) NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `nameUser_UNIQUE` (`nameUser` ASC),
  UNIQUE INDEX `emailUser_UNIQUE` (`emailUser` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Category` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Category` (
  `idCategory` INT NOT NULL,
  `valueCategory` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategory`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Sheet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Sheet` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Sheet` (
  `idSheet` INT NOT NULL AUTO_INCREMENT,
  `nameSheet` VARCHAR(100) NOT NULL,
  `descriptionSheet` VARCHAR(2000) NULL,
  `createdTimestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `wasProposalCreated` TINYINT NULL DEFAULT 0,
  `defaultImageSheet` VARCHAR(256) NULL,
  `Category_idCategory` INT NOT NULL,
  `countrySheet` VARCHAR(5) NULL,
  `regionSheet` VARCHAR(100) NULL,
  PRIMARY KEY (`idSheet`, `Category_idCategory`),
  INDEX `fk_Sheet_ProposalCategory1_idx` (`Category_idCategory` ASC),
  CONSTRAINT `fk_Sheet_ProposalCategory1`
    FOREIGN KEY (`Category_idCategory`)
    REFERENCES `folyou`.`Category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`SheetTeam`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`SheetTeam` ;

CREATE TABLE IF NOT EXISTS `folyou`.`SheetTeam` (
  `idSheetTeam` INT NOT NULL,
  `nameSheetTeam` VARCHAR(45) NULL,
  `Sheet_idSheet` INT NOT NULL,
  PRIMARY KEY (`idSheetTeam`, `Sheet_idSheet`),
  INDEX `fk_SheetTeam_Sheet1_idx` (`Sheet_idSheet` ASC),
  CONSTRAINT `fk_SheetTeam_Sheet1`
    FOREIGN KEY (`Sheet_idSheet`)
    REFERENCES `folyou`.`Sheet` (`idSheet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`SheetTeamUser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`SheetTeamUser` ;

CREATE TABLE IF NOT EXISTS `folyou`.`SheetTeamUser` (
  `idSheetTeamUser` INT NOT NULL,
  `namePosition` VARCHAR(100) NOT NULL,
  `isInTeam` TINYINT NULL DEFAULT 1,
  `addedTimestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `User_idUser` INT NOT NULL,
  `SheetTeam_idSheetTeam` INT NOT NULL,
  PRIMARY KEY (`idSheetTeamUser`, `User_idUser`, `SheetTeam_idSheetTeam`),
  INDEX `fk_SheetTeamUser_User1_idx` (`User_idUser` ASC),
  INDEX `fk_SheetTeamUser_SheetTeam1_idx` (`SheetTeam_idSheetTeam` ASC),
  CONSTRAINT `fk_SheetTeamUser_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SheetTeamUser_SheetTeam1`
    FOREIGN KEY (`SheetTeam_idSheetTeam`)
    REFERENCES `folyou`.`SheetTeam` (`idSheetTeam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`UserLoginHistory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`UserLoginHistory` ;

CREATE TABLE IF NOT EXISTS `folyou`.`UserLoginHistory` (
  `idUserLoginHistory` INT NOT NULL AUTO_INCREMENT,
  `loginTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expireTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `loginKey` VARCHAR(256) NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idUserLoginHistory`, `User_idUser`),
  INDEX `fk_UserLoginHistory_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_UserLoginHistory_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`TalentArea`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`TalentArea` ;

CREATE TABLE IF NOT EXISTS `folyou`.`TalentArea` (
  `idTalentArea` INT NOT NULL AUTO_INCREMENT,
  `nameTalentArea` VARCHAR(50) NULL,
  `descriptionTalentArea` TEXT NULL,
  `isVisible` TINYINT NULL,
  `User_idUser` INT NOT NULL,
  `Category_idCategory` INT NOT NULL,
  `timestamp` TIMESTAMP NULL,
  PRIMARY KEY (`idTalentArea`, `User_idUser`, `Category_idCategory`),
  INDEX `fk_TalentArea_User1_idx` (`User_idUser` ASC),
  INDEX `fk_TalentArea_ProposalCategory1_idx` (`Category_idCategory` ASC),
  CONSTRAINT `fk_TalentArea_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TalentArea_ProposalCategory1`
    FOREIGN KEY (`Category_idCategory`)
    REFERENCES `folyou`.`Category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Portfolio`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Portfolio` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Portfolio` (
  `idPortfolio` INT NOT NULL AUTO_INCREMENT,
  `Sheet_idSheet` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  `isVisible` TINYINT NULL,
  `wasEliminated` TINYINT NULL,
  PRIMARY KEY (`idPortfolio`, `Sheet_idSheet`, `User_idUser`),
  INDEX `fk_SheetPortfolio_Sheet1_idx` (`Sheet_idSheet` ASC),
  INDEX `fk_Portfolio_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_SheetPortfolio_Sheet1`
    FOREIGN KEY (`Sheet_idSheet`)
    REFERENCES `folyou`.`Sheet` (`idSheet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Portfolio_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`ProposalState`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`ProposalState` ;

CREATE TABLE IF NOT EXISTS `folyou`.`ProposalState` (
  `idProposalState` INT NOT NULL,
  `valueProposalState` VARCHAR(45) NULL,
  PRIMARY KEY (`idProposalState`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Proposal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Proposal` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Proposal` (
  `idProposal` INT NOT NULL AUTO_INCREMENT,
  `User_idUser` INT NOT NULL,
  `countryProposal` VARCHAR(5) NOT NULL DEFAULT 'pt',
  `regionProposal` VARCHAR(100) NULL,
  `nameProposal` VARCHAR(50) NULL,
  `descriptionProposal` VARCHAR(2000) NULL,
  `anexNumberProposal` INT NOT NULL,
  `areAnexesPrivate` TINYINT NULL,
  `createdTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ProposalState_idProposalState` INT NOT NULL,
  `Category_idCategory` INT NOT NULL,
  PRIMARY KEY (`idProposal`, `ProposalState_idProposalState`, `Category_idCategory`),
  INDEX `fk_Proposal_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Proposal_ProposalState1_idx` (`ProposalState_idProposalState` ASC),
  INDEX `fk_Proposal_ProposalCategory1_idx` (`Category_idCategory` ASC),
  CONSTRAINT `fk_Proposal_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Proposal_ProposalState1`
    FOREIGN KEY (`ProposalState_idProposalState`)
    REFERENCES `folyou`.`ProposalState` (`idProposalState`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Proposal_ProposalCategory1`
    FOREIGN KEY (`Category_idCategory`)
    REFERENCES `folyou`.`Category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`ProposalSheet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`ProposalSheet` ;

CREATE TABLE IF NOT EXISTS `folyou`.`ProposalSheet` (
  `idProposalSheet` INT NOT NULL AUTO_INCREMENT,
  `Sheet_idSheet` INT NOT NULL,
  `Proposal_idProposal` INT NOT NULL,
  PRIMARY KEY (`idProposalSheet`, `Sheet_idSheet`, `Proposal_idProposal`),
  INDEX `fk_ProposalSheet_Sheet1_idx` (`Sheet_idSheet` ASC),
  INDEX `fk_ProposalSheet_Proposal1_idx` (`Proposal_idProposal` ASC),
  CONSTRAINT `fk_ProposalSheet_Sheet1`
    FOREIGN KEY (`Sheet_idSheet`)
    REFERENCES `folyou`.`Sheet` (`idSheet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProposalSheet_Proposal1`
    FOREIGN KEY (`Proposal_idProposal`)
    REFERENCES `folyou`.`Proposal` (`idProposal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Keyword`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Keyword` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Keyword` (
  `idKeyword` INT NOT NULL AUTO_INCREMENT,
  `valueProposalKeywords` VARCHAR(45) NOT NULL,
  `Proposal_idProposal` INT NULL,
  `Sheet_idSheet` INT NULL,
  `TalentArea_idTalentArea` INT NULL,
  PRIMARY KEY (`idKeyword`),
  INDEX `fk_ProposalKeywords_Sheet1_idx` (`Sheet_idSheet` ASC),
  INDEX `fk_ProposalKeywords_TalentArea1_idx` (`TalentArea_idTalentArea` ASC),
  CONSTRAINT `fk_ProposalKeywords_Proposal1`
    FOREIGN KEY (`Proposal_idProposal`)
    REFERENCES `folyou`.`Proposal` (`idProposal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProposalKeywords_Sheet1`
    FOREIGN KEY (`Sheet_idSheet`)
    REFERENCES `folyou`.`Sheet` (`idSheet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProposalKeywords_TalentArea1`
    FOREIGN KEY (`TalentArea_idTalentArea`)
    REFERENCES `folyou`.`TalentArea` (`idTalentArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`QR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`QR` ;

CREATE TABLE IF NOT EXISTS `folyou`.`QR` (
  `idQR` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  `Proposal_idProposal` INT NOT NULL,
  PRIMARY KEY (`idQR`, `User_idUser`, `Proposal_idProposal`),
  INDEX `fk_QR_User1_idx` (`User_idUser` ASC),
  INDEX `fk_QR_Proposal1_idx` (`Proposal_idProposal` ASC),
  CONSTRAINT `fk_QR_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_QR_Proposal1`
    FOREIGN KEY (`Proposal_idProposal`)
    REFERENCES `folyou`.`Proposal` (`idProposal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`ProposaStatelHistory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`ProposaStatelHistory` ;

CREATE TABLE IF NOT EXISTS `folyou`.`ProposaStatelHistory` (
  `idProposalStateHistory` INT NOT NULL AUTO_INCREMENT,
  `Proposal_idProposal` INT NOT NULL,
  `ProposalState_idProposalState` INT NOT NULL,
  `QR_idQR` INT NOT NULL,
  `justification` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idProposalStateHistory`, `Proposal_idProposal`, `ProposalState_idProposalState`, `QR_idQR`),
  INDEX `fk_ProposalHistory_ProposalState1_idx` (`ProposalState_idProposalState` ASC),
  INDEX `fk_ProposaStatelHistory_QR1_idx` (`QR_idQR` ASC),
  CONSTRAINT `fk_ProposalHistory_Proposal1`
    FOREIGN KEY (`Proposal_idProposal`)
    REFERENCES `folyou`.`Proposal` (`idProposal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProposalHistory_ProposalState1`
    FOREIGN KEY (`ProposalState_idProposalState`)
    REFERENCES `folyou`.`ProposalState` (`idProposalState`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProposaStatelHistory_QR1`
    FOREIGN KEY (`QR_idQR`)
    REFERENCES `folyou`.`QR` (`idQR`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Anexes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Anexes` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Anexes` (
  `idAnexes` INT NOT NULL,
  `fileName` VARCHAR(256) NOT NULL,
  `Proposal_idProposal` INT NULL DEFAULT NULL,
  `Sheet_idSheet` INT NULL DEFAULT NULL,
  `User_idUser` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idAnexes`),
  INDEX `fk_Anexes_Proposal1_idx` (`Proposal_idProposal` ASC),
  INDEX `fk_Anexes_Sheet1_idx` (`Sheet_idSheet` ASC),
  INDEX `fk_Anexes_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Anexes_Proposal1`
    FOREIGN KEY (`Proposal_idProposal`)
    REFERENCES `folyou`.`Proposal` (`idProposal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Anexes_Sheet1`
    FOREIGN KEY (`Sheet_idSheet`)
    REFERENCES `folyou`.`Sheet` (`idSheet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Anexes_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`ApplicationTeam`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`ApplicationTeam` ;

CREATE TABLE IF NOT EXISTS `folyou`.`ApplicationTeam` (
  `idApplicationTeam` INT NOT NULL AUTO_INCREMENT,
  `descriptionApplicationTeam` VARCHAR(2000) NOT NULL,
  PRIMARY KEY (`idApplicationTeam`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`ApplicationState`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`ApplicationState` ;

CREATE TABLE IF NOT EXISTS `folyou`.`ApplicationState` (
  `idApplicationState` INT NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idApplicationState`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Application`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Application` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Application` (
  `idApplication` INT NOT NULL AUTO_INCREMENT,
  `Proposal_idProposal` INT NOT NULL,
  `ApplicationTeam_idApplicationTeam` INT NOT NULL,
  `ApplicationState_idApplicationState` INT NOT NULL,
  PRIMARY KEY (`idApplication`, `Proposal_idProposal`, `ApplicationTeam_idApplicationTeam`, `ApplicationState_idApplicationState`),
  INDEX `fk_Application_Proposal1_idx` (`Proposal_idProposal` ASC),
  INDEX `fk_Application_ApplicationTeam1_idx` (`ApplicationTeam_idApplicationTeam` ASC),
  INDEX `fk_Application_ApplicationState1_idx` (`ApplicationState_idApplicationState` ASC),
  CONSTRAINT `fk_Application_Proposal1`
    FOREIGN KEY (`Proposal_idProposal`)
    REFERENCES `folyou`.`Proposal` (`idProposal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Application_ApplicationTeam1`
    FOREIGN KEY (`ApplicationTeam_idApplicationTeam`)
    REFERENCES `folyou`.`ApplicationTeam` (`idApplicationTeam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Application_ApplicationState1`
    FOREIGN KEY (`ApplicationState_idApplicationState`)
    REFERENCES `folyou`.`ApplicationState` (`idApplicationState`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`ApplicationTeamUser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`ApplicationTeamUser` ;

CREATE TABLE IF NOT EXISTS `folyou`.`ApplicationTeamUser` (
  `idApplicationTeamUser` INT NOT NULL AUTO_INCREMENT,
  `User_idUser` INT NOT NULL,
  `ApplicationTeam_idApplicationTeam` INT NOT NULL,
  PRIMARY KEY (`idApplicationTeamUser`, `User_idUser`, `ApplicationTeam_idApplicationTeam`),
  INDEX `fk_ApplicationTeamUser_User1_idx` (`User_idUser` ASC),
  INDEX `fk_ApplicationTeamUser_ApplicationTeam1_idx` (`ApplicationTeam_idApplicationTeam` ASC),
  CONSTRAINT `fk_ApplicationTeamUser_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ApplicationTeamUser_ApplicationTeam1`
    FOREIGN KEY (`ApplicationTeam_idApplicationTeam`)
    REFERENCES `folyou`.`ApplicationTeam` (`idApplicationTeam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`InterationType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`InterationType` ;

CREATE TABLE IF NOT EXISTS `folyou`.`InterationType` (
  `idInterationType` INT NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idInterationType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Iteraction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Iteraction` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Iteraction` (
  `idIteraction` INT NOT NULL AUTO_INCREMENT,
  `User_idUser` INT NULL,
  `TalentArea_idTalentArea` INT NULL,
  `Proposal_idProposal` INT NULL,
  `Sheet_idSheet` INT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  `InterationType_idInterationType` INT NOT NULL,
  PRIMARY KEY (`idIteraction`),
  INDEX `fk_Iteraction_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Iteraction_TalentArea1_idx` (`TalentArea_idTalentArea` ASC),
  INDEX `fk_Iteraction_Proposal1_idx` (`Proposal_idProposal` ASC),
  INDEX `fk_Iteraction_Sheet1_idx` (`Sheet_idSheet` ASC),
  INDEX `fk_Iteraction_InterationType1_idx` (`InterationType_idInterationType` ASC),
  CONSTRAINT `fk_Iteraction_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Iteraction_TalentArea1`
    FOREIGN KEY (`TalentArea_idTalentArea`)
    REFERENCES `folyou`.`TalentArea` (`idTalentArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Iteraction_Proposal1`
    FOREIGN KEY (`Proposal_idProposal`)
    REFERENCES `folyou`.`Proposal` (`idProposal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Iteraction_Sheet1`
    FOREIGN KEY (`Sheet_idSheet`)
    REFERENCES `folyou`.`Sheet` (`idSheet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Iteraction_InterationType1`
    FOREIGN KEY (`InterationType_idInterationType`)
    REFERENCES `folyou`.`InterationType` (`idInterationType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Jury`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Jury` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Jury` (
  `idJury` INT NOT NULL,
  `Proposal_idProposal` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idJury`, `Proposal_idProposal`, `User_idUser`),
  INDEX `fk_Jury_Proposal1_idx` (`Proposal_idProposal` ASC),
  INDEX `fk_Jury_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Jury_Proposal1`
    FOREIGN KEY (`Proposal_idProposal`)
    REFERENCES `folyou`.`Proposal` (`idProposal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Jury_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`ApplicationStateHistory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`ApplicationStateHistory` ;

CREATE TABLE IF NOT EXISTS `folyou`.`ApplicationStateHistory` (
  `idApplicationStateHistory` INT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  `ApplicationState_idApplicationState` INT NOT NULL,
  `Application_idApplication` INT NOT NULL,
  `Jury_idJury` INT NOT NULL,
  `justification` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idApplicationStateHistory`, `ApplicationState_idApplicationState`, `Application_idApplication`, `Jury_idJury`),
  INDEX `fk_ApplicationStateHistory_ApplicationState1_idx` (`ApplicationState_idApplicationState` ASC),
  INDEX `fk_ApplicationStateHistory_Application1_idx` (`Application_idApplication` ASC),
  INDEX `fk_ApplicationStateHistory_Jury1_idx` (`Jury_idJury` ASC),
  CONSTRAINT `fk_ApplicationStateHistory_ApplicationState1`
    FOREIGN KEY (`ApplicationState_idApplicationState`)
    REFERENCES `folyou`.`ApplicationState` (`idApplicationState`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ApplicationStateHistory_Application1`
    FOREIGN KEY (`Application_idApplication`)
    REFERENCES `folyou`.`Application` (`idApplication`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ApplicationStateHistory_Jury1`
    FOREIGN KEY (`Jury_idJury`)
    REFERENCES `folyou`.`Jury` (`idJury`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`ContestationState`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`ContestationState` ;

CREATE TABLE IF NOT EXISTS `folyou`.`ContestationState` (
  `idContestationState` INT NOT NULL,
  `valueContestationState` VARCHAR(45) NULL,
  PRIMARY KEY (`idContestationState`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Contestation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Contestation` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Contestation` (
  `idFault` INT NOT NULL AUTO_INCREMENT,
  `Proposal_idProposal` INT NULL,
  `Sheet_idSheet` INT NULL,
  `Application_idApplication` INT NULL,
  `textJustification` VARCHAR(1000) NULL,
  `User_idUser` INT NOT NULL,
  `ContestationState_idContestationState` INT NOT NULL,
  PRIMARY KEY (`idFault`, `User_idUser`, `ContestationState_idContestationState`),
  INDEX `fk_Fault_Proposal1_idx` (`Proposal_idProposal` ASC),
  INDEX `fk_Fault_Sheet1_idx` (`Sheet_idSheet` ASC),
  INDEX `fk_Fault_Application1_idx` (`Application_idApplication` ASC),
  INDEX `fk_Contestation_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Contestation_ContestationState1_idx` (`ContestationState_idContestationState` ASC),
  CONSTRAINT `fk_Fault_Proposal1`
    FOREIGN KEY (`Proposal_idProposal`)
    REFERENCES `folyou`.`Proposal` (`idProposal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Fault_Sheet1`
    FOREIGN KEY (`Sheet_idSheet`)
    REFERENCES `folyou`.`Sheet` (`idSheet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Fault_Application1`
    FOREIGN KEY (`Application_idApplication`)
    REFERENCES `folyou`.`Application` (`idApplication`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Contestation_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Contestation_ContestationState1`
    FOREIGN KEY (`ContestationState_idContestationState`)
    REFERENCES `folyou`.`ContestationState` (`idContestationState`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Badge`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Badge` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Badge` (
  `idBadge` INT NOT NULL,
  `valueBadge` VARCHAR(50) NOT NULL,
  `descriptionBadge` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idBadge`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Recomendation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Recomendation` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Recomendation` (
  `idRecomendation` INT NOT NULL AUTO_INCREMENT,
  `User_idUser` INT NOT NULL,
  `User_idUser1` INT NOT NULL,
  PRIMARY KEY (`idRecomendation`, `User_idUser`, `User_idUser1`),
  INDEX `fk_Recomendation_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Recomendation_User2_idx` (`User_idUser1` ASC),
  CONSTRAINT `fk_Recomendation_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Recomendation_User2`
    FOREIGN KEY (`User_idUser1`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`BadgeUser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`BadgeUser` ;

CREATE TABLE IF NOT EXISTS `folyou`.`BadgeUser` (
  `idBadgeUser` INT NOT NULL AUTO_INCREMENT,
  `Badge_idBadge` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  PRIMARY KEY (`idBadgeUser`, `Badge_idBadge`, `User_idUser`),
  INDEX `fk_BadgeUser_Badge1_idx` (`Badge_idBadge` ASC),
  INDEX `fk_BadgeUser_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_BadgeUser_Badge1`
    FOREIGN KEY (`Badge_idBadge`)
    REFERENCES `folyou`.`Badge` (`idBadge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BadgeUser_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`HistoryContestationState`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`HistoryContestationState` ;

CREATE TABLE IF NOT EXISTS `folyou`.`HistoryContestationState` (
  `idHistoryContestationState` INT NOT NULL,
  `ContestationState_idContestationState` INT NOT NULL,
  `Contestation_idFault` INT NOT NULL,
  `textJustification` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idHistoryContestationState`, `ContestationState_idContestationState`, `Contestation_idFault`),
  INDEX `fk_HistoryContestationState_ContestationState1_idx` (`ContestationState_idContestationState` ASC),
  INDEX `fk_HistoryContestationState_Contestation1_idx` (`Contestation_idFault` ASC),
  CONSTRAINT `fk_HistoryContestationState_ContestationState1`
    FOREIGN KEY (`ContestationState_idContestationState`)
    REFERENCES `folyou`.`ContestationState` (`idContestationState`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistoryContestationState_Contestation1`
    FOREIGN KEY (`Contestation_idFault`)
    REFERENCES `folyou`.`Contestation` (`idFault`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Notification` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Notification` (
  `idNotification` INT NOT NULL,
  `typeNotification` VARCHAR(45) NOT NULL,
  `viewed` TINYINT NOT NULL,
  `valueText` TEXT NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idNotification`, `User_idUser`),
  INDEX `fk_Notification_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Notification_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `folyou`.`Message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `folyou`.`Message` ;

CREATE TABLE IF NOT EXISTS `folyou`.`Message` (
  `idMessage` INT NOT NULL AUTO_INCREMENT,
  `viewed` TINYINT NULL,
  `valueText` TEXT NOT NULL,
  `User_idUser` INT NOT NULL,
  `User_idUser1` INT NOT NULL,
  PRIMARY KEY (`idMessage`, `User_idUser`, `User_idUser1`),
  INDEX `fk_Message_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Message_User2_idx` (`User_idUser1` ASC),
  CONSTRAINT `fk_Message_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Message_User2`
    FOREIGN KEY (`User_idUser1`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `folyou` ;

-- -----------------------------------------------------
-- procedure createApplication
-- -----------------------------------------------------

USE `folyou`;
DROP procedure IF EXISTS `folyou`.`createApplication`;

DELIMITER $$
USE `folyou`$$
CREATE PROCEDURE `createApplication` (IN descr VARCHAR(200))
BEGIN
INSERT INTO `folyou`.`applicationteam`(`descriptionApplicationTeam`)VALUES(descr);
SELECT LAST_INSERT_ID() AS `insertedId`;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure createProposal
-- -----------------------------------------------------

USE `folyou`;
DROP procedure IF EXISTS `folyou`.`createProposal`;

DELIMITER $$
USE `folyou`$$
CREATE PROCEDURE `createProposal` (IN idU INT,IN cont VARCHAR(5), IN regi VARCHAR(100),IN nam VARCHAR(50),IN descr VARCHAR(2000), IN categ INT)
BEGIN
INSERT INTO `folyou`.`proposal`(`idProposal`,`User_idUser`,`countryProposal`,`regionProposal`,`nameProposal`,`descriptionProposal`,`anexNumberProposal`,`areAnexesPrivate`,`createdTimestamp`,`ProposalState_idProposalState`,`Category_idCategory`)VALUES(NULL,idU,cont,regi,nam,descr,0,1,NOW(),6,categ);
SELECT LAST_INSERT_ID() AS 'insId' FROM DUAL;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure createSheet
-- -----------------------------------------------------

USE `folyou`;
DROP procedure IF EXISTS `folyou`.`createSheet`;

DELIMITER $$
USE `folyou`$$
CREATE PROCEDURE `createSheet` (IN nameSheet varchar(100),
IN descriptionSheet varchar(2000),
IN createdTimestamp timestamp ,
IN wasProposalCreated tinyint(4), 
IN defaultImageSheet varchar(100), 
IN Category_idCategory int(11),
IN countrySheet varchar(5) ,
IN regionSheet varchar(100),
IN IDUSER int(11))
BEGIN

declare INSERTEDIDSHEET int default 0;

INSERT INTO `folyou`.`sheet`
(`idSheet`,`nameSheet`,`descriptionSheet`,`createdTimestamp`,`wasProposalCreated`,`defaultImageSheet`,`Category_idCategory`,`countrySheet`,`regionSheet`)
VALUES(NULL,nameSheet,descriptionSheet,createdTimestamp,wasProposalCreated,defaultImageSheet,Category_idCategory,countrySheet,regionSheet);

SELECT LAST_INSERT_ID() INTO INSERTEDIDSHEET FROM DUAL;

INSERT INTO `folyou`.`portfolio`(`idPortfolio`,`Sheet_idSheet`,`User_idUser`,`isVisible`,`wasEliminated`)
VALUES(NULL,INSERTEDIDSHEET,IDUSER,1,0);

SELECT INSERTEDIDSHEET AS 'insId' FROM DUAL;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure createUpdateRecomendation
-- -----------------------------------------------------

USE `folyou`;
DROP procedure IF EXISTS `folyou`.`createUpdateRecomendation`;

DELIMITER $$
USE `folyou`$$
CREATE PROCEDURE `createUpdateRecomendation` (IN User_idUserp INT(11),IN User_idUserp1 INT(11))
BEGIN
DECLARE cur INT(11) DEFAULT -1;

SELECT idRecomendation into cur from Recomendation WHERE User_idUser = User_idUserp AND User_idUser1 = User_idUserp1;

	IF cur < 0 THEN
		INSERT INTO `folyou`.`recomendation`(`idRecomendation`,`User_idUser`,`User_idUser1`)VALUES(NULL,User_idUserp,User_idUserp1);
	END IF;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure deleteRecomendation
-- -----------------------------------------------------

USE `folyou`;
DROP procedure IF EXISTS `folyou`.`deleteRecomendation`;

DELIMITER $$
USE `folyou`$$
CREATE PROCEDURE `deleteRecomendation` (IN User_idUserp INT(11),IN User_idUserp1 INT(11))
BEGIN
DECLARE cur INT(11) DEFAULT -1;

SELECT idRecomendation into cur from Recomendation WHERE User_idUser = User_idUserp AND User_idUser1 = User_idUserp1;
IF cur > 0 THEN
DELETE FROM `folyou`.`recomendation` WHERE idRecomendation = cur;		
END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure createTalentArea
-- -----------------------------------------------------

USE `folyou`;
DROP procedure IF EXISTS `folyou`.`createTalentArea`;

DELIMITER $$
USE `folyou`$$
CREATE PROCEDURE `createTalentArea` (IN namen varchar(50),
IN descrip text,IN isV tinyint(4),IN idU int(11),IN IdC int(11))
BEGIN
INSERT INTO `folyou`.`talentarea`
(`idTalentArea`,
`nameTalentArea`,
`descriptionTalentArea`,
`isVisible`,
`User_idUser`,
`Category_idCategory`,
`timestamp`)
VALUES
(NULL,
namen,
descrip,
isV,
idU,
IdC,
now());
SELECT LAST_INSERT_ID() AS 'insId' FROM DUAL;

END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `folyou`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (1, 'Pedro Soares', 'p@hotmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 1, 'pt', 'Lisboa', 'pt', 1, DEFAULT, 'My work explores the relationship between consumerist fetishism and romance tourism. With influences as diverse as Machiavelli and Joni Mitchell, new tensions are distilled from both constructed and discovered narratives.');
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (2, 'Manuel Palavras', 'fabiomartins@hotmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 'pt', 'Lisboa', 'pt', 1, DEFAULT, 'My work explores the relationship between new class identities and skateboard ethics. With influences as diverse as Machiavelli and Andy Warhol, new insights are crafted from both constructed and discovered structures.');
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (3, 'Marie Siop', 'mario@atom.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 'gb', 'Manchester', 'en', 1, DEFAULT, 'As shifting phenomena become transformed through emergent and diverse practice, the viewer is left with a tribute to the limits of our future.');
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (4, 'Bruno Marques', 'mq@kro.pt', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 'pt', 'Lisboa', 'pt', 1, DEFAULT, 'No');
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (5, 'José Empai', 'kaoel@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 'pt', 'Porto', 'pt', 1, DEFAULT, 'NE');
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (6, 'Joanna Johnathan', 'marie@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 'gb', 'London', 'en', 1, DEFAULT, 'NE');
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (7, 'Tiago Duarte', 'tiagod@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 'pt', 'Lisboa', 'pt', 1, DEFAULT, 'NE');
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (8, 'João Sep', 'sep@hotmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 'pt', 'Lisboa', 'pt', 1, DEFAULT, 'NE');
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (9, 'César Mota', 'cesmot@mal.op', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 'pt', 'Lisboa', 'pt', 1, DEFAULT, 'NE');
INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `languageUser`, `isActivated`, `createdTimestamp`, `descriptionUser`) VALUES (10, 'Melannie Sousa', 'melasousa@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 'jp', 'Tokyo', 'en', 1, DEFAULT, 'NE');

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`Category`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`Category` (`idCategory`, `valueCategory`) VALUES (1, 'Dev');
INSERT INTO `folyou`.`Category` (`idCategory`, `valueCategory`) VALUES (2, 'Art');

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`Sheet`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`Sheet` (`idSheet`, `nameSheet`, `descriptionSheet`, `createdTimestamp`, `wasProposalCreated`, `defaultImageSheet`, `Category_idCategory`, `countrySheet`, `regionSheet`) VALUES (1, 'Moinhos Eólicos', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, 0, 'Moinho.png', 1, 'mg', 'Madagascar');
INSERT INTO `folyou`.`Sheet` (`idSheet`, `nameSheet`, `descriptionSheet`, `createdTimestamp`, `wasProposalCreated`, `defaultImageSheet`, `Category_idCategory`, `countrySheet`, `regionSheet`) VALUES (2, 'Como funciona a ai?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, 0, 'Ai.jpg', 1, 'pt', 'Lisboa');
INSERT INTO `folyou`.`Sheet` (`idSheet`, `nameSheet`, `descriptionSheet`, `createdTimestamp`, `wasProposalCreated`, `defaultImageSheet`, `Category_idCategory`, `countrySheet`, `regionSheet`) VALUES (3, 'Eau', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, 0, 'eau.png', 2, 'fr', 'Paris');
INSERT INTO `folyou`.`Sheet` (`idSheet`, `nameSheet`, `descriptionSheet`, `createdTimestamp`, `wasProposalCreated`, `defaultImageSheet`, `Category_idCategory`, `countrySheet`, `regionSheet`) VALUES (4, 'Art 2D', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, 0, 'art2d.png', 2, 'es', 'Madrid');
INSERT INTO `folyou`.`Sheet` (`idSheet`, `nameSheet`, `descriptionSheet`, `createdTimestamp`, `wasProposalCreated`, `defaultImageSheet`, `Category_idCategory`, `countrySheet`, `regionSheet`) VALUES (5, 'Art 3D', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, 0, 'art3d.png', 2, 'it', 'Roma');

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`SheetTeam`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`SheetTeam` (`idSheetTeam`, `nameSheetTeam`, `Sheet_idSheet`) VALUES (1, 'Alexandre', 1);
INSERT INTO `folyou`.`SheetTeam` (`idSheetTeam`, `nameSheetTeam`, `Sheet_idSheet`) VALUES (2, 'André', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`SheetTeamUser`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`SheetTeamUser` (`idSheetTeamUser`, `namePosition`, `isInTeam`, `addedTimestamp`, `User_idUser`, `SheetTeam_idSheetTeam`) VALUES (1, 'Owner', 1, NULL, 2, 1);
INSERT INTO `folyou`.`SheetTeamUser` (`idSheetTeamUser`, `namePosition`, `isInTeam`, `addedTimestamp`, `User_idUser`, `SheetTeam_idSheetTeam`) VALUES (2, 'Owner', 1, NULL, 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`TalentArea`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`TalentArea` (`idTalentArea`, `nameTalentArea`, `descriptionTalentArea`, `isVisible`, `User_idUser`, `Category_idCategory`, `timestamp`) VALUES (1, 'FULLSTACK DEV', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 4, 1, '2019-05-06 22:17:02');
INSERT INTO `folyou`.`TalentArea` (`idTalentArea`, `nameTalentArea`, `descriptionTalentArea`, `isVisible`, `User_idUser`, `Category_idCategory`, `timestamp`) VALUES (2, 'Backend Dev', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 7, 1, '2019-05-06 22:50:02');
INSERT INTO `folyou`.`TalentArea` (`idTalentArea`, `nameTalentArea`, `descriptionTalentArea`, `isVisible`, `User_idUser`, `Category_idCategory`, `timestamp`) VALUES (3, 'Paint 3D', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 8, 2, '2019-05-06 22:30:02');
INSERT INTO `folyou`.`TalentArea` (`idTalentArea`, `nameTalentArea`, `descriptionTalentArea`, `isVisible`, `User_idUser`, `Category_idCategory`, `timestamp`) VALUES (4, 'Paint 2D', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 9, 2, '2019-05-06 22:00:02');
INSERT INTO `folyou`.`TalentArea` (`idTalentArea`, `nameTalentArea`, `descriptionTalentArea`, `isVisible`, `User_idUser`, `Category_idCategory`, `timestamp`) VALUES (5, 'Painting 2D ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 10, 2, '2019-05-06 22:15:02');

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`Portfolio`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`Portfolio` (`idPortfolio`, `Sheet_idSheet`, `User_idUser`, `isVisible`, `wasEliminated`) VALUES (1, 1, 4, 1, 0);
INSERT INTO `folyou`.`Portfolio` (`idPortfolio`, `Sheet_idSheet`, `User_idUser`, `isVisible`, `wasEliminated`) VALUES (2, 2, 5, 1, 0);
INSERT INTO `folyou`.`Portfolio` (`idPortfolio`, `Sheet_idSheet`, `User_idUser`, `isVisible`, `wasEliminated`) VALUES (3, 3, 3, 1, 0);
INSERT INTO `folyou`.`Portfolio` (`idPortfolio`, `Sheet_idSheet`, `User_idUser`, `isVisible`, `wasEliminated`) VALUES (4, 4, 2, 1, 0);
INSERT INTO `folyou`.`Portfolio` (`idPortfolio`, `Sheet_idSheet`, `User_idUser`, `isVisible`, `wasEliminated`) VALUES (5, 5, 1, 1, 0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`ProposalState`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (1, 'draft');
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (2, 'submitted');
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (3, 'underAnalysation');
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (4, 'aproved');
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (5, 'failed');
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (6, 'open');
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (7, 'closed');
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (8, 'underDecision');
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (9, 'granted');
INSERT INTO `folyou`.`ProposalState` (`idProposalState`, `valueProposalState`) VALUES (10, 'inFaultReported');

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`Proposal`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`Proposal` (`idProposal`, `User_idUser`, `countryProposal`, `regionProposal`, `nameProposal`, `descriptionProposal`, `anexNumberProposal`, `areAnexesPrivate`, `createdTimestamp`, `ProposalState_idProposalState`, `Category_idCategory`) VALUES (1, 10, 'pt', 'Cacém', 'Junior Java', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat', 0, 0, DEFAULT, 6, 1);
INSERT INTO `folyou`.`Proposal` (`idProposal`, `User_idUser`, `countryProposal`, `regionProposal`, `nameProposal`, `descriptionProposal`, `anexNumberProposal`, `areAnexesPrivate`, `createdTimestamp`, `ProposalState_idProposalState`, `Category_idCategory`) VALUES (2, 6, 'es', 'Canaria', 'Those who remain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat', 0, 0, DEFAULT, 6, 1);
INSERT INTO `folyou`.`Proposal` (`idProposal`, `User_idUser`, `countryProposal`, `regionProposal`, `nameProposal`, `descriptionProposal`, `anexNumberProposal`, `areAnexesPrivate`, `createdTimestamp`, `ProposalState_idProposalState`, `Category_idCategory`) VALUES (3, 9, 'fr', 'Toulouse', 'Computadores Avançados', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat', 0, 0, DEFAULT, 6, 1);
INSERT INTO `folyou`.`Proposal` (`idProposal`, `User_idUser`, `countryProposal`, `regionProposal`, `nameProposal`, `descriptionProposal`, `anexNumberProposal`, `areAnexesPrivate`, `createdTimestamp`, `ProposalState_idProposalState`, `Category_idCategory`) VALUES (4, 8, 'it', 'Roma', 'Design Gráfico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat', 0, 0, DEFAULT, 6, 2);
INSERT INTO `folyou`.`Proposal` (`idProposal`, `User_idUser`, `countryProposal`, `regionProposal`, `nameProposal`, `descriptionProposal`, `anexNumberProposal`, `areAnexesPrivate`, `createdTimestamp`, `ProposalState_idProposalState`, `Category_idCategory`) VALUES (5, 4, 'gb', 'London', '3D Design', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat', 0, 0, DEFAULT, 6, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`Keyword`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (1, 'Dev', 1, NULL, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (2, 'Java', 1, NULL, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (3, 'Dev', NULL, 1, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (4, 'Dev', NULL, 2, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (5, 'Dev', NULL, NULL, 1);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (6, 'Dev', NULL, NULL, 2);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (7, 'Art', NULL, NULL, 3);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (8, 'Art', NULL, NULL, 4);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (9, 'Art', NULL, NULL, 5);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (10, 'Art', 2, NULL, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (11, 'Dev', 3, NULL, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (12, 'QA', 4, NULL, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (13, 'RH', 5, NULL, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (14, 'Sahar', NULL, 3, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (15, 'Dev', NULL, 4, NULL);
INSERT INTO `folyou`.`Keyword` (`idKeyword`, `valueProposalKeywords`, `Proposal_idProposal`, `Sheet_idSheet`, `TalentArea_idTalentArea`) VALUES (16, 'Dev', NULL, 5, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`Anexes`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (1, 'jose.png', NULL, NULL, 1);
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (2, 'manel.png', NULL, NULL, 2);
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (3, 'marie.jpg', NULL, NULL, 3);
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (4, 'mario.png', NULL, NULL, 4);
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (5, 'tiago.png', NULL, NULL, 5);
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (6, 'joanna.jpg', NULL, NULL, 6);
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (7, 'tiagoduarte.jpg', NULL, NULL, 7);
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (8, 'joaosep.jpg', NULL, NULL, 8);
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (9, 'cesar.jpg', NULL, NULL, 9);
INSERT INTO `folyou`.`Anexes` (`idAnexes`, `fileName`, `Proposal_idProposal`, `Sheet_idSheet`, `User_idUser`) VALUES (10, 'melannie.jpg', NULL, NULL, 10);

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`ApplicationState`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`ApplicationState` (`idApplicationState`, `value`) VALUES (1, 'AAA');

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`InterationType`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`InterationType` (`idInterationType`, `value`) VALUES (1, 'Like');
INSERT INTO `folyou`.`InterationType` (`idInterationType`, `value`) VALUES (2, 'Click');

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`Badge`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`Badge` (`idBadge`, `valueBadge`, `descriptionBadge`) VALUES (1, 'FirstLogin', 'You have entered the site for the first time!');

COMMIT;


-- -----------------------------------------------------
-- Data for table `folyou`.`BadgeUser`
-- -----------------------------------------------------
START TRANSACTION;
USE `folyou`;
INSERT INTO `folyou`.`BadgeUser` (`idBadgeUser`, `Badge_idBadge`, `User_idUser`, `timestamp`) VALUES (1, 1, 1, '2019-05-02 14:55:20');
INSERT INTO `folyou`.`BadgeUser` (`idBadgeUser`, `Badge_idBadge`, `User_idUser`, `timestamp`) VALUES (1, 1, 2, '2019-05-02 14:55:20');

COMMIT;

