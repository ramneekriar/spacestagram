import LoadingElement from "./LoadingElement";
import "./Loading.css";
import Shimmer from "./Shimmer";

const LoadingPost = () => {
    return (
        <div className="loadingPost__wrapper light">
            <div className="loadingPost">
                <div className="loadingPost__header">
                    <LoadingElement type="avatar"/>  
                    <LoadingElement type="username"/>
                </div>
                <LoadingElement type="image"/>
                <LoadingElement type="text"/>
                <LoadingElement type="text"/>
                <LoadingElement type="text"/>
                <LoadingElement type="text"/>
                <LoadingElement type="text"/>
                <LoadingElement type="text"/>
            </div>
            <Shimmer />
        </div>
    )
}

export default LoadingPost;