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

class ImageItem extends React.Component {

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

        this.props.imageTitleChanged(this.props.catalogBelongsTo, this.props.id, event.target.value);
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

        this.props.imageAbstractChanged(this.props.catalogBelongsTo, this.props.id, event.target.value);
    }

    setFocus(component){
        if(ReactDom.findDOMNode(component)){
            ReactDom.findDOMNode(component).focus();
        }
    }

    renderCatalogTitle(){

        if(!this.state.showEditTitle){
            return (
                <div style={imageItemStyle.title} onClick={(event)=>{this.titleClicked(event)}}>
                    {this.props.title}
                </div>
            )
        }else{
            return (
                <input style={imageItemStyle.titleInput} type="text"
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
                <div style={imageItemStyle.abstract} onClick={(event)=>{this.abstractClicked(event)}}>
                    {this.props.abstract}
                </div>
            )
        }else{
            return (
                <input style={imageItemStyle.abstractInput} type="text"
                       ref={(component)=>{this.setFocus(component)}}
                       onBlur={(event)=>{this.abstractInputBlur(event)}}
                       onClick={(event)=>{event.stopPropagation()}}
                />
            )
        }
    }

    render () {
        return (
            <div style={imageItemStyle.base} onClick={(event)=>{this.props.catalogSelected(this.props.id)}}>
                <div style={imageItemStyle.imageWrapper}>
                    <img style={imageItemStyle.image} src={this.props.imageData} alt={this.props.imageData}/>
                </div>
                <div style={imageItemStyle.titleWrapper}>
                    {this.renderCatalogTitle()}
                </div>
                <div style={imageItemStyle.abstractWrapper}>
                    {this.renderCatalogAbstract()}
                </div>
            </div>
        )
    }
}

ImageItem.propTypes = {
    id: PropTypes.string,
    catalogBelongsTo:PropTypes.string,
    title: PropTypes.string,
    abstract: PropTypes.string,
    imageData: PropTypes.string,
    imageTitleChanged:PropTypes.func,
    imageAbstractChanged:PropTypes.func,
    deleteImageFromCatalog:PropTypes.func
};

let imageItemStyle = {
    base:{
        float:"left",
        width:"220px",
        height:"290px",
        marginLeft:"20px",
        marginRight:"20px",
        marginTop:"20px",
        backgroundColor:"#888888"
    },
    imageWrapper:{
        width:"200px",
        height:"155px",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"10px",
        marginBottom:"10px",
        backgroundColor:"#ff0000"
    },
    image:{
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

ImageItem = Radium(ImageItem);

class AddImages extends React.Component {

    constructor(props){
        super(props);

        this.imageInputId = "add_image_items" + Math.random().toString(36);
    }

    addNewImages(event){

        do{

            if(!event.target.files){
                break;
            }
            let self = this;
            for(let index = 0; index < event.target.files.length; ++index){
                if(!event.target.files[index]){
                    continue;
                }

                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[index]);

                reader.onload = function (e) {
                    self.props.addNewImageToCatalog(self.props.catalogBelongsTo, e.target.result);
                };
            }

        }while(false);
    }

    render () {
        return (
            <div style={addImageStyle.base}>
                <input style={addImageStyle.fileInput} type="file" id={this.imageInputId}
                       accept="image/png, image/jpeg, image/gif, image/jpg" multiple="multiple"
                       onChange={(event)=>{this.addNewImages(event)}}
                       />
                <label style={addImageStyle.imageSelector} htmlFor={this.imageInputId} />
            </div>
        )
    }
}

AddImages.propTypes = {
    catalogBelongsTo:PropTypes.string,
    addNewImageToCatalog: PropTypes.func
};

let addImageStyle = {
    base:{
        float:"left",
        width:"220px",
        height:"290px",
        marginLeft:"20px",
        marginRight:"20px",
        marginTop:"20px",
        backgroundColor:"#888888"
    },
    imageSelector:{
        display: "inline-block",
        width:"200px",
        height:"270px",
        marginLeft:"10px",
        marginTop:"10px",
        backgroundColor:"#4d948a",
        cursor:"pointer",
        userSelect : "none"
    },
    fileInput:{
        clear:"both",
        width: "0.1px",
        height: "0.1px",
        opacity: "0",
        overflow: "hidden",
        position: "absolute",
        zIndex: "-1"
    }
};

AddImages = Radium(AddImages);

class EditExpContent extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            imageFileList:[]
        }
    }

    goBack(){
        this.props.componentToGo(this.props.componentIndex, this.props.componentIndex - 1);
    }

    handleExitClick(){
        event.stopPropagation();
        this.props.exitCreateExhibition();
    }

    renderImageList(){

        let self = this;
        return (
            this.props.imageArray.map(
                function(content, index){

                    return (
                        <ImageItem key={content.expItemId}
                                   id={content.expItemId}
                                   catalogBelongsTo={self.props.catalogBelongsTo}
                                   title={content.expItemTitle}
                                   abstract={content.expItemAbstract}
                                   imageData={content.expItemImage}
                                   imageTitleChanged={self.props.imageTitleChanged}
                                   imageAbstractChanged={self.props.imageAbstractChanged}
                                   deleteImageFromCatalog={self.props.deleteImageFromCatalog}
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
                    <div style={editExpContentStyle.base} onClick={(event)=>{this.handleExitClick()}}/>
                    <div style={editExpContentStyle.modal}>
                        <div style={editExpContentStyle.content}  onClick={(event)=>{event.stopPropagation()}}>
                            <Title goBack={this.goBack.bind(this)}/>
                            <div style={editExpContentStyle.imageList}>
                                {this.renderImageList()}
                                <AddImages catalogBelongsTo={this.props.catalogBelongsTo} addNewImageToCatalog={this.props.addNewImageToCatalog}/>
                                <div style={editExpContentStyle.imageListEnd}/>
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

EditExpContent.propTypes = {
    componentIndex:PropTypes.number,
    contentToShow:PropTypes.number,
    componentToGo:PropTypes.func,
    addNewImageToCatalog:PropTypes.func,
    deleteImageFromCatalog:PropTypes.func,
    imageTitleChanged:PropTypes.func,
    imageAbstractChanged:PropTypes.func,
    exitCreateExhibition:PropTypes.func,
    catalogBelongsTo:PropTypes.string,
    imageArray:PropTypes.array
};

let editExpContentStyle = {
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
    imageList:{
        paddingLeft:"35px",
        paddingRight:"35px",
        paddingTop:"40px",
        paddingBottom:"40px",
        backgroundColor:"#000088"
    },
    imageListEnd:{
        height:"0.1px",
        width:"100%",
        paddingBottom:"0px",
        clear:"both"
    }
};

EditExpContent = Radium(EditExpContent);

export default EditExpContent;
