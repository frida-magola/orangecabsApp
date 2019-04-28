import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = {
    fareContainer: {
        width:width,
        height:40,
        padding:10,
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