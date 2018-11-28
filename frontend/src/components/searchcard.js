import React, {Component} from 'react';
import {Card, CardBody, CardTitle, CardText} from 'reactstrap';
import {Form, Input, Button, FormGroup} from 'reactstrap';
import axios from 'axios';

class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.handler = props.handler;
        this.bank_name = '';
        this.city = '';

        this.handle_click = this.handle_click.bind(this);
        this.update_bank_name = this.update_bank_name.bind(this);
        this.update_city = this.update_city.bind(this);

        this.URL = 'https://banksearch-api.herokuapp.com/'
    }

    handle_click () {
        var url_params = '?filter=bank_name&value=' + this.bank_name + '&filter=city&value=' + this.city;
        axios.get(this.URL + url_params).then(res => {
            this.handler(res.data);
        });
    }

    update_bank_name (ev) {
        this.bank_name = ev.target.value;
    }

    update_city (ev) {
        this.city = ev.target.value;
    }

    render() {
        return (
            <div className={"search-card"}>
                <Card body style={{backgroundColor: "#ff7675"}}>
                    <CardTitle>Search Bank</CardTitle>
                    <CardText>You can search for a bank branch using Bank name and City to get all the bank branches.</CardText>
                    <Form>
                        <Input placeholder="Bank Name" onChange={this.update_bank_name} /><br />
                        <Input placeholder="City" onChange={this.update_city} /><br />
                        <Button onClick={this.handle_click} color="primary">Search</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default SearchCard