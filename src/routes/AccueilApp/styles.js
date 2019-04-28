const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
    aligneItems:"center"
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 5,
    
    // marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 145 : 140,
    top: Platform.OS === "android" ? 35 : 60,

    // width: 280,
    // height: 100
  },
  text: {
    color: "#333",
    bottom: 6,
    marginTop: 5,
    
  }

  };
