import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchResultsWrapper:{
        top:111,
        position:"absolute",
        width:width,
        height:1000,
        backgroundColor:"#fff",
        opacity:0.9
    },
    primaryText:{
        fontWeight: "bold",
        color:"#373737"
    },
    secondaryText:{
        fontStyle: "italic",
        color:"#7D7D7D",
    },
    leftContainer:{
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor:"#7D7D7D",
    },
    leftIcon:{
        fontSize:20,
        color:"#F89D29",
    },
    distance:{
        fontSize:12,
    }
};

export default styles;