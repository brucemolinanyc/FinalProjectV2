import sqlite3
import os

DIR = os.path.dirname(__file__)
DBFILENAME = "VOTERS.db"
DBPATH = os.path.join(DIR, DBFILENAME)

def schema(dbpath=DBPATH):

    with sqlite3.connect(dbpath) as conn:
        cur = conn.cursor()
        DROPSQL = "DROP TABLE IF EXISTS {tablename}"

        cur.execute(DROPSQL.format(tablename="voters"))

        SQL = """CREATE TABLE voters(
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            LastName VARCHAR (256),
            FirstName VARCHAR (256),
            MiddleName VARCHAR (256),
            NameSuf VARCHAR (256),
            HouseNum VARCHAR (256),
            FractionAddress VARCHAR (256),
            Apt VARCHAR (256),
            Street VARCHAR (256),
            StreetName VARCHAR (256),
            PostStreet VARCHAR (256),
            City VARCHAR (256),
            Zip5 VARCHAR (256),
            Zip4 VARCHAR (256),
            Address1 VARCHAR (256),
            Address2 VARCHAR (256),
            Address3 VARCHAR (256),
            Address4 VARCHAR (256),
            DOB VARCHAR (256),
            Gender VARCHAR (256),
            Party VARCHAR (256),
            OtherParty VARCHAR (256),
            CountyCode VARCHAR (256),
            ElecDist VARCHAR (256),
            LegisDist VARCHAR (256),
            TownCity VARCHAR (256),
            Ward VARCHAR (256),
            CongressDist VARCHAR (256),
            SenateDist VARCHAR (256),
            AssemblyDist VARCHAR (256),
            LastDateVoted VARCHAR (256),
            LastYrVoted VARCHAR (256),
            LastCountyVoted VARCHAR (256),
            LastRegAddress VARCHAR (256),
            LastRegName VARCHAR (256),
            CountyRegNum VARCHAR (256),
            AppDate VARCHAR (256),
            AppSource VARCHAR (256),
            IdRequired VARCHAR (256),
            IdRequiredVerify VARCHAR (256),
            VoterStatusCode VARCHAR (256),
            StatusReasonCode VARCHAR (256),
            DateInactive VARCHAR (256),
            DatePurged VARCHAR (256),
            UniqueNYSVoterID VARCHAR (256),
            VoterHistory VARCHAR (256)
        );"""

        cur.execute(SQL) 


        cur.execute(DROPSQL.format(tablename="accounts"))

        SQL = """CREATE TABLE accounts(
                pk INTEGER PRIMARY KEY AUTOINCREMENT,
                email VARCHAR(16) NOT NULL,
                password_hash VARCHAR(128)
        );""" 

        cur.execute(SQL)

        cur.execute(DROPSQL.format(tablename="content"))
        SQL = """CREATE TABLE content(
                pk INTEGER PRIMARY KEY AUTOINCREMENT,
                account_pk INT,
                FOREIGN KEY(account_pk) REFERENCES accounts(pk)
                UNIQUE(account_pk)
        );"""

        cur.execute(SQL)


if __name__=="__main__":
    schema(DBPATH)