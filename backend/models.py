from backend import db

fields = ['ifsc', 'bank_id', 'branch', 'address', 'city', 'district', 'state', 'bank_name']

class Bank(db.Model):
    ifsc = db.Column(db.String(25), primary_key=True)
    bank_id = db.Column(db.String(64), index=True)
    branch = db.Column(db.String(120))
    address = db.Column(db.String(500))
    city = db.Column(db.String(50))
    district =db.Column(db.String(50))
    state = db.Column(db.String(25))
    bank_name = db.Column(db.String(50))

    def __repr__(self):
        return '<Bank {}>'.format(self.ifsc)