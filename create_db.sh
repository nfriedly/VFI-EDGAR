#!/usr/bin/env bash

# This script takes sample EDGAR data from https://www.sec.gov/dera/data/financial-statement-data-sets.html
# and creates a sqlite3 database with the data

# tested on Windows in MINGW64 (git-bash)

db=edgar.db
tmpdir=tmp

# ensure the data directory exists, then enter it
mkdir -p $tmpdir

# fetch & extract the sample data
pushd $tmpdir
echo "Downloading data"
wget https://www.sec.gov/files/dera/data/financial-statement-data-sets/2019q2.zip
unzip 2019q2.zip
popd

# create the tables ahead of time to have the correct datatypes (otherwise everything is TEXT)
echo "Creating database $db"
sqlite3 $db < db_structure.sql

# import the data into a new database
for file in $tmpdir/*.txt
do
  echo "Importing $file"

  table=$(basename "$file" ".txt")

  # skip the first line (headers), escape existing quotes, and wrap all cells in quotes
  tempfile="$tmpdir/$table-escaped.txt"
  tail -n +2 $file | sed --expression='s/"/""/g;s/[^\t]*/"&"/g' > $tempfile

  # the first row is used for column names during the import
  printf ".mode tabs\n.import $tempfile $table\n" | sqlite3 $db

  rm $tempfile

  # validate import
  lines=$(wc -l $file | cut -d " " -f 1)
  rows=$(($lines - 1)) # first line is the header
  rowsImported=$(sqlite3 $db "select count(*) from $table;")
  if [ $rows -eq $rowsImported ]
  then
    echo "Imported $rowsImported rows successfully!"
    rm -r $tmpdir
  else
    echo "WARNING: some data is missing! Imported $rowsImported of $rows rows."
  fi
done
