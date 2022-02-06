/**
 * Created by zhaojunbo on 2017/7/21.
 */
import React from "react";
import ReactDom from "react-dom";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import Intl from "../../../intl/intl.jsx";

class Title extends React.Component {

    render () {
        return (
            <div style={titleStyle.base}>
                <div style={titleStyle.goBack} onClick={this.props.goBack}>

                </div>
            </div>
        )
    }
}

Title.propTypes = {
    goBack: PropTypes.func
};

let titleStyle = {
    base:{
        width:"100%",
        height:"70px",
        backgroundColor:"#ff00ff"
    },
    goBack:{
        width:"40px",
        height:"40px",
        marginTop:"30px",
        marginLeft:"30px",
        backgroundColor:"#ff0000",
        cursor:"pointer"
    }
};

Title = Radium(Title);

class CatalogItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showEditTitle : false,
            showEditAbstract : false
        };
    }

    titleClicked(event){
        event.stopPropagation();

        let newState = {};
        newState.showEditTitle = true;
        this.setState(newState);
    }

    titleInputBlur(event){
        let newState = {};
        newState.showEditTitle = false;
        this.setState(newState);

        this.props.catalogTitleChanged(this.props.id, event.target.value);
    }

    abstractClicked(event){
        event.stopPropagation();

        let newState = {};
        newState.showEditAbstract = true;
        this.setState(newState);
    }

    abstractInputBlur(event){
        let newState = {};
        newState.showEditAbstract = false;
        this.setState(newState);

        this.props.catalogAbstractChanged(this.props.id, event.target.value);
    }

    setFocus(component){
        if(ReactDom.findDOMNode(component)){
            ReactDom.findDOMNode(component).focus();
        }
    }

    renderCatalogTitle(){

        if(!this.state.showEditTitle){
            return (
                <div style={catalogItemStyle.title} onClick={(event)=>{this.titleClicked(event)}}>
                    {this.props.title}
                </div>
            )
        }else{
            return (
                <input style={catalogItemStyle.titleInput} type="text"
                       ref={(component)=>{this.setFocus(component)}}
                       onBlur={(event)=>this.titleInputBlur(event)}
                       onClick={(event)=>{event.stopPropagation()}}
                />
            )
        }
    }

    renderCatalogAbstract(){

        if(!this.state.showEditAbstract){
            return (
                <div style={catalogItemStyle.abstract} onClick={(event)=>{this.abstractClicked(event)}}>
                    {this.props.abstract}
                </div>
            )
        }else{
            return (
                <input style={catalogItemStyle.abstractInput} type="text"
                    ref={(component)=>{this.setFocus(component)}}
                    onBlur={(event)=>{this.abstractInputBlur(event)}}
                    onClick={(event)=>{event.stopPropagation()}}
                />
            )
        }
    }

    render () {
        return (
            <div style={catalogItemStyle.base} onClick={(event)=>{this.props.catalogSelected(this.props.id)}}>
                <div style={catalogItemStyle.coverImage}>
                    <img style={catalogItemStyle.imageSelector} src={this.props.coverImage} alt={this.props.coverImage}/>
                </div>
                <div style={catalogItemStyle.titleWrapper}>
                    {this.renderCatalogTitle()}
                </div>
                <div style={catalogItemStyle.abstractWrapper}>
                    {this.renderCatalogAbstract()}
                </div>
            </div>
        )
    }
}

CatalogItem.propTypes={
    id:PropTypes.string,
    title:PropTypes.string,
    abstract:PropTypes.string,
    coverImage:PropTypes.string,
    catalogSelected:PropTypes.func,
    catalogTitleChanged:PropTypes.func,
    catalogAbstractChanged:PropTypes.func,
    deleteCatalog:PropTypes.func
};

let catalogItemStyle = {
    base:{
        float:"left",
        width:"220px",
        height:"290px",
        marginLeft:"20px",
        marginRight:"20px",
        marginTop:"20px",
        backgroundColor:"#888888",
        cursor:"pointer"
    },
    coverImage:{
        float:"left",
        width:"200px",
        height:"155px",
        marginLeft:"10px",
        marginRight:"10px",
        marginTop:"10px",
        backgroundColor:"#ff0000"
    },
    imageSelector:{
        width:"200px",
        height:"155px"
    },
    titleWrapper:{
        float:"left",
        width:"200px",
        height:"40px",
        marginLeft:"10px",
        marginTop:"10px"
    },
    title:{
        width:"200px",
        height:"40px",
        lineHeight:"20px",
        backgroundColor:"#00ff00"
    },
    titleInput:{
        width:"200px",
        height:"38px",
    },
    abstractWrapper:{
        float:"left",
        width:"200px",
        height:"50px",
        marginLeft:"10px",
        marginTop:"10px"
    },
    abstract:{
        width:"200px",
        height:"50px",
        lineHeight:"20px",
        backgroundColor:"#0000ff"
    },
    abstractInput:{
        width:"200px",
        height:"48px",
        lineHeight:"20px"
    }
};

CatalogItem = Radium(CatalogItem);

class AddCatalog extends React.Component {

    render () {
        return (
            <div style={addCatalogStyle.base} onClick={(event)=>{this.props.addNewCatalog(event)}}>
            </div>
        )
    }
}

AddCatalog.propTypes={
    addNewCatalog:PropTypes.func
};

let addCatalogStyle = {
    base:{
        float:"left",
        width:"220px",
        height:"290px",
        marginLeft:"20px",
        marginRight:"20px",
        marginTop:"20px",
        backgroundColor:"#888888",
        cursor:"pointer"
    }
};

AddCatalog = Radium(AddCatalog);

class CreateExpCatalog extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            fileList:[]
        }
    }

    goBack(){
        this.props.componentToGo(this.props.componentIndex, this.props.componentIndex - 1);
    }

    handleExitClick(){
        event.stopPropagation();
        this.props.exitCreateExhibition();
    }

    renderCatalogArray(){

        let self = this;

        return (
            this.props.catalogArray.map(
                function(content, index){
                    return(
                        <CatalogItem key={content.expCatalogId}
                                     id={content.expCatalogId}
                                     title={content.expCatalogTitle}
                                     abstract={content.expCatalogAbstract}
                                     coverImage={content.expCatalogCoverImage}
                                     catalogSelected={self.props.catalogSelected}
                                     catalogTitleChanged={self.props.catalogTitleChanged}
                                     catalogAbstractChanged={self.props.catalogAbstractChanged}
                                     deleteCatalog={self.props.deleteCatalog}
                        />
                    );
                }
            )
        );
    }

    render () {
        if(this.props.componentIndex === this.props.contentToShow){
            return (
                <div>
                    <div style={createExpCatalogStyle.base} onClick={(event)=>{this.handleExitClick()}}/>
                    <div style={createExpCatalogStyle.modal}>
                        <div style={createExpCatalogStyle.content}  onClick={(event)=>{event.stopPropagation()}}>
                            <Title goBack={this.goBack.bind(this)}/>
                            <div style={createExpCatalogStyle.catalogList}>
                                {this.renderCatalogArray()}
                                <AddCatalog addNewCatalog={this.props.addNewCatalog}/>
                                <div style={createExpCatalogStyle.catalogListEnd}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

CreateExpCatalog.propTypes = {
    componentIndex:PropTypes.number,
    contentToShow:PropTypes.number,
    componentToGo:PropTypes.func,
    addNewCatalog:PropTypes.func,
    deleteCatalog:PropTypes.func,
    catalogSelected:PropTypes.func,
    catalogTitleChanged:PropTypes.func,
    catalogAbstractChanged:PropTypes.func,
    exitCreateExhibition:PropTypes.func,
    catalogArray:PropTypes.array
};

let createExpCatalogStyle = {

    base: {
        position:"fixed",
        height:"100%",
        width:"100%",
        top: "0px",
        left:"0px",
        zIndex: "1000",
        color: "#880000",
        backgroundColor: "rgba(0,230,0,0.5)",
        userSelect : "none",
        clear:"both"
    },
    modal:{
        position:"absolute",
        zIndex: "2000",
        left:"50%",
        top:"50%"
    },
    content:{
        width:"850px",
        minHeight:"600px",
        paddingBottom:"90px",
        position:"absolute",
        left:"50%",
        top:"50%",
        marginTop:"-300px",
        marginLeft:"-425px",
        borderRadius:"10px",
        backgroundColor: "rgba(255,255,255,0.5)",
        transition : "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
    },
    catalogList:{
        paddingLeft:"35px",
        paddingRight:"35px",
        paddingTop:"40px",
        paddingBottom:"40px",
        backgroundColor:"#000088"
    },
    catalogListEnd:{
        height:"0.1px",
        width:"100%",
        clear:"both"
    }
};

CreateExpCatalog = Radium(CreateExpCatalog);

export default CreateExpCatalog;
