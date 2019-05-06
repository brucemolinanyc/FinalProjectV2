import csv
import os
import sqlite3 

PATH = os.path.dirname(__file__)
DBPATH = os.path.join(PATH, 'VOTERS.db' )
CSVPATH = os.path.join(PATH, 'voterData')
CSVFILES = ['voters1.csv','voters2.csv','voters3.csv','voters4.csv','voters5.csv',
'voters6.csv','voters7.csv','voters8.csv','voters9.csv','voters10.csv','voters11.csv',
'voters12.csv','voters13.csv','voters14.csv','voters15.csv','voters16.csv',
'voters17.csv','voters18.csv','voters19.csv',]

def seed(dbpath=DBPATH, csvpath=CSVPATH, csvfiles=CSVFILES):
    for csvfile in csvfiles:
        file = os.path.join(csvpath, csvfile)
        with open(file, 'r') as in_file, sqlite3.connect(dbpath) as conn:
                reader = csv.DictReader(in_file)
                cursor = conn.cursor()
                print(csvfile)

                # cursor.execute("""DELETE FROM voters""")

                for line in reader:
                        SQL = """INSERT INTO voters(
                                LastName,
                                FirstName,
                                MiddleName,
                                NameSuf,
                                HouseNum,
                                FractionAddress,
                                Apt,
                                Street,
                                StreetName,
                                PostStreet,
                                City,
                                Zip5,
                                Zip4,
                                Address1,
                                Address2,
                                Address3,
                                Address4,
                                DOB,
                                Gender,
                                Party,
                                OtherParty,
                                CountyCode,
                                ElecDist,
                                LegisDist,
                                TownCity,
                                Ward,
                                CongressDist,
                                SenateDist,
                                AssemblyDist,
                                LastDateVoted,
                                LastYrVoted,
                                LastCountyVoted,
                                LastRegAddress,
                                LastRegName,
                                CountyRegNum,
                                AppDate,
                                AppSource,
                                IdRequired,
                                IdRequiredVerify,
                                VoterStatusCode,
                                StatusReasonCode,
                                DateInactive,
                                DatePurged,
                                UniqueNYSVoterID,
                                VoterHistory
                                ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?);"""

                        data = (line['LastName'], line['FirstName'],
                                line['MiddleName'], line['NameSuf'],
                                line['HouseNum'], line['FractionAddress'],
                                line['Apt'], line['Street'],
                                line['StreetName'], line['PostStreet'],
                                line['City'], line['Zip5'],
                                line['Zip4'],
                                line['Address1'], line['Address2'],
                                line['Address3'], line['Address4'],
                                line['DOB'], line['Gender'],
                                line['Party'], line['OtherParty'],
                                line['CountyCode'],line['ElecDist'],
                                line['LegisDist'], line['TownCity'],
                                line['Ward'],line['CongressDist'],
                                line['SenateDist'], line['AssemblyDist'],
                                line['LastDateVoted'],line['LastYrVoted'],
                                line['LastCountyVoted'],line['LastRegAddress'],
                                line['LastRegName'],line['CountyRegNum'],
                                line['AppDate'],line['AppSource'],
                                line['IdRequired'],line['IdRequiredVerify'],
                                line['VoterStatusCode'], line['StatusReasonCode'],
                                line['DateInactive'],line['DatePurged'], 
                                line['UniqueNYSVoterID'],line['VoterHistory'])
                                
                        cursor.execute(SQL, data)

                        # SQL = """SELECT * FROM voters ORDER BY FirstName"""
                        # cursor.execute(SQL, data)
                        # need to split and sort the file


if __name__ == "__main__":
    seed()




