#!/usr/bin/env bash

# This script takes sample EDGAR data from https://www.sec.gov/dera/data/financial-statement-data-sets.html
# unzips it to a data/ directory, and creates a sqlite3 database at data/edgar.db with a separate table for each file

# tested on Windows in MINGW64 (git-bash)

db=edgar.db
datadir=data

# ensure the data directory exists, then enter it
mkdir -p $datadir
pushd $datadir

# fetch & extract the sample data
echo "Downloading data"
wget https://www.sec.gov/files/dera/data/financial-statement-data-sets/2019q2.zip
unzip 2019q2.zip

# import the data into a new database
for file in *.txt
do
  echo "Importing $file"

  table=$(basename "$file" ".txt")

  # escape quotes, otherwise sqlite will log a warning and skip those rows
  tempfile="$table-escaped.txt"
  sed 's/"/""/g;s/[^\t]*/"&"/g' $file > $tempfile

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
  else
    echo "WARNING: some data is missing! Imported $rowsImported of $rows rows."
  fi
done

popd
