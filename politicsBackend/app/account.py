import sqlite3
from app.orm import ORM
from app.util import hash_password

class Account(ORM):
    tablename = "accounts"
    fields = ["email", "password_hash"]

    def __init__(self, *args, **kwargs):
        self.pk = kwargs.get('pk')
        self.email = kwargs.get('email')
        self.password_hash = kwargs.get('password_hash')
        self.set_password(self.password_hash)
        
    def set_password(self, password):
        hashed_pw = hash_password(password)
        self.password_hash = hashed_pw 

    @classmethod
    def login(cls, email, password):
        return cls.select_one_where("WHERE email = ? AND password_hash = ?", 
                                   (email, hash_password(password)))

                                   