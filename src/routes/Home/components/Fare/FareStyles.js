import { Dimensions } from "react-native";
const { width } = Dimensions.get("window")/2;

const styles = {
    fareContainer: {
        width:230,
        height:40,
        padding:10,
        position: "absolute",
        // bottom: 100,
        // right:20,
        top:565,
        left:0,
        backgroundColor:"#11A0DC"
    },
    fareText: {
        fontSize: 15,
        color:"#fff"
    },
    amount:{
        fontWeight:"bold",
        fontSize: 15,
        color:"#fff"
    }
};

export default styles;