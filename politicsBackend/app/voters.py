import sqlite3
from app.orm import ORM

class Voters(ORM):
    tablename = "voters"
    fields = ["FirstName", "LastName", "formattedGender", "formattedBirthdate", "City", "ZipCode"]

    def __init__(self, *args, **kwargs):
            self.pk = kwargs.get('pk')
            self.LastName = kwargs.get('LastName')
            self.FirstName  = kwargs.get('FirstName')
            self.MiddleName  = kwargs.get('MiddleName')
            self.NameSuf  = kwargs.get('NameSuf')
            self.HouseNum  = kwargs.get('HouseNum')
            self.FractionAddress  = kwargs.get('FractionAddress')
            self.Apt  = kwargs.get('Apt')
            self.Street  = kwargs.get('Street')
            self.StreetName  = kwargs.get('StreetName')
            self.PostStreet  = kwargs.get('PostSTreet')
            self.City  = kwargs.get('City')
            self.Zip5  = kwargs.get('Zip5')
            self.Zip4  = kwargs.get('Zip4')
            self.Address1  = kwargs.get('Address1')
            self.Address2  = kwargs.get('Address2')
            self.Address3  = kwargs.get('Address3')
            self.Address4  = kwargs.get('Address4')
            self.DOB  = kwargs.get('DOB')
            self.Gender  = kwargs.get('Gender')
            self.Party  = kwargs.get('Party')
            self.OtherParty  = kwargs.get('OtherParty')
            self.CountyCode  = kwargs.get('CountyCode')
            self.ElecDist  = kwargs.get('ElecDist')
            self.LegisDist  = kwargs.get('LegisDiest')
            self.TownCity  = kwargs.get('TownCity')
            self.Ward  = kwargs.get('Ward')
            self.CongressDist  = kwargs.get('CongressDist')
            self.SenateDist  = kwargs.get('SenateDist')
            self.AssemblyDist  = kwargs.get('AssemblyDist')
            self.LastDateVoted  = kwargs.get('LastDateVoted')
            self.LastYrVoted  = kwargs.get('LastYrVoted')
            self.LastCountyVoted  = kwargs.get('LastCountryVoted')
            self.LastRegAddress  = kwargs.get('LastRegAddress')
            self.LastRegName  = kwargs.get('LastRegName')
            self.CountyRegNum  = kwargs.get('CountyRegNum')
            self.AppDate  = kwargs.get('AppDate')
            self.AppSource  = kwargs.get('AppSource')
            self.IdRequired  = kwargs.get('IdRequired')
            self.IdRequiredVerify  = kwargs.get('IdRequiredVerify')
            self.VoterStatusCode  = kwargs.get('VoterStatusCode')
            self.StatusReasonCode  = kwargs.get('StatusReasonCode')
            self.DateInactive  = kwargs.get('DateInactive')
            self.DatePurged  = kwargs.get('DatePurged')
            self.UniqueNYSVoterID  = kwargs.get('UniqueNYSVoterID')
            self.VoterHistory = kwargs.get('VoterHistory')

    @classmethod
    def get_voter(cls, FirstName, LastName, formattedGender, formattedBirthdate, ZipCode):
        print('1')
        voters = Voters.select_many_where("WHERE FirstName=? AND LastName=? AND Gender=?", (FirstName, LastName, formattedGender) )
        print('2')
        voter = list(filter(lambda x : (x.Zip5 == ZipCode) and (x.DOB == formattedBirthdate), voters))
        print('3')
        print(voter)
        
        if voter:
            return voter[0]
        else:
            return False 
        # possibly turn the filter into an or statement


