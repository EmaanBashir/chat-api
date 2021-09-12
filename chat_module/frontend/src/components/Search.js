import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CreateGroup from './CreateGroup'

function Search(props){

///////////////////////////////////////////////////Maybe this will be needed in the return function
//                    <datalist id = "people">
//                        <option value = "emaan"/>
//                        <option value = "usman"/>
//                        <option value = "ayesha"/>
//                    </datalist>

        return (
            <form className="bg-light input-group" noValidate>
					<input list = "people" type="text" placeholder="Search..." name="" className="form-control search"
					autoComplete = "off" value = {props.value} onChange = {props.onChange}/>
                    <CreateGroup />
            </form>
        )
    }


export default Search
