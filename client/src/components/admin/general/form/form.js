//replace "components/admin/general/form/form.js" with this content

import React, { Component } from 'react';
import * as yup from 'yup';
import './form.scss'


class Form extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: {},
            errors: {}
        }

        this.reroute = this.reroute.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBlur = this.handleChangeBlur.bind(this);
    }

    reroute(){
        this.props.history.goBack();
    };

    async validateForm(){
        const data = {...this.state};
        const schema = yup.object().shape(this.props.validSchema);
        console.log("validateForm starting state: ", data)
        let errors = {};
        await schema.validate(this.state.data, {abortEarly:false}).catch(errs => {
            errs.inner.map(err=>{
                errors[err.path] = err.message;
                // errors.push({
                //     name: err.path,
                //     message: err.message
                // });
            });            
        });
        return errors;
    };

    async validateField({name, value }){
        const schema = yup.object().shape({ [name]: this.validSchema[name] });
        let obj = {[name]:value};
        let errorMessage = await schema.validate(obj).catch(errs => errs);
        if (errorMessage.message) {
            return errorMessage.message
        } else return null;
    };

    handleSubmit(e){
        console.log("handleSubmit starting state: ", this.state);

        e.preventDefault();
        const data = new FormData();
        const allErrors = this.validateForm();
        this.setState({errors : allErrors || {}});
        // if (this.state.errors) return;
        console.log("logging props: ", this.props);
        this.props.onSubmit();
        // this.props.submitForm(this.state.data);
        console.log("handleSubmit ending state: ", this.state);
    };

    async handleChangeBlur({currentTarget: input}){
        console.log("handleChangeBlur starting state: ", this.state);
        const errors = {...this.state.errors};

        let errorMessage = await this.validateField(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
        console.log("handleChangeBlur ending state: ", this.state);

    };
 
    render(){
        return (
        <form className="form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            {this.props.children}
        </form>
        )
    }
}

export default Form;

