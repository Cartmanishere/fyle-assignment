from backend import app, db
from flask import render_template, redirect, url_for, flash, jsonify
from models import Bank, fields
from flask import request

def serialize_bank(bank):
    res = {
        'ifsc': bank.ifsc,
        'bank_id': bank.bank_id,
        'branch': bank.branch,
        'address': bank.address,
        'city': bank.city,
        'district': bank.district,
        'state': bank.state,
        'bank_name': bank.bank_name
    }
    return res


@app.route('/')
def index():
    query_values = request.args.getlist('value')
    query_filters = request.args.getlist('filter')

    res = {'status': 'error', 'messages': [], 'data': []}

    if len(query_filters) == 0:
        res['messages'].append('No query filter provided')
        return jsonify(res)

    if len(query_filters) != len(query_values):
        res['messages'].append('Values for all the query filters is not provided.')
        return jsonify(res)

    # Construct query
    query = {}
    for value, filter in zip(query_values, query_filters):
        if filter.lower() not in fields:
            res['messages'].append('{} is an invalid query filter.'.format(filter))
            continue

        query[filter.lower()] = value.upper()

    if len(query) == 0:
        return jsonify(res)

    # Make query to database
    banks = Bank.query.filter_by(**query).all()
    if len(banks) == 0:
        res['messages'].append('No bank in our database matches the specified query.')
        return jsonify(res)

    res['data'] = [serialize_bank(bank) for bank in banks]
    res['status'] = 'ok'
    return jsonify(res)






