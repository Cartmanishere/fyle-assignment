import React, {Component} from 'react';
import {Card, CardBody, CardTitle, CardText} from 'reactstrap';
import {Form, Input, Button, FormGroup} from 'reactstrap';
import axios from 'axios';

class FetchCard extends Component {
    constructor(props) {
        super(props);

        this.ifsc = '';
        this.update_ifsc = this.update_ifsc.bind(this);
        this.handler = props.handler;
        this.handle_click = this.handle_click.bind(this);
        this.URL = 'https://banksearch-api.herokuapp.com/'
    }

    update_ifsc(ev) {
        this.ifsc = ev.target.value;
    }

    handle_click() {
        if(this.ifsc != '' && this.ifsc != '') {
            var url_params = '?filter=ifsc&value='+this.ifsc
            axios.get(this.URL + url_params).then(res => {
                this.handler(res.data);
            });
        }
    }

    render() {
        return (
            <div className={"search-card"}>
                <Card body style={{backgroundColor: "#fdcb6e"}}>
                    <CardTitle>Fetch Bank</CardTitle>
                    <CardText>You can fetch the branch details by providing the IFSC code.</CardText>
                    <Form>
                        <Input placeholder="IFSC" onChange={this.update_ifsc} /><br />
                        <Button color="primary" onClick={this.handle_click}>Fetch</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default FetchCard