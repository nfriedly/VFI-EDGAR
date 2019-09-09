-- Set up tables for EDGAR data
-- note: sqlite3 doesn't actually have all of the datatypes used here, but it will silently upgrade these to types it
-- does support. This, however, is more portable for potential use with other Databases.

CREATE TABLE IF NOT EXISTS `tag` (
  `tag` VARCHAR(256) NOT NULL,
  `version` VARCHAR(20) NOT NULL,
  `custom` TINYINT(1) NOT NULL,
  `abstract` TINYINT(1) NOT NULL,
  `datatype` VARCHAR(20),
  `iord` TEXT NOT NULL,
  `crdr` TEXT,
  `tlabel` VARCHAR(512),
  `doc` VARCHAR(255),
  PRIMARY KEY (`tag`,`version`)
);

CREATE TABLE IF NOT EXISTS `sub` (
  `adsh` VARCHAR(20) PRIMARY KEY,
  `cik` INTEGER NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `sic` INTEGER,
  `countryba` VARCHAR(2) NOT NULL,
  `stprba` VARCHAR(2),
  `cityba` VARCHAR(30) NOT NULL,
  `zipba` VARCHAR(10),
  `bas1` VARCHAR(40),
  `bas2` VARCHAR(40),
  `baph` VARCHAR(20),
  `countryma` VARCHAR(2),
  `stprma` VARCHAR(2),
  `cityma` VARCHAR(30),
  `zipma` VARCHAR(10),
  `mas1` VARCHAR(40),
  `mas2` VARCHAR(40),
  `countryinc` VARCHAR(3) NOT NULL,
  `stprinc` VARCHAR(2),
  `ein` INTEGER,
  `former` VARCHAR(150),
  `changed` VARCHAR(8),
  `afs` TEXT,
  `wksi` TINYINT(1) NOT NULL,
  `fye` VARCHAR(4) NOT NULL,
  `form` VARCHAR(10) NOT NULL,
  `period` DATE NOT NULL,
  `fy` INTEGER NOT NULL,
  `fp` TEXT NOT NULL,
  `filed` DATE NOT NULL,
  `accepted` DATETIME NOT NULL,
  `prevrpt` TINYINT(1) NOT NULL,
  `detail` TINYINT(1) NOT NULL,
  `instance` VARCHAR(255) NOT NULL,
  `nciks` INTEGER NOT NULL,
  `aciks` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `num` (
  `adsh` VARCHAR(20) NOT NULL REFERENCES `sub` (`adsh`),
  `tag` VARCHAR(256) NOT NULL,
  `version` VARCHAR(20) NOT NULL,
  `ddate` DATE NOT NULL,
  `qtrs` INTEGER NOT NULL,
  `uom` VARCHAR(20) NOT NULL,
  `coreg` INTEGER NOT NULL,
  `value` DOUBLE PRECISION(28,4),
  `footnote` VARCHAR(512),
  PRIMARY KEY (`adsh`,  `tag`, `version`, `ddate`, `qtrs`, `uom`, `coreg`)
  FOREIGN KEY (tag, version) REFERENCES tag (tag, version)
);

CREATE TABLE IF NOT EXISTS `pre` (
  `adsh` VARCHAR(20) NOT NULL REFERENCES `sub`(`adsh`),
  `report` INTEGER NOT NULL,
  `line` INTEGER NOT NULL,
  `stmt` TEXT NOT NULL,
  `inpth` TINYINT(1) NOT NULL,
  `rfile` TEXT NOT NULL,
  `tag` VARCHAR(256) NOT NULL,
  `version` VARCHAR(20) NOT NULL,
  `plabel` VARCHAR(512) NOT NULL,
  `negating` TINYINT(1) NOT NULL, -- guessing on the type here, this field isn't documented in the readme, but appears to only have 0 and 1 values
  PRIMARY KEY (`adsh`, `report`, `line`)
  FOREIGN KEY (tag, version) REFERENCES tag (tag, version)
);