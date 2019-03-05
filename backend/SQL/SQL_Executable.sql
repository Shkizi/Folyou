CREATE SCHEMA IF NOT EXISTS `folyou` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `folyou`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `nameUser` VARCHAR(50) NOT NULL,
  `emailUser` VARCHAR(100) NOT NULL,
  `passwordUser` VARCHAR(256) NOT NULL,
  `isAdmin` TINYINT NOT NULL DEFAULT 0,
  `countryUser` VARCHAR(100) NOT NULL,
  `regionUser` VARCHAR(100) NULL,
  `addressUser` TEXT NULL,
  `languageUser` VARCHAR(5) NOT NULL DEFAULT 'pt',
  `isActivated` TINYINT NOT NULL DEFAULT 0,
  `createdTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `nameUser_UNIQUE` (`nameUser` ASC),
  UNIQUE INDEX `emailUser_UNIQUE` (`emailUser` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `folyou`.`UserLoginHistory` (
  `idUserLoginHistory` INT NOT NULL,
  `_idUser` INT NOT NULL,
  `loginTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expireTimestamp` TIMESTAMP NOT NULL,
  PRIMARY KEY (`idUserLoginHistory`),
  INDEX `ULH-User_idx` (`_idUser` ASC),
  CONSTRAINT `ULH-User`
    FOREIGN KEY (`_idUser`)
    REFERENCES `folyou`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


INSERT INTO `folyou`.`User` (`idUser`, `nameUser`, `emailUser`, `passwordUser`, `isAdmin`, `countryUser`, `regionUser`, `addressUser`, 
`languageUser`, `isActivated`, `createdTimestamp`) 
VALUES (NULL, "Andre", "andre@outlook.pt", SHA2("1234",256), 1, "Potugal", "Lisboa", "Rua das Laranjeiras da Póvoa do Nosso Senhor da Graça nas Colinas de Xisto n4",
 "pt", 1, CURRENT_TIMESTAMP);