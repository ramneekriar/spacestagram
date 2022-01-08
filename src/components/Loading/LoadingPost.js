import LoadingElement from "./LoadingElement";
import "./Loading.css";

const LoadingPost = () => {
    return (
        <div className="loading__wrapper">
            <div className="loading__post">
                <div className="loading__header">
                    <LoadingElement type="avatar"/>  
                    <LoadingElement type="username"/>
                </div>
                <LoadingElement type="image"/>
                <LoadingElement type="title"/>
                <LoadingElement type="text"/>
                <LoadingElement type="text"/>
                <LoadingElement type="text"/>
                <LoadingElement type="text"/>
            </div>
        </div>
    )
}

export default LoadingPost;